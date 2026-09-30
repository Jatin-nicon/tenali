import { useState, useEffect } from 'react';
import { MODULES, QUESTIONS as MISSIONS } from './matrixMysticsData';
import QuestionStage from './QuestionStage';
import GeoGebraLabStage from './GeoGebraLabStage';
import QuizStage from './QuizStage';
import ProofOfCompletionModal from './ProofOfCompletionModal';
import './matrixMystics.css';


const STORAGE_KEY = 'matrix_mystics_progress_v1';

export default function MatrixMysticsApp({ onBack }) {
  // Navigation: view = 'dashboard' | 'workspace'
  const [view, setView] = useState('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState(1);
  const [activeMissionId, setActiveMissionId] = useState(1);
  const [activeStage, setActiveStage] = useState(1); // 1: Formulation, 2: GeoGebra, 3: Quiz

  // Modal for Proof of Completion
  const [proofModalMission, setProofModalMission] = useState(null);

  // Search / Filter query in Dashboard
  const [searchQuery, setSearchQuery] = useState('');

  // Granular progress tracking state
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return {
      questions: {},
      lastActiveMissionId: 1,
    };
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch { /* ignore */ }
  }, [progress]);

  const activeMission = MISSIONS.find(m => m.id === activeMissionId) || MISSIONS[0];
  const activeModule = MODULES.find(m => m.id === (activeMission.module || selectedModuleId)) || MODULES[0];

  // Helper functions for question status
  const getQuestionProgress = (id) => {
    return progress.questions[id] || {
      stage1_viewed: false,
      stage2_geogebra_completed: false,
      stage3_quiz_completed: false,
      fully_completed: false,
      proofId: null,
    };
  };

  const totalMastered = Object.values(progress.questions).filter(q => q.fully_completed).length;

  // Actions for Stage transitions
  const handleOpenMission = (missionId, initialStage = 1) => {
    setActiveMissionId(missionId);
    setActiveStage(initialStage);
    setView('workspace');
    setProgress(prev => ({
      ...prev,
      lastActiveMissionId: missionId,
    }));
  };

  const handleStage1Proceed = () => {
    setProgress(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [activeMissionId]: {
          ...(prev.questions[activeMissionId] || {}),
          stage1_viewed: true,
        },
      },
    }));
    setActiveStage(2);
  };

  const handleStage2Complete = () => {
    setProgress(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [activeMissionId]: {
          ...(prev.questions[activeMissionId] || {}),
          stage2_geogebra_completed: true,
        },
      },
    }));
  };

  const handleStage2Proceed = () => {
    setActiveStage(3);
  };

  const handleStage3Complete = (proofPayload) => {
    setProgress(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [activeMissionId]: {
          ...(prev.questions[activeMissionId] || {}),
          stage1_viewed: true,
          stage2_geogebra_completed: true,
          stage3_quiz_completed: true,
          fully_completed: true,
          proofId: proofPayload.proofId,
          score: proofPayload.score,
          completedAt: proofPayload.completedAt,
        },
      },
    }));
  };

  const handleOpenProofModal = (mission) => {
    setProofModalMission(mission);
  };

  const handleNextMission = () => {
    setProofModalMission(null);
    if (activeMissionId < MISSIONS.length) {
      handleOpenMission(activeMissionId + 1, 1);
    } else {
      setView('dashboard');
    }
  };


  // Filter missions for the dashboard
  const currentModuleMissions = MISSIONS.filter(m => {
    const mod = MODULES.find(mod => mod.id === selectedModuleId);
    if (!mod) return false;
    const matchesMod = m.id >= mod.start && m.id <= mod.end;
    if (!searchQuery.trim()) return matchesMod;
    const q = searchQuery.toLowerCase();
    return (
      matchesMod &&
      (m.title.toLowerCase().includes(q) ||
        (m.core_concept && m.core_concept.toLowerCase().includes(q)) ||
        (m.goal && m.goal.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="mm-root-container">
      {/* Top Main Navigation Bar */}
      <header className="mm-navbar">
        <div className="mm-nav-left">
          <div className="mm-brand" onClick={() => setView('dashboard')}>
            <span className="mm-brand-icon">🔮</span>
            <div className="mm-brand-text">
              <span className="mm-brand-title">Matrix Mystics</span>
              <span className="mm-brand-sub">Geometric Linear Algebra Lab</span>
            </div>
          </div>
        </div>

        <div className="mm-nav-right">
          <div className="mm-progress-pill" title="Overall Mastery Progress">
            <span className="mm-pill-label">Mastery:</span>
            <span className="mm-pill-val">{totalMastered} / {MISSIONS.length}</span>
            <span className="mm-pill-pct">({MISSIONS.length ? Math.round((totalMastered / MISSIONS.length) * 100) : 0}%)</span>
          </div>


          {view === 'workspace' && (
            <button
              className="mm-btn mm-btn-secondary mm-btn-sm"
              onClick={() => setView('dashboard')}
            >
              Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mm-main-content">
        {view === 'dashboard' ? (
          <div className="mm-dashboard-view">
            {/* Hero Section */}
            <div className="mm-hero-section">
              <div className="mm-hero-content">
                <div className="mm-hero-badge">3-Stage Progressive Mastery</div>
                <h1 className="mm-hero-title">
                  Explore Linear Algebra Geometrically
                </h1>
                <p className="mm-hero-desc">
                  Every mission guides you through three rigorous stages: Problem Formulation,
                  Hands-on GeoGebra Construction, and Diagnostic Mastery Quiz. Earn official Proof of Competency for every question.
                </p>

                <div className="mm-hero-actions">
                  <button
                    className="mm-btn mm-btn-primary mm-btn-lg"
                    onClick={() => handleOpenMission(progress.lastActiveMissionId || 1)}
                  >
                    Resume Journey (Mission #{progress.lastActiveMissionId || 1}) →
                  </button>
                </div>
              </div>

              {/* Progress Overview Card */}
              <div className="mm-hero-stats-card">
                <div className="mm-stat-item">
                  <span className="mm-stat-val">{totalMastered}</span>
                  <span className="mm-stat-label">Mastered Proofs</span>
                </div>
                <div className="mm-stat-item">
                  <span className="mm-stat-val">{Math.max(0, MISSIONS.length - totalMastered)}</span>
                  <span className="mm-stat-label">Remaining</span>
                </div>
                <div className="mm-stat-item">
                  <span className="mm-stat-val">{MODULES.length}</span>
                  <span className="mm-stat-label">Modules</span>
                </div>
              </div>

            </div>

            {/* Module Selector Bar */}
            <div className="mm-module-tabs">
              {MODULES.map(mod => {
                const modMissions = MISSIONS.filter(m => m.id >= mod.start && m.id <= mod.end);
                const modCompleted = modMissions.filter(m => progress.questions[m.id]?.fully_completed).length;
                const isSelected = mod.id === selectedModuleId;

                return (
                  <button
                    key={mod.id}
                    className={`mm-mod-tab ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedModuleId(mod.id)}
                  >
                    <span className="mm-mod-tab-emoji">{mod.emoji}</span>
                    <div className="mm-mod-tab-info">
                      <span className="mm-mod-tab-title">Module {mod.id}: {mod.title}</span>
                      <span className="mm-mod-tab-meta">
                        {modCompleted} / {modMissions.length} Mastered
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Questions Grid Header */}
            <div className="mm-grid-header">
              <div>
                <h2 className="mm-grid-title">
                  Module {selectedModuleId}: {MODULES.find(m => m.id === selectedModuleId)?.title}
                </h2>
                <p className="mm-grid-subtitle">
                  Select a question to start the 3-stage learning flow or review your proof of completion.
                </p>
              </div>

              <div className="mm-search-box">
                <input
                  type="text"
                  placeholder="Search questions or concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mm-search-input"
                />
              </div>
            </div>

            {/* Questions Grid */}
            <div className="mm-questions-grid">
              {currentModuleMissions.map(m => {
                const qp = getQuestionProgress(m.id);
                const isDone = qp.fully_completed;

                return (
                  <div key={m.id} className={`mm-question-card ${isDone ? 'completed' : ''}`}>
                    <div className="mm-qcard-header">
                      <span className="mm-qcard-num">Mission #{m.id}</span>
                      <span className="mm-qcard-emoji">{m.emoji || '📐'}</span>
                    </div>

                    <h3 className="mm-qcard-title">{m.title}</h3>
                    <p className="mm-qcard-goal">
                      {m.goal || m.core_concept || 'Direct proportional reasoning and geometric linear relations.'}
                    </p>

                    {/* 3-Stage Progress Tracker */}
                    <div className="mm-qcard-stages">
                      <div className={`mm-stage-dot ${qp.stage1_viewed ? 'done' : ''}`} title="Stage 1: Formulation">
                        1. Framing
                      </div>
                      <div className={`mm-stage-dot ${qp.stage2_geogebra_completed ? 'done' : ''}`} title="Stage 2: GeoGebra Lab">
                        2. GeoGebra
                      </div>
                      <div className={`mm-stage-dot ${qp.stage3_quiz_completed ? 'done' : ''}`} title="Stage 3: Mastery Quiz">
                        3. Quiz
                      </div>
                    </div>

                    <div className="mm-qcard-actions">
                      <button
                        className="mm-btn mm-btn-primary mm-btn-sm"
                        onClick={() => handleOpenMission(m.id, qp.stage2_geogebra_completed ? 3 : (qp.stage1_viewed ? 2 : 1))}
                      >
                        {isDone ? 'Review Mission' : (qp.stage1_viewed ? 'Continue Mission' : 'Start Mission')}
                      </button>

                      {isDone && (
                        <button
                          className="mm-btn mm-btn-gold mm-btn-sm"
                          onClick={() => handleOpenProofModal(m)}
                          title="View Proof of Completion Certificate"
                        >
                          🎖️ Proof Card
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Workspace View: 3-Stage Question Experience */
          <div className="mm-workspace-view">
            {/* Workspace Header & Stepper */}
            <div className="mm-workspace-header">
              <div className="mm-breadcrumb">
                <span className="mm-crumb-link" onClick={() => setView('dashboard')}>Dashboard</span>
                <span className="mm-crumb-sep">/</span>
                <span className="mm-crumb-link" onClick={() => { setSelectedModuleId(activeModule.id); setView('dashboard'); }}>
                  Module {activeModule.id}: {activeModule.title}
                </span>
                <span className="mm-crumb-sep">/</span>
                <span className="mm-crumb-current">Mission #{activeMission.id}: {activeMission.title}</span>
              </div>

              {/* 3-Stage Nav Stepper */}
              <div className="mm-stepper">
                <button
                  className={`mm-step-btn ${activeStage === 1 ? 'active' : ''} ${getQuestionProgress(activeMission.id).stage1_viewed ? 'done' : ''}`}
                  onClick={() => setActiveStage(1)}
                >
                  <span className="mm-step-btn-num">1</span>
                  <span className="mm-step-btn-text">Framing</span>
                </button>

                <div className="mm-step-line"></div>

                <button
                  className={`mm-step-btn ${activeStage === 2 ? 'active' : ''} ${getQuestionProgress(activeMission.id).stage2_geogebra_completed ? 'done' : ''}`}
                  onClick={() => setActiveStage(2)}
                >
                  <span className="mm-step-btn-num">2</span>
                  <span className="mm-step-btn-text">GeoGebra Lab</span>
                </button>

                <div className="mm-step-line"></div>

                <button
                  className={`mm-step-btn ${activeStage === 3 ? 'active' : ''} ${getQuestionProgress(activeMission.id).stage3_quiz_completed ? 'done' : ''}`}
                  onClick={() => setActiveStage(3)}
                >
                  <span className="mm-step-btn-num">3</span>
                  <span className="mm-step-btn-text">Mastery Quiz</span>
                </button>

                {getQuestionProgress(activeMission.id).fully_completed && (
                  <>
                    <div className="mm-step-line"></div>
                    <button
                      className="mm-step-btn proof-btn"
                      onClick={() => handleOpenProofModal(activeMission)}
                    >
                      <span className="mm-step-btn-num">🎖️</span>
                      <span className="mm-step-btn-text">Proof Card</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Active Stage Body */}
            <div className="mm-stage-container">
              {activeStage === 1 && (
                <QuestionStage
                  mission={activeMission}
                  moduleData={activeModule}
                  onProceed={handleStage1Proceed}
                  isCompleted={getQuestionProgress(activeMission.id).stage1_viewed}
                />
              )}

              {activeStage === 2 && (
                <GeoGebraLabStage
                  mission={activeMission}
                  moduleData={activeModule}
                  onComplete={handleStage2Complete}
                  onProceed={handleStage2Proceed}
                  isCompleted={getQuestionProgress(activeMission.id).stage2_geogebra_completed}
                />
              )}

              {activeStage === 3 && (
                <QuizStage
                  mission={activeMission}
                  moduleData={activeModule}
                  onComplete={handleStage3Complete}
                  onShowProof={() => handleOpenProofModal(activeMission)}
                  isCompleted={getQuestionProgress(activeMission.id).stage3_quiz_completed}
                  proofData={getQuestionProgress(activeMission.id)}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Proof of Completion Certificate Modal */}
      {proofModalMission && (
        <ProofOfCompletionModal
          mission={proofModalMission}
          moduleData={MODULES.find(m => m.id === (proofModalMission.module || 1))}
          proofData={getQuestionProgress(proofModalMission.id)}
          onClose={() => setProofModalMission(null)}
          onNext={handleNextMission}
          hasNext={proofModalMission.id < 56}
        />
      )}
    </div>
  );
}
