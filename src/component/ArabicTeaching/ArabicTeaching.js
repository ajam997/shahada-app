import React, { useEffect } from 'react';
import { speak } from '../../services/SpeechService';

const ArabicTeaching = () => {
  const shahadaArabic = ["أشهد أن لا إله إلا الله", "وأشهد أن محمدًا رسول الله"];

  useEffect(() => {
    shahadaArabic.forEach((phrase, index) => {
      setTimeout(() => speak(phrase, 'ar-SA'), index * 3000);
    });
  }, []);

  return (
    <div>
      <h2>تلقين الشهادة باللغة العربية</h2>
      <p>{shahadaArabic.join(" ثم ")}</p>
    </div>
  );
};

export default ArabicTeaching;
