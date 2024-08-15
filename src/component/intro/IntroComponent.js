import React, { useState } from 'react';

const IntroComponent = ({ onReady }) => {
  const [isReady, setIsReady] = useState(false);

  const handleYes = () => {
    setIsReady(true);
    onReady();
  };

  if (isReady) {
    return null;
  }

  return (
    <div>
      <h2>هل أنت مستعد لنطق الشهادة؟</h2>
      <button onClick={handleYes}>نعم</button>
    </div>
  );
};

export default IntroComponent;
