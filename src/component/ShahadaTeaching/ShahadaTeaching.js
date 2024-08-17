import React, { useEffect, useState } from 'react';

const ShahadaTeaching = ({ language, onComplete, transcript, onStartListening, onStopListening }) => {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  const steps = {
    en: ['There is no god but Allah', 'Muhammad is the messenger of Allah'],
    fr: ['Il n\'y a de dieu qu\'Allah', 'Muhammad est le messager d\'Allah'],
    // Add more languages as needed
  };

  useEffect(() => {
    // تحقق من أن transcript موجودة وأنها تحتوي على نص
    if (started && steps[language] && transcript && transcript.toLowerCase) {
      if (transcript.toLowerCase().includes(steps[language][step].toLowerCase())) {
        onStopListening(); // إيقاف الاستماع بعد التأكد من الجملة
        setTimeout(() => {
          if (step + 1 < steps[language].length) {
            setStep((prevStep) => prevStep + 1); // الانتقال للجملة التالية
            setStarted(false); // إعادة started إلى false لتفعيل زر "ابدأ الاستماع" للجملة التالية
          } else {
            onComplete(); // اكتمال جميع الجمل
          }
        }, 1000); // تأخير بسيط قبل الانتقال للجملة التالية
      }
    }
  }, [transcript, step, language, steps, started, onStopListening, onComplete]);

  const handleStart = () => {
    setStarted(true);
    onStartListening();
  };

  return (
    <div>
      <h2>الآن كرر الشهادة بلغتك الأم:</h2>
      <p>{steps[language][step]}</p>
      {!started && <button onClick={handleStart}>ابدأ الاستماع</button>}
      <p>ما قلته: {transcript || "لم يتم سماع أي شيء بعد."}</p>
    </div>
  );
};

export default ShahadaTeaching;
