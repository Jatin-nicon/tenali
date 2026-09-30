import { useState, useEffect, useRef } from 'react';

export default function GeoGebraLabStage({
  mission,
  onComplete,
  onProceed,
  isCompleted,
}) {
  const [ggbFailed, setGgbFailed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState('');
  const [answerInput, setAnswerInput] = useState('');
  const [checkpointFeedback, setCheckpointFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const wrapRef = useRef(null);
  const appletRef = useRef(null);
  const origSizeRef = useRef({ w: 0, h: 0 });
  const containerId = 'mm-ggb-' + mission.id;

  // Extract commands from ggbSteps
  const commands = (mission.ggbSteps || []).reduce((acc, step) => {
    // Match "Type: <cmd> and..." or "Type: <cmd>"
    const match = step.match(/Type:\s*([^\s—–]+(?:\s+[^\s—–]+)*?)(?:\s+(?:and|to|—|–|\.|→)|$)/i);
    if (match && match[1]) {
      const clean = match[1].trim().replace(/\.$/, '');
      if (clean && !acc.includes(clean)) acc.push(clean);
    }
    return acc;
  }, []);

  // Inject GeoGebra Applet
  useEffect(() => {
    let cancelled = false;
    const el = wrapRef.current;
    if (!el) return;

    // Clear any previous applet in container if mission changed
    el.innerHTML = '';
    setGgbFailed(false);

    const tryInject = () => {
      if (!window.GGBApplet || cancelled) {
        setGgbFailed(true);
        return;
      }

      const rect = el.getBoundingClientRect();
      const appType = mission.ggbType === '3d' ? '3d' : (mission.ggbType === 'geometry' ? 'geometry' : 'graphing');

      const params = {
        appName: appType,
        width: Math.round(Math.max(rect.width - 2, 400)),
        height: Math.round(Math.max(rect.height - 2, 420)),
        showToolBar: true,
        showMenuBar: false,
        showAlgebraInput: true,
        enableRightClick: false,
        language: 'en',
        borderColor: '#374151',
        id: containerId,
      };

      try {
        const applet = new window.GGBApplet(params);
        applet.inject(containerId);
        appletRef.current = applet;
      } catch (err) {
        console.error('[GeoGebraLab] Failed to inject applet:', err);
        if (!cancelled) setGgbFailed(true);
      }
    };

    const inner = document.createElement('div');
    inner.id = containerId;
    inner.style.width = '100%';
    inner.style.height = '100%';
    el.appendChild(inner);

    const timer = setTimeout(tryInject, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      el.innerHTML = '';
    };
  }, [mission.id, mission.ggbType, containerId]);

  // Handle Resize & Fullscreen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (!origSizeRef.current.w) {
        origSizeRef.current = { w: Math.round(rect.width), h: Math.round(rect.height) };
      }
      const targetW = fullscreen ? Math.round(rect.width) : origSizeRef.current.w;
      const targetH = fullscreen ? Math.round(rect.height) : origSizeRef.current.h;
      if (targetW < 100 || targetH < 100) return;

      const retryResize = (attempt = 0) => {
        if (!appletRef.current) {
          if (attempt < 8) setTimeout(() => retryResize(attempt + 1), 200);
          return;
        }
        const api = appletRef.current.getAppletObject?.();
        if (!api) {
          if (attempt < 8) setTimeout(() => retryResize(attempt + 1), 200);
          return;
        }
        try {
          if (typeof api.setWidth === 'function') api.setWidth(targetW);
          if (typeof api.setHeight === 'function') api.setHeight(targetH);
        } catch { /* ignore */ }
      };
      setTimeout(retryResize, 100);
    });
  }, [fullscreen]);

  // Execute or Copy Command
  const handleExecuteCommand = (cmd) => {
    // Copy to clipboard
    try {
      navigator.clipboard?.writeText(cmd);
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(''), 2000);
    } catch { /* ignore */ }

    // Execute in GeoGebra applet if available
    try {
      const api = appletRef.current?.getAppletObject?.();
      if (api && typeof api.evalCommand === 'function') {
        api.evalCommand(cmd);
      }
    } catch (e) {
      console.warn('Could not auto-eval in GeoGebra:', e);
    }
  };

  // Checkpoint Verification
  const handleCheckAnswer = () => {
    const trimmed = (answerInput || '').trim();
    if (!trimmed) {
      setCheckpointFeedback({ correct: false, message: 'Please select or enter an answer.' });
      return;
    }

    let isCorrect = false;
    let detail = mission.explanation || 'Great job verifying this geometry in GeoGebra!';

    if (mission.answerType === 'yesno') {
      const expected = mission.correct === 0 ? 'yes' : 'no';
      isCorrect = trimmed.toLowerCase() === expected;
    } else if (mission.answerType === 'mcq') {
      const idx = parseInt(trimmed, 10);
      isCorrect = idx === mission.correct;
    } else if (mission.answerType === 'num') {
      const val = parseFloat(trimmed);
      const tol = mission.tolerance !== undefined ? mission.tolerance : 0.01;
      isCorrect = !isNaN(val) && Math.abs(val - mission.correct) <= tol;
    } else {
      // Default text match
      isCorrect = trimmed.length > 0;
    }

    if (isCorrect) {
      setCheckpointFeedback({
        correct: true,
        message: '✓ Geometric Observation Verified!',
        detail,
      });
      onComplete?.();
    } else {
      setCheckpointFeedback({
        correct: false,
        message: 'Not quite. Check your plot in GeoGebra and try again!',
        detail: '',
      });
    }
  };

  return (
    <div className="mm-stage-card mm-stage2-card">
      <div className="mm-stage-banner">
        <div className="mm-stage-pill mm-stage-pill-active">Stage 2 of 3: GeoGebra Lab</div>
        <span className="mm-stage-mod-tag">
          {mission.title} • {mission.ggbType ? mission.ggbType.toUpperCase() : 'GRAPHING'} MODE
        </span>
      </div>

      {/* Lab Main Layout */}
      <div className="mm-lab-layout">
        {/* Left Side: Instructions, Command Dock, Checkpoint */}
        <div className="mm-lab-sidebar">
          {/* Step Guide */}
          <div className="mm-lab-steps-box">
            <h3 className="mm-lab-box-title">
              <span>🛠️</span> Exploration Guide
            </h3>
            <ol className="mm-steps-list">
              {(mission.ggbSteps || [
                'Launch the applet and enter vectors/equations into the input bar.',
                'Observe the geometric representation.',
                'Verify coordinates and orthogonality.',
              ]).map((step, idx) => (
                <li key={idx} className="mm-step-item">
                  <span className="mm-step-num">{idx + 1}</span>
                  <span className="mm-step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 1-Click Command Chips */}
          {commands.length > 0 && (
            <div className="mm-lab-commands-box">
              <h4 className="mm-commands-title">⚡ Quick Insert Commands</h4>
              <p className="mm-commands-sub">Click to copy & insert directly into GeoGebra:</p>
              <div className="mm-command-chips">
                {commands.map((cmd, idx) => (
                  <button
                    key={idx}
                    className={`mm-cmd-chip ${copiedCmd === cmd ? 'copied' : ''}`}
                    onClick={() => handleExecuteCommand(cmd)}
                    title="Click to insert/copy command"
                  >
                    <code>{cmd}</code>
                    <span className="mm-cmd-chip-action">
                      {copiedCmd === cmd ? '✓ Sent' : '+ Insert'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hint Toggle */}
          {mission.ggbHint && (
            <div className="mm-lab-hint-box">
              <button
                className="mm-hint-toggle"
                onClick={() => setShowHint(v => !v)}
              >
                <span>💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                <span>{showHint ? '▲' : '▼'}</span>
              </button>
              {showHint && (
                <div className="mm-hint-content">
                  {mission.ggbHint}
                </div>
              )}
            </div>
          )}

          {/* Checkpoint Verification */}
          <div className="mm-checkpoint-box">
            <h4 className="mm-checkpoint-title">
              <span>🎯</span> Geometric Checkpoint
            </h4>
            <p className="mm-checkpoint-prompt">
              {mission.prompt || 'Confirm the geometric relationship observed in the workspace:'}
            </p>

            {/* Answer Controls */}
            {mission.answerType === 'yesno' ? (
              <div className="mm-yesno-group">
                <button
                  className={`mm-btn-opt ${answerInput === 'yes' ? 'selected' : ''}`}
                  onClick={() => setAnswerInput('yes')}
                >
                  Yes
                </button>
                <button
                  className={`mm-btn-opt ${answerInput === 'no' ? 'selected' : ''}`}
                  onClick={() => setAnswerInput('no')}
                >
                  No
                </button>
              </div>
            ) : mission.answerType === 'mcq' && mission.options ? (
              <div className="mm-mcq-group">
                {mission.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`mm-btn-opt ${answerInput === String(i) ? 'selected' : ''}`}
                    onClick={() => setAnswerInput(String(i))}
                  >
                    <span className="mm-opt-idx">{String.fromCharCode(65 + i)}</span>
                    <span className="mm-opt-text">{opt}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mm-input-group">
                <input
                  type="text"
                  className="mm-text-input"
                  placeholder="Enter your observation or value..."
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                />
              </div>
            )}

            <button
              className="mm-btn mm-btn-verify"
              onClick={handleCheckAnswer}
              disabled={isCompleted && checkpointFeedback?.correct}
            >
              Verify Observation
            </button>

            {/* Checkpoint Feedback */}
            {checkpointFeedback && (
              <div className={`mm-feedback-banner ${checkpointFeedback.correct ? 'success' : 'error'}`}>
                <div className="mm-feedback-msg">{checkpointFeedback.message}</div>
                {checkpointFeedback.detail && (
                  <div className="mm-feedback-detail">{checkpointFeedback.detail}</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Embedded Live GeoGebra Applet */}
        <div className={`mm-lab-canvas ${fullscreen ? 'fullscreen' : ''}`}>
          <div className="mm-canvas-header">
            <span className="mm-canvas-title">Interactive Workspace</span>
            <button
              className="mm-canvas-fullscreen-btn"
              onClick={() => setFullscreen(v => !v)}
              title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? '✕ Exit Fullscreen' : '⛶ Fullscreen'}
            </button>
          </div>

          <div className="mm-ggb-wrapper" ref={wrapRef}>
            {ggbFailed && (
              <div className="mm-ggb-fallback">
                <p>⚠️ GeoGebra could not load online.</p>
                <p className="text-sm">Please verify your internet connection or reload.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stage Footer */}
      <div className="mm-stage-footer">
        <div className="mm-footer-info">
          {isCompleted && (
            <span className="mm-badge-done">✓ Stage 2: GeoGebra Lab Verified</span>
          )}
        </div>
        <button
          className="mm-btn mm-btn-primary mm-btn-lg"
          onClick={onProceed}
          disabled={!isCompleted && !checkpointFeedback?.correct}
        >
          Proceed to Mastery Quiz →
        </button>
      </div>
    </div>
  );
}
