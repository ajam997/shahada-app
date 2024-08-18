import React, { useState, useEffect, useRef } from 'react';
import useSpeechRecognition from '../../hooks/useSpeechRecognition/useSpeechRecognition';
import Lottie from 'lottie-react';
import animat from '../../assets/Animation2.json'; // Listening icon
import unsupportedLanguageImage from '../../assets/unsupported_language.png'; // Unsupported language image

const LanguageSelection = ({ onLanguageSelected }) => {
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const [language, setLanguage] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [unsupportedLanguage, setUnsupportedLanguage] = useState(false);

  const supportedLanguages = ['arabic', 'french', 'english'];
  const animationRef = useRef(null);

  // Listen and capture language spoken by user
  useEffect(() => {
    if (!isListening && transcript) {
      const detectedLanguage = transcript.toLowerCase();
      if (supportedLanguages.includes(detectedLanguage)) {
        setLanguage(detectedLanguage);
        setUnsupportedLanguage(false);
      } else {
        setUnsupportedLanguage(true);
      }
    }
  }, [transcript, isListening]);

  // Confirm selected language and move to next component
  const handleConfirmLanguage = () => {
    if (language) {
      setIsConfirmed(true);
      stopListening();
      onLanguageSelected(language); // Notify parent about the selected language
    }
  };

  const handleStartListening = () => {
    if (!isListening) { // Check if not already listening
      setLanguage('');
      setUnsupportedLanguage(false);
      startListening();
    }
  };

  return (
    <div>
      <h2>SHAHADA</h2>
      {!isConfirmed ? (
        <>
          <h2>Please state your native language</h2>
          {!unsupportedLanguage && (
            <Lottie
            style={{ height: 300 }}
              onClick={handleStartListening}
              animationData={animat}
              lottieRef={animationRef}
            />
          )}
          {unsupportedLanguage && (
            <img
              src={unsupportedLanguageImage}
              alt="Unsupported Language"
              style={{ width: 200, height: 200 }}
              onClick={() => {
                const msg = new SpeechSynthesisUtterance("Unsupported language. Please try again.");
                window.speechSynthesis.speak(msg);
              }}
            />

          )}
          {language && <p>You said: {language}</p>}
          {language && !unsupportedLanguage && <button
          
          style={{
            width: '256px',
            height: '51px',
            gap: '10px',
            borderRadius: '8px',
            color: 'white',
            opacity: '0px',
            background: '#1B1C1E', // Optional: Remove the default background
            border: 'none', // Optional: Remove the default border
            cursor: 'pointer' // Optional: Add a pointer cursor for better UX
          }}
          onClick={handleConfirmLanguage}>Confirm Language</button>}
          {unsupportedLanguage && <p>Language not supported. Please try again.</p>}
          {unsupportedLanguage && (
            <button
              onClick={handleStartListening}
              style={{
                width: '256px',
                height: '51px',
                gap: '10px',
                borderRadius: '8px',
                color: 'white',
                opacity: '0px',
                background: '#1B1C1E', // Optional: Remove the default background
                border: 'none', // Optional: Remove the default border
                cursor: 'pointer' // Optional: Add a pointer cursor for better UX
              }}
            >
              Try again.
            </button>
          )}

        </>
      ) : (
        <>
          <p>Language confirmed: {language}</p>
          {/* Optionally, add a message or spinner to indicate transition */}
        </>
      )}
    </div>
  );
};

export default LanguageSelection;
