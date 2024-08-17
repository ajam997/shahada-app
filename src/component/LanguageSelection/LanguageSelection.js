import React, { useState } from 'react';

const LanguageSelection = ({ onLanguageSelected }) => {
  const [language, setLanguage] = useState('');

  const handleSelectLanguage = () => {
    if (language) {
      onLanguageSelected(language);
    }
  };

  return (
    <div>
      <h2>SHAHADA</h2>
      <h2>اختر لغتك الأم</h2>
      <input
        type="text"
        placeholder="اكتب لغتك"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <button onClick={handleSelectLanguage}>تأكيد</button>
    </div>
  );
};

export default LanguageSelection;
