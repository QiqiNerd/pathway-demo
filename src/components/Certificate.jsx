import React from 'react';

const Certificate = () => {
  return (
    <div className="certificate">
      <div className="certificate-icon">🎓</div>
      <h2>🎉 Congratulations!</h2>
      <p>
        You have successfully completed all the steps in your learning pathway.
      </p>
      <p>
        Great job! You've unlocked your full potential and earned your certificate of completion.
      </p>
      <div className="certificate-details">
        <p>
          📜 <strong>Certificate ID:</strong> PWY-{Date.now().toString().slice(-8)}
        </p>
        <p>
          ✨ <strong>Date Completed:</strong> {new Date().toLocaleDateString()}
        </p>
      </div>
      <button className="certificate-button">
        📥 Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
