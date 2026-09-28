import React, { useState, useRef, useEffect } from 'react';
import GeoGebraFunctionLab from './GeoGebraFunctionLab';
import {
  parseLineEquation,
  parseFunctionEquation,
  parseFunctionEvaluationInput,
  parseInverseInput,
  getInverseInquiries
} from './equationParser';
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
    title: 'Meet f(x)',
    prompt: 'Meet the Function Notation: f(x)',
    subtext: 'A cleaner way to show that x goes inside the rule.'
  },
  {
    id: 7,
    phase: 'Phase 4: Function Studio',
    title: 'Input Your Function',
    prompt: 'Define Your Function: f(x) = ...',
    subtext: 'Type a function starting with f(x) = (for example: f(x) = 2x + 3 or f(x) = -x + 4):'
  },
  {
    id: 8,
    phase: 'Phase 4: Function Studio',
    title: 'Evaluate f(x)',
    prompt: 'Evaluate f(2) and f(4)',
    subtext: 'Use your function rule f(x) to find outputs for inputs x = 2 and x = 4.'
  },
  {
    id: 9,
    phase: 'Phase 5: Inverse Thinking',
    title: 'Find Input a',
    prompt: 'Given f(a) = output, find input a',
    subtext: 'Work backwards from the output to find what input produced it.'
  },
  {
    id: 10,
    phase: 'Phase 5: Inverse Thinking',
    title: 'Meaning of Inverse',
    prompt: 'What is the Inverse of a Function?',
    subtext: 'When you have the output and are asked for the input.'
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

const DEFAULT_LINE = parseLineEquation('y = 2x + 1');

export default function FunctionStudioModule({ onBack }) {
  // activeStep: 1..8 corresponding to Questions 1..8
  const [activeStep, setActiveStep] = useState(1);

  // Question 1: Line input text
  const [lineEquationInput, setLineEquationInput] = useState('');
  const [activeLine, setActiveLine] = useState(null);
  const effectiveLine = activeLine || DEFAULT_LINE;
  const [lineError, setLineError] = useState(null);

  // Question 7: Function input text
  const [functionEquationInput, setFunctionEquationInput] = useState('');
  const [activeFunctionLine, setActiveFunctionLine] = useState(null);
  const [functionError, setFunctionError] = useState(null);

  // Active line/function for display
  const currentDisplayLine = (activeStep >= 7 && activeFunctionLine) ? activeFunctionLine : effectiveLine;
  const currentLineLabel = activeStep >= 6
    ? `f(x) = ${currentDisplayLine.equationDisplay.replace(/^(y|f\(x\))\s*=\s*/, '')}`
    : currentDisplayLine.equationDisplay;

  // 3 Inverse inquiries for Question 9
  const invInquiries = currentDisplayLine?.inverseInquiries || getInverseInquiries(currentDisplayLine);
  const inv1 = invInquiries[0] || { a: 2, y: 5 };
  const inv2 = invInquiries[1] || { a: -1, y: -1 };
  const inv3 = invInquiries[2] || { a: 3, y: 7 };

  // Answers for Questions 2, 3, 4, 5, 8, and 9
  const [answers, setAnswers] = useState({
    2: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
    3: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
    4: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
    5: { selectedId: null, isSubmitted: false, isCorrect: false, error: null },
    8: { val2: '', val4: '', is2Correct: false, is4Correct: false, isCorrect: false, error: null },
    9: { val1: '', val2: '', val3: '', is1Correct: false, is2Correct: false, is3Correct: false, isCorrect: false, error: null }
  });

  // Track session completed journeys
  const [completedLinesCount, setCompletedLinesCount] = useState(0);

  const lineInputRef = useRef(null);
  const q2InputRef = useRef(null);
  const q3InputRef = useRef(null);
  const q4InputRef = useRef(null);
  const q7InputRef = useRef(null);
  const q8Val2Ref = useRef(null);
  const q8Val4Ref = useRef(null);
  const q9Val1Ref = useRef(null);
  const q9Val2Ref = useRef(null);
  const q9Val3Ref = useRef(null);

  // Question 9 stage (1, 2, or 3)
  const [q9CurrentStage, setQ9CurrentStage] = useState(1);

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
    } else if (activeStep === 7 && !activeFunctionLine && q7InputRef.current) {
      q7InputRef.current.focus();
    } else if (activeStep === 8 && q8Val2Ref.current && !answers[8]?.is2Correct) {
      q8Val2Ref.current.focus();
    } else if (activeStep === 8 && q8Val4Ref.current && answers[8]?.is2Correct && !answers[8]?.is4Correct) {
      q8Val4Ref.current.focus();
    } else if (activeStep === 9 && q9CurrentStage === 1 && q9Val1Ref.current && !answers[9]?.is1Correct) {
      q9Val1Ref.current.focus();
    } else if (activeStep === 9 && q9CurrentStage === 2 && q9Val2Ref.current && !answers[9]?.is2Correct) {
      q9Val2Ref.current.focus();
    } else if (activeStep === 9 && q9CurrentStage === 3 && q9Val3Ref.current && !answers[9]?.is3Correct) {
      q9Val3Ref.current.focus();
    }
  }, [activeStep, activeLine, activeFunctionLine, answers, q9CurrentStage]);

  // Question completion criteria
  const isQuestionComplete = (qId) => {
    if (qId === 1) return Boolean(activeLine);
    if (qId === 6) return Boolean(answers[5]?.isCorrect);
    if (qId === 7) return Boolean(activeFunctionLine);
    if (qId === 8) return Boolean(answers[8]?.isCorrect);
    if (qId === 9 || qId === 10) return Boolean(answers[9]?.isCorrect);
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
  if (activeStep < 7) {
    if (answers[2]?.isCorrect && inq1) {
      verifiedPoints.push({ name: 'P_1', label: `(${inq1.x}, ${inq1.y})`, x: inq1.x, y: inq1.y });
    }
    if (answers[3]?.isCorrect && inq2) {
      verifiedPoints.push({ name: 'P_2', label: `(${inq2.x}, ${inq2.y})`, x: inq2.x, y: inq2.y });
    }
    if (answers[4]?.isCorrect && inq3) {
      verifiedPoints.push({ name: 'P_3', label: `(${inq3.x}, ${inq3.y})`, x: inq3.x, y: inq3.y });
    }
  } else if (activeStep === 8) {
    if (answers[8]?.is2Correct && currentDisplayLine) {
      verifiedPoints.push({
        name: 'Pt_eval2',
        label: `f(2) = ${currentDisplayLine.eval2}`,
        x: 2,
        y: currentDisplayLine.eval2
      });
    }
    if (answers[8]?.is4Correct && currentDisplayLine) {
      verifiedPoints.push({
        name: 'Pt_eval4',
        label: `f(4) = ${currentDisplayLine.eval4}`,
        x: 4,
        y: currentDisplayLine.eval4
      });
    }
  } else if (activeStep === 9 || activeStep === 10) {
    if ((activeStep === 10 || answers[9]?.is3Correct) && currentDisplayLine) {
      verifiedPoints.push(
        { name: 'Pt_eval_a1', label: `f(${inv1.a}) = ${inv1.y}`, x: inv1.a, y: inv1.y },
        { name: 'Pt_eval_a2', label: `f(${inv2.a}) = ${inv2.y}`, x: inv2.a, y: inv2.y },
        { name: 'Pt_eval_a3', label: `f(${inv3.a}) = ${inv3.y}`, x: inv3.a, y: inv3.y }
      );
    } else if (q9CurrentStage === 1 && answers[9]?.is1Correct && currentDisplayLine) {
      verifiedPoints.push({
        name: 'Pt_eval_a',
        label: `f(a) = ${inv1.y} ⇒ a = ${inv1.a}`,
        x: inv1.a,
        y: inv1.y
      });
    } else if (q9CurrentStage === 2 && answers[9]?.is2Correct && currentDisplayLine) {
      verifiedPoints.push({
        name: 'Pt_eval_a',
        label: `f(a) = ${inv2.y} ⇒ a = ${inv2.a}`,
        x: inv2.a,
        y: inv2.y
      });
    } else if (q9CurrentStage === 3 && answers[9]?.is3Correct && currentDisplayLine) {
      verifiedPoints.push({
        name: 'Pt_eval_a',
        label: `f(a) = ${inv3.y} ⇒ a = ${inv3.a}`,
        x: inv3.a,
        y: inv3.y
      });
    }
  }

  // Determine what to graph on the GeoGebra canvas
  const getGgbActiveLine = () => {
    if (activeStep === 1) {
      if (!activeLine) return null;
      return {
        id: 'mainGraphLine',
        cmd: activeLine.ggbCmd,
        label: activeLine.equationDisplay
      };
    }
    if (activeStep >= 2 && activeStep <= 5) {
      return {
        id: 'mainGraphLine',
        cmd: effectiveLine.ggbCmd,
        label: effectiveLine.equationDisplay
      };
    }
    if (activeStep === 6) {
      return {
        id: 'mainGraphLine',
        cmd: effectiveLine.ggbCmd,
        label: `f(x) = ${effectiveLine.equationDisplay.replace(/^y\s*=\s*/, '')}`
      };
    }
    if (activeStep === 7) {
      if (!activeFunctionLine) return null;
      return {
        id: 'mainGraphLine',
        cmd: activeFunctionLine.ggbCmd,
        label: activeFunctionLine.equationDisplay
      };
    }
    if (activeStep >= 8) {
      const lineToUse = activeFunctionLine || effectiveLine;
      return {
        id: 'mainGraphLine',
        cmd: lineToUse.ggbCmd,
        label: lineToUse.equationDisplay.startsWith('f(x)')
          ? lineToUse.equationDisplay
          : `f(x) = ${lineToUse.equationDisplay.replace(/^y\s*=\s*/, '')}`
      };
    }
    return null;
  };

  // Target X for vertical guideline
  const getTargetX = () => {
    if (activeStep === 2 && !answers[2]?.isCorrect && inq1) return inq1.x;
    if (activeStep === 3 && !answers[3]?.isCorrect && inq2) return inq2.x;
    if (activeStep === 4 && !answers[4]?.isCorrect && inq3) return inq3.x;
    if (activeStep === 8) {
      if (!answers[8]?.is2Correct) return 2;
      if (!answers[8]?.is4Correct) return 4;
    }
    if (activeStep === 9) {
      if (q9CurrentStage === 1 && answers[9]?.is1Correct) return inv1.a;
      if (q9CurrentStage === 2 && answers[9]?.is2Correct) return inv2.a;
      if (q9CurrentStage === 3 && answers[9]?.is3Correct) return inv3.a;
    }
    return null;
  };

  // Target Y for horizontal guideline (Question 9 inverse thinking)
  const getTargetY = () => {
    if (activeStep === 9 && currentDisplayLine) {
      if (q9CurrentStage === 1) return inv1.y;
      if (q9CurrentStage === 2) return inv2.y;
      if (q9CurrentStage === 3 && !answers[9]?.is3Correct) return inv3.y;
    }
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
    setAnswers((prev) => ({
      ...prev,
      2: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      3: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      4: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      5: { selectedId: null, isSubmitted: false, isCorrect: false, error: null }
    }));
  };

  // Handle Q7 Function Submission
  const handlePlotFunction = (e) => {
    if (e) e.preventDefault();
    const raw = functionEquationInput.trim();
    const parsed = parseFunctionEquation(raw);

    if (!parsed.success) {
      setFunctionError(parsed.error);
      return;
    }

    setActiveFunctionLine(parsed);
    setFunctionError(null);

    setAnswers((prev) => ({
      ...prev,
      8: { val2: '', val4: '', is2Correct: false, is4Correct: false, isCorrect: false, error: null }
    }));
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

  // Handle Q5 Instant Selection
  const handleSelectQ5Option = (selectedId) => {
    if (answers[5]?.isCorrect) return;

    const selectedOpt = Q5_OPTIONS.find((opt) => opt.id === selectedId);
    if (!selectedOpt) return;

    if (selectedOpt.isCorrect) {
      setAnswers((prev) => ({
        ...prev,
        5: { selectedId, isSubmitted: true, isCorrect: true, error: null }
      }));
      setCompletedLinesCount((prev) => prev + 1);
    } else {
      setAnswers((prev) => ({
        ...prev,
        5: {
          selectedId,
          isSubmitted: true,
          isCorrect: false,
          error: selectedOpt.feedback
        }
      }));
    }
  };

  // Handle Q8 f(2) Submission (GeoGebra convention)
  const handleCheckQ8Val2 = (e) => {
    if (e) e.preventDefault();
    const currentAns = answers[8];
    if (currentAns?.is2Correct) return;

    const raw = currentAns?.val2 || '';
    const res = parseFunctionEvaluationInput(raw, 2, currentDisplayLine);

    if (!res.success) {
      setAnswers((prev) => ({
        ...prev,
        8: { ...prev[8], error: res.error }
      }));
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      8: {
        ...prev[8],
        is2Correct: true,
        error: null
      }
    }));
  };

  // Handle Q8 f(4) Submission (GeoGebra convention)
  const handleCheckQ8Val4 = (e) => {
    if (e) e.preventDefault();
    const currentAns = answers[8];
    if (currentAns?.is4Correct) return;

    const raw = currentAns?.val4 || '';
    const res = parseFunctionEvaluationInput(raw, 4, currentDisplayLine);

    if (!res.success) {
      setAnswers((prev) => ({
        ...prev,
        8: { ...prev[8], error: res.error }
      }));
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      8: {
        ...prev[8],
        is4Correct: true,
        isCorrect: true,
        error: null
      }
    }));
    setCompletedLinesCount((prev) => prev + 1);
  };

  // Handle proceeding from Stage 1 to Stage 2 (user click)
  const handleProceedToStage2 = () => {
    setQ9CurrentStage(2);
  };

  // Handle proceeding from Stage 2 to Stage 3 (user click)
  const handleProceedToStage3 = () => {
    setQ9CurrentStage(3);
  };

  // Handle Q9 Inverse Round 1 Submission
  const handleCheckQ9Val1 = (e) => {
    if (e) e.preventDefault();
    const currentAns = answers[9];
    if (currentAns?.is1Correct) return;

    const raw = currentAns?.val1 || '';
    const res = parseInverseInput(raw, inv1.a, inv1.y, currentDisplayLine);

    if (!res.success) {
      setAnswers((prev) => ({
        ...prev,
        9: { ...prev[9], error: res.error }
      }));
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      9: {
        ...prev[9],
        is1Correct: true,
        error: null
      }
    }));
  };

  // Handle Q9 Inverse Round 2 Submission
  const handleCheckQ9Val2 = (e) => {
    if (e) e.preventDefault();
    const currentAns = answers[9];
    if (currentAns?.is2Correct) return;

    const raw = currentAns?.val2 || '';
    const res = parseInverseInput(raw, inv2.a, inv2.y, currentDisplayLine);

    if (!res.success) {
      setAnswers((prev) => ({
        ...prev,
        9: { ...prev[9], error: res.error }
      }));
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      9: {
        ...prev[9],
        is2Correct: true,
        error: null
      }
    }));
  };

  // Handle Q9 Inverse Round 3 Submission
  const handleCheckQ9Val3 = (e) => {
    if (e) e.preventDefault();
    const currentAns = answers[9];
    if (currentAns?.is3Correct) return;

    const raw = currentAns?.val3 || '';
    const res = parseInverseInput(raw, inv3.a, inv3.y, currentDisplayLine);

    if (!res.success) {
      setAnswers((prev) => ({
        ...prev,
        9: { ...prev[9], error: res.error }
      }));
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      9: {
        ...prev[9],
        is3Correct: true,
        isCorrect: true,
        error: null
      }
    }));
    setCompletedLinesCount((prev) => prev + 1);
  };

  // Reset to input another line
  const handleResetNewJourney = () => {
    setQ9CurrentStage(1);
    setActiveLine(null);
    setLineEquationInput('');
    setLineError(null);
    setActiveFunctionLine(null);
    setFunctionEquationInput('');
    setFunctionError(null);
    setAnswers({
      2: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      3: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      4: { yVal: '', isSubmitted: false, isCorrect: false, error: null },
      5: { selectedId: null, isSubmitted: false, isCorrect: false, error: null },
      8: { val2: '', val4: '', is2Correct: false, is4Correct: false, isCorrect: false, error: null },
      9: { val1: '', val2: '', val3: '', is1Correct: false, is2Correct: false, is3Correct: false, isCorrect: false, error: null }
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
            {activeStep === 1 && activeLine && (
              <span className="fs-card-line-badge">{activeLine.equationDisplay}</span>
            )}
            {activeStep >= 2 && activeStep <= 5 && (
              <span className="fs-card-line-badge">{effectiveLine.equationDisplay}</span>
            )}
            {activeStep === 6 && (
              <span className="fs-card-line-badge">{`f(x) = ${effectiveLine.equationDisplay.replace(/^y\s*=\s*/, '')}`}</span>
            )}
            {activeStep === 7 && activeFunctionLine && (
              <span className="fs-card-line-badge">{activeFunctionLine.equationDisplay}</span>
            )}
            {activeStep >= 8 && (
              <span className="fs-card-line-badge">{currentLineLabel}</span>
            )}
          </div>
          <span className="fs-question-num">{`Question ${activeStep} of ${QUESTIONS_META.length}`}</span>
        </div>

        {/* 1. GRAPH AT TOP (Centered isometric Cartesian canvas) */}
        {activeStep !== 6 && activeStep < 10 && (
          <GeoGebraFunctionLab
            activeLine={getGgbActiveLine()}
            targetX={getTargetX()}
            targetY={getTargetY()}
            verifiedPoints={verifiedPoints}
            showInputBar={false}
            compact={activeStep === 8}
          />
        )}

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
                    onClick={() => handleSelectQ5Option(opt.id)}
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

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between" style={{ marginTop: '1.25rem' }}>
              <button className="fs-btn-secondary" onClick={() => setActiveStep(5)}>
                ← Back to Question 5
              </button>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button className="fs-btn-secondary" onClick={handleResetNewJourney}>
                  ✏️ Input Another Line
                </button>
                <button className="fs-btn-primary" onClick={() => setActiveStep(7)}>
                  Continue to Question 7 →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 7: INPUT YOUR FUNCTION f(x) = ...          */}
        {/* =================================================== */}
        {activeStep === 7 && (
          <div className="fs-step-intro-block">
            {activeFunctionLine ? (
              <>
                <div className="fs-equation-pill-bar">
                  <span className="fs-equation-pill-label">Function Notation:</span>
                  <span className="fs-equation-pill-val">{activeFunctionLine.equationDisplay}</span>
                </div>
                <h3 className="fs-step-heading">
                  Your Function: <span className="fs-equation-highlight">{activeFunctionLine.equationDisplay}</span>
                </h3>
                <p className="fs-step-subtext">
                  Your function <strong style={{ color: '#e8864a' }}>{activeFunctionLine.equationDisplay}</strong> is drawn on the canvas. Click Continue to evaluate inputs.
                </p>
              </>
            ) : (
              <>
                <h3 className="fs-step-heading">
                  Enter your function definition using f(x) = notation:
                </h3>
                <p className="fs-step-subtext">
                  Type the complete function starting with <strong>f(x) =</strong> (for example: <code>f(x) = 2x + 3</code> or <code>f(x) = -x + 1</code>):
                </p>
              </>
            )}

            {!activeFunctionLine && (
              <>
                <form className="fs-tray-input-row" onSubmit={handlePlotFunction} style={{ marginTop: '0.85rem' }}>
                  <input
                    ref={q7InputRef}
                    type="text"
                    className="fs-tray-input-box"
                    placeholder="e.g. f(x) = 2x + 3 or f(x) = -x + 1"
                    value={functionEquationInput}
                    onChange={(e) => {
                      setFunctionEquationInput(e.target.value);
                      if (functionError) setFunctionError(null);
                    }}
                  />
                  <button type="submit" className="fs-tray-submit-btn">
                    Plot Function 🚀
                  </button>
                </form>

                {functionError && (
                  <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                    <span>ℹ</span>
                    <span>{functionError}</span>
                  </div>
                )}
              </>
            )}

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between">
              <button className="fs-btn-secondary" onClick={() => setActiveStep(6)}>
                ← Back to Question 6
              </button>
              <button
                className="fs-btn-primary"
                disabled={!activeFunctionLine}
                onClick={() => setActiveStep(8)}
              >
                Continue to Question 8 →
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* =================================================== */}
        {/* QUESTION 8: EVALUATE f(2) AND f(4)                  */}
        {/* =================================================== */}
        {activeStep === 8 && (
          <div className="fs-step-intro-block">
            <div className="fs-equation-pill-bar">
              <span className="fs-equation-pill-label">Active Function:</span>
              <span className="fs-equation-pill-val">{currentLineLabel}</span>
            </div>

            {/* Dynamic Step Heading & Subtext */}
            {!answers[8]?.is2Correct && (
              <>
                <h3 className="fs-step-heading">
                  Call your function with <span className="fs-equation-highlight">x = 2</span>
                </h3>
                <p className="fs-step-subtext">
                  In GeoGebra, type <code>f(2)</code> to evaluate the output for input <strong>x = 2</strong>:
                </p>
              </>
            )}

            {answers[8]?.is2Correct && !answers[8]?.is4Correct && (
              <>
                <h3 className="fs-step-heading">
                  Call your function with <span className="fs-equation-highlight">x = 4</span>
                </h3>
                <p className="fs-step-subtext">
                  Now type <code>f(4)</code> to evaluate the output for input <strong>x = 4</strong>:
                </p>
              </>
            )}

            {answers[8]?.is4Correct && (
              <>
                <h3 className="fs-step-heading">
                  Function Evaluation Complete 🎉
                </h3>
                <p className="fs-step-subtext">
                  You evaluated both <strong>f(2)</strong> and <strong>f(4)</strong> on your function.
                </p>
              </>
            )}

            {/* GeoGebra Algebra View Output Panel */}
            <div className="fs-ggb-algebra-panel" style={{ marginTop: '0.85rem' }}>
              <span className="fs-ggb-algebra-title">
                📐 GeoGebra Algebra View
              </span>

              {/* Function Rule Entry */}
              <div className="fs-ggb-algebra-item">
                <div className="fs-ggb-gutter">
                  <div className="fs-ggb-vis-circle line" />
                </div>
                <div className="fs-ggb-algebra-body">
                  <div className="fs-ggb-algebra-row">
                    <span className="fs-ggb-algebra-expr">{currentLineLabel}</span>
                    <span className="fs-ggb-algebra-dots">⋮</span>
                  </div>
                </div>
              </div>

              {/* f(2) evaluation entry (visible once f(2) is given) */}
              {answers[8]?.is2Correct && (
                <div className="fs-ggb-algebra-item">
                  <div className="fs-ggb-gutter">
                    <div className="fs-ggb-vis-circle" />
                  </div>
                  <div className="fs-ggb-algebra-body">
                    <div className="fs-ggb-algebra-row">
                      <span className="fs-ggb-algebra-expr">f(2)</span>
                      <span className="fs-ggb-algebra-dots">⋮</span>
                    </div>
                    <div className="fs-ggb-algebra-result">
                      <span className="eq">=</span>
                      <span className="val">{currentDisplayLine?.eval2}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* f(4) evaluation entry (visible once f(4) is given) */}
              {answers[8]?.is4Correct && (
                <div className="fs-ggb-algebra-item">
                  <div className="fs-ggb-gutter">
                    <div className="fs-ggb-vis-circle" />
                  </div>
                  <div className="fs-ggb-algebra-body">
                    <div className="fs-ggb-algebra-row">
                      <span className="fs-ggb-algebra-expr">f(4)</span>
                      <span className="fs-ggb-algebra-dots">⋮</span>
                    </div>
                    <div className="fs-ggb-algebra-result">
                      <span className="eq">=</span>
                      <span className="val">{currentDisplayLine?.eval4}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Inquiry 1: f(2) */}
            {!answers[8]?.is2Correct && (
              <div style={{ marginTop: '0.85rem' }}>
                <form className="fs-tray-input-row" onSubmit={handleCheckQ8Val2}>
                  <input
                    ref={q8Val2Ref}
                    type="text"
                    className="fs-tray-input-box"
                    placeholder="e.g. f(2)"
                    value={answers[8]?.val2 || ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        8: { ...prev[8], val2: e.target.value, error: null }
                      }))
                    }
                  />
                  <button type="submit" className="fs-tray-submit-btn">
                    Evaluate f(2) ➔
                  </button>
                </form>

                {answers[8]?.error && !answers[8]?.is2Correct && (
                  <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                    <span>ℹ</span>
                    <span>{answers[8].error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Inquiry 2: f(4) (Only shown once f(2) is correct) */}
            {answers[8]?.is2Correct && !answers[8]?.is4Correct && (
              <div style={{ marginTop: '0.85rem' }}>
                <div className="fs-inquiry-feedback success" style={{ marginBottom: '0.75rem' }}>
                  <span>✓</span>
                  <span>Point (2, {currentDisplayLine?.eval2}) is pinned on the grid!</span>
                </div>

                <form className="fs-tray-input-row" onSubmit={handleCheckQ8Val4}>
                  <input
                    ref={q8Val4Ref}
                    type="text"
                    className="fs-tray-input-box"
                    placeholder="e.g. f(4)"
                    value={answers[8]?.val4 || ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        8: { ...prev[8], val4: e.target.value, error: null }
                      }))
                    }
                  />
                  <button type="submit" className="fs-tray-submit-btn">
                    Evaluate f(4) ➔
                  </button>
                </form>

                {answers[8]?.error && (
                  <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                    <span>ℹ</span>
                    <span>{answers[8].error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Complete Card when both f(2) and f(4) are correct */}
            {answers[8]?.is4Correct && (
              <div style={{ marginTop: '0.85rem' }}>
                <div className="fs-inquiry-feedback success">
                  <span>✓</span>
                  <span>Fantastic! GeoGebra evaluated <strong>f(2) = {currentDisplayLine?.eval2}</strong> and <strong>f(4) = {currentDisplayLine?.eval4}</strong>!</span>
                </div>

                <div className="fs-earns-card" style={{ marginTop: '0.85rem' }}>
                  <div className="fs-earns-badge">🎉 Function Evaluation Complete!</div>
                  <h4 style={{ margin: '0 0 0.35rem 0', color: '#ede8e3', fontSize: '1rem', fontWeight: 800 }}>
                    {currentLineLabel}
                  </h4>

                  <table className="fs-summary-table" style={{ marginTop: '0.5rem' }}>
                    <thead>
                      <tr>
                        <th>Input (x)</th>
                        <th>Function Call</th>
                        <th>Rule Computation</th>
                        <th>Output Value</th>
                        <th>Grid Coordinate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>x = 2</td>
                        <td style={{ color: 'var(--clr-accent, #e8864a)', fontWeight: 700 }}>f(2)</td>
                        <td style={{ color: '#a89e94' }}>{currentDisplayLine?.m}(2) {currentDisplayLine?.c >= 0 ? `+ ${currentDisplayLine?.c}` : `- ${Math.abs(currentDisplayLine?.c)}`}</td>
                        <td style={{ color: '#14b8a6', fontWeight: 700 }}>{currentDisplayLine?.eval2}</td>
                        <td style={{ color: '#e8864a' }}>(2, {currentDisplayLine?.eval2})</td>
                      </tr>
                      <tr>
                        <td>x = 4</td>
                        <td style={{ color: 'var(--clr-accent, #e8864a)', fontWeight: 700 }}>f(4)</td>
                        <td style={{ color: '#a89e94' }}>{currentDisplayLine?.m}(4) {currentDisplayLine?.c >= 0 ? `+ ${currentDisplayLine?.c}` : `- ${Math.abs(currentDisplayLine?.c)}`}</td>
                        <td style={{ color: '#14b8a6', fontWeight: 700 }}>{currentDisplayLine?.eval4}</td>
                        <td style={{ color: '#e8864a' }}>(4, {currentDisplayLine?.eval4})</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between" style={{ marginTop: '1.25rem' }}>
              <button className="fs-btn-secondary" onClick={() => setActiveStep(7)}>
                ← Back to Question 7
              </button>
              <button
                className="fs-btn-primary"
                onClick={() => setActiveStep(9)}
                disabled={!answers[8]?.is4Correct}
              >
                Continue to Question 9 →
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 9: INVERSE THINKING - FIND INPUT a         */}
        {/* =================================================== */}
        {activeStep === 9 && (
          <div className="fs-step-intro-block">
            {/* Dynamic heading based on current stage */}
            <h3 className="fs-step-heading">
              {q9CurrentStage === 1 && `What if you know f(a) = ${inv1.y}? Can you tell "a"?`}
              {q9CurrentStage === 2 && `Now what if you know f(a) = ${inv2.y}? Can you tell "a"?`}
              {q9CurrentStage === 3 && !answers[9]?.is3Correct && `One more: what if you know f(a) = ${inv3.y}? Can you tell "a"?`}
              {answers[9]?.is3Correct && `Inverse Thinking: Finding Input a`}
            </h3>
            <p className="fs-step-subtext">
              {q9CurrentStage === 1 && `Trace backwards from the output on the graph to find what input a produces it.`}
              {q9CurrentStage === 2 && `Trace along the horizontal guideline at y = ${inv2.y} to find what input a produces it.`}
              {q9CurrentStage === 3 && !answers[9]?.is3Correct && `Trace along the horizontal guideline at y = ${inv3.y} to find what input a produces it.`}
              {answers[9]?.is3Correct && `Given any output y, you can work backwards along the rule to find the original input a.`}
            </p>

            {/* GeoGebra Style Algebra Panel */}
            <div className="fs-ggb-algebra-panel">
              <div className="fs-ggb-algebra-title">
                <span>GeoGebra Algebra View</span>
              </div>

              {/* Function Rule Entry */}
              <div className="fs-ggb-algebra-item">
                <div className="fs-ggb-gutter">
                  <div className="fs-ggb-vis-circle line" />
                </div>
                <div className="fs-ggb-algebra-body">
                  <div className="fs-ggb-algebra-row">
                    <span className="fs-ggb-algebra-expr">{currentLineLabel}</span>
                    <span className="fs-ggb-algebra-dots">⋮</span>
                  </div>
                </div>
              </div>

              {/* Current Output f(a) Entry (previous values get removed when starting new output) */}
              <div className="fs-ggb-algebra-item">
                <div className="fs-ggb-gutter">
                  <div className="fs-ggb-vis-circle" style={{ borderColor: '#e8864a', background: 'rgba(232, 134, 74, 0.2)' }} />
                </div>
                <div className="fs-ggb-algebra-body">
                  <div className="fs-ggb-algebra-row">
                    <span className="fs-ggb-algebra-expr">f(a)</span>
                    <span className="fs-ggb-algebra-dots">⋮</span>
                  </div>
                  <div className="fs-ggb-algebra-result">
                    <span className="eq">=</span>
                    <span className="val" style={{ color: '#e8864a' }}>
                      {q9CurrentStage === 1 ? inv1.y : q9CurrentStage === 2 ? inv2.y : inv3.y}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resolved a Entry for Current Output (only shown once current stage is correct) */}
              {((q9CurrentStage === 1 && answers[9]?.is1Correct) ||
                (q9CurrentStage === 2 && answers[9]?.is2Correct) ||
                (q9CurrentStage === 3 && answers[9]?.is3Correct)) && (
                <div className="fs-ggb-algebra-item">
                  <div className="fs-ggb-gutter">
                    <div className="fs-ggb-vis-circle" />
                  </div>
                  <div className="fs-ggb-algebra-body">
                    <div className="fs-ggb-algebra-row">
                      <span className="fs-ggb-algebra-expr">a</span>
                      <span className="fs-ggb-algebra-dots">⋮</span>
                    </div>
                    <div className="fs-ggb-algebra-result">
                      <span className="eq">=</span>
                      <span className="val">
                        {q9CurrentStage === 1 ? inv1.a : q9CurrentStage === 2 ? inv2.a : inv3.a}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* STAGE 1: Find a for inv1.y */}
            {q9CurrentStage === 1 && (
              <div style={{ marginTop: '0.85rem' }}>
                {!answers[9]?.is1Correct ? (
                  <>
                    <form className="fs-tray-input-row" onSubmit={handleCheckQ9Val1}>
                      <input
                        ref={q9Val1Ref}
                        type="text"
                        className="fs-tray-input-box"
                        placeholder={`e.g. a = ${inv1.a} or ${inv1.a}`}
                        value={answers[9]?.val1 || ''}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            9: { ...prev[9], val1: e.target.value, error: null }
                          }))
                        }
                      />
                      <button type="submit" className="fs-tray-submit-btn">
                        Find a ➔
                      </button>
                    </form>

                    {answers[9]?.error && (
                      <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                        <span>ℹ</span>
                        <span>{answers[9].error}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="fs-inquiry-feedback success"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>✓</span>
                      <span>Correct! For <strong>f(a) = {inv1.y}</strong>, input <strong>a = {inv1.a}</strong>. Point ({inv1.a}, {inv1.y}) pinned!</span>
                    </div>
                    <button
                      type="button"
                      className="fs-tray-submit-btn"
                      style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}
                      onClick={handleProceedToStage2}
                    >
                      Next Output (y = {inv2.y}) ➔
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 2: Find a for inv2.y */}
            {q9CurrentStage === 2 && (
              <div style={{ marginTop: '0.85rem' }}>
                {!answers[9]?.is2Correct ? (
                  <>
                    <form className="fs-tray-input-row" onSubmit={handleCheckQ9Val2}>
                      <input
                        ref={q9Val2Ref}
                        type="text"
                        className="fs-tray-input-box"
                        placeholder={`e.g. a = ${inv2.a} or ${inv2.a}`}
                        value={answers[9]?.val2 || ''}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            9: { ...prev[9], val2: e.target.value, error: null }
                          }))
                        }
                      />
                      <button type="submit" className="fs-tray-submit-btn">
                        Find a ➔
                      </button>
                    </form>

                    {answers[9]?.error && (
                      <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                        <span>ℹ</span>
                        <span>{answers[9].error}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="fs-inquiry-feedback success"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>✓</span>
                      <span>Correct! For <strong>f(a) = {inv2.y}</strong>, input <strong>a = {inv2.a}</strong>. Point ({inv2.a}, {inv2.y}) pinned!</span>
                    </div>
                    <button
                      type="button"
                      className="fs-tray-submit-btn"
                      style={{ padding: '0.35rem 0.85rem', fontSize: '0.85rem' }}
                      onClick={handleProceedToStage3}
                    >
                      Next Output (y = {inv3.y}) ➔
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 3: Find a for inv3.y */}
            {q9CurrentStage === 3 && !answers[9]?.is3Correct && (
              <div style={{ marginTop: '0.85rem' }}>
                <form className="fs-tray-input-row" onSubmit={handleCheckQ9Val3}>
                  <input
                    ref={q9Val3Ref}
                    type="text"
                    className="fs-tray-input-box"
                    placeholder={`e.g. a = ${inv3.a} or ${inv3.a}`}
                    value={answers[9]?.val3 || ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        9: { ...prev[9], val3: e.target.value, error: null }
                      }))
                    }
                  />
                  <button type="submit" className="fs-tray-submit-btn">
                    Find a ➔
                  </button>
                </form>

                {answers[9]?.error && (
                  <div className="fs-inquiry-feedback error" style={{ marginTop: '0.65rem' }}>
                    <span>ℹ</span>
                    <span>{answers[9].error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Complete Card when all 3 inquiries are correct */}
            {answers[9]?.is3Correct && (
              <div style={{ marginTop: '0.85rem' }}>
                <div className="fs-inquiry-feedback success">
                  <span>✓</span>
                  <span>Point ({inv3.a}, {inv3.y}) confirmed! All 3 points found on the line!</span>
                </div>

                <div className="fs-earns-card" style={{ marginTop: '0.85rem' }}>
                  <div className="fs-earns-badge">🎯 The Big Discovery!</div>
                  <h4 style={{ margin: '0 0 0.35rem 0', color: '#ede8e3', fontSize: '1rem', fontWeight: 800 }}>
                    This is exactly what the Inverse of a Function means!
                  </h4>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#a89e94', fontSize: '0.875rem' }}>
                    When you have the output and are asked for the input, you are finding the inverse.
                  </p>

                  <table className="fs-summary-table" style={{ marginTop: '0.5rem' }}>
                    <thead>
                      <tr>
                        <th>Output f(a)</th>
                        <th>Equation to Solve</th>
                        <th>Input (a)</th>
                        <th>Grid Coordinate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ color: '#e8864a', fontWeight: 700 }}>f(a) = {inv1.y}</td>
                        <td style={{ color: '#a89e94' }}>{currentDisplayLine?.m}a {currentDisplayLine?.c >= 0 ? `+ ${currentDisplayLine?.c}` : `- ${Math.abs(currentDisplayLine?.c)}`} = {inv1.y}</td>
                        <td style={{ color: '#14b8a6', fontWeight: 700 }}>a = {inv1.a}</td>
                        <td style={{ color: '#e8864a' }}>({inv1.a}, {inv1.y})</td>
                      </tr>
                      <tr>
                        <td style={{ color: '#e8864a', fontWeight: 700 }}>f(a) = {inv2.y}</td>
                        <td style={{ color: '#a89e94' }}>{currentDisplayLine?.m}a {currentDisplayLine?.c >= 0 ? `+ ${currentDisplayLine?.c}` : `- ${Math.abs(currentDisplayLine?.c)}`} = {inv2.y}</td>
                        <td style={{ color: '#14b8a6', fontWeight: 700 }}>a = {inv2.a}</td>
                        <td style={{ color: '#e8864a' }}>({inv2.a}, {inv2.y})</td>
                      </tr>
                      <tr>
                        <td style={{ color: '#e8864a', fontWeight: 700 }}>f(a) = {inv3.y}</td>
                        <td style={{ color: '#a89e94' }}>{currentDisplayLine?.m}a {currentDisplayLine?.c >= 0 ? `+ ${currentDisplayLine?.c}` : `- ${Math.abs(currentDisplayLine?.c)}`} = {inv3.y}</td>
                        <td style={{ color: '#14b8a6', fontWeight: 700 }}>a = {inv3.a}</td>
                        <td style={{ color: '#e8864a' }}>({inv3.a}, {inv3.y})</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between" style={{ marginTop: '1.25rem' }}>
              <button className="fs-btn-secondary" onClick={() => setActiveStep(8)}>
                ← Back to Question 8
              </button>
              <button
                className="fs-btn-primary"
                onClick={() => setActiveStep(10)}
                disabled={!answers[9]?.is3Correct}
              >
                Continue to Question 10 →
              </button>
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* QUESTION 10: WHAT IS THE INVERSE OF A FUNCTION?     */}
        {/* =================================================== */}
        {activeStep === 10 && (
          <div className="fs-step-intro-block">
            {/* Visual Handover & Intuition Container */}
            <div className="fs-handover-box">
              <span className="fs-handover-badge">🔄 Core Revelation</span>
              <h3 className="fs-handover-title">
                What does the <span style={{ color: 'var(--clr-accent, #e8864a)' }}>Inverse</span> of a Function mean?
              </h3>

              {/* Success Callout Banner */}
              <div
                className="fs-inquiry-feedback success"
                style={{
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  marginBottom: '1.15rem'
                }}
              >
                <span>💡</span>
                <span>
                  <strong>Inverse of a Function:</strong> When you have the <strong>output</strong> and are asked for the <strong>input</strong>!
                </span>
              </div>

              {/* Visual Transformation Flow: Forward vs. Inverse */}
              <div className="fs-notation-flow">
                <div className="fs-flow-card">
                  <span className="fs-flow-tag">Forward Function f(x)</span>
                  <span className="fs-flow-math">Input (x) ➔ Output (y)</span>
                  <span className="fs-flow-note">Given x, evaluate to get y</span>
                </div>

                <span className="fs-flow-arrow">⇄</span>

                <div className="fs-flow-card new">
                  <span className="fs-flow-tag highlight">Inverse Thinking</span>
                  <span className="fs-flow-math highlight">Output (y) ➔ Input (x)</span>
                  <span className="fs-flow-note" style={{ color: 'var(--clr-accent, #e8864a)', fontWeight: 600 }}>
                    Given y, solve backwards for x
                  </span>
                </div>
              </div>

              {/* Machine Diagram (Running in reverse) */}
              <div className="fs-machine-diagram">
                <div className="fs-diagram-box output-box">
                  <span className="fs-diagram-label">KNOWN OUTPUT</span>
                  <span className="fs-diagram-val">y = f(a)</span>
                </div>
                <span className="fs-diagram-arrow">──▶</span>
                <div className="fs-diagram-box machine-box">
                  <span className="fs-diagram-label">REVERSE THE RULE</span>
                  <span className="fs-diagram-val">Solve for a</span>
                </div>
                <span className="fs-diagram-arrow">──▶</span>
                <div className="fs-diagram-box input-box">
                  <span className="fs-diagram-label">INPUT FOUND</span>
                  <span className="fs-diagram-val">a</span>
                </div>
              </div>
            </div>

            {/* Step Footer Navigation */}
            <div className="fs-step-footer-actions between" style={{ marginTop: '1.25rem' }}>
              <button className="fs-btn-secondary" onClick={() => setActiveStep(9)}>
                ← Back to Question 9
              </button>
              <button className="fs-btn-primary" onClick={handleResetNewJourney}>
                ✏️ Input Another Line / Function
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
