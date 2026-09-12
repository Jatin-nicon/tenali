import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './PaintMixingPlayground.css';

const PIGMENTS = {
  red: { name: 'Crimson Red', rgb: [220, 38, 65], hex: '#dc2641' },
  yellow: { name: 'Golden Amber', rgb: [248, 180, 20], hex: '#f8b414' },
  blue: { name: 'Cobalt Blue', rgb: [30, 85, 190], hex: '#1e55be' },
  pink: { name: 'Blush Rose', rgb: [255, 180, 198], hex: '#ffb4c6' }
};

const MAX_DIST = Math.sqrt(3 * 255 * 255);

const LEVELS = {
  1: {
    id: 1,
    name: 'Tangerine Sunset',
    rgb: [237, 123, 38],
    minCans: 2,
    tip: 'Can you blend Tangerine Sunset using just two colors? Notice how two pigments mix strictly along a single direct path.',
    desc: 'You matched Tangerine Sunset using just 2 colors! In Level 2, you will meet a rich earthy shade that two colors alone could never reach.'
  },
  2: {
    id: 2,
    name: 'Terracotta Sienna',
    rgb: [195, 111, 70],
    minCans: 3,
    tip: 'Notice how Crimson and Amber alone get close, but cannot reach Terracotta Sienna. You need Cobalt Blue to unlock it!',
    desc: 'Brilliant! Two cans were trapped on a single line, but adding Cobalt Blue unlocked an entire plane of rich, earthy tones.'
  },
  3: {
    id: 3,
    name: 'Persimmon Bloom',
    rgb: [239, 123, 100],
    minCans: 4,
    tip: 'Three cans peak around ~88%, but Persimmon Bloom requires radiant luminosity. Unlock Blush Rose to hit the target!',
    desc: 'Master Colorist! You completed all 3 levels! You proved firsthand how each additional pigment expands the dimensional space of reachable colors.'
  }
};

