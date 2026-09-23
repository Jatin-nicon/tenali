import React, { useState, useEffect } from 'react';
import {
  PATH_META,
  PHASES,
  FUNCTION_PATH_QUESTIONS,
  CLUSTER_3_SUMMARY
} from './questions';
import GeoGebraFunctionLab from './GeoGebraFunctionLab';
import './FunctionStudioModule.css';

export default function FunctionStudioModule({ onBack }) {
  // activeStep: 1..11 are Questions 1..11; 12 is Graduation / Free Play
  const [activeStep, setActiveStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  // Plotted points and rules state — STRICTLY USER-DRIVEN (no auto-plotting)
  const [plottedPoints, setPlottedPoints] = useState([]);
  const [plottedRules, setPlottedRules] = useState([]);

  // Answers state for Questions 1..11
  const [answers, setAnswers] = useState({
    1: { selectedId: null, isSubmitted: false },
    2: { selectedId: null, isSubmitted: false },
    3: { selectedId: null, isSubmitted: false },
    4: { selectedId: null, isSubmitted: false },
    5: { selectedId: null, isSubmitted: false },
    6: { part1Id: null, part2Id: null, isSubmitted: false },
    7: { selectedId: null, isSubmitted: false },
    8: { selectedId: null, isSubmitted: false },
    9: { f_3: '', f_neg2: '', isSubmitted: false },
    10: { g_0: '', g_neg2: '', mcqId: null, isSubmitted: false },
    11: { selectedId: null, isSubmitted: false }
  });

  const updateAnswer = (qId, updates) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], ...updates }
    }));
  };

  const currentQ = FUNCTION_PATH_QUESTIONS.find((q) => q.id === activeStep);

  const getActivePhaseName = () => {
    if (activeStep > 11 || isFinished) return '🏆 Graduation & Lab';
    const phase = PHASES.find((p) => activeStep >= p.range[0] && activeStep <= p.range[1]);
    return phase ? phase.name : '';
  };

  // Canvas callbacks
  const handlePointPlotted = (pt) => {
    setPlottedPoints((prev) => {
      const filtered = prev.filter((p) => p.name !== pt.name);
      return [...filtered, pt];
    });
  };

  const handleRuleEntered = (rule) => {
    setPlottedRules((prev) => {
      const filtered = prev.filter((r) => r.id !== rule.id);
      return [...filtered, rule];
    });
  };

  const handleClearCanvas = () => {
    setPlottedPoints([]);
    setPlottedRules([]);
  };

  // Live detection checks for plotted objects
  const hasPointA = plottedPoints.some((p) => p.x === -2 && p.y === 4);
  const hasPointB = plottedPoints.some((p) => p.x === 0 && p.y === 0);
  const hasPointC = plottedPoints.some((p) => p.x === 2 && p.y === 4);

  const hasRuleX2 = plottedRules.some(
    (r) => r.cmd.includes('x^2') || r.name.includes('x²') || r.raw?.includes('x^2') || r.raw?.includes('x²')
  );
  const hasRuleXPlus5 = plottedRules.some(
    (r) => r.cmd.includes('x + 5') || r.cmd.includes('x+5') || r.raw?.includes('x+5') || r.raw?.includes('x + 5')
  );
  const hasRuleAbsX = plottedRules.some(
    (r) => r.cmd.includes('abs') || r.name.includes('|x|') || r.raw?.includes('abs')
  );
  const hasRuleY2X = plottedRules.some(
    (r) => r.cmd.includes('y^2 = x') || r.isBreaker || r.raw?.includes('y^2') || r.raw?.includes('y²')
  );
  const hasNamedF = plottedRules.some(
    (r) => (r.funcName === 'f' && r.cmd.includes('x^2')) || r.name?.includes('f(x)')
  );
  const hasNamedG = plottedRules.some(
    (r) => (r.funcName === 'g' && r.cmd.includes('abs')) || r.name?.includes('g(x)')
  );

  // Suggested shortcuts per level
  const getShortcutsForStep = () => {
    switch (activeStep) {
      case 1:
        return ['y = x^2', 'A = (-2, 4)', 'B = (0, 0)', 'C = (2, 4)'];
      case 2:
        return ['y = x^2'];
      case 3:
        return ['y = x + 5'];
      case 4:
        return ['y = abs(x)'];
      case 7:
        return ['y^2 = x'];
      case 9:
        return ['f(x) = x^2'];
      case 10:
        return ['g(x) = abs(x) + 1'];
      case 11:
        return ['f(x) = x^2', 'g(x) = abs(x) + 1'];
      default:
        return [];
    }
  };

  const getInputPlaceholder = () => {
    switch (activeStep) {
      case 1:
        if (!hasRuleX2) return 'Type: y = x^2';
        if (!hasPointA) return 'Type: A = (-2, 4)';
        if (!hasPointB) return 'Type: B = (0, 0)';
        if (!hasPointC) return 'Type: C = (2, 4)';
        return 'Rule and points plotted!';
      case 3:
        return 'Type: y = x + 5';
      case 4:
        return 'Type: y = abs(x)';
      case 7:
        return 'Type: y^2 = x';
      case 9:
        return 'Type: f(x) = x^2';
      case 10:
        return 'Type: g(x) = abs(x) + 1';
      default:
        return 'e.g. y = x^2 or f(x) = x^2 or A = (x, y)';
    }
  };

  // Completion criteria for stepper badges
  const isQuestionComplete = (qId) => {
    const ans = answers[qId];
    if (!ans) return false;
    switch (qId) {
      case 1:
        return hasRuleX2 && hasPointA && hasPointB && hasPointC && ans.selectedId === 'q1_curve';
      case 2:
        return ans.selectedId === 'q2_one_y';
      case 3:
        return hasRuleXPlus5 && ans.selectedId === 'q3_line';
      case 4:
        return hasRuleAbsX && ans.selectedId === 'q4_one_y';
      case 5:
        return ans.selectedId === 'q5_common';
      case 6:
        return ans.part1Id === 'q6_p1_c' && ans.part2Id === 'q6_p2_b';
      case 7:
        return hasRuleY2X && ans.selectedId === 'q7_branches';
      case 8:
        return ans.selectedId === 'q8_deciding';
      case 9:
        return hasNamedF && ans.f_3?.trim() === '9' && ans.f_neg2?.trim() === '4';
      case 10:
        return hasNamedG && ans.g_0?.trim() === '1' && ans.g_neg2?.trim() === '3' && ans.mcqId === 'q10_true';
      case 11:
        return ans.selectedId === 'q11_both';
      default:
        return false;
    }
  };

  const completedCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter(isQuestionComplete).length;

  // ========================================================
  // RENDER: LEVEL 12 — THE NAMING HANDOVER & FREE-PLAY LAB
  // ========================================================
  if (activeStep === 12 || isFinished) {
    return (
      <div className="fs-studio-wrapper">
        <div className="fs-top-nav">
          {onBack && (
            <button className="fs-back-btn" onClick={onBack}>
              ← Dashboard
            </button>
          )}
          <span className="fs-progress-badge">🏆 Graduation & Lab</span>
        </div>

        {/* Ceremony Card */}
        <div className="fs-ceremony-card">
          <div className="fs-ceremony-icon">✨</div>
          <h2 className="fs-ceremony-title">{CLUSTER_3_SUMMARY.ceremony.title}</h2>
          <p className="fs-ceremony-subtitle">{CLUSTER_3_SUMMARY.ceremony.subtitle}</p>

          <div className="fs-ceremony-banner">
            {CLUSTER_3_SUMMARY.ceremony.proclamation.map((text, idx) => (
              <p key={idx} className="fs-ceremony-proclamation">
                {text}
              </p>
            ))}
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '1.25rem', textAlign: 'left', color: '#c4b5fd' }}>
            What You Earned Across the Path:
          </h3>
          <ul className="fs-takeaways-list">
            {CLUSTER_3_SUMMARY.ceremony.earnedInsights.map((insight, idx) => (
              <li key={idx} className="fs-takeaway-item">
                <span className="fs-takeaway-check">✓</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Free-Play Function Explorer Lab */}
        <div className="fs-card" style={{ marginTop: '0.5rem' }}>
          <div className="fs-card-header">
            <span className="fs-question-badge">LAB</span>
            <span className="fs-topic-badge">{CLUSTER_3_SUMMARY.lab.title}</span>
            <span className="fs-question-num">Free Exploration</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-soft, #a89e94)', margin: '0' }}>
            {CLUSTER_3_SUMMARY.lab.instructions}
          </p>

          <GeoGebraFunctionLab
            plottedPoints={plottedPoints}
            plottedRules={plottedRules}
            onPointPlotted={handlePointPlotted}
            onRuleEntered={handleRuleEntered}
            onClearCanvas={handleClearCanvas}
            inputPlaceholder="Type any rule, e.g. h(x) = 2*x + 3 or y^2 = x"
            suggestedShortcuts={['h(x) = 2*x + 3', 'p(x) = x^3', 'q(x) = sin(x)', 'y^2 = x']}
          />

          <div className="fs-lab-suggestions">
            {CLUSTER_3_SUMMARY.lab.suggestedRules.map((rule, idx) => (
              <button
                key={idx}
                type="button"
                className="fs-lab-suggestion-card"
                onClick={() => {
                  handleRuleEntered({
                    id: `suggested_${idx}`,
                    name: rule.cmd,
                    cmd: rule.cmd,
                    raw: rule.cmd,
                    color: rule.cmd.includes('y^2') ? [239, 68, 68] : [124, 58, 237]
                  });
                }}
              >
                <h4 className="fs-lab-suggestion-title">{rule.name}</h4>
                <div className="fs-lab-suggestion-cmd">{rule.cmd}</div>
                <span className="fs-lab-suggestion-tag">{rule.tag}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
            <button className="fs-btn-primary" style={{ padding: '0.65rem 2rem' }} onClick={onBack}>
              Complete Function Studio Journey 🏆
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // RENDER: STEPPER JOURNEY (Questions 1..11)
  // ========================================================
  return (
    <div className="fs-studio-wrapper">
      {/* Top Nav */}
      <div className="fs-top-nav">
        {onBack && (
          <button className="fs-back-btn" onClick={onBack}>
            ← Dashboard
          </button>
        )}
        <span className="fs-progress-badge">{`Question ${activeStep} of 11`}</span>
      </div>

      {/* Header */}
      <div className="fs-header">
        <span className="fs-phase-pill">{getActivePhaseName()}</span>
        <h1 className="fs-title">{PATH_META.title}</h1>
        <p className="fs-subtitle">{currentQ?.subtext || PATH_META.subtitle}</p>
      </div>

      {/* Unified Stepper Bar */}
      <div className="fs-stepper-bar">
        {FUNCTION_PATH_QUESTIONS.map((q) => {
          const isDone = isQuestionComplete(q.id);
          const isActive = activeStep === q.id;
          return (
            <button
              key={q.id}
              className={`fs-step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => setActiveStep(q.id)}
            >
              <span>{q.id}</span>
            </button>
          );
        })}
      </div>

      {/* Main Unified Card: Header + Graph at Top + Input Box + Question */}
      <div className="fs-card">
        {/* Card Header */}
        <div className="fs-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="fs-question-badge">{`Q${currentQ?.id || activeStep}`}</span>
            <span className="fs-topic-badge">{currentQ?.title || ''}</span>
          </div>
          <span className="fs-question-num">{`Question ${activeStep} of 11`}</span>
        </div>

        {/* 1. GRAPH AT TOP & 2. INPUT BOX (MIDDLE) */}
        <GeoGebraFunctionLab
          plottedPoints={plottedPoints}
          plottedRules={plottedRules}
          onPointPlotted={handlePointPlotted}
          onRuleEntered={handleRuleEntered}
          onClearCanvas={handleClearCanvas}
          inputPlaceholder={getInputPlaceholder()}
          suggestedShortcuts={getShortcutsForStep()}
        />

        {/* 3. QUESTION TO BE ANSWERED (BOTTOM) */}
        <div className="fs-step-intro-block">
          <h3 className="fs-step-heading">{currentQ?.prompt}</h3>
          <p className="fs-step-subtext">{currentQ?.subtext}</p>
        </div>

        {/* Question Interactions */}
        <div className="fs-step-container">
          {/* =================================================== */}
          {/* QUESTION 1: TRY A DIFFERENT RULE (y = x^2)          */}
          {/* =================================================== */}
          {activeStep === 1 && (
            <div>
              <div className="fs-verification-bar">
                <div className="fs-verification-group">
                  <span className="fs-verification-label">Required:</span>
                  <div className={`fs-verification-chip ${hasRuleX2 ? 'verified' : ''}`}>
                    <span>{hasRuleX2 ? '✓' : '⏳'}</span>
                    <span>Rule y = x²</span>
                  </div>
                  <div className={`fs-verification-chip ${hasPointA ? 'verified' : ''}`}>
                    <span>{hasPointA ? '✓' : '⏳'}</span>
                    <span>A (-2, 4)</span>
                  </div>
                  <div className={`fs-verification-chip ${hasPointB ? 'verified' : ''}`}>
                    <span>{hasPointB ? '✓' : '⏳'}</span>
                    <span>B (0, 0)</span>
                  </div>
                  <div className={`fs-verification-chip ${hasPointC ? 'verified' : ''}`}>
                    <span>{hasPointC ? '✓' : '⏳'}</span>
                    <span>C (2, 4)</span>
                  </div>
                  {hasRuleX2 && hasPointA && hasPointB && hasPointC && (
                    <span className="fs-verification-tag">✓ Curve & Points Ready</span>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--clr-text-soft, #a89e94)' }}>
                  Look at points A, B, and C. Are they on a straight line?
                </span>
                <div className="fs-options-grid">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = answers[1]?.selectedId === opt.id;
                    const isDone = isQuestionComplete(1);
                    let cls = 'fs-option-btn';
                    if (isSelected) cls += ' selected';
                    if (isDone) {
                      if (opt.isCorrect) cls += ' correct';
                      else if (isSelected) cls += ' incorrect';
                    }
                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => updateAnswer(1, { selectedId: opt.id })}
                      >
                        <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <div className="fs-verification-group">
                  <span className="fs-verification-label">Status:</span>
                  <span style={{ fontSize: '0.825rem', color: isQuestionComplete(1) ? '#4ade80' : '#a89e94' }}>
                    {isQuestionComplete(1) ? '✓ Level Complete!' : 'Plot curve + 3 points, then choose your answer'}
                  </span>
                </div>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(1)}
                  onClick={() => setActiveStep(2)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(1) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 2: ONE Y PER X, STILL                      */}
          {/* =================================================== */}
          {activeStep === 2 && (
            <div>
              <div className="fs-options-grid">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[2]?.selectedId === opt.id;
                  const isDone = isQuestionComplete(2);
                  let cls = 'fs-option-btn';
                  if (isSelected) cls += ' selected';
                  if (isDone) {
                    if (opt.isCorrect) cls += ' correct';
                    else if (isSelected) cls += ' incorrect';
                  }
                  return (
                    <button
                      key={opt.id}
                      className={cls}
                      onClick={() => updateAnswer(2, { selectedId: opt.id })}
                    >
                      <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(1)}>
                  ← Back to Q1
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(2)}
                  onClick={() => setActiveStep(3)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(2) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 3: ANOTHER RULE (y = x + 5)                */}
          {/* =================================================== */}
          {activeStep === 3 && (
            <div>
              <div className="fs-verification-bar">
                <div className="fs-verification-group">
                  <span className="fs-verification-label">Canvas Check:</span>
                  <div className={`fs-verification-chip ${hasRuleXPlus5 ? 'verified' : ''}`}>
                    <span>{hasRuleXPlus5 ? '✓' : '⏳'}</span>
                    <span>Rule y = x + 5</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--clr-text-soft, #a89e94)' }}>
                  Does this rule draw a straight line or a curve?
                </span>
                <div className="fs-options-grid">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = answers[3]?.selectedId === opt.id;
                    const isDone = isQuestionComplete(3);
                    let cls = 'fs-option-btn';
                    if (isSelected) cls += ' selected';
                    if (isDone) {
                      if (opt.isCorrect) cls += ' correct';
                      else if (isSelected) cls += ' incorrect';
                    }
                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => updateAnswer(3, { selectedId: opt.id })}
                      >
                        <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(2)}>
                  ← Back to Q2
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(3)}
                  onClick={() => setActiveStep(4)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(3) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 4: TRY YET ANOTHER RULE: y = abs(x)        */}
          {/* =================================================== */}
          {activeStep === 4 && (
            <div>
              <div className="fs-verification-bar">
                <div className="fs-verification-group">
                  <span className="fs-verification-label">Canvas Check:</span>
                  <div className={`fs-verification-chip ${hasRuleAbsX ? 'verified' : ''}`}>
                    <span>{hasRuleAbsX ? '✓' : '⏳'}</span>
                    <span>Rule y = abs(x)</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--clr-text-soft, #a89e94)' }}>
                  For every x you pick, does y = abs(x) give exactly one y?
                </span>
                <div className="fs-options-grid">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = answers[4]?.selectedId === opt.id;
                    const isDone = isQuestionComplete(4);
                    let cls = 'fs-option-btn';
                    if (isSelected) cls += ' selected';
                    if (isDone) {
                      if (opt.isCorrect) cls += ' correct';
                      else if (isSelected) cls += ' incorrect';
                    }
                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => updateAnswer(4, { selectedId: opt.id })}
                      >
                        <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(3)}>
                  ← Back to Q3
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(4)}
                  onClick={() => setActiveStep(5)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(4) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 5: WHAT'S THE COMMON THREAD?               */}
          {/* =================================================== */}
          {activeStep === 5 && (
            <div>
              <div className="fs-options-grid">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[5]?.selectedId === opt.id;
                  const isDone = isQuestionComplete(5);
                  let cls = 'fs-option-btn';
                  if (isSelected) cls += ' selected';
                  if (isDone) {
                    if (opt.isCorrect) cls += ' correct';
                    else if (isSelected) cls += ' incorrect';
                  }
                  return (
                    <button
                      key={opt.id}
                      className={cls}
                      onClick={() => updateAnswer(5, { selectedId: opt.id })}
                    >
                      <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(4)}>
                  ← Back to Q4
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(5)}
                  onClick={() => setActiveStep(6)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(5) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Phase 2 Milestone Earned</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 6: A RULE GIVING TWO Y'S (y² = x)          */}
          {/* =================================================== */}
          {activeStep === 6 && (
            <div>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#c4b5fd' }}>
                  {currentQ.part1.question}
                </span>
                <div className="fs-options-grid">
                  {currentQ.part1.options.map((opt, i) => {
                    const isSelected = answers[6]?.part1Id === opt.id;
                    const isCorrect = opt.isCorrect;
                    let cls = 'fs-option-btn';
                    if (isSelected) cls += ' selected';
                    if (answers[6]?.part1Id && isCorrect) cls += ' correct';
                    else if (isSelected && !isCorrect) cls += ' incorrect';
                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => updateAnswer(6, { part1Id: opt.id })}
                      >
                        <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#c4b5fd' }}>
                  {currentQ.part2.question}
                </span>
                <div className="fs-options-grid">
                  {currentQ.part2.options.map((opt, i) => {
                    const isSelected = answers[6]?.part2Id === opt.id;
                    const isCorrect = opt.isCorrect;
                    let cls = 'fs-option-btn';
                    if (isSelected) cls += ' selected';
                    if (answers[6]?.part2Id && isCorrect) cls += ' correct';
                    else if (isSelected && !isCorrect) cls += ' incorrect';
                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => updateAnswer(6, { part2Id: opt.id })}
                      >
                        <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(5)}>
                  ← Back to Q5
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(6)}
                  onClick={() => setActiveStep(7)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(6) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 7: PLOT y² = x                             */}
          {/* =================================================== */}
          {activeStep === 7 && (
            <div>
              <div className="fs-verification-bar">
                <div className="fs-verification-group">
                  <span className="fs-verification-label">Canvas Check:</span>
                  <div className={`fs-verification-chip ${hasRuleY2X ? 'verified' : ''}`}>
                    <span>{hasRuleY2X ? '✓' : '⏳'}</span>
                    <span>Rule y² = x</span>
                  </div>
                  {hasRuleY2X && <span className="fs-verification-tag">✓ Sideways Curve Plotted</span>}
                </div>
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--clr-text-soft, #a89e94)' }}>
                  What is the shape of y² = x on the canvas?
                </span>
                <div className="fs-options-grid">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = answers[7]?.selectedId === opt.id;
                    const isDone = isQuestionComplete(7);
                    let cls = 'fs-option-btn';
                    if (isSelected) cls += ' selected';
                    if (isDone) {
                      if (opt.isCorrect) cls += ' correct';
                      else if (isSelected) cls += ' incorrect';
                    }
                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => updateAnswer(7, { selectedId: opt.id })}
                      >
                        <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(6)}>
                  ← Back to Q6
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(7)}
                  onClick={() => setActiveStep(8)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(7) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 8: THE DECIDING QUESTION                   */}
          {/* =================================================== */}
          {activeStep === 8 && (
            <div>
              <div className="fs-options-grid">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[8]?.selectedId === opt.id;
                  const isDone = isQuestionComplete(8);
                  let cls = 'fs-option-btn';
                  if (isSelected) cls += ' selected';
                  if (isDone) {
                    if (opt.isCorrect) cls += ' correct';
                    else if (isSelected) cls += ' incorrect';
                  }
                  return (
                    <button
                      key={opt.id}
                      className={cls}
                      onClick={() => updateAnswer(8, { selectedId: opt.id })}
                    >
                      <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(7)}>
                  ← Back to Q7
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(8)}
                  onClick={() => setActiveStep(9)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(8) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Phase 3 Milestone Earned</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 9: A RULE WITH A NAME: f(x) = x²           */}
          {/* =================================================== */}
          {activeStep === 9 && (
            <div>
              <div className="fs-verification-bar">
                <div className="fs-verification-group">
                  <span className="fs-verification-label">Canvas Check:</span>
                  <div className={`fs-verification-chip ${hasNamedF ? 'verified' : ''}`}>
                    <span>{hasNamedF ? '✓' : '⏳'}</span>
                    <span>Named Rule f(x) = x²</span>
                  </div>
                </div>
              </div>

              <div className="fs-inputs-grid">
                {currentQ.inputs.map((inp) => (
                  <div key={inp.id} className="fs-input-box">
                    <label className="fs-input-label">{inp.label}</label>
                    <input
                      type="text"
                      className="fs-input-control"
                      value={answers[9]?.[inp.id] || ''}
                      onChange={(e) => updateAnswer(9, { [inp.id]: e.target.value })}
                      placeholder={inp.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(8)}>
                  ← Back to Q8
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(9)}
                  onClick={() => setActiveStep(10)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(9) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 10: DIFFERENT RULES, DIFFERENT NAMES       */}
          {/* =================================================== */}
          {activeStep === 10 && (
            <div>
              <div className="fs-verification-bar">
                <div className="fs-verification-group">
                  <span className="fs-verification-label">Canvas Check:</span>
                  <div className={`fs-verification-chip ${hasNamedG ? 'verified' : ''}`}>
                    <span>{hasNamedG ? '✓' : '⏳'}</span>
                    <span>Named Rule g(x) = abs(x) + 1</span>
                  </div>
                </div>
              </div>

              <div className="fs-inputs-grid">
                {currentQ.inputs.map((inp) => (
                  <div key={inp.id} className="fs-input-box">
                    <label className="fs-input-label">{inp.label}</label>
                    <input
                      type="text"
                      className="fs-input-control"
                      value={answers[10]?.[inp.id] || ''}
                      onChange={(e) => updateAnswer(10, { [inp.id]: e.target.value })}
                      placeholder={inp.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '0.85rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--clr-text-soft, #a89e94)' }}>
                  {currentQ.mcq.question}
                </span>
                <div className="fs-options-grid">
                  {currentQ.mcq.options.map((opt, i) => {
                    const isSelected = answers[10]?.mcqId === opt.id;
                    const isDone = isQuestionComplete(10);
                    let cls = 'fs-option-btn';
                    if (isSelected) cls += ' selected';
                    if (isDone) {
                      if (opt.isCorrect) cls += ' correct';
                      else if (isSelected) cls += ' incorrect';
                    }
                    return (
                      <button
                        key={opt.id}
                        className={cls}
                        onClick={() => updateAnswer(10, { mcqId: opt.id })}
                      >
                        <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(9)}>
                  ← Back to Q9
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(10)}
                  onClick={() => setActiveStep(11)}
                >
                  Continue to Next Level →
                </button>
              </div>

              {isQuestionComplete(10) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">Earned Insight</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* QUESTION 11: VERIFY: EVERY X GETS ONE Y             */}
          {/* =================================================== */}
          {activeStep === 11 && (
            <div>
              <div className="fs-options-grid">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[11]?.selectedId === opt.id;
                  const isDone = isQuestionComplete(11);
                  let cls = 'fs-option-btn';
                  if (isSelected) cls += ' selected';
                  if (isDone) {
                    if (opt.isCorrect) cls += ' correct';
                    else if (isSelected) cls += ' incorrect';
                  }
                  return (
                    <button
                      key={opt.id}
                      className={cls}
                      onClick={() => updateAnswer(11, { selectedId: opt.id })}
                    >
                      <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="fs-verification-bar" style={{ marginTop: '0.75rem' }}>
                <button className="fs-btn-secondary" onClick={() => setActiveStep(10)}>
                  ← Back to Q10
                </button>
                <button
                  className="fs-btn-primary"
                  disabled={!isQuestionComplete(11)}
                  onClick={() => {
                    setActiveStep(12);
                    setIsFinished(true);
                  }}
                >
                  Enter The Naming Handover Ceremony 🏆
                </button>
              </div>

              {isQuestionComplete(11) && (
                <div className="fs-earns-card">
                  <div className="fs-earns-badge">🎉 Final Question Complete!</div>
                  <p className="fs-earns-text">{currentQ.earns}</p>
                  <p className="fs-earns-sub">{currentQ.creditExplanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fs-bottom-nav">
        <button
          className="fs-nav-btn"
          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
          disabled={activeStep === 1}
        >
          ← Previous Question
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-soft, #a89e94)' }}>
          {PATH_META.title} ({completedCount} of 11 questions completed)
        </span>

        <button
          className="fs-nav-btn"
          onClick={() => {
            if (activeStep < 11) {
              setActiveStep((prev) => prev + 1);
            } else {
              setActiveStep(12);
              setIsFinished(true);
            }
          }}
          disabled={!isQuestionComplete(activeStep)}
        >
          Next Question →
        </button>
      </div>
    </div>
  );
}
