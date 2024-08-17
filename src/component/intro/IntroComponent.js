import React from 'react';

const IntroComponent = ({ onReady }) => {
  return (
    <div>
      <h2>SHAHADA</h2>
      <h1>مرحباً بك في تطبيق تلقين الشهادة</h1>
      <button onClick={onReady}>ابدأ</button>
    </div>
  );
};

export default IntroComponent;