export default function PaintMixingPlayground({ onBack, onNavigateKernel }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState(new Set());

  // Slider values initialized away from the answer
  const [red, setRed] = useState(() => Math.floor(Math.random() * 16) + 70);
  const [yellow, setYellow] = useState(() => Math.floor(Math.random() * 16) + 10);
  const [blue, setBlue] = useState(0);
  const [pink, setPink] = useState(0);

  // Unlocked cans for current level
  const [hasThirdCan, setHasThirdCan] = useState(false); // Blue
  const [hasFourthCan, setHasFourthCan] = useState(false); // Pink

  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedLevel, setCelebratedLevel] = useState(null);

  // Active focused slider for keyboard navigation
  const [focusedCan, setFocusedCan] = useState(null);

  const canvasRef = useRef(null);
  const confettiAnimId = useRef(null);

  const levelConfig = LEVELS[currentLevel];

  // Randomize active sliders away from correct answer
  const handleRandomize = (lvl = currentLevel) => {
    if (lvl === 1) {
      setRed(Math.floor(Math.random() * 16) + 70);
      setYellow(Math.floor(Math.random() * 16) + 10);
      setBlue(0);
      setPink(0);
    } else if (lvl === 2) {
      setRed(Math.floor(Math.random() * 21) + 60);
      setYellow(Math.floor(Math.random() * 16) + 15);
      setBlue(hasThirdCan ? Math.floor(Math.random() * 20) : 0);
      setPink(0);
    } else if (lvl === 3) {
      setRed(Math.floor(Math.random() * 25) + 15);
      setYellow(Math.floor(Math.random() * 25) + 15);
      setBlue(Math.floor(Math.random() * 35) + 45);
      setPink(hasFourthCan ? Math.floor(Math.random() * 15) : 0);
    }
  };

  // Switch level handler
  const handleSwitchLevel = (lvl) => {
    setCurrentLevel(lvl);
    setCelebratedLevel(null);

    if (lvl === 1) {
      setHasThirdCan(false);
      setHasFourthCan(false);
      handleRandomize(1);
    } else if (lvl === 2) {
      setHasThirdCan(false);
      setHasFourthCan(false);
      handleRandomize(2);
    } else if (lvl === 3) {
      setHasThirdCan(true);
      setHasFourthCan(false);
      handleRandomize(3);
    }
  };

  // Compute live current mix
  const currentRgb = useMemo(() => {
    const bWeight = hasThirdCan ? blue : 0;
    const pWeight = hasFourthCan ? pink : 0;
    const total = red + yellow + bWeight + pWeight;

    if (total === 0) {
      return [128, 128, 128]; // neutral gray
    }

    const r = Math.round(
      (red * PIGMENTS.red.rgb[0] +
       yellow * PIGMENTS.yellow.rgb[0] +
       bWeight * PIGMENTS.blue.rgb[0] +
       pWeight * PIGMENTS.pink.rgb[0]) / total
    );
    const g = Math.round(
      (red * PIGMENTS.red.rgb[1] +
       yellow * PIGMENTS.yellow.rgb[1] +
       bWeight * PIGMENTS.blue.rgb[1] +
       pWeight * PIGMENTS.pink.rgb[1]) / total
    );
    const b = Math.round(
      (red * PIGMENTS.red.rgb[2] +
       yellow * PIGMENTS.yellow.rgb[2] +
       bWeight * PIGMENTS.blue.rgb[2] +
       pWeight * PIGMENTS.pink.rgb[2]) / total
    );

    return [r, g, b];
  }, [red, yellow, blue, pink, hasThirdCan, hasFourthCan]);

  // Compute match percentage
  const matchPercent = useMemo(() => {
    const target = levelConfig.rgb;
    const dr = currentRgb[0] - target[0];
    const dg = currentRgb[1] - target[1];
    const db = currentRgb[2] - target[2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    const pct = (1 - dist / MAX_DIST) * 100;
    return Math.max(0, Math.min(100, Math.round(pct * 10) / 10));
  }, [currentRgb, levelConfig]);

  // Launch celebration when match exceeds 95%
  useEffect(() => {
    if (matchPercent >= 95 && celebratedLevel !== currentLevel) {
      setShowCelebration(true);
      setCelebratedLevel(currentLevel);
      setCompletedLevels(prev => new Set([...prev, currentLevel]));
      triggerConfetti();
    }
  }, [matchPercent, celebratedLevel, currentLevel]);

  const triggerConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: Math.random() * 6 + 4,
      color: ['#eb785f', '#f43f5e', '#fad20f', '#3b82f6', '#10b981', '#a855f7'][Math.floor(Math.random() * 6)],
      speedX: (Math.random() - 0.5) * 4,
      speedY: Math.random() * 3 + 2.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 6
    }));

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (frame < 160) {
        confettiAnimId.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  }, []);

  const handleReset = () => {
    setRed(0);
    setYellow(0);
    setBlue(0);
    setPink(0);
  };

  const currentRgbCss = `rgb(${currentRgb[0]}, ${currentRgb[1]}, ${currentRgb[2]})`;
  const targetRgbCss = `rgb(${levelConfig.rgb[0]}, ${levelConfig.rgb[1]}, ${levelConfig.rgb[2]})`;
  const isDarkText = (currentRgb[0] * 0.299 + currentRgb[1] * 0.587 + currentRgb[2] * 0.114) > 160;

  const getGaugeColor = (pct) => {
    if (pct >= 95) return '#10b981';
    if (pct >= 85) return '#f59e0b';
    if (pct >= 70) return '#3b82f6';
    return '#94a3b8';
  };

  const totalPour = red + yellow + (hasThirdCan ? blue : 0) + (hasFourthCan ? pink : 0);
  const activeCount = 2 + (hasThirdCan ? 1 : 0) + (hasFourthCan ? 1 : 0);

  return (
    <div className="pmp-wrapper">
      <canvas
        ref={canvasRef}
        className="pmp-confetti-canvas"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9998 }}
      />

      <div className="pmp-top-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {onBack ? (
          <button className="pmp-back-btn" onClick={onBack}>
            ← Back
          </button>
        ) : <div />}
        {onNavigateKernel && (
          <div className="pmp-module-switch" style={{ display: 'flex', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '9999px', padding: '2px', gap: '2px' }}>
            <button className="pmp-module-tab active" style={{ background: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.775rem', fontWeight: 600, color: '#111827', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              🎨 Color Mixing
            </button>
            <button className="pmp-module-tab" onClick={onNavigateKernel} style={{ background: 'transparent', border: 'none', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.775rem', fontWeight: 500, color: '#6b7280', cursor: 'pointer' }}>
              ⚖️ Zero Balance
            </button>
          </div>
        )}
      </div>

      {/* Brand Header */}
      <div className="pmp-header">
        <h1 className="pmp-title">Paint Mixing Playground</h1>
        <p className="pmp-subtitle">
          Blend pure pigments to match the target shade.
        </p>
      </div>

      {/* Segmented Level Switcher */}
      <div className="pmp-stepper">
        {[1, 2, 3].map(lvl => (
          <button
            key={lvl}
            className={`pmp-step-btn ${currentLevel === lvl ? 'active' : ''}`}
            onClick={() => handleSwitchLevel(lvl)}
          >
            <span>Level {lvl}</span>
            {completedLevels.has(lvl) && <span className="pmp-check-badge">✓</span>}
          </button>
        ))}
      </div>

      {/* Top: Target Color Swatch */}
      <div className="pmp-card">
        <div className="pmp-card-header">
          <span className="pmp-card-title">Target Color</span>
          <span className="pmp-badge">
            Level {currentLevel} ({levelConfig.minCans} Cans)
          </span>
        </div>
        <div className="pmp-swatch" style={{ backgroundColor: targetRgbCss }}>
          <span className="pmp-swatch-name">{levelConfig.name}</span>
        </div>
      </div>

      {/* Below it: Current Mix Swatch */}
      <div className="pmp-card">
        <div className="pmp-card-header">
          <span className="pmp-card-title">Current Mix</span>
          <span className="pmp-badge">
            {totalPour === 0 ? 'Empty Palette' : 'Blended'}
          </span>
        </div>
        <div className="pmp-swatch large" style={{ backgroundColor: currentRgbCss }}>
          <span
            className="pmp-swatch-name"
            style={{ color: isDarkText ? '#111827' : '#ffffff' }}
          >
            {totalPour === 0 ? 'Neutral Gray' : 'Current Blend'}
          </span>
          <span
            className="pmp-swatch-sub"
            style={{ color: isDarkText ? '#4b5563' : 'rgba(255,255,255,0.9)' }}
          >
            {totalPour === 0 ? 'Drag sliders to mix' : 'Live Mixture'}
          </span>
        </div>
        <div className="pmp-split-seam">
          <div className="pmp-split-half" style={{ backgroundColor: targetRgbCss, color: '#ffffff' }}>
            Target: {levelConfig.name}
          </div>
          <div
            className="pmp-split-half"
            style={{
              backgroundColor: currentRgbCss,
              color: isDarkText ? '#111827' : '#ffffff'
            }}
          >
            Your Blend
          </div>
        </div>
      </div>

      {/* Match Gauge */}
      <div className="pmp-card">
        <div className="pmp-gauge-header">
          <span className="pmp-gauge-title">Match Proximity</span>
          <span
            className="pmp-gauge-pct"
            style={{ color: getGaugeColor(matchPercent) }}
          >
            {matchPercent}%
          </span>
        </div>
        <div className="pmp-gauge-track">
          <div
            className="pmp-gauge-fill"
            style={{
              width: `${matchPercent}%`,
              backgroundColor: getGaugeColor(matchPercent)
            }}
          />
          <div className="pmp-gauge-goal-line" title="95% Goal" />
        </div>
        <div className="pmp-gauge-footer">
          <span>
            {matchPercent >= 95
              ? '✨ Target Matched! (≥ 95%)'
              : currentLevel === 2 && !hasThirdCan && matchPercent >= 85
              ? '🔥 Warm (~' + matchPercent + '%), but 2 cans cannot reach this shade!'
              : currentLevel === 3 && !hasFourthCan && matchPercent >= 85
              ? '🔥 Very close (~' + matchPercent + '%), but 3 cans cannot hit 95%!'
              : matchPercent >= 85
              ? '🔥 Very close! Keep fine-tuning!'
              : matchPercent >= 70
              ? '👍 Getting warmer...'
              : 'Drag sliders to explore colors.'}
          </span>
          <span>Goal: ≥ 95%</span>
        </div>
      </div>

      {/* Inline Celebration Card (Shows in-tab so learner can see how/why they got 95%+!) */}
      {matchPercent >= 95 && (
        <div className="pmp-inline-celebration">
          <div className="pmp-inline-badge">
            ✨ Level {currentLevel} Target Matched ({matchPercent}%)
          </div>
          <h3 className="pmp-inline-title">{levelConfig.name} Created!</h3>

          {/* Active Winning Recipe Pills */}
          <div className="pmp-inline-pills">
            <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 600 }}>Your Recipe:</span>
            <span className="pmp-active-mix-pill">{PIGMENTS.red.name}: {red}%</span>
            <span className="pmp-active-mix-pill">{PIGMENTS.yellow.name}: {yellow}%</span>
            {hasThirdCan && <span className="pmp-active-mix-pill">{PIGMENTS.blue.name}: {blue}%</span>}
            {hasFourthCan && <span className="pmp-active-mix-pill">{PIGMENTS.pink.name}: {pink}%</span>}
          </div>

          <p className="pmp-inline-desc">{levelConfig.desc}</p>

          <div className="pmp-inline-action-row">
            {currentLevel < 3 ? (
              <button
                className="pmp-inline-btn-primary"
                onClick={() => handleSwitchLevel(currentLevel + 1)}
              >
                Proceed to Level {currentLevel + 1} →
              </button>
            ) : (
              <>
                {onNavigateKernel && (
                  <button
                    className="pmp-inline-btn-primary"
                    style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
                    onClick={onNavigateKernel}
                  >
                    Next: Zero Balance Challenge ⚖️ →
                  </button>
                )}
                <button
                  className="pmp-inline-btn-secondary"
                  onClick={() => handleSwitchLevel(1)}
                >
                  Play Again
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sliders Card */}
      <div className="pmp-card">
        <div className="pmp-card-header" style={{ marginBottom: '0.65rem' }}>
          <span className="pmp-card-title">Pigment Cans</span>
          <span className="pmp-badge">{activeCount} Cans Active</span>
        </div>
        <div className="pmp-sliders-stack">
          {/* 1. Red */}
          <div
            className={`pmp-slider-row ${focusedCan === 'red' ? 'is-focused' : ''}`}
            style={{
              '--c-thumb': PIGMENTS.red.hex,
              '--c-ring': 'rgba(220,38,65,0.28)'
            }}
          >
            <div className="pmp-can-info">
              <div className="pmp-can-dot" style={{ backgroundColor: PIGMENTS.red.hex }} />
              <span className="pmp-can-name">{PIGMENTS.red.name}</span>
            </div>
            <input
              type="range"
              aria-label={PIGMENTS.red.name}
              min="0"
              max="100"
              value={red}
              onFocus={() => setFocusedCan('red')}
              onBlur={() => setFocusedCan(null)}
              onChange={(e) => setRed(Number(e.target.value))}
              className="pmp-range-input"
            />
            <div className="pmp-can-val">{red}%</div>
          </div>

          {/* 2. Yellow */}
          <div
            className={`pmp-slider-row ${focusedCan === 'yellow' ? 'is-focused' : ''}`}
            style={{
              '--c-thumb': PIGMENTS.yellow.hex,
              '--c-ring': 'rgba(248,180,20,0.3)'
            }}
          >
            <div className="pmp-can-info">
              <div className="pmp-can-dot" style={{ backgroundColor: PIGMENTS.yellow.hex }} />
              <span className="pmp-can-name">{PIGMENTS.yellow.name}</span>
            </div>
            <input
              type="range"
              aria-label={PIGMENTS.yellow.name}
              min="0"
              max="100"
              value={yellow}
              onFocus={() => setFocusedCan('yellow')}
              onBlur={() => setFocusedCan(null)}
              onChange={(e) => setYellow(Number(e.target.value))}
              className="pmp-range-input"
            />
            <div className="pmp-can-val">{yellow}%</div>
          </div>

          {/* 3. Blue */}
          {hasThirdCan && (
            <div
              className={`pmp-slider-row pmp-reveal-row ${focusedCan === 'blue' ? 'is-focused' : ''}`}
              style={{
                '--c-thumb': PIGMENTS.blue.hex,
                '--c-ring': 'rgba(30,85,190,0.28)'
              }}
            >
              <div className="pmp-can-info">
                <div className="pmp-can-dot" style={{ backgroundColor: PIGMENTS.blue.hex }} />
                <span className="pmp-can-name">{PIGMENTS.blue.name}</span>
              </div>
              <input
                type="range"
                aria-label={PIGMENTS.blue.name}
                min="0"
                max="100"
                value={blue}
                onFocus={() => setFocusedCan('blue')}
                onBlur={() => setFocusedCan(null)}
                onChange={(e) => setBlue(Number(e.target.value))}
                className="pmp-range-input"
              />
              <div className="pmp-can-val">{blue}%</div>
            </div>
          )}

          {/* 4. Pink */}
          {hasFourthCan && (
            <div
              className={`pmp-slider-row pmp-reveal-row ${focusedCan === 'pink' ? 'is-focused' : ''}`}
              style={{
                '--c-thumb': '#fb7185',
                '--c-ring': 'rgba(251,113,133,0.3)'
              }}
            >
              <div className="pmp-can-info">
                <div className="pmp-can-dot" style={{ backgroundColor: PIGMENTS.pink.hex }} />
                <span className="pmp-can-name">{PIGMENTS.pink.name}</span>
              </div>
              <input
                type="range"
                aria-label={PIGMENTS.pink.name}
                min="0"
                max="100"
                value={pink}
                onFocus={() => setFocusedCan('pink')}
                onBlur={() => setFocusedCan(null)}
                onChange={(e) => setPink(Number(e.target.value))}
                className="pmp-range-input"
              />
              <div className="pmp-can-val">{pink}%</div>
            </div>
          )}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="pmp-controls-bar">
        <div>
          {currentLevel === 2 && !hasThirdCan && (
            <button
              className="pmp-btn-unlock-can pmp-btn-blue"
              onClick={() => {
                setHasThirdCan(true);
                setBlue(0);
              }}
            >
              + Add 3rd can (Cobalt Blue)
            </button>
          )}

          {currentLevel === 3 && !hasFourthCan && (
            <button
              className="pmp-btn-unlock-can pmp-btn-pink"
              onClick={() => {
                setHasFourthCan(true);
                setPink(0);
              }}
            >
              + Add 4th can (Blush Rose)
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="pmp-btn-secondary" onClick={() => handleRandomize()}>
            🎲 Shuffle
          </button>
          <button className="pmp-btn-secondary" onClick={handleReset}>
            Clear
          </button>
        </div>
      </div>

      {/* Tip Box */}
      <div className="pmp-tip-card">
        <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>💡</span>
        <div>
          <strong>Level {currentLevel}:</strong> {levelConfig.tip}
        </div>
      </div>

      </div>
  );
}
