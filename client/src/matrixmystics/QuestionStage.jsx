export default function QuestionStage({
  mission,
  moduleData,
  onProceed,
  isCompleted,
}) {
  return (
    <div className="mm-stage-card mm-stage1-card">
      <div className="mm-stage-banner">
        <div className="mm-stage-pill">Stage 1 of 3: Problem Framing</div>
        <span className="mm-stage-mod-tag">
          Module {mission.module || moduleData?.id}: {moduleData?.title}
        </span>
      </div>

      <div className="mm-stage-header">
        <span className="mm-stage-emoji">{mission.emoji || '📐'}</span>
        <div>
          <h2 className="mm-stage-title">Mission #{mission.id}: {mission.title}</h2>
          <p className="mm-stage-goal">{mission.goal || mission.core_concept}</p>
        </div>
      </div>

      <div className="mm-stage-content-grid">
        {/* Story Scenario */}
        <div className="mm-content-panel mm-story-panel">
          <div className="mm-panel-header">
            <span className="mm-panel-icon">📖</span>
            <h3>The Scenario</h3>
          </div>
          <div className="mm-story-text">
            {mission.story || mission.original_question}
          </div>
          {mission.original_question && mission.original_question !== mission.story && (
            <div className="mm-callout-box">
              <strong>Original Question Formulation:</strong>
              <p>{mission.original_question}</p>
            </div>
          )}
        </div>

        {/* Mathematical Formulation & Core Concept */}
        <div className="mm-content-panel mm-math-panel">
          <div className="mm-panel-header">
            <span className="mm-panel-icon">⚙️</span>
            <h3>Core Mathematical Insight</h3>
          </div>
          <div className="mm-concept-text">
            {mission.core_concept || mission.explanation || 'Linear relationships form geometric invariants across spaces.'}
          </div>

          <div className="mm-objectives-box">
            <h4>In Stage 2 (GeoGebra Lab), you will:</h4>
            <ul>
              <li>Construct the geometric objects (points, lines, planes, vectors, or subspaces).</li>
              <li>Experiment with transformations, slopes, determinants, or kernel spaces interactively.</li>
              <li>Verify the fundamental geometric property through a targeted checkpoint.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mm-stage-footer">
        <div className="mm-footer-info">
          {isCompleted && <span className="mm-badge-done">✓ Stage 1 Framed</span>}
        </div>
        <button className="mm-btn mm-btn-primary mm-btn-lg" onClick={onProceed}>
          Proceed to GeoGebra Lab →
        </button>
      </div>
    </div>
  );
}
