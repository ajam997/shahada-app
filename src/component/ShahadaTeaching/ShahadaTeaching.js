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
  const [isCorrect, setIsCorrect] = useState(null); // To track correctness of the input
  const [attempts, setAttempts] = useState(0); // Track the number of attempts
  const maxAttempts = 3; // Set the maximum number of attempts
  const animationRef = useRef(null);

  const steps = {
    en: ['There is no god but Allah', 'Muhammad is the messenger of Allah'],
    fr: ['Il n\'y a de dieu qu\'Allah', 'Muhammad est le messager d\'Allah'],
  };

  useEffect(() => {
    if (
      started &&
      !isPaused &&
      steps[language] &&
      transcript.toLowerCase().includes(steps[language][step].toLowerCase())
    ) {
      stopListening();
      setIsCorrect(true); 
      setIsPaused(true);
      setAttempts(0); // Reset attempts for the next step
      resetTranscript(); 
    } else if (started && !isPaused && transcript && attempts < maxAttempts) {
      setIsCorrect(false); 
    } else if (attempts >= maxAttempts) {
      stopListening();
      setIsPaused(true); 
      setAttempts(0); // Reset attempts for the next step or retry
    }
  }, [transcript, step, language, steps, started, isPaused, stopListening, attempts, maxAttempts, resetTranscript]);

  useEffect(() => {
    if (steps[language] && step >= steps[language].length) {
      onComplete();
    }
  }, [step, steps, language, onComplete]);

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
    setAttempts(attempts + 1); // Increase the number of attempts
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

  if (!steps[language]) {
    return <p>اللغة غير مدعومة.</p>;
  }

  if (step >= steps[language].length) {
    return null;
  }

  return (
    <div>
      <h2>SHAHADA</h2>
      <h2>الآن كرر الشهادة بلغتك الأم:</h2>
      <p>{steps[language][step]}</p>
      <Lottie 
        animationData={animat} 
        style={{ width: 300, height: 300 }} 
        lottieRef={animationRef} 
      />
      {!started && <button onClick={handleStart}>ابدأ الاستماع</button>}
      {isPaused && step < steps[language].length - 1 && (
        <button onClick={handleNextListening}>ابدأ الاستماع للجملة التالية</button>
      )}
      {!isPaused && attempts < maxAttempts && (
        <button onClick={handleRetry}>أعد المحاولة</button>
      )}
      <p>ما قلته: {transcript}</p>
      {isCorrect === true && <p style={{ color: 'green' }}>✔️ النص صحيح</p>}
      {isCorrect === false && attempts < maxAttempts && (
        <p style={{ color: 'red' }}>❌ النص غير صحيح، حاول مرة أخرى. (محاولة {attempts + 1} من {maxAttempts})</p>
      )}
      {attempts >= maxAttempts && (
        <p style={{ color: 'orange' }}>لقد وصلت إلى الحد الأقصى من المحاولات. انتقل للجملة التالية.</p>
      )}
    </div>
  );
};

export default ShahadaTeaching;
