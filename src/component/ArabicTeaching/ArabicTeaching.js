import React, { useEffect } from 'react';
import { speak } from '../../services/SpeechService';

const ArabicTeaching = ({ onComplete }) => {
  const shahadaArabic = ["أشهد أن لا إله إلا الله", "وأشهد أن محمدًا رسول الله"];
  const shahadaLatin = ["Ashhadu an la ilaha illallah", "Wa ashhadu anna Muhammadan rasulullah"];

  useEffect(() => {
    shahadaArabic.forEach((phrase, index) => {
      setTimeout(() => speak(phrase, 'ar-SA'), index * 3000);
    });

    // After Arabic teaching, move to Latin teaching
    setTimeout(() => {
      shahadaLatin.forEach((phrase, index) => {
        setTimeout(() => speak(phrase, 'en-US'), index * 3000);
      });
    }, shahadaArabic.length * 3000 + 1000);
  }, []);

  return (
    <div>
      <h2>تلقين الشهادة باللغة العربية</h2>
      <p>{shahadaArabic.join(" ثم ")}</p>
      <h2>تلقين الشهادة باللاتينية</h2>
      <p>{shahadaLatin.join(" ثم ")}</p>
    </div>
  );
};

export default ArabicTeaching;
