import React, { useState, useEffect } from 'react';
import {
  PATH_META,
  PHASES,
  LINE_PATH_QUESTIONS,
  CLUSTER_2_SUMMARY
} from './questions';
import GeoGebraLineLab from './GeoGebraLineLab';
import './LineStudioModule.css';

// Fisher-Yates shuffle helper
function shuffleArray(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initShuffledOptions() {
  const result = {};
  LINE_PATH_QUESTIONS.forEach((q) => {
    if (q.options) {
      result[q.id] = shuffleArray(q.options);
    }
  });
  return result;
}

export default function LineStudioModule({ onBack }) {
  // activeStep: 1..6 are Questions 1..6; 7 is Graduation / Free Play
  const [activeStep, setActiveStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  // GeoGebra Sliders State
  const [sliderA, setSliderA] = useState(2);
  const [sliderB, setSliderB] = useState(0);

  // GeoGebra Points State
  const [plottedPoints, setPlottedPoints] = useState([]);

  // Free Play challenge tracking
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [freePlayInteracted, setFreePlayInteracted] = useState(false);

  // Shuffled options map for all MCQ questions (e.g. Q4)
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState(() => initShuffledOptions());

  // Question Answers State for Questions 1..6
  const [answers, setAnswers] = useState({
    1: { isSubmitted: false, isCompleted: false },
    2: { deltaX: '', deltaY: '', isSubmitted: false, isCompleted: false, error: null },
    3: { isSubmitted: false, isCompleted: false },
    4: { selectedId: null, isSubmitted: false, error: null },
    5: { lineDrawn: false, lineInput: '', lineError: null, isSubmitted: false },
    6: { observation: '', isSubmitted: false }
  });

  const updateAnswer = (qId, updates) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], ...updates }
    }));
  };

  // Re-shuffle unsubmitted MCQs when entering
  useEffect(() => {
    if (activeStep === 4) {
      const q = LINE_PATH_QUESTIONS.find((item) => item.id === 4);
      if (q && q.options && !answers[4]?.isSubmitted) {
        setShuffledOptionsMap((prev) => ({
          ...prev,
          4: shuffleArray(q.options)
        }));
      }
    }
  }, [activeStep]);

  // Handle slider interaction in Question 6 or Free Play
  const handleSliderInteracted = (knob, val) => {
    if (activeStep === 7 || isFinished) {
      setFreePlayInteracted(true);
      CLUSTER_2_SUMMARY.challenges.forEach((ch) => {
        if (ch.targetA === (knob === 'a' ? val : sliderA) && ch.targetB === (knob === 'b' ? val : sliderB)) {
          setCompletedChallenges((prev) => new Set([...prev, ch.id]));
        }
      });
    }
  };

  // Mode conditions: Question 6 and Graduation (7) are slider mode
  const isSliderMode = activeStep === 6;
  const showLineAB = (activeStep === 5 && answers[5]?.lineDrawn) || (activeStep > 5 && activeStep < 6);
  const showOriginLines = false;
  const showParametricLine = activeStep === 6;

  // Only show GeoGebra command input bar when the question requires plotting on GeoGebra:
  // Q1: Plot two points (required)
  // Q2: Measure dx & dy in question card (NOT required)
  // Q3: Plot C, D, E (required)
  // Q4: Guess pattern MCQ in question card (NOT required)
  // Q5: Draw Line(A, B) in GeoGebra (required until line is drawn)
  // Q6: Sliders mode for y = ax + b (NOT required)
  const showGeoGebraInputBar = activeStep === 1 || activeStep === 3 || (activeStep === 5 && !answers[5]?.lineDrawn);

  // Identify the learner's first two points (from Q1)
  const userPtA = plottedPoints.find((p) => p.name === 'A') || (plottedPoints.length >= 1 ? plottedPoints[0] : null);
  const userPtB = plottedPoints.find((p) => p.name === 'B') || (plottedPoints.length >= 2 ? plottedPoints[1] : null);

  // Check if two distinct points are plotted in Q1
  const hasPointA = Boolean(userPtA);
  const hasPointB = Boolean(userPtB && (userPtB.x !== userPtA?.x || userPtB.y !== userPtA?.y));
  const hasTwoPoints = hasPointA && hasPointB;

  // Active baseline points for pattern continuation (fallback to (1, 2) and (2, 4) if learner jumped ahead)
  const ptA = userPtA || { name: 'A', x: 1, y: 2 };
  const ptB = (userPtB && (userPtB.x !== ptA.x || userPtB.y !== ptA.y))
    ? userPtB
    : { name: 'B', x: ptA.x + 1, y: ptA.y + 2 };

  // Step increments: delta X and delta Y
  const dx = Number((ptB.x - ptA.x).toFixed(2));
  const dy = Number((ptB.y - ptA.y).toFixed(2));

  // Target points C, D, E calculated to lie on the exact same straight line
  const targetC = { name: 'C', x: Number((ptB.x + dx).toFixed(2)), y: Number((ptB.y + dy).toFixed(2)) };
  const targetD = { name: 'D', x: Number((targetC.x + dx).toFixed(2)), y: Number((targetC.y + dy).toFixed(2)) };
  const targetE = { name: 'E', x: Number((targetD.x + dx).toFixed(2)), y: Number((targetD.y + dy).toFixed(2)) };

  // Check if learner has plotted points matching target coordinates C, D, E
  const hasPointC = plottedPoints.some(
    (p) => (p.name === 'C' || (p !== userPtA && p !== userPtB)) && Math.abs(p.x - targetC.x) < 0.05 && Math.abs(p.y - targetC.y) < 0.05
  );
  const hasPointD = plottedPoints.some(
    (p) => (p.name === 'D' || (p !== userPtA && p !== userPtB)) && Math.abs(p.x - targetD.x) < 0.05 && Math.abs(p.y - targetD.y) < 0.05
  );
  const hasPointE = plottedPoints.some(
    (p) => (p.name === 'E' || (p !== userPtA && p !== userPtB)) && Math.abs(p.x - targetE.x) < 0.05 && Math.abs(p.y - targetE.y) < 0.05
  );

  // Callback when a line is drawn via GeoGebra input bar
  const handleLineDrawn = ({ pt1, pt2 }) => {
    if (activeStep === 5) {
      updateAnswer(5, { lineDrawn: true, isSubmitted: true, lineError: null });
    }
  };

  // Dynamic prompts that adapt to the learner's chosen points
  const getDynamicPrompt = () => {
    if (activeStep === 1) {
      return 'Plot any two different points of your choice on the canvas.';
    }
    if (activeStep === 2) {
      return 'Tell me how much you moved in X, and how much shift happened in Y.';
    }
    if (activeStep === 3) {
      return 'Move in the same pattern 3 more times: plot points C, D, and E using the exact same step.';
    }
    if (activeStep === 4) {
      return 'What pattern is becoming visible across the points, can you guess?';
    }
    if (activeStep === 5) {
      return `You can draw that pattern using exactly the pattern name: in GeoGebra, type Line(${ptA.name}, ${ptB.name}).`;
    }
    if (activeStep === 6) {
      return 'Now let\'s explore something amazing: change "a" and "b" and type your observation.';
    }
    return currentQ?.prompt;
  };

  const getDynamicSubtext = () => {
    if (activeStep === 1) {
      return 'Type two distinct points into the input bar above (e.g. A = (x, y) or (x, y)):';
    }
    if (activeStep === 2) {
      return `Enter the change in x (Δx) and change in y (Δy) from ${ptA.name}(${ptA.x}, ${ptA.y}) to ${ptB.name}(${ptB.x}, ${ptB.y}):`;
    }
    if (activeStep === 3) {
      return `With movement step (Δx = ${dx >= 0 ? '+' : ''}${dx}, Δy = ${dy >= 0 ? '+' : ''}${dy}), plot points C, D, and E in the input bar above:`;
    }
    if (activeStep === 4) {
      return 'Observe all five plotted points on the canvas and choose the geometric pattern they make:';
    }
    if (activeStep === 5) {
      return `Type Line(${ptA.name}, ${ptB.name}) in the input bar above to connect the points:`;
    }
    if (activeStep === 6) {
      return 'The equation of the line is y = a·x + b. Move sliders "a" and "b" above and write down what you observe:';
    }
    return currentQ?.subtext;
  };

  // Dynamic input placeholder to guide user typing
  const getInputPlaceholder = () => {
    if (activeStep === 1) {
      if (!hasPointA) return 'e.g. A = (x, y) or (x, y) — pick any first point';
      if (!hasPointB) return `e.g. B = (x, y) or (x, y) — pick a second point (different from (${ptA.x}, ${ptA.y}))`;
      return 'Points A & B plotted! Ready for Level 2';
    }
    if (activeStep === 2) {
      return 'Enter Δx and Δy in the question card below';
    }
    if (activeStep === 3) {
      if (!hasPointC) return 'e.g. C = (x, y) or (x, y) — step from B';
      if (!hasPointD) return 'e.g. D = (x, y) or (x, y) — step from C';
      if (!hasPointE) return 'e.g. E = (x, y) or (x, y) — step from D';
      return 'Points C, D, E plotted!';
    }
    if (activeStep === 4) return 'Choose the pattern in the card below';
    if (activeStep === 5) return `e.g. Line(${ptA.name}, ${ptB.name})`;
    return 'e.g. (x, y) or Name = (x, y) or Line(A, B)';
  };

  // Manage canvas points on level navigation - never auto-plot any points at any level
  useEffect(() => {
    if (activeStep === 1) {
      // In level 1, only show points A and B if the learner put them
      setPlottedPoints((prev) => {
        if (prev.length <= 2) return prev;
        const p1 = prev.find((p) => p.name === 'A') || prev[0];
        const p2 = prev.find((p) => p.name === 'B') || prev[1];
        return [p1, p2].filter(Boolean);
      });
    } else if (activeStep === 6) {
      // Level 6: Equation y = ax + b and sliders; clear plotted points
      setPlottedPoints([]);
      setSliderA(2);
      setSliderB(0);
    }
  }, [activeStep]);

  const handlePointPlotted = (pt) => {
    setPlottedPoints((prev) => {
      const filtered = prev.filter((p) => p.name !== pt.name);
      return [...filtered, pt];
    });
  };

  const handleClearPoints = () => {
    setPlottedPoints([]);
  };

  const isQuestionComplete = (qId) => {
    const a = answers[qId];
    if (!a) return false;
    if (qId === 1) {
      return Boolean(a.isSubmitted || a.isCompleted || hasTwoPoints);
    }
    if (qId === 2) {
      return Boolean(a.isSubmitted || a.isCompleted);
    }
    if (qId === 3) {
      return Boolean(a.isSubmitted || a.isCompleted || (hasPointC && hasPointD && hasPointE));
    }
    if (qId === 4) {
      return Boolean(a.isSubmitted);
    }
    if (qId === 5) {
      return Boolean(a.isSubmitted || a.lineDrawn);
    }
    if (qId === 6) {
      return Boolean(a.isSubmitted);
    }
    return Boolean(a.isSubmitted);
  };

  const completedCount = Object.keys(answers).filter((id) => isQuestionComplete(Number(id))).length;

  const currentQ = LINE_PATH_QUESTIONS.find((q) => q.id === activeStep);

  // Active Phase calculation
  const getActivePhaseName = () => {
    if (activeStep <= 3) return 'Phase 1: Plotting & Stepping';
    if (activeStep <= 5) return 'Phase 2: Seeing & Drawing the Line';
    return 'Phase 3: The Equation of a Line';
  };

  // Q2 Step Verification
  const handleVerifyStepDelta = () => {
    const enteredDx = parseFloat(answers[2]?.deltaX);
    const enteredDy = parseFloat(answers[2]?.deltaY);

    if (isNaN(enteredDx) || isNaN(enteredDy)) {
      updateAnswer(2, { error: 'Please enter valid numerical values for both movement in X and shift in Y.' });
      return;
    }

    const isForward = Math.abs(enteredDx - dx) < 0.05 && Math.abs(enteredDy - dy) < 0.05;
    const isBackward = Math.abs(enteredDx - (-dx)) < 0.05 && Math.abs(enteredDy - (-dy)) < 0.05;

    if (isForward || isBackward) {
      updateAnswer(2, { isSubmitted: true, isCompleted: true, error: null });
    } else {
      updateAnswer(2, {
        error: `From point ${ptA.name}(${ptA.x}, ${ptA.y}) to ${ptB.name}(${ptB.x}, ${ptB.y}): change in x is ${ptB.x} - (${ptA.x}) = ${dx}, and shift in y is ${ptB.y} - (${ptA.y}) = ${dy}. Check your numbers!`
      });
    }
  };

  // Q5 Line Drawing Command
  const handleDrawLineCommand = () => {
    const val = (answers[5]?.lineInput || '').trim();
    const match = val.match(/^line\s*\(\s*([a-zA-Z]+)\s*,\s*([a-zA-Z]+)\s*\)$/i);
    if (match) {
      updateAnswer(5, { lineDrawn: true, isSubmitted: true, lineError: null });
    } else {
      updateAnswer(5, {
        lineError: `Strict syntax required: Use Line(${ptA.name}, ${ptB.name}) with parentheses and comma to join points.`
      });
    }
  };

  // ========================================================
  // RENDER: GRADUATION / FREE-PLAY LAB (Level 7)
  // ========================================================
  if (isFinished || activeStep === 7) {
    return (
      <div className="la-studio-wrapper">
        <div className="la-top-nav">
          {onBack && (
            <button className="la-back-btn" onClick={onBack}>
              ← Back to Dashboard
            </button>
          )}
          <span className="la-progress-badge">Graduation &amp; Free Play 🏆</span>
        </div>

        <div className="la-header">
          <span className="la-phase-pill">Destination Achieved</span>
          <h1 className="la-title">{CLUSTER_2_SUMMARY.title}</h1>
          <p className="la-subtitle">
            You walked the entire path from equal movement along points to mastering the algebraic shape of a line.
          </p>
        </div>

        {/* The Naming Handover */}
        <div className="line-handover-box">
          <span className="line-handover-badge">✨ THE NAMING HANDOVER</span>
          <blockquote className="line-handover-quote">
            "{CLUSTER_2_SUMMARY.namingHandover.quote}"
          </blockquote>
        </div>

        {/* Free-Play Graph Card */}
        <GeoGebraLineLab
          sliderA={sliderA}
          sliderB={sliderB}
          onSliderChange={(newA, newB) => {
            setSliderA(newA);
            setSliderB(newB);
          }}
          showParametricLine={true}
          interactiveSliders={true}
          onSliderInteracted={handleSliderInteracted}
        />

        {/* Memory & Intuition Challenges */}
        <div className="kp-card" style={{ marginTop: '0.5rem' }}>
          <div className="kp-card-header">
            <span className="kp-card-title">Memory &amp; Intuition Challenges</span>
            <span className="kp-badge">
              {completedChallenges.size} of {CLUSTER_2_SUMMARY.challenges.length} Solved
            </span>
          </div>

          <div className="line-challenges-grid">
            {CLUSTER_2_SUMMARY.challenges.map((ch) => {
              const isDone = completedChallenges.has(ch.id);
              return (
                <div key={ch.id} className={`line-challenge-card ${isDone ? 'completed' : ''}`}>
                  <div className="line-challenge-top">
                    <span className="line-challenge-title">{ch.title}</span>
                    {isDone && <span className="line-ch-badge">✓ Solved</span>}
                  </div>
                  <p className="line-challenge-desc">{ch.description}</p>
                  <button
                    className="line-ch-preset-btn"
                    onClick={() => {
                      setSliderA(ch.targetA);
                      setSliderB(ch.targetB);
                      setCompletedChallenges((prev) => new Set([...prev, ch.id]));
                      setFreePlayInteracted(true);
                    }}
                  >
                    Set Knobs to Target
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* What You Earned Checklist */}
        <div className="la-card">
          <div className="kp-card-header">
            <span className="kp-card-title">What You Earned Across the Journey</span>
          </div>
          <ul className="la-takeaways-list">
            {CLUSTER_2_SUMMARY.takeaways.map((item, idx) => (
              <li key={idx} className="la-takeaway-item">
                <span className="la-takeaway-check">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="la-credit-box" style={{ background: 'rgba(232, 134, 74, 0.1)', borderColor: 'rgba(232, 134, 74, 0.3)' }}>
          <span>⏭️ <strong>Path Forward:</strong> {CLUSTER_2_SUMMARY.nextCluster || 'Cluster 3: Functions & Transformations'}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            className="la-btn-primary large"
            onClick={onBack}
            disabled={!freePlayInteracted && completedChallenges.size === 0}
            title={!freePlayInteracted ? 'Move the sliders above to complete your journey' : 'Finish module'}
          >
            Complete Journey 🏆
          </button>
        </div>
      </div>
    );
  }

  // ========================================================
  // RENDER: STEPPER JOURNEY (Questions 1..6)
  // ========================================================
  return (
    <div className="la-studio-wrapper">
      {/* Top Nav */}
      <div className="la-top-nav">
        {onBack && (
          <button className="la-back-btn" onClick={onBack}>
            ← Dashboard
          </button>
        )}
        <span className="la-progress-badge">
          {`Question ${activeStep} of 6`}
        </span>
      </div>

      {/* Header */}
      <div className="la-header">
        <span className="la-phase-pill">{getActivePhaseName()}</span>
        <h1 className="la-title">{PATH_META.title}</h1>
        <p className="la-subtitle">
          {currentQ?.subtext || PATH_META.subtitle}
        </p>
      </div>

      {/* Stepper Bar */}
      <div className="la-stepper-bar">
        {LINE_PATH_QUESTIONS.map((q) => {
          const isDone = isQuestionComplete(q.id);
          const isActive = activeStep === q.id;
          return (
            <button
              key={q.id}
              className={`la-step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => setActiveStep(q.id)}
            >
              <span className="la-pill-num">{q.id}</span>
            </button>
          );
        })}
      </div>

      {/* Main Single Unified Card: Header + Graph at Top + Input Box + Question + Verification */}
      <div className="la-card">
        {/* Card Header */}
        <div className="la-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="la-question-badge">
              {`Q${currentQ?.id || activeStep}`}
            </span>
            <span className="la-topic-badge">
              {currentQ?.title || ''}
            </span>
          </div>
          <span className="la-question-num">
            {`Question ${activeStep} of 6`}
          </span>
        </div>

        {/* 1. GRAPH AT TOP & 2. INPUT BOX */}
        <GeoGebraLineLab
          sliderA={sliderA}
          sliderB={sliderB}
          onSliderChange={(newA, newB) => {
            setSliderA(newA);
            setSliderB(newB);
          }}
          plottedPoints={plottedPoints}
          onPointPlotted={handlePointPlotted}
          onClearPoints={handleClearPoints}
          onLineDrawn={handleLineDrawn}
          showLineAB={showLineAB}
          linePoint1Name={ptA.name}
          linePoint2Name={ptB.name}
          showOriginLines={showOriginLines}
          showParametricLine={showParametricLine}
          interactiveSliders={isSliderMode}
          onSliderInteracted={handleSliderInteracted}
          showInputBar={showGeoGebraInputBar}
          inputSubmitLabel={activeStep === 5 ? 'Draw Line 🚀' : 'Plot on Canvas 🚀'}
          inputPlaceholder={getInputPlaceholder()}
        />

        {/* 3. QUESTION TO BE ANSWERED */}
        <div className="la-step-intro-block" style={{ marginTop: '0.65rem' }}>
          <h3 className="la-step-heading">
            {getDynamicPrompt()}
          </h3>
          <p className="la-step-subtext">
            {getDynamicSubtext()}
          </p>
        </div>

        <div className="la-step-container">
          {/* =================================================== */}
          {/* QUESTION 1: PLOT ANY TWO POINTS                     */}
          {/* =================================================== */}
          {activeStep === 1 && (
            <div className="la-single-step-view">
              <div className="la-verification-bar">
                <div className="la-verification-group">
                  <span className="la-verification-label">Verification:</span>
                  <div className={`la-verification-chip ${hasPointA ? 'verified' : ''}`}>
                    <span>{hasPointA ? '✓' : '⏳'}</span>
                    <span>{userPtA ? `Point ${userPtA.name} (${userPtA.x}, ${userPtA.y})` : 'Point 1: Any (x, y)'}</span>
                  </div>
                  <div className={`la-verification-chip ${hasPointB ? 'verified' : ''}`}>
                    <span>{hasPointB ? '✓' : '⏳'}</span>
                    <span>{userPtB ? `Point ${userPtB.name} (${userPtB.x}, ${userPtB.y})` : 'Point 2: Any (x, y)'}</span>
                  </div>
                  {hasTwoPoints && (
                    <span className="la-verification-tag">✓ 2 Distinct Points Plotted</span>
                  )}
                </div>

                <div className="la-verification-actions">
                  <button
                    className="la-btn-primary"
                    disabled={!hasTwoPoints}
                    onClick={() => {
                      updateAnswer(1, { isSubmitted: true, isCompleted: true });
                      setActiveStep(2);
                    }}
                    style={{
                      padding: '0.45rem 1.15rem',
                      fontSize: '0.85rem',
                      opacity: hasTwoPoints ? 1 : 0.45,
                      cursor: hasTwoPoints ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Continue to Next Level →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 2: MEASURE MOVEMENT IN X AND SHIFT IN Y   */}
          {/* =================================================== */}
          {activeStep === 2 && (
            <div className="la-single-step-view">
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>📏 MEASURE THE STEP DELTA BETWEEN YOUR POINTS</span>
                  {answers[2]?.isSubmitted && <span className="la-credit-tag">✓ Step Verified</span>}
                </div>
                <p className="la-observation-desc">
                  Starting from your first point <strong>{ptA.name}({ptA.x}, {ptA.y})</strong> to your second point <strong>{ptB.name}({ptB.x}, {ptB.y})</strong>:
                </p>

                <div className="line-delta-inputs-grid">
                  <div className="line-delta-field">
                    <label className="line-delta-label">How much did you move in X (Δx = x₂ - x₁)?</label>
                    <input
                      type="number"
                      step="any"
                      className="la-text-input"
                      placeholder={`e.g. ${dx}`}
                      value={answers[2]?.deltaX || ''}
                      onChange={(e) => updateAnswer(2, { deltaX: e.target.value, error: null })}
                      disabled={answers[2]?.isSubmitted}
                    />
                  </div>
                  <div className="line-delta-field">
                    <label className="line-delta-label">How much shift happened in Y (Δy = y₂ - y₁)?</label>
                    <input
                      type="number"
                      step="any"
                      className="la-text-input"
                      placeholder={`e.g. ${dy}`}
                      value={answers[2]?.deltaY || ''}
                      onChange={(e) => updateAnswer(2, { deltaY: e.target.value, error: null })}
                      disabled={answers[2]?.isSubmitted}
                    />
                  </div>
                </div>

                {answers[2]?.error && (
                  <div style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: 500 }}>
                    {answers[2]?.error}
                  </div>
                )}

                {!answers[2]?.isSubmitted ? (
                  <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                    <button className="la-btn-secondary" onClick={() => setActiveStep(1)}>
                      ← Back to Level 1
                    </button>
                    <button
                      className="la-btn-primary"
                      disabled={answers[2]?.deltaX === '' || answers[2]?.deltaY === ''}
                      onClick={handleVerifyStepDelta}
                    >
                      Verify Movement Step ✓
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', fontSize: '0.82rem', color: '#6ee7b7' }}>
                      ✓ <strong>Step Confirmed:</strong> You moved <strong>{dx}</strong> in X, and shifted <strong>{dy}</strong> in Y!
                    </div>

                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">{currentQ.creditExplanation}</p>
                      <div className="la-step-footer-actions between" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-secondary" onClick={() => setActiveStep(1)}>
                          ← Back to Level 1
                        </button>
                        <button className="la-btn-primary" onClick={() => setActiveStep(3)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 3: MOVE IN SAME PATTERN 3 MORE TIMES      */}
          {/* =================================================== */}
          {activeStep === 3 && (
            <div className="la-single-step-view">
              <div className="la-verification-bar">
                <div className="la-verification-group">
                  <span className="la-verification-label">Verification:</span>
                  {!hasPointC && !hasPointD && !hasPointE && (
                    <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-soft, #a89e94)' }}>
                      ⏳ Plot points C, D, and E using your movement step (0 of 3 plotted)
                    </span>
                  )}
                  {hasPointC && (
                    <div className="la-verification-chip verified">
                      <span>✓</span>
                      <span>Point C ({targetC.x}, {targetC.y})</span>
                    </div>
                  )}
                  {hasPointD && (
                    <div className="la-verification-chip verified">
                      <span>✓</span>
                      <span>Point D ({targetD.x}, {targetD.y})</span>
                    </div>
                  )}
                  {hasPointE && (
                    <div className="la-verification-chip verified">
                      <span>✓</span>
                      <span>Point E ({targetE.x}, {targetE.y})</span>
                    </div>
                  )}
                  {hasPointC && hasPointD && hasPointE && (
                    <span className="la-verification-tag">✓ All 3 Plotted in Pattern!</span>
                  )}
                </div>

                <div className="la-verification-actions">
                  <button
                    className="la-btn-secondary"
                    onClick={() => setActiveStep(2)}
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                  >
                    ← Back
                  </button>
                  <button
                    className="la-btn-primary"
                    disabled={!(hasPointC && hasPointD && hasPointE)}
                    onClick={() => {
                      updateAnswer(3, { isSubmitted: true, isCompleted: true });
                      setActiveStep(4);
                    }}
                    style={{
                      padding: '0.45rem 1.15rem',
                      fontSize: '0.85rem',
                      opacity: (hasPointC && hasPointD && hasPointE) ? 1 : 0.45,
                      cursor: (hasPointC && hasPointD && hasPointE) ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Continue to Next Level →
                  </button>
                </div>
              </div>

              {hasPointC && hasPointD && hasPointE && (
                <div className="la-earns-card" style={{ marginTop: '0.75rem' }}>
                  <div className="la-earns-badge">🎉 LEVEL 3 COMPLETE (PHASE 1)</div>
                  <p className="la-earns-text">{currentQ.earns}</p>
                  <p className="la-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 4: GUESS THE VISIBLE PATTERN               */}
          {/* =================================================== */}
          {activeStep === 4 && (
            <div className="la-single-step-view">
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 GUESS THE VISIBLE GEOMETRIC PATTERN</span>
                  {answers[4]?.isSubmitted && <span className="la-credit-tag">✓ Pattern Identified</span>}
                </div>
                <p className="la-observation-desc">
                  Look at points <strong>{ptA.name}({ptA.x}, {ptA.y})</strong>, <strong>{ptB.name}({ptB.x}, {ptB.y})</strong>, <strong>C({targetC.x}, {targetC.y})</strong>, <strong>D({targetD.x}, {targetD.y})</strong>, and <strong>E({targetE.x}, {targetE.y})</strong> plotted on the canvas. What geometric pattern are they making?
                </p>

                <div className="la-options-stack" style={{ marginTop: '0.65rem' }}>
                  {(shuffledOptionsMap[4] || currentQ.options).map((opt, i) => {
                    const isSelected = answers[4]?.selectedId === opt.id;
                    const isSubmitted = answers[4]?.isSubmitted;
                    let cls = 'la-option-btn';
                    if (isSelected) cls += ' selected';
                    if (isSubmitted) {
                      if (opt.isCorrect) cls += ' correct';
                      else if (isSelected) cls += ' incorrect';
                    }

                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => {
                          if (!isSubmitted) updateAnswer(4, { selectedId: opt.id, error: null });
                        }}
                        disabled={isSubmitted}
                      >
                        <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {answers[4]?.error && !answers[4]?.isSubmitted && (
                  <div style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: 500 }}>
                    {answers[4]?.error}
                  </div>
                )}

                {!answers[4]?.isSubmitted ? (
                  <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                    <button className="la-btn-secondary" onClick={() => setActiveStep(3)}>
                      ← Back to Level 3
                    </button>
                    <button
                      className="la-btn-primary"
                      disabled={!answers[4]?.selectedId}
                      onClick={() => {
                        const opt = currentQ.options?.find((o) => o.id === answers[4]?.selectedId);
                        if (opt?.isCorrect) {
                          updateAnswer(4, { isSubmitted: true, error: null });
                        } else {
                          updateAnswer(4, { error: 'Look closely at the canvas: every point moved by the exact same step. They do not bend into a curve or scatter — they all form a straight line!' });
                        }
                      }}
                    >
                      Check Pattern
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">{currentQ.creditExplanation}</p>
                      <div className="la-step-footer-actions between" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-secondary" onClick={() => setActiveStep(3)}>
                          ← Back to Level 3
                        </button>
                        <button className="la-btn-primary" onClick={() => setActiveStep(5)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 5: DRAW THE PATTERN USING ITS NAME         */}
          {/* =================================================== */}
          {activeStep === 5 && (
            <div className="la-single-step-view">
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>📏 DRAW THE PATTERN: Line({ptA.name}, {ptB.name})</span>
                  {answers[5]?.lineDrawn && <span className="la-credit-tag">✓ Line Drawn</span>}
                </div>
                <p className="la-observation-desc">
                  You can draw that pattern using exactly the pattern name: in GeoGebra, type <code>Line({ptA.name}, {ptB.name})</code> into the input bar above to draw the line!
                </p>

                {!answers[5]?.lineDrawn ? (
                  <div style={{ marginTop: '0.65rem' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--clr-text-soft, #a89e94)' }}>
                      ⏳ Type <code>Line({ptA.name}, {ptB.name})</code> in the GeoGebra command input bar above and click Draw Line.
                    </span>
                    {answers[5]?.lineError && (
                      <div style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: 500 }}>
                        {answers[5]?.lineError}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', fontSize: '0.82rem', color: '#6ee7b7' }}>
                      ✓ <strong>Line Connected:</strong> The line passes through points {ptA.name} and {ptB.name}, and passes straight through C, D, and E as well!
                    </div>

                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 LEVEL 5 COMPLETE (PHASE 2)</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">{currentQ.creditExplanation}</p>
                      <div className="la-step-footer-actions between" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-secondary" onClick={() => setActiveStep(4)}>
                          ← Back to Level 4
                        </button>
                        <button className="la-btn-primary" onClick={() => setActiveStep(6)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 6: EXPLORE y = a·x + b AND OBSERVATION    */}
          {/* =================================================== */}
          {activeStep === 6 && (
            <div className="la-single-step-view">
              {/* Equation Display Banner */}
              <div className="line-equation-display">
                <span>
                  y = a · x + b &nbsp; ➔ &nbsp;{' '}
                  <strong style={{ color: '#fff' }}>
                    y = {sliderA === 1 ? '' : sliderA === -1 ? '-' : sliderA}x {sliderB > 0 ? `+ ${sliderB}` : sliderB < 0 ? `- ${Math.abs(sliderB)}` : ''}
                  </strong>
                </span>
              </div>

              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP &amp; SLIDER OBSERVATION</span>
                  {answers[6]?.isSubmitted && <span className="la-credit-tag">✓ Observation Saved</span>}
                </div>
                <p className="la-observation-desc">
                  Now let's explore something amazing: change sliders <strong>"a"</strong> and <strong>"b"</strong> directly above the canvas, watch how the line moves and tilts, and type your observation below:
                </p>

                {/* Quick exploration helper presets */}
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  <button className="la-choice-btn" onClick={() => { setSliderA(3); setSliderB(1); }}>
                    Try: a = 3, b = 1 (Steep)
                  </button>
                  <button className="la-choice-btn" onClick={() => { setSliderA(-2); setSliderB(0); }}>
                    Try: a = -2, b = 0 (Downward)
                  </button>
                  <button className="la-choice-btn" onClick={() => { setSliderA(0); setSliderB(3); }}>
                    Try: a = 0, b = 3 (Flat Horizontal)
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label className="line-delta-label">Type your observation of what "a" and "b" do:</label>
                  <textarea
                    className="line-observation-textarea"
                    placeholder="e.g. As I change 'a', the steepness and tilt of the line changes. When I change 'b', the line shifts up and down where it crosses the y-axis..."
                    value={answers[6]?.observation || ''}
                    onChange={(e) => updateAnswer(6, { observation: e.target.value })}
                    disabled={answers[6]?.isSubmitted}
                  />
                </div>

                {!answers[6]?.isSubmitted ? (
                  <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                    <button className="la-btn-secondary" onClick={() => setActiveStep(5)}>
                      ← Back to Level 5
                    </button>
                    <button
                      className="la-btn-primary"
                      disabled={!answers[6]?.observation?.trim()}
                      onClick={() => updateAnswer(6, { isSubmitted: true })}
                    >
                      Confirm Observation ✓
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 DISCOVERY COMPLETE (PHASE 3)</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">{currentQ.creditExplanation}</p>
                      <div className="la-step-footer-actions between" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-secondary" onClick={() => setActiveStep(5)}>
                          ← Back to Level 5
                        </button>
                        <button
                          className="la-btn-primary large"
                          onClick={() => setIsFinished(true)}
                        >
                          Enter The Naming Handover Ceremony 🏆
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="la-bottom-nav">
        <button
          className="la-nav-btn"
          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
          disabled={activeStep === 1}
        >
          ← Previous Step
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-soft, #a89e94)' }}>
          {PATH_META.title} ({completedCount} of 6 questions answered)
        </span>

        <button
          className="la-nav-btn"
          onClick={() => {
            if (activeStep < 6) {
              setActiveStep((prev) => prev + 1);
            } else {
              setIsFinished(true);
            }
          }}
          disabled={activeStep === 6 && !answers[6]?.isSubmitted}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
