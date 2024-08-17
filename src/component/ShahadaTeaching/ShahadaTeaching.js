import React, { useEffect, useRef, useState } from 'react';
import useSpeechRecognition from '../../hooks/useSpeechRecognition/useSpeechRecognition';
import Lottie from 'lottie-react';
import animat from '../../assets/Animation2.json';

const ShahadaTeaching = ({ language, onComplete,  onStartListening, onStopListening }) => {
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const animationRef = useRef(null); // Ref for controlling the Lottie animation

  const steps = {
    en: ['There is no god but Allah', 'Muhammad is the messenger of Allah'],
    fr: ['Il n\'y a de dieu qu\'Allah', 'Muhammad est le messager d\'Allah'],
  };

  useEffect(() => {
    if (started && steps[language] && transcript.toLowerCase().includes(steps[language][step].toLowerCase())) {
      stopListening();
      setStep((prevStep) => prevStep + 1);
    }
  }, [transcript, step, language, steps, started, stopListening]);

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
    onStartListening(); 
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
      <h2>الآن كرر الشهادة بلغتك الأم</h2>
      <p>{steps[language][step]}</p>
      <Lottie 
        animationData={animat} 
        style={{ width: 300, height: 300 }} 
        lottieRef={animationRef} 
      />
      {!started && <button onClick={handleStart}>ابدأ الاستماع</button>}
      <p>ما قلته: {transcript}</p>
    </div>
  );
};

export default ShahadaTeaching;
