import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ArabicTeaching = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [step, setStep] = useState(0);

  const arabicSteps = ['Ash hadu', 'Alla', 'ilaha', 'illa', 'Allah', 'wa', 'ashhadu', 'anna', 'Muhammad', 'rasool', 'Allah'];

  const handleNext = () => {
    if (transcript.toLowerCase().includes(arabicSteps[step].toLowerCase())) {
      resetTranscript();
      setStep(step + 1);
    } else {
      alert('حاول مرة أخرى');
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>متصفحك لا يدعم التعرف على الصوت.</p>;
  }

  if (step >= arabicSteps?.length) {
    return <p>أنت الآن قد أكملت الشهادة بنجاح!</p>;
  }

  return (
    <div>
      <h2>الآن كرر الشهادة باللغة العربية المكتوبة بالأحرف اللاتينية:</h2>
      <p>{arabicSteps[step]}</p>
      <button onClick={SpeechRecognition.startListening}>ابدأ الاستماع</button>
      <button onClick={handleNext}>تحقق من النطق</button>
      <p>ما قلته: {transcript}</p>
    </div>
  );
};

export default ArabicTeaching;
