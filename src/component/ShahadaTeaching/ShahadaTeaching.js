import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ShahadaTeaching = ({ onComplete }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState(null); // مبدئيًا بدون لغة
  const [awaitingLanguage, setAwaitingLanguage] = useState(true); // تحديد ما إذا كنا ننتظر اللغة

  const steps = {
    en: ['There is no god but Allah', 'Muhammad is the messenger of Allah'],
    fr: ['Il n\'y a de dieu qu\'Allah', 'Muhammad est le messager d\'Allah'],
    ar: ['La ilaha illa Allah', 'Muhammadun rasul Allah'],
    // أضف المزيد من اللغات إذا لزم الأمر
  };

  // عندما يتم التعرف على اللغة
  const handleLanguageRecognition = () => {
    const recognizedLanguage = transcript.toLowerCase();

    if (recognizedLanguage.includes('english')) {
      setLanguage('en');
    } else if (recognizedLanguage.includes('français') || recognizedLanguage.includes('french')) {
      setLanguage('fr');
    } else if (recognizedLanguage.includes('arabic') || recognizedLanguage.includes('عربية')) {
      setLanguage('ar');
    } else {
      alert('لم يتم التعرف على اللغة. الرجاء المحاولة مرة أخرى.');
      resetTranscript();
    }

    // إذا تم التعرف على اللغة، يتم الانتقال إلى تلقين الشهادة
    if (language) {
      setAwaitingLanguage(false);
      setStep(0);
      resetTranscript();
    }
  };

  const handleNext = () => {
    if (transcript.toLowerCase().includes(steps[language][step].toLowerCase())) {
      resetTranscript();
      setStep(step + 1);
    } else {
      alert('حاول مرة أخرى');
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>متصفحك لا يدعم التعرف على الصوت.</p>;
  }

  // إذا كنا ننتظر اللغة الأم
  if (awaitingLanguage) {
    return (
      <div>
        <h2>ما هي لغتك الأم؟</h2>
        <button onClick={SpeechRecognition.startListening}>ابدأ التحدث</button>
        <button onClick={handleLanguageRecognition}>تحقق من اللغة</button>
        <p>ما قلته: {transcript}</p>
      </div>
    );
  }

  // إذا تم التعرف على اللغة
  if (step >= steps[language].length) {
    onComplete();
    return null;
  }

  return (
    <div>
      <h2>الآن كرر الشهادة بلغتك الأم:</h2>
      <p>{steps[language][step]}</p>
      <button onClick={SpeechRecognition.startListening}>ابدأ الاستماع</button>
      <button onClick={handleNext}>تحقق من النطق</button>
      <p>ما قلته: {transcript}</p>
    </div>
  );
};

export default ShahadaTeaching;
