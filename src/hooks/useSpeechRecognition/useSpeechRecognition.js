import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // تحقق من دعم المتصفح لـ SpeechRecognition أو webkitSpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true; // الاستماع المستمر
      recog.interimResults = true; // إظهار النتائج المؤقتة

      recog.onresult = (event) => {
        const transcriptArray = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscript(transcriptArray);
      };

      recog.onstart = () => {
        setIsListening(true);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    } else {
      console.error('Speech Recognition API غير مدعومة في هذا المتصفح.');
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechRecognition;
