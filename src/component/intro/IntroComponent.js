import React, { useEffect, useRef } from 'react';
import animat from '../../assets/Animation2.json';
import Lottie from 'lottie-react';

// تأكد من توفر دعم SpeechRecognition في المتصفح
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const IntroComponent = ({ onReady }) => {
  const recognitionRef = useRef(null);
  const animationRef = useRef(null);

  // وظيفة للاستماع إلى أي كلمة ينطق بها المستخدم
  const startListening = () => {
    if (!SpeechRecognition) {
      console.error('SpeechRecognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en'; // يمكن تغيير اللغة إذا لزم الأمر
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Heard:", transcript);

      // عرض رسالة أن التطبيق يتعرف على الصوت، يمكن تعديل هذه الرسالة حسب الحاجة
      const msg = new SpeechSynthesisUtterance("okay" + transcript);
      window.speechSynthesis.speak(msg);

      // عند انتهاء النطق، الانتقال إلى الخطوة التالية
      msg.onend = () => {
        onReady();
      };
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  useEffect(() => {
    // استماع تلقائي عند تحميل الصفحة
    startListening();
  }, []);

  return (
    <div>
      <h2>SHAHADA</h2>
      <h6>Your first step on your path to Islam.</h6>
      <Lottie
        onClick={startListening}
        animationData={animat}
        style={{ width: 300, height: 300 }}
        lottieRef={animationRef}
      />
      
      <h6>I’m listening</h6>
    </div>
  );
};

export default IntroComponent;
