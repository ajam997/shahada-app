import React, { useEffect, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';

const ShahadaTeaching = ({ language, onComplete, transcript, onStartListening, onStopListening }) => {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  const steps = {
    en: ['There is no god but Allah', 'Muhammad is the messenger of Allah'],
    fr: ['Il n\'y a de dieu qu\'Allah', 'Muhammad est le messager d\'Allah'],
  };

  // تحقق من وجود steps[language] قبل الوصول إلى خاصية length
  useEffect(() => {
    if (started && steps[language] && transcript.toLowerCase().includes(steps[language][step].toLowerCase())) {
      onStopListening();
      setStep((prevStep) => prevStep + 1); // تحديث الخطوة بشكل آمن
    }
  }, [transcript, step, language, steps, started, onStopListening]);

  useEffect(() => {
    if (steps[language] && step >= steps[language].length) {
      onComplete();
    }
  }, [step, steps, language, onComplete]);

  const handleStart = () => {
    setStarted(true);
    onStartListening();
  };

  if (!steps[language]) {
    return <p>اللغة غير مدعومة.</p>; // رسالة عند عدم دعم اللغة
  }

  if (step >= steps[language].length) {
    return null; // إنهاء عند إتمام الشهادة
  }

  return (
    <div>
      <h2>الآن كرر الشهادة بلغتك الأم:</h2>
      <p>{steps[language][step]}</p>
      {!started && <button onClick={handleStart}>ابدأ الاستماع</button>}
      <p>ما قلته: {transcript}</p>
    </div>
  );
};

export default ShahadaTeaching;
