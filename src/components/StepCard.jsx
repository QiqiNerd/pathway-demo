import React from 'react';

const StepCard = ({ step, onComplete }) => {
  const isLocked = step.prerequisites && step.prerequisites.length > 0 && !step.isUnlocked;
  const isCompleted = step.isCompleted;

  return (
    <div className={`step-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}>
      <div className="step-card-header">
        <h3 className="step-card-title">
          {isCompleted ? '✅' : '📚'} {step.title}
        </h3>
        <span className={`step-card-badge ${isCompleted ? 'completed' : isLocked ? 'locked' : ''}`}>
          {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}
        </span>
      </div>

      <p className="step-card-description">
        {step.description || 'Complete this step to progress.'}
      </p>

      <div className="step-card-meta">
        {step.duration && (
          <div className="meta-badge time">
            ⏱️ {step.duration}
          </div>
        )}
        {step.difficulty && (
          <div className="meta-badge difficulty">
            📊 {step.difficulty}
          </div>
        )}
        {step.points && (
          <div className="meta-badge">
            ⭐ {step.points} points
          </div>
        )}
      </div>

      <button
        className="step-card-button"
        onClick={() => onComplete(step.id)}
        disabled={isLocked || isCompleted}
        title={isLocked ? 'Complete prerequisites first' : isCompleted ? 'Already completed' : 'Mark as complete'}
      >
        {isCompleted ? '✓ Completed' : isLocked ? '🔒 Locked' : '▶ Mark Complete'}
      </button>
    </div>
  );
};

export default StepCard;
