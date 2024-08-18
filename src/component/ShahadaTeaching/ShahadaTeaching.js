import React, { useEffect, useRef, useState } from 'react';
import useSpeechRecognition from '../../hooks/useSpeechRecognition/useSpeechRecognition';
import Lottie from 'lottie-react';
import animat from '../../assets/Animation2.json';

const ShahadaTeaching = ({ language, onComplete }) => {
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [phase, setPhase] = useState('language'); // Phase management (language, arabic)
  const animationRef = useRef(null);

  const steps = {
    english: [
      'There is no god but Allah',
      'Muhammad is the messenger of Allah',
      'Ash', 'hadu', 'an', 'la', 'ilaha', 'illa', 'Allah', 'wa', 'ash-hadu', 'anna', 'Muhammadan', 'rasoolu', 'Allah'
    ],
    french: [
      'Il n\'y a de dieu qu\'Allah',
      'Muhammad est le messager d\'Allah',
      'Ash', 'hadu', 'an', 'la', 'ilaha', 'illa', 'Allah', 'wa', 'ash-hadu', 'anna', 'Muhammadan', 'rasoolu', 'Allah'
    ]
  };

  const handleSpeechSynthesis = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = language === 'english' ? 'en-US' : 'fr-FR';
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    if (
      phase === 'language' &&
      started &&
      !isPaused &&
      steps[language] &&
      transcript.toLowerCase().includes(steps[language][step].toLowerCase())
    ) {
      stopListening();
      setIsCorrect(true);
      setIsPaused(true);
      setAttempts(0);
      resetTranscript();
    } else if (started && !isPaused && transcript) {
      setIsCorrect(false);
    }
  }, [transcript, step, language, steps, started, isPaused, phase, stopListening, attempts, resetTranscript]);

  useEffect(() => {
    if (phase === 'language' && steps[language] && step >= steps[language].length) {
      setPhase('transition'); // Transition phase before Arabic phase
    }
  }, [step, steps, language, phase]);

  useEffect(() => {
    if (phase === 'arabic' && step >= steps[language].length) {
      onComplete();
    }
  }, [step, phase, steps, onComplete]);

  useEffect(() => {
    if (animationRef.current) {
      if (isListening) {
        animationRef.current.play();
      } else {
        animationRef.current.stop();
      }
    }
  }, [isListening]);

  const handleStart = () => {
    setStarted(true);
    setIsPaused(false);
    setIsCorrect(null);
    startListening();
  };

  const handleRetry = () => {
    setIsCorrect(null);
    resetTranscript();
    startListening();
  };

  const handleNextListening = () => {
    setStep((prevStep) => prevStep + 1);
    setIsPaused(false);
    setIsCorrect(null);
    setAttempts(0);
    resetTranscript();
    startListening();
  };

  const handleProceedToArabic = () => {
    setPhase('arabic');
    setStep(0);
    setStarted(false); 
    setIsCorrect(null);
    resetTranscript();
  };

  const handleFinish = () => {
    onComplete();
  };

  if (phase === 'language' && !steps[language]) {
    return <p>Unsupported language.</p>;
  }

  if (phase === 'language' && step >= steps[language].length) {
    return (
      <div>
        <h2>Great job!</h2>
        <p>You have successfully recited the Shahada in your native language.</p>
        <button onClick={handleProceedToArabic} style={buttonStyle}>
          Proceed to Recite in Latinized Arabic
        </button>
      </div>
    );
  }

  return (
    <div>
      {phase === 'language' && (
        <>
          <h2>SHAHADA</h2>
          <h2>repeat after me</h2>
          <p>
            {steps[language][step]}
            <button onClick={() => handleSpeechSynthesis(steps[language][step])} >
              Read Aloud
            </button>
          </p>
          <Lottie 
            animationData={animat} 
            style={{  height: 300 }} 
            lottieRef={animationRef} 
          />
          {!started && <button onClick={handleStart} style={buttonStyle}>Start Listening</button>}
          {isPaused && step < steps[language].length - 1 && (
            <button onClick={handleNextListening} style={buttonStyle}>Proceed to Next Sentence</button>
          )}
          {!isPaused && (
            <button onClick={handleRetry} style={buttonStyle}>Retry</button>
          )}
          <p>Your Transcript: {transcript}</p>
          {isCorrect === true && <p style={{ color: 'green' }}>The text is correct</p>}
          {isCorrect === false && (
            <p style={{ color: 'red' }}>The text is incorrect, please try again.</p>
          )}
        </>
      )}

      {phase === 'transition' && (
        <>
          <h2>You have successfully recited the Shahada in your native language!</h2>
          <p>Are you ready to repeat the Shahada in Latinized Arabic?</p>
          <button onClick={handleProceedToArabic} style={buttonStyle}>Start Reciting in Latinized Arabic</button>
        </>
      )}

      {phase === 'arabic' && (
        <>
          <h2>Now, repeat the Shahada in Latinized Arabic:</h2>
          <p>
            {steps[language][step]}
            <button onClick={() => handleSpeechSynthesis(steps[language][step])} style={buttonStyle}>
              Read Aloud
            </button>
          </p>
          <Lottie 
            animationData={animat} 
            style={{  height: 300 }} 
            lottieRef={animationRef} 
          />
          {!started && <button onClick={handleStart} style={buttonStyle}>Start Listening</button>}
          {isPaused && step < steps[language].length - 1 && (
            <button onClick={handleNextListening} style={buttonStyle}>Proceed to Next Word</button>
          )}
          {!isPaused && (
            <button onClick={handleRetry} style={buttonStyle}>Retry</button>
          )}
          <p>Your Transcript: {transcript}</p>
          {isCorrect === true && <p style={{ color: 'green' }}>The word is correct</p>}
          {isCorrect === false && (
            <p style={{ color: 'red' }}>The word is incorrect, please try again.</p>
          )}
        </>
      )}
    </div>
  );
};

// Styles for buttons
const buttonStyle = {
  width: '256px',
  height: '51px',
  gap: '10px',
  borderRadius: '8px',
  color: 'white',
  opacity: '0.9',
  background: '#1B1C1E',
  border: 'none',
  cursor: 'pointer'
};

export default ShahadaTeaching;
