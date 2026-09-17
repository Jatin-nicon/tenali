import React, { useState, useMemo, useRef, useEffect } from 'react';
import { INITIAL_QUESTIONS } from './questions';
import './LinearAlgebraModule.css';

/**
 * Visual Vector Canvas Component
 * Plots 2D coordinate grid, vectors with arrows, span lines, and target markers.
 */
function VectorCanvas({ visual }) {
  if (!visual) return null;

  const width = 420;
  const height = 230;
  const xMin = visual.xRange ? visual.xRange[0] : -5;
  const xMax = visual.xRange ? visual.xRange[1] : 5;
  const yMin = visual.yRange ? visual.yRange[0] : -5;
  const yMax = visual.yRange ? visual.yRange[1] : 5;

  const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * width;
  const toSvgY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  // Grid tick steps
  const xTicks = [];
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    if (x !== 0) xTicks.push(x);
  }
  const yTicks = [];
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    if (y !== 0) yTicks.push(y);
  }

  return (
    <div className="la-visualizer-container">
      <svg className="la-visualizer-svg" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <marker
            id="arrow-blue"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#3b82f6" />
          </marker>
          <marker
            id="arrow-green"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
          </marker>
          <marker
            id="arrow-amber"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
          </marker>
          <marker
            id="arrow-red"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
          </marker>
          <marker
            id="arrow-cyan"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
          </marker>
          <marker
            id="arrow-purple"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* Grid lines */}
        {xTicks.map((x) => (
          <line
            key={`grid-x-${x}`}
            x1={toSvgX(x)}
            y1={0}
            x2={toSvgX(x)}
            y2={height}
            stroke="rgba(255, 245, 230, 0.05)"
            strokeWidth="1"
          />
        ))}
        {yTicks.map((y) => (
          <line
            key={`grid-y-${y}`}
            x1={0}
            y1={toSvgY(y)}
            x2={width}
            y2={toSvgY(y)}
            stroke="rgba(255, 245, 230, 0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Main Axes */}
        <line
          x1={0}
          y1={originY}
          x2={width}
          y2={originY}
          stroke="rgba(255, 245, 230, 0.25)"
          strokeWidth="1.5"
        />
        <line
          x1={originX}
          y1={0}
          x2={originX}
          y2={height}
          stroke="rgba(255, 245, 230, 0.25)"
          strokeWidth="1.5"
        />

        {/* Axis Labels & Ticks */}
        {xTicks.map((x) => (
          <text
            key={`tick-x-${x}`}
            x={toSvgX(x)}
            y={originY + 12}
            fill="rgba(255, 245, 230, 0.35)"
            fontSize="8"
            textAnchor="middle"
          >
            {x}
          </text>
        ))}
        {yTicks.map((y) => (
          <text
            key={`tick-y-${y}`}
            x={originX - 6}
            y={toSvgY(y) + 3}
            fill="rgba(255, 245, 230, 0.35)"
            fontSize="8"
            textAnchor="end"
          >
            {y}
          </text>
        ))}

        {/* Optional Span Line */}
        {visual.spanLine && (
          <line
            x1={toSvgX(xMin)}
            y1={toSvgY(xMin * visual.spanLine.slope)}
            x2={toSvgX(xMax)}
            y2={toSvgY(xMax * visual.spanLine.slope)}
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          />
        )}

        {/* Origin dot */}
        <circle cx={originX} cy={originY} r="3" fill="#ede8e3" />

        {/* Vectors */}
        {visual.vectors &&
          visual.vectors.map((v, i) => {
            const vx = toSvgX(v.x);
            const vy = toSvgY(v.y);
            const markerColor = v.color.includes('3b82f6')
              ? 'arrow-blue'
              : v.color.includes('10b981')
              ? 'arrow-green'
              : v.color.includes('ef4444')
              ? 'arrow-red'
              : v.color.includes('06b6d4')
              ? 'arrow-cyan'
              : v.color.includes('8b5cf6')
              ? 'arrow-purple'
              : 'arrow-amber';

            return (
              <g key={`vec-${i}`}>
                <line
                  x1={originX}
                  y1={originY}
                  x2={vx}
                  y2={vy}
                  stroke={v.color}
                  strokeWidth="2.5"
                  strokeDasharray={v.dashed ? '4 3' : 'none'}
                  markerEnd={`url(#${markerColor})`}
                />
                <circle cx={vx} cy={vy} r="2.5" fill={v.color} />
                <text
                  x={vx + (v.x >= 0 ? 6 : -6)}
                  y={vy + (v.y >= 0 ? -6 : 10)}
                  fill={v.color}
                  fontSize="9.5"
                  fontWeight="700"
                  textAnchor={v.x >= 0 ? 'start' : 'end'}
                >
                  {v.label}
                </text>
              </g>
            );
          })}

        {/* Target Marker */}
        {visual.target && (
          <g>
            <circle
              cx={toSvgX(visual.target.x)}
              cy={toSvgY(visual.target.y)}
              r="6"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="2 2"
            />
            <circle
              cx={toSvgX(visual.target.x)}
              cy={toSvgY(visual.target.y)}
              r="2.5"
              fill="#f59e0b"
            />
            <text
              x={toSvgX(visual.target.x) + 8}
              y={toSvgY(visual.target.y) + 3}
              fill="#f59e0b"
              fontSize="9"
              fontWeight="700"
            >
              {visual.target.label || 'Target'}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      {visual.vectors && (
        <div className="la-visualizer-legend">
          {visual.vectors.map((v, i) => (
            <div key={`leg-${i}`} className="la-legend-item">
              <span className="la-legend-dot" style={{ backgroundColor: v.color }} />
              <span>{v.label}</span>
            </div>
          ))}
          {visual.target && (
            <div className="la-legend-item">
              <span className="la-legend-dot" style={{ backgroundColor: '#f59e0b' }} />
              <span>{visual.target.label}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function LinearAlgebraModule({ onBack, questions = INITIAL_QUESTIONS }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const isAnswered = userAnswers[currentIndex] !== undefined;
  const isCorrect = userAnswers[currentIndex]?.isCorrect;

  const totalQuestions = questions.length;
  const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;

  const handleSelectOption = (idx) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentQ.correct;
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selected: selectedOption,
        isCorrect: correct
      }
    }));
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(userAnswers[nextIdx]?.selected ?? null);
      setSubmitted(userAnswers[nextIdx] !== undefined);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSelectedOption(userAnswers[prevIdx]?.selected ?? null);
      setSubmitted(userAnswers[prevIdx] !== undefined);
      setShowHint(false);
    }
  };

  const handleJumpTo = (idx) => {
    setCurrentIndex(idx);
    setSelectedOption(userAnswers[idx]?.selected ?? null);
    setSubmitted(userAnswers[idx] !== undefined);
    setShowHint(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setShowHint(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  if (isFinished) {
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    return (
      <div className="la-studio-wrapper">
        <div className="la-top-nav">
          {onBack && (
            <button className="la-back-btn" onClick={onBack}>
              ← Back to Tenali
            </button>
          )}
        </div>

        <div className="la-celebration-card">
          <div className="la-stars-row">
            {'⭐'.repeat(accuracy >= 80 ? 3 : accuracy >= 50 ? 2 : 1)}
          </div>
          <h2 className="la-celebration-title">Linear Algebra Studio Completed!</h2>
          <p className="la-celebration-sub">
            You solved {correctCount} out of {totalQuestions} challenges ({accuracy}% accuracy).
          </p>

          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.75rem' }}>
            <button className="la-btn-primary" onClick={handleRestart}>
              Practice Again 🔄
            </button>
            {onBack && (
              <button className="la-btn-secondary" onClick={onBack}>
                Back to Dashboard 🏠
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="la-studio-wrapper">
      {/* Top Nav */}
      <div className="la-top-nav">
        {onBack && (
          <button className="la-back-btn" onClick={onBack}>
            ← Back to Tenali
          </button>
        )}
        <div className="la-progress-badge">
          <span>Question</span>
          <strong>
            {currentIndex + 1} / {totalQuestions}
          </strong>
        </div>
      </div>

      {/* Header */}
      <div className="la-header">
        <h1 className="la-title">Linear Algebra Studio</h1>
        <p className="la-subtitle">Build deep geometric intuition through visual challenges</p>
      </div>

      {/* Segmented Progress Stepper */}
      <div className="la-stepper-bar">
        {questions.map((q, idx) => {
          const answered = userAnswers[idx];
          const isCurrent = idx === currentIndex;
          let className = 'la-step-pill';
          if (answered) className += ' completed';
          if (isCurrent) className += ' active';

          return (
            <button
              key={q.id}
              className={className}
              onClick={() => handleJumpTo(idx)}
              title={`Jump to Question ${idx + 1}: ${q.title}`}
            />
          );
        })}
      </div>

      {/* Question Card */}
      <div className="la-card">
        <div className="la-card-header">
          <span className="la-topic-badge">{currentQ.topic}</span>
          <span className="la-question-num">
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Story Scenario Hook */}
        {currentQ.story && <div className="la-story-box">{currentQ.story}</div>}

        {/* Question Prompt */}
        <h2 className="la-prompt">{currentQ.prompt}</h2>

        {/* Interactive / Visual Canvas */}
        {currentQ.visual && <VectorCanvas visual={currentQ.visual} />}

        {/* Options */}
        {currentQ.type === 'mcq' && (
          <div className="la-options-stack">
            {currentQ.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              let optionClass = 'la-option-btn';
              if (selectedOption === i) optionClass += ' selected';
              if (submitted) {
                if (i === currentQ.correct) optionClass += ' correct';
                else if (selectedOption === i) optionClass += ' incorrect';
              }

              return (
                <button
                  key={i}
                  className={optionClass}
                  onClick={() => handleSelectOption(i)}
                  disabled={submitted}
                >
                  <span className="la-option-letter">{letter}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Hint Drawer */}
        {showHint && currentQ.hint && (
          <div className="la-hint-card">
            <strong>💡 Hint: </strong>
            {currentQ.hint}
          </div>
        )}

        {/* Action Controls */}
        <div className="la-action-row">
          <button
            className="la-btn-secondary"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 'Hide Hint' : '💡 Need a Hint?'}
          </button>

          {!submitted ? (
            <button
              className="la-btn-primary"
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
            >
              Check Answer
            </button>
          ) : (
            <button className="la-btn-primary" onClick={handleNext}>
              {currentIndex < totalQuestions - 1 ? 'Next Challenge →' : 'Finish Studio 🏆'}
            </button>
          )}
        </div>

        {/* Explanation & Intuition Reveal */}
        {submitted && (
          <div className="la-explanation-card">
            <div
              className={`la-status-pill ${
                selectedOption === currentQ.correct ? 'success' : 'failure'
              }`}
            >
              {selectedOption === currentQ.correct ? (
                <>✓ Correct Intuition!</>
              ) : (
                <>✗ Not Quite Right</>
              )}
            </div>
            <p className="la-explanation-text">
              <strong>Intuition Insight: </strong>
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Prev / Next Nav */}
      <div className="la-bottom-nav">
        <button
          className="la-nav-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-soft, #a89e94)' }}>
          Tip: Click any bar at top to jump questions
        </span>

        <button
          className="la-nav-btn"
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
