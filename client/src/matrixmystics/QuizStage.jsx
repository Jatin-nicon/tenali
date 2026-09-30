import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_BASE_URL || '';

export default function QuizStage({
  mission,
  moduleData,
  onComplete,
  onShowProof,
  isCompleted,
  proofData,
}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  // Load quiz questions for this mission
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const loadQuestions = async () => {
      // Priority 1: Use deeply mapped curriculum quiz from mission data
      if (Array.isArray(mission.quiz) && mission.quiz.length > 0 && mission.quiz[0].question) {
        setQuestions(mission.quiz);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API}/matrixmystics-api/mission/${mission.id}`);

        if (!res.ok) throw new Error('API fetch failed');
        const data = await res.json();
        if (cancelled) return;

        // Collect questions across tiers
        const pool = [];
        const mcqs = data.mcqs || {};
        const easy = Array.isArray(mcqs.easy) ? mcqs.easy : [];
        const medium = Array.isArray(mcqs.medium) ? mcqs.medium : [];
        const hard = Array.isArray(mcqs.hard) ? mcqs.hard : [];
        const realApp = Array.isArray(data.real_life_application) ? data.real_life_application : [];

        // Pick 1 easy/medium, 1 medium/hard, 1 realapp
        if (easy.length > 0) pool.push(easy[0]);
        if (medium.length > 0) pool.push(medium[0]);
        else if (hard.length > 0) pool.push(hard[0]);
        if (realApp.length > 0) pool.push(realApp[0]);
        else if (hard.length > 1) pool.push(hard[1]);

        if (pool.length > 0) {
          setQuestions(pool);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Could not load from API, using fallback quiz:', err.message);
      }

      // Fallback to mission.quiz from data
      if (!cancelled) {
        const fallback = (mission.quiz || []).map((q, i) => ({
          id: `M${mission.id}_Q${i+1}`,
          question: q.q,
          options: q.type === 'yesno' ? ['Yes', 'No'] : (q.options || ['Option A', 'Option B', 'Option C', 'Option D']),
          correct_option: q.type === 'yesno' ? (q.correct === 0 ? 'Yes' : 'No') : (q.options ? q.options[q.correct] : 'Option A'),
          explanation: q.explanation || mission.explanation || 'Direct application of the core concept.',
        }));
        setQuestions(fallback.length > 0 ? fallback : [
          {
            id: `M${mission.id}_Q1`,
            question: mission.prompt || 'Confirm the primary geometric relationship:',
            options: ['Yes', 'No'],
            correct_option: 'Yes',
            explanation: mission.explanation || 'Verified in GeoGebra.',
          }
        ]);
        setLoading(false);
      }
    };

    loadQuestions();
    return () => { cancelled = true; };
  }, [mission.id, mission.quiz, mission.prompt, mission.explanation]);

  const currentQ = questions[currentIdx] || null;

  const handleSelectOption = (opt) => {
    if (submitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);

    const isCorrect = String(selectedOption).trim() === String(currentQ.correct_option).trim();
    const updatedAnswers = {
      ...userAnswers,
      [currentIdx]: { selected: selectedOption, isCorrect, correct: currentQ.correct_option },
    };
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      // Finished all questions
      setQuizFinished(true);
      const totalCorrect = Object.values(userAnswers).filter(a => a.isCorrect).length;
      const isPassed = totalCorrect >= Math.ceil(questions.length * 0.66); // >=66% or full

      if (isPassed || isCompleted) {
        // Generate proof hash: MM-M{mod}Q{mid}-{6char-hex}
        const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
        const proofId = proofData?.proofId || `MM-M${mission.module || 1}Q${mission.id}-${hex}`;
        onComplete?.({
          proofId,
          score: { correct: totalCorrect, total: questions.length },
          completedAt: new Date().toISOString(),
        });
      }
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setUserAnswers({});
    setQuizFinished(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="mm-stage-card mm-loading-card">
        <div className="mm-spinner"></div>
        <p>Loading Mission Quiz Questions...</p>
      </div>
    );
  }

  // Final Results Screen for Stage 3
  if (quizFinished) {
    const totalCorrect = Object.values(userAnswers).filter(a => a.isCorrect).length;
    const passed = totalCorrect >= Math.ceil(questions.length * 0.66) || isCompleted;

    return (
      <div className="mm-stage-card mm-stage3-card mm-quiz-results-card">
        <div className="mm-stage-banner">
          <div className="mm-stage-pill mm-stage-pill-done">Stage 3 of 3: Mastery Quiz</div>
          <span className="mm-stage-mod-tag">Results</span>
        </div>

        <div className="mm-results-hero">
          <div className="mm-results-badge">{passed ? '🏆' : '📚'}</div>
          <h2 className="mm-results-title">
            {passed ? 'Concept Mastery Verified!' : 'Practice Makes Perfect'}
          </h2>
          <p className="mm-results-subtitle">
            You scored {totalCorrect} out of {questions.length} questions correctly.
          </p>

          <div className="mm-score-pill">
            Score: {Math.round((totalCorrect / questions.length) * 100)}%
          </div>

          {passed ? (
            <div className="mm-proof-awarded-box">
              <div className="mm-proof-awarded-icon">🎖️</div>
              <div className="mm-proof-awarded-text">
                <h3>Official Proof of Competency Unlocked</h3>
                <p>All 3 stages (Framing, GeoGebra Lab, and Mastery Quiz) are completed.</p>
              </div>
              <button className="mm-btn mm-btn-gold mm-btn-lg" onClick={onShowProof}>
                View Proof of Completion Certificate →
              </button>
            </div>
          ) : (
            <div className="mm-retry-box">
              <p>Review the GeoGebra exploration and give the questions another shot to earn your proof badge.</p>
              <button className="mm-btn mm-btn-primary" onClick={handleRetake}>
                Retake Quiz ↺
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mm-stage-card mm-stage3-card">
      <div className="mm-stage-banner">
        <div className="mm-stage-pill mm-stage-pill-active">Stage 3 of 3: Mastery Quiz</div>
        <span className="mm-stage-mod-tag">
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      <div className="mm-quiz-progress-bar">
        <div
          className="mm-quiz-progress-fill"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mm-quiz-body">
        {/* Question Header */}
        <div className="mm-quiz-question-box">
          <span className="mm-quiz-q-num">Q{currentIdx + 1}.</span>
          <h3 className="mm-quiz-question-text">{currentQ?.question}</h3>
        </div>

        {/* Options */}
        <div className="mm-quiz-options-list">
          {(currentQ?.options || []).map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = submitted && String(opt).trim() === String(currentQ.correct_option).trim();
            const isWrong = submitted && isSelected && !isCorrect;

            let optClass = 'mm-quiz-opt';
            if (isSelected) optClass += ' selected';
            if (isCorrect) optClass += ' correct';
            if (isWrong) optClass += ' wrong';

            return (
              <button
                key={idx}
                className={optClass}
                onClick={() => handleSelectOption(opt)}
                disabled={submitted}
              >
                <span className="mm-quiz-opt-letter">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="mm-quiz-opt-text">{opt}</span>
                {isCorrect && <span className="mm-opt-status">✓ Correct</span>}
                {isWrong && <span className="mm-opt-status">✗ Incorrect</span>}
              </button>
            );
          })}
        </div>

        {/* Submit / Check Action */}
        {!submitted ? (
          <div className="mm-quiz-action-bar">
            <button
              className="mm-btn mm-btn-primary mm-btn-lg"
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="mm-explanation-card">
            <div className="mm-explanation-header">
              <span className="mm-explanation-badge">
                {String(selectedOption).trim() === String(currentQ.correct_option).trim() ? '✓ Well Done!' : 'ℹ️ Explanation'}
              </span>
            </div>
            <div className="mm-explanation-body">
              {currentQ.explanation || 'Review the direct relationship and properties tested here.'}
            </div>
            <div className="mm-explanation-footer">
              <button
                className="mm-btn mm-btn-primary mm-btn-lg"
                onClick={handleNextQuestion}
              >
                {currentIdx + 1 < questions.length ? 'Next Question →' : 'View Results & Proof →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
