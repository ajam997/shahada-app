// ShahadaInput.js
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ShahadaInput = () => {
  const {
    transcript,   // النص الذي تم التعرف عليه من الصوت
    listening,    // حالة الاستماع (إذا كان التطبيق يستمع حاليًا)
    resetTranscript,  // لإعادة تعيين النص
    browserSupportsSpeechRecognition  // التحقق إذا كان المتصفح يدعم التعرف على الصوت
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>متصفحك لا يدعم التعرف على الصوت.</span>;
  }

  return (
    <div>
      <h1>تلاوة الشهادة</h1>
      <p>اضغط على الزر للبدء في التلاوة</p>
      <button onClick={SpeechRecognition.startListening}>بدء الاستماع</button>
      <button onClick={SpeechRecognition.stopListening}>إيقاف الاستماع</button>
      <button onClick={resetTranscript}>إعادة تعيين النص</button>
      <div>
        {listening ? <p>التطبيق يستمع الآن...</p> : <p>انقر على الزر للبدء.</p>}
        <p>النص المدخل: {transcript}</p>
      </div>
    </div>
  );
};

export default ShahadaInput;
