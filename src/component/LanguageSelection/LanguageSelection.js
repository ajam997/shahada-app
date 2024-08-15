import React, { useState } from 'react';

const LanguageSelection = ({ onLanguageSelected }) => {
  const [language, setLanguage] = useState('');

  const handleSelect = (event) => {
    setLanguage(event.target.value);
    onLanguageSelected(event.target.value);
  };

  return (
    <div>
      <h2>ما هي لغتك الأم؟</h2>
      <input type="text" value={language} onChange={handleSelect} placeholder="اكتب لغتك الأم" />
      {language && <p>لغتك الأم هي: {language}</p>}
    </div>
  );
};

export default LanguageSelection;
