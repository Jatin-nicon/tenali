import React, { useState, useRef, useEffect } from 'react';
import GeoGebraFunctionLab from './GeoGebraFunctionLab';
import { parseLineEquation } from './equationParser';
import './FunctionStudioModule.css';

/**
 * Question definitions for Function Studio Journey
 * Following the exact stepper architecture and design principles of Line Studio & Point Studio.
 */
const QUESTIONS_META = [
  {
    id: 1,
    phase: 'Phase 1: Line Foundation',
    title: 'Draw Your Line',
    prompt: 'Enter the equation of a line to draw on the canvas:',
    subtext: 'Type any linear equation starting with y = (for example: y = 2x + 3 or y = -x + 1):'
  },
  {
    id: 2,
    phase: 'Phase 2: One-to-One Mapping',
    title: 'Evaluate First Point',
    prompt: 'What is the value of y when x = ',
    subtext: 'Trace vertically along the dashed guideline on the coordinate grid, or calculate using the equation.'
  },
  {
    id: 3,
    phase: 'Phase 2: One-to-One Mapping',
    title: 'Evaluate Second Point',
    prompt: 'Now, what is the value of y when x = ',
    subtext: 'Find where x meets your line on the grid, or substitute x into the equation.'
  },
  {
    id: 4,
    phase: 'Phase 2: One-to-One Mapping',
    title: 'Evaluate Third Point',
    prompt: 'Finally, what is the value of y when x = ',
    subtext: 'Find where x meets your line on the grid, or substitute x into the equation.'
  },
  {
    id: 5,
    phase: 'Phase 3: The Big Intuition',
    title: 'Role of x',
    prompt: 'What do you think x is acting as on your line?',
    subtext: 'Think about how you started with x each time to determine y on your line.'
  },
  {
    id: 6,
    phase: 'Phase 3: The Big Intuition',
    title: 'Introducing f(x)',
    prompt: 'Meet the Function Notation: f(x)',
    subtext: 'A cleaner way to show that x goes inside the rule.'
  }
];

const Q5_OPTIONS = [
  {
    id: 'input',
    label: 'Input',
    description: 'The starting value you feed into the rule',
    isCorrect: true,
    feedback: null
  },
  {
    id: 'output',
    label: 'Output',
    description: 'The final result produced by the rule',
    isCorrect: false,
    feedback: 'Not quite! Notice the direction: you were given x first and used the rule to find y. The result you get back (y) is the output, while x is the input.'
  },
  {
    id: 'constant',
    label: 'Fixed Constant',
    description: 'A number that never changes',
    isCorrect: false,
    feedback: 'Notice that x changed across every question (x = 1, then x = -2, then x = 2). Because its value changes freely, it is a variable input, not a constant.'
  },
  {
    id: 'slope',
    label: 'Slope',
    description: 'The steepness or tilt of the line',
    isCorrect: false,
    feedback: 'The slope is the multiplier in front of x (the steepness). But x itself is the variable value you plug in as the input.'
  }
];

const Q6_OPTIONS = [
  {
    id: 'input',
    label: 'Input entering the rule',
    description: 'They show that x is going inside function f as the input',
    isCorrect: true,
    feedback: null
  },
  {
    id: 'multiply',
    label: 'Multiply f times x',
    description: 'They mean f multiplied by x',
    isCorrect: false,
    feedback: 'Careful! In function notation, f(x) does NOT mean multiplication. The parentheses show that x is entering inside the machine f as the input.'
  },
  {
    id: 'constant',
    label: 'Fixed number',
    description: 'They mean x is locked to one constant value',
    isCorrect: false,
    feedback: 'x is still a flexible input that you can change anytime. The parentheses show where the input goes.'
  }
];

const DEFAULT_LINE = parseLineEquation('y = 2x + 1');

