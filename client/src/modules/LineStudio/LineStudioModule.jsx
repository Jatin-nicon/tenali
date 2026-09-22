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
  // activeStep: 1..11 are Questions 1..11; 12 is Graduation / Free Play
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

  // Shuffled options map for all MCQ questions
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState(() => initShuffledOptions());

  // Strict prediction error message in Q2
  const [predictError, setPredictError] = useState(null);

  // Hint toggle state
  const [showHint, setShowHint] = useState(false);
  const [showHintStep2, setShowHintStep2] = useState(false);

  // Observation state: tracks whether the learner has completed the observation for each question
  const [observedMap, setObservedMap] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false
  });

  // Question Answers State for Questions 1..11
  const [answers, setAnswers] = useState({
    1: { isCompleted: false },
    2: { relSelectedId: null, relSubmitted: false, relError: null, text: '', morePlotted: false, isSubmitted: false },
    3: { selectedId: null, isSubmitted: false },
    4: { stepVal: '', selectedId: null, isSubmitted: false },
    5: { selectedId: null, isSubmitted: false },
    6: { selectedId: null, isSubmitted: false },
    7: { selectedId: null, isSubmitted: false },
    8: { selectedId: null, isSubmitted: false },
    9: { check0: '', check5: '', checkNeg2: '', selectedId: null, isSubmitted: false },
    10: { selectedId: null, isSubmitted: false },
    11: { selectedId: null, isSubmitted: false }
  });

  const updateAnswer = (qId, updates) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], ...updates }
    }));
  };

  const markObserved = (qId) => {
    setObservedMap((prev) => ({
      ...prev,
      [qId]: true
    }));
  };

  // Re-shuffle unsubmitted MCQs when entering
  useEffect(() => {
    if (activeStep >= 1 && activeStep <= 11) {
      const q = LINE_PATH_QUESTIONS.find((item) => item.id === activeStep);
      if (q && q.options && !answers[activeStep]?.isSubmitted && !answers[activeStep]?.relSubmitted) {
        setShuffledOptionsMap((prev) => ({
          ...prev,
          [activeStep]: shuffleArray(q.options)
        }));
      }
    }
  }, [activeStep]);

  // Handle slider interaction in Question 7..11 or Free Play
  const handleSliderInteracted = (knob, val) => {
    if (activeStep === 12 || isFinished) {
      setFreePlayInteracted(true);
      // Check challenges
      CLUSTER_2_SUMMARY.challenges.forEach((ch) => {
        if (ch.targetA === (knob === 'a' ? val : sliderA) && ch.targetB === (knob === 'b' ? val : sliderB)) {
          setCompletedChallenges((prev) => new Set([...prev, ch.id]));
        }
      });
    }
  };

  // Mode conditions: Questions 7..11 are slider mode
  const isSliderMode = activeStep >= 7;
  const showLineAB = activeStep === 5;
  const showOriginLines = activeStep === 6;
  const showParametricLine = activeStep >= 7;

  // Live point presence flags based on user typing
  const hasPointA = plottedPoints.some((p) => p.x === 1 && p.y === 2);
  const hasPointB = plottedPoints.some((p) => p.x === 2 && p.y === 4);
  const hasPointC = plottedPoints.some((p) => p.x === 3 && p.y === 6);
  const hasPointD = plottedPoints.some((p) => p.x === 4 && p.y === 8);
  const hasPointE = plottedPoints.some((p) => p.x === 5 && p.y === 10);
  const hasPointF = plottedPoints.some((p) => p.x === 6 && p.y === 12);

  // Dynamic input placeholder to guide user typing
  const getInputPlaceholder = () => {
    if (activeStep === 1) {
      if (!hasPointA) return 'e.g. A = (x, y) or (x, y)';
      if (!hasPointB) return 'e.g. B = (x, y) or (x, y)';
      return 'Points A & B plotted! Answer the question below';
    }
    if (activeStep === 2) {
      if (!hasPointC) return 'Enter prediction e.g. C = (x, y)';
      if (!hasPointD || !hasPointE || !hasPointF) return 'e.g. Name = (x, y) or (x, y)';
      return 'Points plotted! Click Confirm below';
    }
    if (activeStep === 5) return 'e.g. Line(Point1, Point2)';
    return 'e.g. (x, y) or Name = (x, y) or Line(A, B)';
  };

  // Auto-populate points depending on active question
  useEffect(() => {
    setShowHint(false);
    setShowHintStep2(false);
    if (activeStep === 1) {
      // In level 1, user must type to plot A and B
    } else if (activeStep === 2) {
      setPlottedPoints((prev) => {
        const hasA = prev.some((p) => p.x === 1 && p.y === 2);
        const hasB = prev.some((p) => p.x === 2 && p.y === 4);
        const pts = [...prev];
        if (!hasA) pts.push({ name: 'A', x: 1, y: 2 });
        if (!hasB) pts.push({ name: 'B', x: 2, y: 4 });
        return pts;
      });
    } else if (activeStep >= 3 && activeStep <= 5) {
      setPlottedPoints([
        { name: 'A', x: 1, y: 2 },
        { name: 'B', x: 2, y: 4 },
        { name: 'C', x: 3, y: 6 },
        { name: 'D', x: 4, y: 8 },
        { name: 'E', x: 5, y: 10 },
        { name: 'F', x: 6, y: 12 }
      ]);
    } else if (activeStep === 6) {
      setPlottedPoints([]);
    } else if (activeStep === 7) {
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
      return Boolean(a.isSubmitted || a.isCompleted || (hasPointA && hasPointB));
    }
    return Boolean(a.isSubmitted);
  };

  const completedCount = Object.keys(answers).filter((id) => isQuestionComplete(Number(id))).length;

  const currentQ = LINE_PATH_QUESTIONS.find((q) => q.id === activeStep);

  // Active Phase calculation
  const getActivePhaseName = () => {
    if (activeStep <= 3) return 'Phase 1: Plotting Points on a Pattern';
    if (activeStep <= 5) return 'Phase 2: Seeing the Line';
    if (activeStep <= 7) return 'Phase 3: From Family to Form';
    return 'Phase 4: The Two Knobs';
  };

  // ========================================================
  // RENDER: GRADUATION / FREE-PLAY LAB (Level 12)
  // ========================================================
  if (isFinished || activeStep === 12) {
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
          <span>⏭️ <strong>Path Forward:</strong> {CLUSTER_2_SUMMARY.nextCluster}</span>
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
  // RENDER: STEPPER JOURNEY (Questions 1..11)
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
          {`Question ${activeStep} of 11`}
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

      {/* Unified Stepper Bar */}
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

      {/* Main Single Unified Card: Header + Prompt + GeoGebra Lab + Interaction */}
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
            {`Question ${activeStep} of 11`}
          </span>
        </div>

        {/* Step Intro: Prompt & Subtext */}
        <div className="la-step-intro-block">
          <h3 className="la-step-heading">
            {currentQ?.prompt}
          </h3>
          <p className="la-step-subtext">
            {currentQ?.subtext}
          </p>
        </div>

        {/* GeoGebra 2D Cartesian Graph & Sliders/Controls (Integrated Lab) */}
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
          showLineAB={showLineAB}
          showOriginLines={showOriginLines}
          showParametricLine={showParametricLine}
          interactiveSliders={isSliderMode}
          onSliderInteracted={handleSliderInteracted}
          showInputBar={!isSliderMode}
          inputPlaceholder={getInputPlaceholder()}
        />

        <div className="la-step-container">
          {/* =================================================== */}
          {/* QUESTION 1: PLOT TWO POINTS                         */}
          {/* =================================================== */}
          {activeStep === 1 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — TYPE TO PLOT POINTS A AND B</span>
                  {hasPointA && hasPointB && <span className="la-credit-tag">✓ Both Points Plotted</span>}
                </div>
                <p className="la-observation-desc">
                  Plot point <strong>A</strong> at (1, 2) and point <strong>B</strong> at (2, 4) on the canvas using the GeoGebra input bar above.
                </p>

                {/* Hint Button */}
                <div style={{ marginTop: '0.35rem', marginBottom: '0.55rem' }}>
                  <button
                    type="button"
                    className="la-hint-btn"
                    onClick={() => setShowHint((prev) => !prev)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'rgba(232, 134, 74, 0.12)',
                      border: '1px solid rgba(232, 134, 74, 0.3)',
                      color: 'var(--clr-accent, #e8864a)',
                      borderRadius: '9999px',
                      padding: '0.28rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    💡 {showHint ? 'Hide Hint' : 'Hint'}
                  </button>

                  {showHint && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.65rem 0.85rem',
                        background: 'rgba(245, 158, 11, 0.08)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        color: 'var(--clr-text, #ede8e3)',
                        lineHeight: 1.45
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: 500 }}>
                        Type the coordinates of two points into the <strong>GeoGebra Command / Coordinate Input</strong> bar above and click <strong>Plot on Canvas 🚀</strong>:
                      </p>
                      <ul style={{ margin: '0.35rem 0 0 1.2rem', padding: 0 }}>
                        <li>Type <code>A = (1, 2)</code> (or <code>(1, 2)</code>)</li>
                        <li>Type <code>B = (2, 4)</code> (or <code>(2, 4)</code>)</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Status chips indicating what user has typed */}
                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      background: hasPointA ? 'rgba(16, 185, 129, 0.15)' : 'var(--clr-surface, #2c2622)',
                      border: `1px solid ${hasPointA ? '#10b981' : 'var(--clr-border, rgba(255, 245, 230, 0.15))'}`,
                      color: hasPointA ? '#6ee7b7' : 'var(--clr-text-soft, #a89e94)'
                    }}
                  >
                    <span>{hasPointA ? '✓' : '⏳'}</span>
                    <span>Point A (1, 2): {hasPointA ? 'Plotted on Canvas' : 'Waiting for input'}</span>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      background: hasPointB ? 'rgba(16, 185, 129, 0.15)' : 'var(--clr-surface, #2c2622)',
                      border: `1px solid ${hasPointB ? '#10b981' : 'var(--clr-border, rgba(255, 245, 230, 0.15))'}`,
                      color: hasPointB ? '#6ee7b7' : 'var(--clr-text-soft, #a89e94)'
                    }}
                  >
                    <span>{hasPointB ? '✓' : '⏳'}</span>
                    <span>Point B (2, 4): {hasPointB ? 'Plotted on Canvas' : 'Waiting for input'}</span>
                  </div>
                </div>

                {hasPointA && hasPointB ? (
                  <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                    <div className="la-earns-badge">🎉 LEVEL 1 COMPLETE</div>
                    <p className="la-earns-text">Point A at (1, 2) and Point B at (2, 4) are plotted on the canvas!</p>
                    <p className="la-earns-sub">
                      You have successfully placed both points on the coordinate grid. Continue to the next level to observe their relationship and find the pattern.
                    </p>
                    <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                      <button
                        className="la-btn-primary"
                        onClick={() => {
                          updateAnswer(1, { isSubmitted: true, isCompleted: true });
                          setActiveStep(2);
                        }}
                      >
                        Continue to Next Level →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.82rem', color: 'var(--clr-text-soft, #a89e94)', marginTop: '0.35rem' }}>
                    Type both coordinates into the input bar above using strict syntax to proceed to the next level.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 2: PREDICT & PLOT MORE POINTS              */}
          {/* =================================================== */}
          {activeStep === 2 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section: Observe Relationship Between A and B */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — OBSERVE THE RELATIONSHIP BETWEEN A AND B</span>
                  {answers[2]?.relSubmitted && <span className="la-credit-tag">✓ Observation Verified</span>}
                </div>
                <p className="la-observation-desc">
                  Look at points <strong>A(1, 2)</strong> and <strong>B(2, 4)</strong> on the canvas. Which statement best describes how point B sits relative to point A?
                </p>

                <div className="la-options-stack" style={{ marginTop: '0.65rem' }}>
                  {(shuffledOptionsMap[2] || currentQ.options).map((opt, i) => {
                    const isSelected = answers[2]?.relSelectedId === opt.id;
                    const isSubmitted = answers[2]?.relSubmitted;
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
                          if (!isSubmitted) updateAnswer(2, { relSelectedId: opt.id, relError: null });
                        }}
                        disabled={isSubmitted}
                      >
                        <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {!answers[2]?.relSubmitted ? (
                  <div className="la-step-footer-actions end" style={{ marginTop: '0.85rem' }}>
                    <button
                      className="la-btn-primary"
                      disabled={!answers[2]?.relSelectedId}
                      onClick={() => {
                        const opt = currentQ.options?.find((o) => o.id === answers[2]?.relSelectedId);
                        if (opt?.isCorrect) {
                          updateAnswer(2, { relSubmitted: true, relError: null });
                        } else {
                          updateAnswer(2, { relError: 'Check the grid: point B has a greater x (further right) and greater y (higher up) than point A.' });
                        }
                      }}
                    >
                      Check Observation
                    </button>
                  </div>
                ) : (
                  <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', fontSize: '0.82rem', color: '#6ee7b7' }}>
                    ✓ <strong>Observed Rhythm:</strong> Point B sits upper-right of Point A: x grew from 1 to 2 (+1), and y grew from 2 to 4 (+2).
                  </div>
                )}

                {answers[2]?.relError && !answers[2]?.relSubmitted && (
                  <div style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: 500 }}>
                    {answers[2]?.relError}
                  </div>
                )}
              </div>

              {/* 2. Prediction Section (Unlocked after Step 1 is verified) */}
              {answers[2]?.relSubmitted && (
                <div className="la-observation-box" style={{ marginTop: '0.85rem' }}>
                  <div className="la-observation-header">
                    <span>🔮 STEP 2 — PREDICT POINT C</span>
                    {(observedMap[2] || hasPointC) && <span className="la-credit-tag">✓ Point C Plotted</span>}
                  </div>
                  <p className="la-observation-desc">
                    From A(1, 2) to B(2, 4), x grew by <strong>1</strong> (+1) and y grew by <strong>2</strong> (+2). If this rhythm keeps going from B(2, 4), what would point <strong>C</strong> be?
                  </p>

                  {!(observedMap[2] || hasPointC) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.65rem' }}>
                        <input
                          type="text"
                          className="la-text-input"
                          placeholder="Strict syntax e.g. (x, y) or C = (x, y)"
                          value={answers[2]?.text || ''}
                          onChange={(e) => {
                            updateAnswer(2, { text: e.target.value });
                            if (predictError) setPredictError(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = answers[2]?.text?.trim() || '';
                              if (/^(?:C\s*=\s*)?\(\s*3\s*,\s*6\s*\)$/i.test(val)) {
                                setPredictError(null);
                                handlePointPlotted({ name: 'C', x: 3, y: 6 });
                                markObserved(2);
                              } else if (!val.includes('(') || !val.includes(')')) {
                                setPredictError('Strict syntax error: Coordinates must be enclosed in parentheses, e.g. (x, y) or C = (x, y).');
                              } else if (!val.includes(',')) {
                                setPredictError('Strict syntax error: Coordinates must be separated by a comma, e.g. (x, y).');
                              } else {
                                setPredictError('Check the rhythm: x += 1 and y += 2 from point B(2, 4). Strict syntax: (x, y) or C = (x, y).');
                              }
                            }
                          }}
                        />
                        <button
                          className="la-btn-primary"
                          disabled={!answers[2]?.text?.trim()}
                          onClick={() => {
                            const val = answers[2]?.text?.trim() || '';
                            if (/^(?:C\s*=\s*)?\(\s*3\s*,\s*6\s*\)$/i.test(val)) {
                              setPredictError(null);
                              handlePointPlotted({ name: 'C', x: 3, y: 6 });
                              markObserved(2);
                            } else if (!val.includes('(') || !val.includes(')')) {
                              setPredictError('Strict syntax error: Coordinates must be enclosed in parentheses, e.g. (x, y) or C = (x, y).');
                            } else if (!val.includes(',')) {
                              setPredictError('Strict syntax error: Coordinates must be separated by a comma, e.g. (x, y).');
                            } else {
                              setPredictError('Check the rhythm: x += 1 and y += 2 from point B(2, 4). Strict syntax: (x, y) or C = (x, y).');
                            }
                          }}
                        >
                          Verify &amp; Plot C ✓
                        </button>
                      </div>
                      {predictError && (
                        <div style={{ color: '#f87171', fontSize: '0.82rem', fontWeight: 500 }}>
                          {predictError}
                        </div>
                      )}
                      <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-soft, #a89e94)' }}>
                        You can also type your prediction directly in the GeoGebra input bar above.
                      </span>
                    </div>
                  ) : (
                    <span className="la-observation-unlocked-msg">
                      ✓ Point C = (3, 6) predicted and plotted! Now type to plot the remaining points:
                    </span>
                  )}
                </div>
              )}

              {/* 3. Plot More Points Section (Unlocked after C is predicted/plotted) */}
              {(observedMap[2] || hasPointC) && (
                <div className="la-observation-box" style={{ marginTop: '0.85rem' }}>
                  <div className="la-observation-header">
                    <span>📍 STEP 3 — TYPE TO PLOT POINTS D, E, AND F</span>
                    {hasPointD && hasPointE && hasPointF && <span className="la-credit-tag">✓ Points Plotted</span>}
                  </div>
                  <p className="la-observation-desc">
                    Continue the same rhythm (+1 in x, +2 in y). Use the <strong>GeoGebra Command / Coordinate Input</strong> bar above to type and plot points <strong>D</strong>, <strong>E</strong>, and <strong>F</strong> on the canvas.
                  </p>

                  {/* Hint Button */}
                  <div style={{ marginTop: '0.35rem', marginBottom: '0.55rem' }}>
                    <button
                      type="button"
                      className="la-hint-btn"
                      onClick={() => setShowHintStep2((prev) => !prev)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: 'rgba(232, 134, 74, 0.12)',
                        border: '1px solid rgba(232, 134, 74, 0.3)',
                        color: 'var(--clr-accent, #e8864a)',
                        borderRadius: '9999px',
                        padding: '0.28rem 0.75rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      💡 {showHintStep2 ? 'Hide Hint' : 'Hint'}
                    </button>

                    {showHintStep2 && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          padding: '0.65rem 0.85rem',
                          background: 'rgba(245, 158, 11, 0.08)',
                          border: '1px solid rgba(245, 158, 11, 0.25)',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          color: 'var(--clr-text, #ede8e3)',
                          lineHeight: 1.45
                        }}
                      >
                        <p style={{ margin: 0, fontWeight: 500 }}>
                          Type each coordinate into the <strong>GeoGebra Command / Coordinate Input</strong> bar above and click <strong>Plot on Canvas 🚀</strong>:
                        </p>
                        <ul style={{ margin: '0.35rem 0 0 1.2rem', padding: 0 }}>
                          <li>Type <code>D = (4, 8)</code> (or <code>(4, 8)</code>)</li>
                          <li>Type <code>E = (5, 10)</code> (or <code>(5, 10)</code>)</li>
                          <li>Type <code>F = (6, 12)</code> (or <code>(6, 12)</code>)</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Status chips for D, E, F */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        background: hasPointD ? 'rgba(16, 185, 129, 0.15)' : 'var(--clr-surface, #2c2622)',
                        border: `1px solid ${hasPointD ? '#10b981' : 'var(--clr-border, rgba(255, 245, 230, 0.15))'}`,
                        color: hasPointD ? '#6ee7b7' : 'var(--clr-text-soft, #a89e94)'
                      }}
                    >
                      <span>{hasPointD ? '✓' : '⏳'}</span>
                      <span>Point D (4, 8): {hasPointD ? 'Plotted' : 'Waiting for input'}</span>
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        background: hasPointE ? 'rgba(16, 185, 129, 0.15)' : 'var(--clr-surface, #2c2622)',
                        border: `1px solid ${hasPointE ? '#10b981' : 'var(--clr-border, rgba(255, 245, 230, 0.15))'}`,
                        color: hasPointE ? '#6ee7b7' : 'var(--clr-text-soft, #a89e94)'
                      }}
                    >
                      <span>{hasPointE ? '✓' : '⏳'}</span>
                      <span>Point E (5, 10): {hasPointE ? 'Plotted' : 'Waiting for input'}</span>
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        background: hasPointF ? 'rgba(16, 185, 129, 0.15)' : 'var(--clr-surface, #2c2622)',
                        border: `1px solid ${hasPointF ? '#10b981' : 'var(--clr-border, rgba(255, 245, 230, 0.15))'}`,
                        color: hasPointF ? '#6ee7b7' : 'var(--clr-text-soft, #a89e94)'
                      }}
                    >
                      <span>{hasPointF ? '✓' : '⏳'}</span>
                      <span>Point F (6, 12): {hasPointF ? 'Plotted' : 'Waiting for input'}</span>
                    </div>
                  </div>

                  {!answers[2]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(1)}>
                        ← Back to Level 1
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!hasPointD || !hasPointE || !hasPointF}
                        onClick={() => {
                          updateAnswer(2, { morePlotted: true, isSubmitted: true });
                        }}
                      >
                        Confirm Plotted Points ✓
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(3)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 3: ARRANGEMENT ON THE CANVAS               */}
          {/* =================================================== */}
          {activeStep === 3 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — OBSERVING ALL SIX POINTS</span>
                  {observedMap[3] && <span className="la-credit-tag">✓ Observed</span>}
                </div>
                <p className="la-observation-desc">
                  Look at the canvas: Points <strong>A(1, 2)</strong>, <strong>B(2, 4)</strong>, <strong>C(3, 6)</strong>, <strong>D(4, 8)</strong>, <strong>E(5, 10)</strong>, and <strong>F(6, 12)</strong> are now all plotted! Look at how they sit relative to one another.
                </p>
                {!observedMap[3] ? (
                  <button
                    className="la-choice-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => markObserved(3)}
                  >
                    I have observed all six points A through F on the canvas ✓
                  </button>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Observation confirmed. How are they arranged?
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[3] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[3] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[3]?.selectedId === opt.id;
                      const isSubmitted = answers[3]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(3, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[3]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(2)}>
                        ← Back to Q2
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[3]?.selectedId}
                        onClick={() => updateAnswer(3, { isSubmitted: true })}
                      >
                        Confirm Arrangement
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT (PHASE 1)</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(4)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 4: WHY DO THEY LINE UP?                    */}
          {/* =================================================== */}
          {activeStep === 4 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — MEASURE THE STEP DELTA</span>
                  {observedMap[4] && <span className="la-credit-tag">✓ Delta Confirmed</span>}
                </div>
                <p className="la-observation-desc">
                  Pick any adjacent pair (e.g., A to B, or D to E). By how much does x grow? By how much does y grow?
                </p>
                {!observedMap[4] ? (
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="la-text-input"
                      placeholder="e.g. Δx, Δy"
                      value={answers[4]?.stepVal || ''}
                      onChange={(e) => updateAnswer(4, { stepVal: e.target.value })}
                    />
                    <button
                      className="la-btn-primary"
                      disabled={!answers[4]?.stepVal?.trim()}
                      onClick={() => markObserved(4)}
                    >
                      Confirm Step ✓
                    </button>
                  </div>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Step verified ({answers[4]?.stepVal})! Now choose why they line up:
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[4] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
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
                            if (!isSubmitted) updateAnswer(4, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[4]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(3)}>
                        ← Back to Q3
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[4]?.selectedId}
                        onClick={() => updateAnswer(4, { isSubmitted: true })}
                      >
                        Check Explanation
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(5)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 5: CONNECT THEM WITH A LINE                */}
          {/* =================================================== */}
          {activeStep === 5 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — CONNECTING A AND B</span>
                  {observedMap[5] && <span className="la-credit-tag">✓ Line Observed</span>}
                </div>
                <p className="la-observation-desc">
                  Look at the teal line drawn through A and B on the canvas above. Look closely: Does this line pass through points C, D, E, and F too?
                </p>
                {!observedMap[5] ? (
                  <button
                    className="la-choice-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => markObserved(5)}
                  >
                    Yes, I see the line passes through all points C, D, E, F ✓
                  </button>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Line confirmed! Which best describes why?
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[5] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[5] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[5]?.selectedId === opt.id;
                      const isSubmitted = answers[5]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(5, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[5]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(4)}>
                        ← Back to Q4
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[5]?.selectedId}
                        onClick={() => updateAnswer(5, { isSubmitted: true })}
                      >
                        Check Relationship
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT (PHASE 2)</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(6)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 6: THREE LINES THROUGH ORIGIN              */}
          {/* =================================================== */}
          {activeStep === 6 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — OBSERVING THREE LINES</span>
                  {observedMap[6] && <span className="la-credit-tag">✓ Observed</span>}
                </div>
                <p className="la-observation-desc">
                  Look at the three lines plotted together on the canvas: Blue (y = x), Orange (y = 2x), and Purple (y = 10x). Where do they all intersect?
                </p>
                {!observedMap[6] ? (
                  <button
                    className="la-choice-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => markObserved(6)}
                  >
                    I have observed all three lines meeting at (0, 0) ✓
                  </button>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Intersection observed! What do they all share?
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[6] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[6] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[6]?.selectedId === opt.id;
                      const isSubmitted = answers[6]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(6, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[6]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(5)}>
                        ← Back to Q5
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[6]?.selectedId}
                        onClick={() => updateAnswer(6, { isSubmitted: true })}
                      >
                        Check Common Property
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(7)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 7: MEET THE TWO KNOBS y = a*x + b         */}
          {/* =================================================== */}
          {activeStep === 7 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — SET a = 2 AND b = 0</span>
                  {observedMap[7] && <span className="la-credit-tag">✓ Knobs Set</span>}
                </div>
                <p className="la-observation-desc">
                  Use the knobs below: Set <strong>a = 2</strong> and <strong>b = 0</strong>. Compare this line to y = 2·x from Level 6.
                </p>
                {!observedMap[7] ? (
                  <button
                    className="la-choice-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => {
                      setSliderA(2);
                      setSliderB(0);
                      markObserved(7);
                    }}
                  >
                    I have set a = 2, b = 0 on the canvas ✓
                  </button>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Values set (y = 2x)! Now compare them:
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[7] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[7] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[7]?.selectedId === opt.id;
                      const isSubmitted = answers[7]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(7, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[7]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(6)}>
                        ← Back to Q6
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[7]?.selectedId}
                        onClick={() => updateAnswer(7, { isSubmitted: true })}
                      >
                        Confirm Comparison
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT (PHASE 3)</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(8)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 8: MOVE A ONLY                             */}
          {/* =================================================== */}
          {activeStep === 8 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — TEST THREE VALUES OF a</span>
                  {observedMap[8] && <span className="la-credit-tag">✓ Tested</span>}
                </div>
                <p className="la-observation-desc">
                  Keep b = 0. Move slider a to <strong>3</strong> (steeper), then <strong>-1</strong> (downward), then <strong>0</strong> (horizontal line).
                </p>
                {!observedMap[8] ? (
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <button className="la-choice-btn" onClick={() => setSliderA(3)}>Set a = 3</button>
                    <button className="la-choice-btn" onClick={() => setSliderA(-1)}>Set a = -1</button>
                    <button className="la-choice-btn" onClick={() => setSliderA(0)}>Set a = 0</button>
                    <button
                      className="la-choice-btn"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981', color: '#6ee7b7' }}
                      onClick={() => markObserved(8)}
                    >
                      I have tested all 3 values of a ✓
                    </button>
                  </div>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Values tested! In one phrase, what does knob a control?
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[8] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[8] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[8]?.selectedId === opt.id;
                      const isSubmitted = answers[8]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(8, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[8]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(7)}>
                        ← Back to Q7
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[8]?.selectedId}
                        onClick={() => updateAnswer(8, { isSubmitted: true })}
                      >
                        Confirm Knob a's Role
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(9)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 9: MOVE B ONLY                             */}
          {/* =================================================== */}
          {activeStep === 9 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — ENTER Y-CROSSING VALUES</span>
                  {observedMap[9] && <span className="la-credit-tag">✓ Values Entered</span>}
                </div>
                <div className="line-checks-grid">
                  <div>
                    <label className="line-checks-label">When b = 0, y-crossing is:</label>
                    <input
                      type="text"
                      className="la-text-input"
                      placeholder="e.g. y-val"
                      value={answers[9]?.check0 || ''}
                      onChange={(e) => updateAnswer(9, { check0: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="line-checks-label">When b = 5, y-crossing is:</label>
                    <input
                      type="text"
                      className="la-text-input"
                      placeholder="e.g. y-val"
                      value={answers[9]?.check5 || ''}
                      onChange={(e) => updateAnswer(9, { check5: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="line-checks-label">When b = -2, y-crossing is:</label>
                    <input
                      type="text"
                      className="la-text-input"
                      placeholder="e.g. y-val"
                      value={answers[9]?.checkNeg2 || ''}
                      onChange={(e) => updateAnswer(9, { checkNeg2: e.target.value })}
                    />
                  </div>
                </div>

                {!observedMap[9] ? (
                  <div style={{ marginTop: '0.65rem' }}>
                    <button
                      className="la-btn-primary"
                      disabled={!answers[9]?.check0?.trim() || !answers[9]?.check5?.trim() || !answers[9]?.checkNeg2?.trim()}
                      onClick={() => markObserved(9)}
                    >
                      Confirm y-Crossing Values ✓
                    </button>
                  </div>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Values confirmed! In one phrase, what does knob b control?
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[9] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[9] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[9]?.selectedId === opt.id;
                      const isSubmitted = answers[9]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(9, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[9]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(8)}>
                        ← Back to Q8
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[9]?.selectedId}
                        onClick={() => updateAnswer(9, { isSubmitted: true })}
                      >
                        Confirm Knob b's Role
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(10)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 10: VERIFY ON THE CANVAS                   */}
          {/* =================================================== */}
          {activeStep === 10 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — PLUG IN POINTS TO VERIFY</span>
                  {observedMap[10] && <span className="la-credit-tag">✓ Verified</span>}
                </div>
                <p className="la-observation-desc">
                  Choose any point on your line (e.g. at x = 1, y = {sliderA} · (1) + {sliderB} = {sliderA * 1 + sliderB}). Notice how computing a·x + b always gives exactly y!
                </p>
                {!observedMap[10] ? (
                  <button
                    className="la-choice-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => markObserved(10)}
                  >
                    I have verified that points on the line obey a·x + b = y ✓
                  </button>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Law verified! Does the rule hold for all points on the line?
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[10] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[10] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[10]?.selectedId === opt.id;
                      const isSubmitted = answers[10]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(10, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[10]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(9)}>
                        ← Back to Q9
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[10]?.selectedId}
                        onClick={() => updateAnswer(10, { isSubmitted: true })}
                      >
                        Confirm Law of the Line
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 EARNED INSIGHT</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setActiveStep(11)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 11: WHAT TWO NUMBERS?                      */}
          {/* =================================================== */}
          {activeStep === 11 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — FINAL SYNTHESIS</span>
                  {observedMap[11] && <span className="la-credit-tag">✓ Ready</span>}
                </div>
                <p className="la-observation-desc">
                  Reflect on everything you have discovered across the family y = a·x + b. What decides the tilt? What decides the position?
                </p>
                {!observedMap[11] ? (
                  <button
                    className="la-choice-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => markObserved(11)}
                  >
                    I am ready for the final conclusion ✓
                  </button>
                ) : (
                  <span className="la-observation-unlocked-msg">
                    ✓ Ready! What two numbers decide everything?
                  </span>
                )}
              </div>

              {/* 2. Solve Question Section */}
              {observedMap[11] && (
                <div style={{ marginTop: '0.85rem' }}>
                  <div className="la-options-stack">
                    {(shuffledOptionsMap[11] || currentQ.options).map((opt, i) => {
                      const isSelected = answers[11]?.selectedId === opt.id;
                      const isSubmitted = answers[11]?.isSubmitted;
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
                            if (!isSubmitted) updateAnswer(11, { selectedId: opt.id });
                          }}
                          disabled={isSubmitted}
                        >
                          <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!answers[11]?.isSubmitted ? (
                    <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                      <button className="la-btn-secondary" onClick={() => setActiveStep(10)}>
                        ← Back to Q10
                      </button>
                      <button
                        className="la-btn-primary"
                        disabled={!answers[11]?.selectedId}
                        onClick={() => updateAnswer(11, { isSubmitted: true })}
                      >
                        Lock in Final Observation
                      </button>
                    </div>
                  ) : (
                    <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                      <div className="la-earns-badge">🎉 DISCOVERY JOURNEY COMPLETE</div>
                      <p className="la-earns-text">{currentQ.earns}</p>
                      <p className="la-earns-sub">
                        {currentQ.creditExplanation}
                      </p>
                      <div className="la-step-footer-actions end" style={{ marginTop: '0.75rem' }}>
                        <button className="la-btn-primary" onClick={() => setIsFinished(true)}>
                          Continue to Next Level →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
          {PATH_META.title} ({completedCount} of 11 questions answered)
        </span>

        <button
          className="la-nav-btn"
          onClick={() => {
            if (activeStep < 11) {
              setActiveStep((prev) => prev + 1);
            } else {
              setIsFinished(true);
            }
          }}
          disabled={activeStep === 11 && !answers[11]?.isSubmitted}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
