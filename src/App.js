import React, { useState } from 'react';
import IntroComponent from './component/intro/IntroComponent';
import LanguageSelection from './component/LanguageSelection/LanguageSelection';
import ShahadaTeaching from './component/ShahadaTeaching/ShahadaTeaching';
import ArabicTeaching from './component/ArabicTeaching/ArabicTeaching';
import useSpeechRecognition from './hooks/useSpeechRecognition/useSpeechRecognition';
import AudioVisualizer from './component/AudioVisualizer/AudioVisualizer';

function App() {
  const [ready, setReady] = useState(false);
  const [language, setLanguage] = useState('');
  const [teachingComplete, setTeachingComplete] = useState(false);
  const { transcript, startListening, stopListening } = useSpeechRecognition();

  const handleReady = () => setReady(true);
  const handleLanguageSelected = (lang) => setLanguage(lang);
  const handleTeachingComplete = () => setTeachingComplete(true);

  return (
    <div>
      {!ready && <IntroComponent onReady={handleReady} />}
      {ready && !language && <LanguageSelection onLanguageSelected={handleLanguageSelected} />}
      {language && !teachingComplete && (
        <ShahadaTeaching
          language={language}
          onComplete={handleTeachingComplete}
          transcript={transcript}
          onStartListening={startListening}
          onStopListening={stopListening}
        />
      )}
    
    </div>
  );
}

export default App;