export default function FunctionStudioModule({ onBack }) {
  // activeStep: 1..6 corresponding to Questions 1..6
  const [activeStep, setActiveStep] = useState(1);

  // Question 1: Line input text (empty by default)
  const [lineEquationInput, setLineEquationInput] = useState('');
  // Active parsed line object: { m, c, equationDisplay, ggbCmd, inquiries }
  const [activeLine, setActiveLine] = useState(null);
  // Fallback to DEFAULT_LINE if user navigates freely before plotting
  const effectiveLine = activeLine || DEFAULT_LINE;
  // Feedback for Question 1
  const [lineError, setLineError] = useState(null);

  // Answers for Questions 2, 3, 4, 5, and 6
  const [answers, setAnswers] = useState({
    2: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
    3: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
    4: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
    5: { selectedId: null, isSubmitted: false, isCorrect: false, error: null },
    6: { selectedId: null, isSubmitted: false, isCorrect: false, error: null }
  });

  // Track session completed journeys
  const [completedLinesCount, setCompletedLinesCount] = useState(0);

  const lineInputRef = useRef(null);
  const q2InputRef = useRef(null);
  const q3InputRef = useRef(null);
  const q4InputRef = useRef(null);

  // Auto-focus inputs on question change
  useEffect(() => {
    if (activeStep === 1 && !activeLine && lineInputRef.current) {
      lineInputRef.current.focus();
    } else if (activeStep === 2 && q2InputRef.current && !answers[2].isCorrect) {
      q2InputRef.current.focus();
    } else if (activeStep === 3 && q3InputRef.current && !answers[3].isCorrect) {
      q3InputRef.current.focus();
    } else if (activeStep === 4 && q4InputRef.current && !answers[4].isCorrect) {
      q4InputRef.current.focus();
    }
  }, [activeStep, activeLine, answers]);

  // Question completion criteria
  const isQuestionComplete = (qId) => {
    if (qId === 1) return Boolean(activeLine);
    return Boolean(answers[qId]?.isCorrect);
  };

  // Question unlock criteria (unrestricted for free navigation)
  const isQuestionUnlocked = (_qId) => true;

  // Inquiry points from effective line
  const inq1 = effectiveLine.inquiries[0];
  const inq2 = effectiveLine.inquiries[1];
  const inq3 = effectiveLine.inquiries[2];

  // Compute verified points for GeoGebra canvas
  const verifiedPoints = [];
  if (answers[2]?.isCorrect && inq1) {
    verifiedPoints.push({ name: 'P_1', x: inq1.x, y: inq1.y });
  }
  if (answers[3]?.isCorrect && inq2) {
    verifiedPoints.push({ name: 'P_2', x: inq2.x, y: inq2.y });
  }
  if (answers[4]?.isCorrect && inq3) {
    verifiedPoints.push({ name: 'P_3', x: inq3.x, y: inq3.y });
  }

  // Target X for vertical guideline
  const getTargetX = () => {
    if (activeStep === 2 && !answers[2]?.isCorrect && inq1) return inq1.x;
    if (activeStep === 3 && !answers[3]?.isCorrect && inq2) return inq2.x;
    if (activeStep === 4 && !answers[4]?.isCorrect && inq3) return inq3.x;
    return null;
  };

  // Handle Q1 Line Submission
  const handlePlotLine = (e) => {
    if (e) e.preventDefault();
    const raw = lineEquationInput.trim();
    const parsed = parseLineEquation(raw);

    if (!parsed.success) {
      setLineError(parsed.error);
      return;
    }

    setActiveLine(parsed);
    setLineError(null);

    // Reset downstream answers when line is re-plotted
    setAnswers({
      2: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      3: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      4: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      5: { selectedId: null, isSubmitted: false, isCorrect: false, error: null },
      6: { selectedId: null, isSubmitted: false, isCorrect: false, error: null }
    });
  };

  // Handle Q2..Q4 Point Answer Submission
  const handleCheckPointAnswer = (stepNum, targetInquiry, e) => {
    if (e) e.preventDefault();
    if (!targetInquiry) return;

    const currentAns = answers[stepNum];
    if (currentAns.isCorrect) return;

    const trimmed = currentAns.yVal.trim();
    if (!trimmed) {
      setAnswers((prev) => ({
        ...prev,
        [stepNum]: { ...prev[stepNum], error: 'Please enter a numeric value for y.' }
      }));
      return;
    }

    const val = parseFloat(trimmed);
    if (isNaN(val)) {
      setAnswers((prev) => ({
        ...prev,
        [stepNum]: { ...prev[stepNum], error: 'Please enter a valid number for y.' }
      }));
      return;
    }

    if (val === targetInquiry.y) {
      setAnswers((prev) => ({
        ...prev,
        [stepNum]: {
          ...prev[stepNum],
          isSubmitted: true,
          isCorrect: true,
          error: null
        }
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [stepNum]: {
          ...prev[stepNum],
          error: `Not quite. Substitute x = ${targetInquiry.x} into ${effectiveLine.equationDisplay}, or trace where the dashed vertical line touches your line on the grid.`
        }
      }));
    }
  };

  // Handle Q5 Intuition Answer Submission
  const handleCheckQ5Answer = () => {
    const selectedId = answers[5]?.selectedId;
    if (!selectedId) {
      setAnswers((prev) => ({
        ...prev,
        5: { ...prev[5], error: 'Please select an option to check.' }
      }));
      return;
    }

    const selectedOpt = Q5_OPTIONS.find((opt) => opt.id === selectedId);
    if (!selectedOpt) return;

    if (selectedOpt.isCorrect) {
      setAnswers((prev) => ({
        ...prev,
        5: { ...prev[5], isSubmitted: true, isCorrect: true, error: null }
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        5: {
          ...prev[5],
          isSubmitted: true,
          isCorrect: false,
          error: selectedOpt.feedback
        }
      }));
    }
  };

  // Handle Q6 Function Notation Submission
  const handleCheckQ6Answer = () => {
    const selectedId = answers[6]?.selectedId;
    if (!selectedId) {
      setAnswers((prev) => ({
        ...prev,
        6: { ...prev[6], error: 'Please select an option to check.' }
      }));
      return;
    }

    const selectedOpt = Q6_OPTIONS.find((opt) => opt.id === selectedId);
    if (!selectedOpt) return;

    if (selectedOpt.isCorrect) {
      setAnswers((prev) => ({
        ...prev,
        6: { ...prev[6], isSubmitted: true, isCorrect: true, error: null }
      }));
      setCompletedLinesCount((prev) => prev + 1);
    } else {
      setAnswers((prev) => ({
        ...prev,
        6: {
          ...prev[6],
          isSubmitted: true,
          isCorrect: false,
          error: selectedOpt.feedback
        }
      }));
    }
  };

  // Reset to input another line
  const handleResetNewJourney = () => {
    setActiveLine(null);
    setLineEquationInput('');
    setLineError(null);
    setAnswers({
      2: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      3: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      4: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      5: { selectedId: null, isSubmitted: false, isCorrect: false, error: null },
      6: { selectedId: null, isSubmitted: false, isCorrect: false, error: null }
    });
    setActiveStep(1);
  };

  const currentQ = QUESTIONS_META.find((q) => q.id === activeStep) || QUESTIONS_META[0];

  return (
    <div className="fs-studio-wrapper">
      {/* 1. TOP NAVIGATION */}
      <div className="fs-top-nav">
        {onBack && (
          <button className="fs-back-btn" onClick={onBack}>
            ← Dashboard
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {completedLinesCount > 0 && (
            <span
              className="fs-progress-badge"
              style={{ color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.35)' }}
            >
              ✓ Lines Completed: {completedLinesCount}
            </span>
          )}
          <span className="fs-progress-badge">{`Question ${activeStep} of ${QUESTIONS_META.length}`}</span>
        </div>
      </div>

      {/* 2. HEADER */}
      <div className="fs-header">
        <span className="fs-phase-pill">{currentQ.phase}</span>
        <h1 className="fs-title">The Function Studio</h1>
        <p className="fs-subtitle">
          Building mathematical intuition for rules, inputs, and outputs.
        </p>
      </div>

      {/* 3. STEPPER BAR (Unrestricted free navigation) */}
      <div className="fs-stepper-bar">
        {QUESTIONS_META.map((q) => {
          const isDone = isQuestionComplete(q.id);
          const isActive = activeStep === q.id;
          return (
            <button
              key={q.id}
              className={`fs-step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => setActiveStep(q.id)}
              title={`Question ${q.id}: ${q.title}`}
            >
              <span>{q.id}</span>
            </button>
          );
        })}
      </div>

      {/* 4. MAIN CARD: Header + Graph at Top + Question Content */}
      <div className="fs-card">
        {/* Card Header */}
        <div className="fs-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="fs-question-badge">{`Q${activeStep}`}</span>
            <span className="fs-topic-badge">{currentQ.title}</span>
            {(activeLine || activeStep > 1) && (
              <span className="fs-card-line-badge">
                {activeStep === 6 ? `f(x) = ${effectiveLine.equationDisplay.replace(/^y\s*=\s*/, '')}` : effectiveLine.equationDisplay}
              </span>
            )}
          </div>
          <span className="fs-question-num">{`Question ${activeStep} of ${QUESTIONS_META.length}`}</span>
        </div>

        {/* 1. GRAPH AT TOP (Centered isometric Cartesian canvas) */}
        <GeoGebraFunctionLab
          activeLine={
            (activeLine || activeStep > 1)
              ? {
                  id: effectiveLine.id,
                  cmd: effectiveLine.ggbCmd,
                  label: activeStep === 6 ? `f(x) = ${effectiveLine.equationDisplay.replace(/^y\s*=\s*/, '')}` : effectiveLine.equationDisplay
                }
              : null
          }
          targetX={getTargetX()}
          verifiedPoints={verifiedPoints}
          showInputBar={false}
        />

        {/* 2. QUESTION CONTENT */}

        {/* =================================================== */}
        {/* QUESTION 1: DRAW YOUR LINE                          */}
        {/* =================================================== */}
        {activeStep === 1 && (
          <div className="fs-step-intro-block">
            {activeLine ? (
              <>
                <div className="fs-equation-pill-bar">
                  <span className="fs-equation-pill-label">Line Equation:</span>
                  <span className="fs-equation-pill-val">{activeLine.equationDisplay}</span>
                </div>
                <h3 className="fs-step-heading">
                  Your Line: <span className="fs-equation-highlight">{activeLine.equationDisplay}</span>
                </h3>
                <p className="fs-step-subtext">
                  Your line <strong style={{ color: '#e8864a' }}>{activeLine.equationDisplay}</strong> is drawn on the canvas. Click Continue to evaluate points on it.
                </p>
              </>
            ) : (
              <>
                <h3 className="fs-step-heading">
                  Enter the equation of a line to draw on the canvas:
                </h3>
                <p className="fs-step-subtext">{currentQ.subtext}</p>
              </>
            )}

            {!activeLine && (
              <>
                <form className="fs-tray-input-row" onSubmit={handlePlotLine} style={{ marginTop: '0.85rem' }}>
                  <input
                    ref={lineInputRef}
                    type="text"
                    className="fs-tray-input-box"
                    placeholder="e.g. y = 2x + 3 or y = -x + 1"
                    value={lineEquationInput}
                    onChange={(e) => {
                      setLineEquationInput(e.target.value);
                      setLineError(null);
                    }}
                  />
                  <button type="submit" className="fs-tray-submit-btn">
                    Plot Line 🚀
                  </button>
                </form>

                {lineError && (
                  <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                    <span>⚠️</span>
                    <span>{lineError}</span>
                  </div>
                )}
              </>
            )}

            {activeLine && (
              <div className="fs-inquiry-feedback success" style={{ marginTop: '0.65rem' }}>
                <span>✓</span>
                <span>Line <strong>{activeLine.equationDisplay}</strong> plotted on canvas! Click Continue to evaluate points on it.</span>
              </div>
            )}

            {/* Step Footer Navigation */}
            <div className={`fs-step-footer-actions ${activeLine ? 'between' : 'end'}`}>
              {activeLine && (
                <button
                  className="fs-btn-secondary"
                  onClick={() => {
                    setActiveLine(null);
                  }}
                >
                  ✏️ Change Equation
                </button>
              )}
              <button
                className="fs-btn-primary"
                onClick={() => setActiveStep(2)}
              >
                Continue to Question 2 →
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 2: EVALUATE FIRST POINT                    */}
        {/* =================================================== */}
        {activeStep === 2 && (
          <div className="fs-step-intro-block">
            <div className="fs-equation-pill-bar">
              <span className="fs-equation-pill-label">Line Equation:</span>
              <span className="fs-equation-pill-val">{effectiveLine.equationDisplay}</span>
            </div>
            <h3 className="fs-step-heading">
              On your line <span className="fs-equation-highlight">{effectiveLine.equationDisplay}</span>, when <span style={{ color: '#e8864a' }}>x = {inq1.x}</span>, what is the value of <span style={{ color: '#14b8a6' }}>y</span>?
            </h3>
            <p className="fs-step-subtext">
              Look at the dashed vertical guideline at <strong>x = {inq1.x}</strong> on the grid, or substitute <strong>x = {inq1.x}</strong> into <strong>{effectiveLine.equationDisplay}</strong>.
            </p>

            <form
              className="fs-inquiry-form"
              onSubmit={(e) => handleCheckPointAnswer(2, inq1, e)}
              style={{ marginTop: '0.85rem' }}
            >
              <span className="fs-inquiry-prefix">y =</span>
              <input
                ref={q2InputRef}
                type="text"
                className="fs-inquiry-input"
                placeholder="?"
                value={answers[2].yVal}
                onChange={(e) => {
                  const val = e.target.value;
                  setAnswers((prev) => ({
                    ...prev,
                    2: { ...prev[2], yVal: val, error: null }
                  }));
                }}
                disabled={answers[2].isCorrect}
              />
              {!answers[2].isCorrect && (
                <button type="submit" className="fs-btn-primary">
                  Check Answer ✓
                </button>
              )}
            </form>

            {answers[2].error && (
              <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                <span>ℹ</span>
                <span>{answers[2].error}</span>
              </div>
            )}

            {answers[2].isCorrect && (
              <div className="fs-inquiry-feedback success" style={{ marginTop: '0.65rem' }}>
                <span>✓</span>
                <span>Correct! On <strong>{effectiveLine.equationDisplay}</strong>, when x = {inq1.x}, y = {inq1.y}. Point P1({inq1.x}, {inq1.y}) is now pinned on your line.</span>
              </div>
            )}

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between">
              <button className="fs-btn-secondary" onClick={() => setActiveStep(1)}>
                ← Back to Question 1
              </button>
              <button
                className="fs-btn-primary"
                onClick={() => setActiveStep(3)}
              >
                Continue to Question 3 →
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 3: EVALUATE SECOND POINT                   */}
        {/* =================================================== */}
        {activeStep === 3 && (
          <div className="fs-step-intro-block">
            <div className="fs-equation-pill-bar">
              <span className="fs-equation-pill-label">Line Equation:</span>
              <span className="fs-equation-pill-val">{effectiveLine.equationDisplay}</span>
            </div>
            <h3 className="fs-step-heading">
              On your line <span className="fs-equation-highlight">{effectiveLine.equationDisplay}</span>, when <span style={{ color: '#e8864a' }}>x = {inq2.x}</span>, what is the value of <span style={{ color: '#14b8a6' }}>y</span>?
            </h3>
            <p className="fs-step-subtext">
              Trace vertically from <strong>x = {inq2.x}</strong> to where it meets your line, or substitute <strong>x = {inq2.x}</strong> into <strong>{effectiveLine.equationDisplay}</strong>.
            </p>

            <form
              className="fs-inquiry-form"
              onSubmit={(e) => handleCheckPointAnswer(3, inq2, e)}
              style={{ marginTop: '0.85rem' }}
            >
              <span className="fs-inquiry-prefix">y =</span>
              <input
                ref={q3InputRef}
                type="text"
                className="fs-inquiry-input"
                placeholder="?"
                value={answers[3].yVal}
                onChange={(e) => {
                  const val = e.target.value;
                  setAnswers((prev) => ({
                    ...prev,
                    3: { ...prev[3], yVal: val, error: null }
                  }));
                }}
                disabled={answers[3].isCorrect}
              />
              {!answers[3].isCorrect && (
                <button type="submit" className="fs-btn-primary">
                  Check Answer ✓
                </button>
              )}
            </form>

            {answers[3].error && (
              <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                <span>ℹ</span>
                <span>{answers[3].error}</span>
              </div>
            )}

            {answers[3].isCorrect && (
              <div className="fs-inquiry-feedback success" style={{ marginTop: '0.65rem' }}>
                <span>✓</span>
                <span>Correct! On <strong>{effectiveLine.equationDisplay}</strong>, when x = {inq2.x}, y = {inq2.y}. Point P2({inq2.x}, {inq2.y}) is pinned on your line.</span>
              </div>
            )}

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between">
              <button className="fs-btn-secondary" onClick={() => setActiveStep(2)}>
                ← Back to Question 2
              </button>
              <button
                className="fs-btn-primary"
                onClick={() => setActiveStep(4)}
              >
                Continue to Question 4 →
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 4: THIRD POINT                             */}
        {/* =================================================== */}
        {activeStep === 4 && (
          <div className="fs-step-intro-block">
            <div className="fs-equation-pill-bar">
              <span className="fs-equation-pill-label">Line Equation:</span>
              <span className="fs-equation-pill-val">{effectiveLine.equationDisplay}</span>
            </div>
            <h3 className="fs-step-heading">
              On your line <span className="fs-equation-highlight">{effectiveLine.equationDisplay}</span>, when <span style={{ color: '#e8864a' }}>x = {inq3.x}</span>, what is the value of <span style={{ color: '#14b8a6' }}>y</span>?
            </h3>
            <p className="fs-step-subtext">
              Find where <strong>x = {inq3.x}</strong> meets your line on the grid, or substitute <strong>x = {inq3.x}</strong> into <strong>{effectiveLine.equationDisplay}</strong>.
            </p>

            <form
              className="fs-inquiry-form"
              onSubmit={(e) => handleCheckPointAnswer(4, inq3, e)}
              style={{ marginTop: '0.85rem' }}
            >
              <span className="fs-inquiry-prefix">y =</span>
              <input
                ref={q4InputRef}
                type="text"
                className="fs-inquiry-input"
                placeholder="?"
                value={answers[4].yVal}
                onChange={(e) => {
                  const val = e.target.value;
                  setAnswers((prev) => ({
                    ...prev,
                    4: { ...prev[4], yVal: val, error: null }
                  }));
                }}
                disabled={answers[4].isCorrect}
              />
              {!answers[4].isCorrect && (
                <button type="submit" className="fs-btn-primary">
                  Check Answer ✓
                </button>
              )}
            </form>

            {answers[4].error && (
              <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                <span>ℹ</span>
                <span>{answers[4].error}</span>
              </div>
            )}

            {answers[4].isCorrect && (
              <div className="fs-inquiry-feedback success" style={{ marginTop: '0.65rem' }}>
                <span>✓</span>
                <span>Correct! On <strong>{effectiveLine.equationDisplay}</strong>, when x = {inq3.x}, y = {inq3.y}. All 3 points are now pinned on your line.</span>
              </div>
            )}

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between">
              <button className="fs-btn-secondary" onClick={() => setActiveStep(3)}>
                ← Back to Question 3
              </button>
              <button
                className="fs-btn-primary"
                onClick={() => setActiveStep(5)}
              >
                Continue to Question 5 →
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 5: ROLE OF X (INPUT VS OUTPUT)             */}
        {/* =================================================== */}
        {activeStep === 5 && (
          <div className="fs-step-intro-block">
            <div className="fs-equation-pill-bar">
              <span className="fs-equation-pill-label">Line Equation:</span>
              <span className="fs-equation-pill-val">{effectiveLine.equationDisplay}</span>
            </div>
            <h3 className="fs-step-heading">
              In your equation <span className="fs-equation-highlight">{effectiveLine.equationDisplay}</span>, what do you think <span style={{ color: '#e8864a' }}>x</span> is acting as?
            </h3>
            <p className="fs-step-subtext">
              Think about how you evaluated each point: you were given a value for <strong>x</strong> first, substituted it into the rule, and calculated <strong>y</strong>.
            </p>

            {/* MCQ Options */}
            <div className="fs-options-grid" style={{ marginTop: '0.85rem' }}>
              {Q5_OPTIONS.map((opt, i) => {
                const isSelected = answers[5]?.selectedId === opt.id;
                const isSubmitted = answers[5]?.isSubmitted;
                let cls = 'fs-option-btn';
                if (isSelected) cls += ' selected';
                if (isSubmitted && isSelected) {
                  cls += opt.isCorrect ? ' correct' : ' incorrect';
                } else if (answers[5]?.isCorrect && opt.isCorrect) {
                  cls += ' correct';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={cls}
                    onClick={() => {
                      if (!answers[5]?.isCorrect) {
                        setAnswers((prev) => ({
                          ...prev,
                          5: { ...prev[5], selectedId: opt.id, isSubmitted: false, error: null }
                        }));
                      }
                    }}
                    disabled={answers[5]?.isCorrect}
                  >
                    <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{opt.label}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-soft, #a89e94)' }}>{opt.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {answers[5]?.error && (
              <div className="fs-inquiry-feedback error" style={{ marginTop: '0.75rem' }}>
                <span>ℹ</span>
                <span>{answers[5].error}</span>
              </div>
            )}

            {!answers[5]?.isCorrect && (
              <div style={{ marginTop: '0.85rem' }}>
                <button
                  type="button"
                  className="fs-btn-primary"
                  disabled={!answers[5]?.selectedId}
                  onClick={handleCheckQ5Answer}
                >
                  Check Answer ✓
                </button>
              </div>
            )}

            {answers[5]?.isCorrect && (
              <div>
                <div className="fs-inquiry-feedback success" style={{ marginTop: '0.75rem' }}>
                  <span>✓</span>
                  <span>Correct! <strong>x</strong> is the <strong>Input</strong> that you feed into the rule.</span>
                </div>

                {/* EARNED INSIGHT CARD */}
                <div className="fs-earns-card" style={{ marginTop: '0.85rem' }}>
                  <div className="fs-earns-badge">✨ Core Intuition Earned</div>
                  <h4 style={{ margin: '0 0 0.35rem 0', color: '#ede8e3', fontSize: '1rem', fontWeight: 800 }}>
                    One Input x ➔ Exactly One Output y
                  </h4>
                  <p className="fs-earns-text" style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    Notice what happened across all three points: For every single input <strong>x</strong> you chose on your line <strong>{effectiveLine.equationDisplay}</strong>, the rule gave back <strong>exactly one output y</strong>.
                  </p>
                  <p className="fs-earns-sub">
                    A vertical line through any x touches your line at only one place. That unique output is what makes this rule a well-defined function.
                  </p>

                  <table className="fs-summary-table">
                    <thead>
                      <tr>
                        <th>Input (x)</th>
                        <th>Rule: {effectiveLine.equationDisplay}</th>
                        <th>Output (y)</th>
                        <th>Coordinate</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {effectiveLine.inquiries.map((inq, idx) => (
                        <tr key={idx}>
                          <td>x = {inq.x}</td>
                          <td style={{ color: '#a89e94' }}>
                            {effectiveLine.m}({inq.x}) {effectiveLine.c >= 0 ? `+ ${effectiveLine.c}` : `- ${Math.abs(effectiveLine.c)}`}
                          </td>
                          <td style={{ color: '#14b8a6', fontWeight: 700 }}>y = {inq.y}</td>
                          <td style={{ color: '#e8864a' }}>({inq.x}, {inq.y})</td>
                          <td style={{ color: '#34d399', fontWeight: 600 }}>✓ Pinned</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between">
              <button className="fs-btn-secondary" onClick={() => setActiveStep(4)}>
                ← Back to Question 4
              </button>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button className="fs-btn-secondary" onClick={handleResetNewJourney}>
                  ✏️ Input Another Line
                </button>
                <button className="fs-btn-primary" onClick={() => setActiveStep(6)}>
                  Continue to Question 6 →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 6: INTRODUCING f(x) FUNCTION NOTATION       */}
        {/* =================================================== */}
        {activeStep === 6 && (
          <div className="fs-step-intro-block">
            {/* Visual Handover & Intuition Container */}
            <div className="fs-handover-box">
              <span className="fs-handover-badge">✨ New Notation Unlocked</span>
              <h3 className="fs-handover-title">
                Writing the Rule to Show <span style={{ color: 'var(--clr-accent, #e8864a)' }}>x</span> as the Input
              </h3>

              {/* Visual Transformation Flow: y = 2x + 1 ➔ f(x) = 2x + 1 */}
              <div className="fs-notation-flow">
                <div className="fs-flow-card">
                  <span className="fs-flow-tag">Line Equation</span>
                  <span className="fs-flow-math">{effectiveLine.equationDisplay}</span>
                  <span className="fs-flow-note">Outputs y from x</span>
                </div>

                <span className="fs-flow-arrow">➔</span>

                <div className="fs-flow-card new">
                  <span className="fs-flow-tag highlight">Function Notation</span>
                  <span className="fs-flow-math highlight">
                    f(x) = {effectiveLine.equationDisplay.replace(/^y\s*=\s*/, '')}
                  </span>
                  <span className="fs-flow-note" style={{ color: 'var(--clr-accent, #e8864a)', fontWeight: 600 }}>
                    Shows x going into rule f
                  </span>
                </div>
              </div>

              {/* Machine Diagram */}
              <div className="fs-machine-diagram">
                <div className="fs-diagram-box input-box">
                  <span className="fs-diagram-label">INPUT</span>
                  <span className="fs-diagram-val">x</span>
                </div>
                <span className="fs-diagram-arrow">──▶</span>
                <div className="fs-diagram-box machine-box">
                  <span className="fs-diagram-label">RULE / MACHINE</span>
                  <span className="fs-diagram-val">
                    f(·) = {effectiveLine.m}(·) {effectiveLine.c >= 0 ? `+ ${effectiveLine.c}` : `- ${Math.abs(effectiveLine.c)}`}
                  </span>
                </div>
                <span className="fs-diagram-arrow">──▶</span>
                <div className="fs-diagram-box output-box">
                  <span className="fs-diagram-label">OUTPUT</span>
                  <span className="fs-diagram-val">f(x)</span>
                </div>
              </div>

              {/* 3 Punchy Points */}
              <div className="fs-handover-points">
                <div className="fs-point-item">
                  <span className="fs-point-bullet">•</span>
                  <span><strong>f</strong> is the name of our rule/machine.</span>
                </div>
                <div className="fs-point-item">
                  <span className="fs-point-bullet">•</span>
                  <span><strong>(x)</strong> shows that <strong>x</strong> is going inside the rule as the input.</span>
                </div>
                <div className="fs-point-item">
                  <span className="fs-point-bullet">•</span>
                  <span><strong>f(x)</strong> is the output produced (pronounced <em>"f of x"</em>). It replaces <strong>y</strong>!</span>
                </div>
              </div>
            </div>

            {/* Quick Intuition Check Question */}
            <div style={{ marginTop: '1.25rem' }}>
              <div className="fs-inquiry-header">
                <span className="fs-inquiry-tag">Check Your Understanding</span>
                <h3 className="fs-inquiry-title">In the notation f(x), what do the parentheses (x) mean?</h3>
                <p className="fs-inquiry-desc">
                  Select the option that best describes what (x) is doing:
                </p>
              </div>

              <div className="fs-options-grid" style={{ gridTemplateColumns: '1fr', gap: '0.6rem' }}>
                {Q6_OPTIONS.map((opt, i) => {
                  const isSelected = answers[6]?.selectedId === opt.id;
                  let cls = 'fs-option-btn';
                  if (isSelected) cls += ' selected';
                  if (answers[6]?.isSubmitted && isSelected) {
                    cls += opt.isCorrect ? ' correct' : ' incorrect';
                  } else if (answers[6]?.isCorrect && opt.isCorrect) {
                    cls += ' correct';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={cls}
                      onClick={() => {
                        if (!answers[6]?.isCorrect) {
                          setAnswers((prev) => ({
                            ...prev,
                            6: { ...prev[6], selectedId: opt.id, isSubmitted: false, error: null }
                          }));
                        }
                      }}
                      disabled={answers[6]?.isCorrect}
                    >
                      <span className="fs-option-letter">{String.fromCharCode(65 + i)}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{opt.label}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--clr-text-soft, #a89e94)' }}>{opt.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {answers[6]?.error && (
                <div className="fs-inquiry-feedback error" style={{ marginTop: '0.75rem' }}>
                  <span>ℹ</span>
                  <span>{answers[6].error}</span>
                </div>
              )}

              {!answers[6]?.isCorrect && (
                <div style={{ marginTop: '0.85rem' }}>
                  <button
                    type="button"
                    className="fs-btn-primary"
                    disabled={!answers[6]?.selectedId}
                    onClick={handleCheckQ6Answer}
                  >
                    Check Answer ✓
                  </button>
                </div>
              )}

              {answers[6]?.isCorrect && (
                <div>
                  <div className="fs-inquiry-feedback success" style={{ marginTop: '0.75rem' }}>
                    <span>✓</span>
                    <span>
                      Spot on! <strong>f(x)</strong> is not multiplication. The parentheses simply show that <strong>x</strong> enters rule <strong>f</strong> as the input.
                    </span>
                  </div>

                  {/* Summary Card with f(x) evaluated values */}
                  <div className="fs-earns-card" style={{ marginTop: '0.85rem' }}>
                    <div className="fs-earns-badge">🎉 Function Notation Mastered!</div>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#ede8e3', fontSize: '1rem', fontWeight: 800 }}>
                      f(x) = {effectiveLine.equationDisplay.replace(/^y\s*=\s*/, '')}
                    </h4>
                    <p className="fs-earns-text" style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                      Here is how the three points you found look in function notation:
                    </p>

                    <table className="fs-summary-table">
                      <thead>
                        <tr>
                          <th>Input</th>
                          <th>Function Call</th>
                          <th>Computation</th>
                          <th>Output</th>
                          <th>Coordinate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {effectiveLine.inquiries.map((inq, idx) => (
                          <tr key={idx}>
                            <td>x = {inq.x}</td>
                            <td style={{ color: 'var(--clr-accent, #e8864a)', fontWeight: 700 }}>f({inq.x})</td>
                            <td style={{ color: '#a89e94' }}>
                              {effectiveLine.m}({inq.x}) {effectiveLine.c >= 0 ? `+ ${effectiveLine.c}` : `- ${Math.abs(effectiveLine.c)}`}
                            </td>
                            <td style={{ color: '#14b8a6', fontWeight: 700 }}>{inq.y}</td>
                            <td style={{ color: '#e8864a' }}>({inq.x}, {inq.y})</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between">
              <button className="fs-btn-secondary" onClick={() => setActiveStep(5)}>
                ← Back to Question 5
              </button>
              <button className="fs-btn-primary" onClick={handleResetNewJourney}>
                ✏️ Input Another Line
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
