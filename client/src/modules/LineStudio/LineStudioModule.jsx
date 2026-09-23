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
    1: { isSubmitted: false, isCompleted: false },
    2: { isSubmitted: false, isCompleted: false },
    3: { patternSelectedId: null, patternSubmitted: false, patternError: null, lineDrawn: false, lineInput: '', lineError: null, isSubmitted: false },
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
      if (q && q.options && !answers[activeStep]?.isSubmitted && !answers[activeStep]?.patternSubmitted) {
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
  const showLineAB = (activeStep === 4 || activeStep === 5) || (activeStep === 3 && answers[3]?.lineDrawn);
  const showOriginLines = activeStep === 6;
  const showParametricLine = activeStep >= 7;

  // Live point presence flags based on user typing
  const hasPointA = plottedPoints.some((p) => p.x === 1 && p.y === 2);
  const hasPointB = plottedPoints.some((p) => p.x === 2 && p.y === 4);
  const hasPointC = plottedPoints.some((p) => p.x === 3 && p.y === 6);
  const hasPointD = plottedPoints.some((p) => p.x === 4 && p.y === 8);
  const hasPointE = plottedPoints.some((p) => p.x === 5 && p.y === 10);

  // Callback when a line is drawn via GeoGebra input bar
  const handleLineDrawn = ({ pt1, pt2 }) => {
    if (activeStep === 3) {
      updateAnswer(3, { lineDrawn: true, isSubmitted: true, lineError: null });
    }
  };

  // Dynamic input placeholder to guide user typing
  const getInputPlaceholder = () => {
    if (activeStep === 1) {
      if (!hasPointA) return 'e.g. A = (x, y) or (x, y)';
      if (!hasPointB) return 'e.g. B = (x, y) or (x, y)';
      return 'Points A & B plotted!';
    }
    if (activeStep === 2) {
      if (!hasPointC) return 'e.g. C = (x, y) or (x, y)';
      if (!hasPointD) return 'e.g. D = (x, y) or (x, y)';
      if (!hasPointE) return 'e.g. E = (x, y) or (x, y)';
      return 'Points C, D, E plotted!';
    }
    if (activeStep === 3) return 'e.g. Line(A, B)';
    if (activeStep === 5) return 'e.g. Line(Point1, Point2)';
    return 'e.g. (x, y) or Name = (x, y) or Line(A, B)';
  };

  // Auto-populate points depending on active question
  useEffect(() => {
    if (activeStep === 1) {
      // In level 1, only keep points A and B if the learner plotted them; never auto-plot
      setPlottedPoints((prev) => prev.filter((p) => p.name === 'A' || p.name === 'B'));
    } else if (activeStep === 2) {
      // In level 2, user must type to plot C, D, and E.
      // Do NOT auto-plot any points when navigating to Question 2.
      // If returning from Q3..5 and Q2 is not completed, remove unearned C, D, E.
      setPlottedPoints((prev) => {
        if (!answers[2]?.isCompleted) {
          return prev.filter((p) => p.name === 'A' || p.name === 'B');
        }
        return prev;
      });
    } else if (activeStep >= 3 && activeStep <= 5) {
      setPlottedPoints([
        { name: 'A', x: 1, y: 2 },
        { name: 'B', x: 2, y: 4 },
        { name: 'C', x: 3, y: 6 },
        { name: 'D', x: 4, y: 8 },
        { name: 'E', x: 5, y: 10 }
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
    if (qId === 2) {
      return Boolean(a.isSubmitted || a.isCompleted || (hasPointC && hasPointD && hasPointE));
    }
    if (qId === 3) {
      return Boolean(a.isSubmitted || (a.patternSubmitted && a.lineDrawn));
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
          showOriginLines={showOriginLines}
          showParametricLine={showParametricLine}
          interactiveSliders={isSliderMode}
          onSliderInteracted={handleSliderInteracted}
          showInputBar={!isSliderMode}
          inputPlaceholder={getInputPlaceholder()}
        />

        {/* 3. QUESTION TO BE ANSWERED */}
        <div className="la-step-intro-block" style={{ marginTop: '0.65rem' }}>
          <h3 className="la-step-heading">
            {currentQ?.prompt}
          </h3>
          <p className="la-step-subtext">
            {currentQ?.subtext}
          </p>
        </div>

        <div className="la-step-container">
          {/* =================================================== */}
          {/* QUESTION 1: PLOT TWO POINTS                         */}
          {/* =================================================== */}
          {activeStep === 1 && (
            <div className="la-single-step-view">
              <div className="la-verification-bar">
                <div className="la-verification-group">
                  <span className="la-verification-label">Verification:</span>
                  <div className={`la-verification-chip ${hasPointA ? 'verified' : ''}`}>
                    <span>{hasPointA ? '✓' : '⏳'}</span>
                    <span>Point A (1, 2)</span>
                  </div>
                  <div className={`la-verification-chip ${hasPointB ? 'verified' : ''}`}>
                    <span>{hasPointB ? '✓' : '⏳'}</span>
                    <span>Point B (2, 4)</span>
                  </div>
                  {hasPointA && hasPointB && (
                    <span className="la-verification-tag">✓ Both Points Plotted</span>
                  )}
                </div>

                <div className="la-verification-actions">
                  <button
                    className="la-btn-primary"
                    disabled={!(hasPointA && hasPointB)}
                    onClick={() => {
                      updateAnswer(1, { isSubmitted: true, isCompleted: true });
                      setActiveStep(2);
                    }}
                    style={{
                      padding: '0.45rem 1.15rem',
                      fontSize: '0.85rem',
                      opacity: (hasPointA && hasPointB) ? 1 : 0.45,
                      cursor: (hasPointA && hasPointB) ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Continue to Next Level →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 2: PLOT MORE POINTS                        */}
          {/* =================================================== */}
          {activeStep === 2 && (
            <div className="la-single-step-view">
              <div className="la-verification-bar">
                <div className="la-verification-group">
                  <span className="la-verification-label">Verification:</span>
                  <div className={`la-verification-chip ${hasPointC ? 'verified' : ''}`}>
                    <span>{hasPointC ? '✓' : '⏳'}</span>
                    <span>C (3, 6)</span>
                  </div>
                  <div className={`la-verification-chip ${hasPointD ? 'verified' : ''}`}>
                    <span>{hasPointD ? '✓' : '⏳'}</span>
                    <span>D (4, 8)</span>
                  </div>
                  <div className={`la-verification-chip ${hasPointE ? 'verified' : ''}`}>
                    <span>{hasPointE ? '✓' : '⏳'}</span>
                    <span>E (5, 10)</span>
                  </div>
                  {hasPointC && hasPointD && hasPointE && (
                    <span className="la-verification-tag">✓ All Plotted</span>
                  )}
                </div>

                <div className="la-verification-actions">
                  <button
                    className="la-btn-secondary"
                    onClick={() => setActiveStep(1)}
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                  >
                    ← Back
                  </button>
                  <button
                    className="la-btn-primary"
                    disabled={!(hasPointC && hasPointD && hasPointE)}
                    onClick={() => {
                      updateAnswer(2, { isSubmitted: true, isCompleted: true });
                      setActiveStep(3);
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
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 3: OBSERVE PATTERN & JOIN POINTS           */}
          {/* =================================================== */}
          {activeStep === 3 && (
            <div className="la-single-step-view">
              {/* 1. Observation Section */}
              <div className="la-observation-box">
                <div className="la-observation-header">
                  <span>👀 STEP 1 — WHAT PATTERN ARE THE POINTS MAKING?</span>
                  {answers[3]?.patternSubmitted && <span className="la-credit-tag">✓ Pattern Verified: Straight Line</span>}
                </div>
                <p className="la-observation-desc">
                  Look at points <strong>A(1, 2)</strong>, <strong>B(2, 4)</strong>, <strong>C(3, 6)</strong>, <strong>D(4, 8)</strong>, and <strong>E(5, 10)</strong> plotted on the canvas. What pattern or geometric shape do they make?
                </p>

                <div className="la-options-stack" style={{ marginTop: '0.65rem' }}>
                  {(shuffledOptionsMap[3] || currentQ.options).map((opt, i) => {
                    const isSelected = answers[3]?.patternSelectedId === opt.id;
                    const isSubmitted = answers[3]?.patternSubmitted;
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
                          if (!isSubmitted) updateAnswer(3, { patternSelectedId: opt.id, patternError: null });
                        }}
                        disabled={isSubmitted}
                      >
                        <span className="la-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {!answers[3]?.patternSubmitted ? (
                  <div className="la-step-footer-actions between" style={{ marginTop: '0.85rem' }}>
                    <button className="la-btn-secondary" onClick={() => setActiveStep(2)}>
                      ← Back to Level 2
                    </button>
                    <button
                      className="la-btn-primary"
                      disabled={!answers[3]?.patternSelectedId}
                      onClick={() => {
                        const opt = currentQ.options?.find((o) => o.id === answers[3]?.patternSelectedId);
                        if (opt?.isCorrect) {
                          updateAnswer(3, { patternSubmitted: true, patternError: null });
                        } else {
                          updateAnswer(3, { patternError: 'Look closely at the canvas: the dots do not curve or scatter randomly — they all line up in a single unbroken straight line.' });
                        }
                      }}
                    >
                      Check Observation
                    </button>
                  </div>
                ) : (
                  <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', fontSize: '0.82rem', color: '#6ee7b7' }}>
                    ✓ <strong>Correct Pattern:</strong> All five points line up in a single straight line!
                  </div>
                )}

                {answers[3]?.patternError && !answers[3]?.patternSubmitted && (
                  <div style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: 500 }}>
                    {answers[3]?.patternError}
                  </div>
                )}
              </div>

              {/* 2. Line Function Section (Unlocked after Step 1 is verified) */}
              {answers[3]?.patternSubmitted && (
                <div className="la-observation-box" style={{ marginTop: '0.85rem' }}>
                  <div className="la-observation-header">
                    <span>📏 STEP 2 — JOIN TWO POINTS USING GEOGEBRA'S LINE FUNCTION</span>
                    {answers[3]?.lineDrawn && <span className="la-credit-tag">✓ Line Drawn</span>}
                  </div>
                  <p className="la-observation-desc">
                    Now use GeoGebra's line function to connect the points! In the <strong>GeoGebra Command / Coordinate Input</strong> bar above (or in the box below), type: <code>Line(A, B)</code> to draw a straight line passing through points A and B.
                  </p>

                  {!answers[3]?.lineDrawn ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.65rem' }}>
                        <input
                          type="text"
                          className="la-text-input"
                          placeholder="e.g. Line(A, B)"
                          value={answers[3]?.lineInput || ''}
                          onChange={(e) => {
                            updateAnswer(3, { lineInput: e.target.value, lineError: null });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const val = (answers[3]?.lineInput || '').trim();
                              const match = val.match(/^line\s*\(\s*([a-zA-Z]+)\s*,\s*([a-zA-Z]+)\s*\)$/i);
                              if (match) {
                                updateAnswer(3, { lineDrawn: true, isSubmitted: true, lineError: null });
                              } else {
                                updateAnswer(3, { lineError: 'Strict syntax required: Use Line(A, B) with parentheses and comma to join points.' });
                              }
                            }
                          }}
                        />
                        <button
                          className="la-btn-primary"
                          disabled={!answers[3]?.lineInput?.trim()}
                          onClick={() => {
                            const val = (answers[3]?.lineInput || '').trim();
                            const match = val.match(/^line\s*\(\s*([a-zA-Z]+)\s*,\s*([a-zA-Z]+)\s*\)$/i);
                            if (match) {
                              updateAnswer(3, { lineDrawn: true, isSubmitted: true, lineError: null });
                            } else {
                              updateAnswer(3, { lineError: 'Strict syntax required: Use Line(A, B) with parentheses and comma to join points.' });
                            }
                          }}
                        >
                          Draw Line 🚀
                        </button>
                      </div>
                      {answers[3]?.lineError && (
                        <div style={{ color: '#f87171', fontSize: '0.82rem', fontWeight: 500 }}>
                          {answers[3]?.lineError}
                        </div>
                      )}
                      <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-soft, #a89e94)' }}>
                        You can also type <code>Line(A, B)</code> directly in the GeoGebra input bar above.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', fontSize: '0.82rem', color: '#6ee7b7' }}>
                        ✓ <strong>Line Connected:</strong> The line passes through points A and B, and passes straight through C, D, and E too!
                      </div>

                      <div className="la-earns-card" style={{ marginTop: '0.85rem' }}>
                        <div className="la-earns-badge">🎉 LEVEL 3 COMPLETE (PHASE 1)</div>
                        <p className="la-earns-text">{currentQ.earns}</p>
                        <p className="la-earns-sub">{currentQ.creditExplanation}</p>
                        <div className="la-step-footer-actions between" style={{ marginTop: '0.75rem' }}>
                          <button className="la-btn-secondary" onClick={() => setActiveStep(2)}>
                            ← Back to Level 2
                          </button>
                          <button className="la-btn-primary" onClick={() => setActiveStep(4)}>
                            Continue to Next Level →
                          </button>
                        </div>
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
                        ← Back to Level 3
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
