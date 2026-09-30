import { useState } from 'react';

export default function ProofOfCompletionModal({
  mission,
  moduleData,
  proofData,
  onClose,
  onNext,
  hasNext,
}) {
  const [copied, setCopied] = useState(false);
  const [learnerName, setLearnerName] = useState(() => {
    try {
      return localStorage.getItem('matrix_mystics_learner_name') || 'Matrix Explorer';
    } catch {
      return 'Matrix Explorer';
    }
  });
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameSave = (e) => {
    e.preventDefault();
    setIsEditingName(false);
    try {
      localStorage.setItem('matrix_mystics_learner_name', learnerName);
    } catch { /* ignore */ }
  };

  const handleCopyProof = () => {
    const text = `Matrix Mystics Certificate of Competency\nMission: #${mission.id} ${mission.title}\nModule: ${moduleData?.title || 'Linear Algebra'}\nProof ID: ${proofData?.proofId || 'MM-' + mission.id}\nIssued: ${proofData?.completedAt ? new Date(proofData.completedAt).toLocaleString() : new Date().toLocaleString()}\nVerified on Matrix Mystics Platform`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const dateStr = proofData?.completedAt
    ? new Date(proofData.completedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="mm-modal-backdrop" onClick={onClose}>
      <div className="mm-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="mm-modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        {/* Certificate Card Printable Area */}
        <div className="mm-cert-card" id="mm-printable-cert">
          <div className="mm-cert-border">
            <div className="mm-cert-corner mm-cert-tl"></div>
            <div className="mm-cert-corner mm-cert-tr"></div>
            <div className="mm-cert-corner mm-cert-bl"></div>
            <div className="mm-cert-corner mm-cert-br"></div>

            <div className="mm-cert-header">
              <div className="mm-cert-badge">
                <span className="mm-cert-badge-icon">🏛️</span>
                <span className="mm-cert-badge-tag">MATRIX MYSTICS RESEARCH LAB</span>
              </div>
              <h2 className="mm-cert-title">PROOF OF COMPETENCY</h2>
              <p className="mm-cert-subtitle">Geometric & Algebraic Mastery Certification</p>
            </div>

            <div className="mm-cert-body">
              <p className="mm-cert-awarded-text">This certifies that</p>
              <div className="mm-cert-recipient">
                {isEditingName ? (
                  <form onSubmit={handleNameSave} className="mm-name-form">
                    <input
                      type="text"
                      className="mm-name-input"
                      value={learnerName}
                      onChange={(e) => setLearnerName(e.target.value)}
                      autoFocus
                      onBlur={handleNameSave}
                    />
                  </form>
                ) : (
                  <span className="mm-name-display" onClick={() => setIsEditingName(true)} title="Click to edit name">
                    {learnerName} <span className="mm-name-edit-hint">✎</span>
                  </span>
                )}
              </div>
              <p className="mm-cert-statement">
                has successfully investigated, constructed, and proven mastery of:
              </p>

              <div className="mm-cert-mission-box">
                <div className="mm-cert-mission-module">
                  Module {mission.module || moduleData?.id}: {moduleData?.title || 'Linear Algebra'}
                </div>
                <div className="mm-cert-mission-title">
                  Mission #{mission.id}: {mission.title}
                </div>
                <div className="mm-cert-mission-goal">
                  {mission.goal || mission.core_concept || 'Direct proportional reasoning and vector subspace foundations.'}
                </div>
              </div>

              {/* 3 Verification Stamps */}
              <div className="mm-stamps-grid">
                <div className="mm-stamp-item verified">
                  <div className="mm-stamp-icon">📜</div>
                  <div className="mm-stamp-content">
                    <div className="mm-stamp-name">Stage 1: Formulation</div>
                    <div className="mm-stamp-status">✓ Problem Framed</div>
                  </div>
                </div>

                <div className="mm-stamp-item verified">
                  <div className="mm-stamp-icon">📐</div>
                  <div className="mm-stamp-content">
                    <div className="mm-stamp-name">Stage 2: GeoGebra</div>
                    <div className="mm-stamp-status">✓ Geometry Verified</div>
                  </div>
                </div>

                <div className="mm-stamp-item verified">
                  <div className="mm-stamp-icon">🧠</div>
                  <div className="mm-stamp-content">
                    <div className="mm-stamp-name">Stage 3: Mastery Quiz</div>
                    <div className="mm-stamp-status">✓ 100% Score Passed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mm-cert-footer">
              <div className="mm-cert-meta">
                <div className="mm-meta-item">
                  <span className="mm-meta-label">Verification Hash</span>
                  <span className="mm-meta-val font-mono">{proofData?.proofId || `MM-M${mission.module || 1}Q${mission.id}-V1`}</span>
                </div>
                <div className="mm-meta-item">
                  <span className="mm-meta-label">Date Completed</span>
                  <span className="mm-meta-val">{dateStr}</span>
                </div>
              </div>
              <div className="mm-cert-seal">
                <div className="mm-seal-ring">
                  <span>★ VERIFIED ★</span>
                  <div className="mm-seal-core">MM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mm-modal-actions no-print">
          <button className="mm-btn mm-btn-secondary" onClick={handleCopyProof}>
            {copied ? '✓ Proof Copied!' : '📋 Copy Proof Card'}
          </button>
          <button className="mm-btn mm-btn-secondary" onClick={handlePrint}>
            🖨️ Print / Save PDF
          </button>
          {hasNext && onNext ? (
            <button className="mm-btn mm-btn-primary" onClick={onNext}>
              Next Mission #{mission.id + 1} →
            </button>
          ) : (
            <button className="mm-btn mm-btn-primary" onClick={onClose}>
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
