import React, { useState, useMemo } from 'react';
import Certificate from './components/Certificate';
import { calculateProgress } from './utils/progress';
import { isUnlocked } from './utils/unlock';
import pathwayData from './data/pathway.json';

export default function App() {
  const { pathway, steps } = pathwayData;
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const unlockedSteps = useMemo(() => {
    return steps.map(step => ({
      ...step,
      isUnlocked: isUnlocked(step, completedSteps),
      isCompleted: completedSteps.has(step.id)
    }));
  }, [steps, completedSteps]);

  const progress = calculateProgress(completedSteps.size, steps.length);
  const allCompleted = completedSteps.size === steps.length && steps.length > 0;
  const totalPoints = steps.reduce((sum, step) => sum + (step.points || 0), 0);
  const earnedPoints = steps
    .filter(step => completedSteps.has(step.id))
    .reduce((sum, step) => sum + (step.points || 0), 0);

  const handleCompleteStep = (stepId) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    setCompletedSteps(newCompleted);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="navbar-menu-btn">☰</button>
          <a href="/" className="navbar-brand">🎯 Pathway</a>
        </div>
        <div className="navbar-center">
          <a href="#home" className="nav-link">Home</a>
          <a href="#overview" className="nav-link">Overview</a>
          <a href="#steps" className="nav-link">Steps</a>
        </div>
        <div className="navbar-right">
          <span className="language-selector">EN</span>
        </div>
      </nav>

      <div className="breadcrumb">
        <div className="container-wide">
          <a href="#back" className="breadcrumb-link">← Back</a>
          <span className="breadcrumb-separator">|</span>
          <span className="breadcrumb-current">{pathway?.title}</span>
        </div>
      </div>

      <main className="main-content">
        <div className="container-wide">
          <div className="content-wrapper">
            <div className="content-left">
              {!allCompleted ? (
                <>
                  <div className="header-card">
                    <div className="header-card-top">
                      <h1>{pathway?.title}</h1>
                      <div className="header-badges">
                        <span className="badge-time">⏱️ 2 Hours</span>
                        <span className="badge-status">Active</span>
                      </div>
                    </div>
                    <p className="header-subtitle">Learning Pathway</p>
                    <div className="header-dates">
                      <div className="date-item">
                        <span className="date-label">Starts:</span>
                        <span className="date-value">19 Nov 2025</span>
                      </div>
                      <div className="date-item">
                        <span className="date-label">Ends:</span>
                        <span className="date-value">31 Dec 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="description-card">
                    <h3>About This Pathway</h3>
                    <p>{pathway?.description}</p>
                  </div>

                  <div className="steps-section">
                    <h3>📚 Learning Steps</h3>
                    <div className="progress-inline">
                      <div className="progress-bar-inline">
                        <div className="progress-fill-inline" style={{ width: `${progress}%` }}></div>
                      </div>
                      <span className="progress-text">{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="steps-list">
                      {unlockedSteps.map((step, idx) => (
                        <div key={step.id} className={`step-item ${step.isCompleted ? 'completed' : ''}`}>
                          <div className={`step-number ${step.isCompleted ? 'done' : ''}`}>{step.isCompleted ? '✓' : idx + 1}</div>
                          <div className="step-content">
                            <div className="step-header">
                              <h4>{step.title}</h4>
                              <span className={`step-status ${step.isCompleted ? 'completed' : ''}`}>
                                {step.isCompleted ? '✓ Done' : step.isUnlocked ? 'Ready' : '🔒'}
                              </span>
                            </div>
                            <p className="step-description">{step.description}</p>
                            <div className="step-meta">
                              {step.duration && <span className="meta-item">⏱️ {step.duration}</span>}
                              {step.difficulty && <span className="meta-item">📊 {step.difficulty}</span>}
                              {step.points && <span className="meta-item">⭐ {step.points} pts</span>}
                            </div>
                            <button
                              className={`step-button ${step.isCompleted ? 'completed' : step.isUnlocked ? '' : 'disabled'}`}
                              onClick={() => !step.isCompleted && step.isUnlocked && handleCompleteStep(step.id)}
                              disabled={!step.isUnlocked || step.isCompleted}
                            >
                              {step.isCompleted ? '✓ Completed' : step.isUnlocked ? '▶ Mark Complete' : '🔒 Locked'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Certificate />
              )}
            </div>

            <div className="content-right">
              <div className="sidebar-card participants-card">
                <div className="sidebar-icon">👥</div>
                <div className="sidebar-title">Participants</div>
                <div className="participants-count">{steps.length * 3}</div>
              </div>

              <div className="sidebar-card skills-card">
                <div className="sidebar-title">Skills You Will Learn</div>
                <div className="skills-list">
                  <span className="skill-badge">Communication</span>
                  <span className="skill-badge">Problem Solving</span>
                  <span className="skill-badge">React Development</span>
                  <span className="skill-badge">Web Design</span>
                  <span className="skill-badge">JavaScript</span>
                </div>
              </div>

              <div className="sidebar-card time-card">
                <div className="sidebar-title">⏱️ Time Required</div>
                <p className="time-content">This pathway should take 2-3 hours total. Work at your own pace.</p>
              </div>

              <div className="sidebar-card points-card">
                <div className="sidebar-title">Points Earned</div>
                <div className="points-display">{earnedPoints}/{totalPoints}</div>
                <div className="points-bar">
                  <div className="points-fill" style={{ width: `${totalPoints > 0 ? (earnedPoints/totalPoints)*100 : 0}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container-wide">
          <div className="footer-content">
            <div className="footer-links">
              <a href="#terms">Terms & Conditions</a>
              <a href="#contact">Contact Us</a>
            </div>
            <p className="footer-text">© 2024 Pathway. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
