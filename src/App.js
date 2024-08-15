import React, { useState } from 'react';
import IntroComponent from '../src/component/intro/IntroComponent';
import LanguageSelection from '../src/component/LanguageSelection/LanguageSelection';
import ShahadaTeaching from '../src/component/ShahadaTeaching/ShahadaTeaching';
import ArabicTeaching from '../src/component/ArabicTeaching/ArabicTeaching';
import useSpeechRecognition from './hooks/useSpeechRecognition/useSpeechRecognition'; // مخصص للتعرف على الصوت
import AudioVisualizer from '../src/component/AudioVisualizer/AudioVisualizer'; // مخصص لتصور الصوت

function App() {
  const [ready, setReady] = useState(false);
  const [language, setLanguage] = useState('');
  const [teachingComplete, setTeachingComplete] = useState(false);

  // استخدام hook المخصص للتعرف على الصوت
  const { transcript, isListening, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  const [audioStream, setAudioStream] = useState(null);

  const handleReady = () => setReady(true);

  const handleLanguageSelected = (lang) => setLanguage(lang);

  const handleTeachingComplete = () => setTeachingComplete(true);

  const handleStartListening = () => {
    startListening();
    // يمكن استخدام audioStream هنا للتعامل مع المدخلات الصوتية والتصور البصري
  };

  const handleStopListening = () => {
    stopListening();
    // يمكنك هنا معالجة الصوت أو إرساله إلى مكون التصور البصري
  };

  return (
    <div>
      {!ready && <IntroComponent onReady={handleReady} />}
      {ready && !language && <LanguageSelection onLanguageSelected={handleLanguageSelected} />}
      {language && !teachingComplete && (
        <div>
          <ShahadaTeaching
            language={language}
            onComplete={handleTeachingComplete}
            transcript={transcript}
            onStartListening={handleStartListening}
            onStopListening={handleStopListening}
          />
          {/* عرض التصور البصري إذا كانت هناك مدخلات صوتية */}
          {audioStream && <AudioVisualizer audioStream={audioStream} />}
        </div>
      )}
      {teachingComplete && <ArabicTeaching />}
    </div>
  );
}

export default App;
