import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CONCEPTUAL_QUESTIONS } from './questions';
import './LinearAlgebraModule.css';

// ==========================================
// 1. VISUAL: Point vs Bulb (Q1, Q2)
// ==========================================
function PointBulbVisual() {
  const [highlightMode, setHighlightMode] = useState('both'); // 'bulb' | 'point' | 'both'

  return (
    <div className="la-visual-card">
      <div className="la-visual-subhead">
        Visual Model: Physical Object (Bulb) vs. Geometric Point (Location)
      </div>
      <svg className="la-svg-canvas" viewBox="0 0 420 180">
        <defs>
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ceiling */}
        <line x1="20" y1="20" x2="400" y2="20" stroke="rgba(255,245,230,0.25)" strokeWidth="3" />
        <text x="25" y="16" fill="rgba(255,245,230,0.4)" fontSize="9">Ceiling</text>

        {/* Hanging wire */}
        <line x1="210" y1="20" x2="210" y2="65" stroke="#78716c" strokeWidth="2" />

        {/* Bulb Glow */}
        {(highlightMode === 'bulb' || highlightMode === 'both') && (
          <circle cx="210" cy="85" r="45" fill="url(#bulbGlow)" />
        )}

        {/* Physical Bulb Body */}
        <g opacity={highlightMode === 'point' ? 0.35 : 1} style={{ transition: 'opacity 0.2s' }}>
          {/* Base */}
          <rect x="204" y="65" width="12" height="10" rx="2" fill="#a8a29e" />
          {/* Glass body */}
          <path
            d="M 204 75 C 190 85, 192 105, 210 105 C 228 105, 230 85, 216 75 Z"
            fill="#fef08a"
            stroke="#eab308"
            strokeWidth="1.5"
          />
          {/* Filament */}
          <path d="M 207 88 Q 210 82 213 88" stroke="#ca8a04" strokeWidth="1.5" fill="none" />
        </g>

        {/* Location Point (Red Reticle Dot) */}
        <g opacity={highlightMode === 'bulb' ? 0.35 : 1} style={{ transition: 'opacity 0.2s' }}>
          <circle cx="210" cy="85" r="3.5" fill="#ef4444" />
          <circle cx="210" cy="85" r="14" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="210" y1="65" x2="210" y2="78" stroke="#ef4444" strokeWidth="1" />
          <line x1="210" y1="92" x2="210" y2="105" stroke="#ef4444" strokeWidth="1" />
          <line x1="190" y1="85" x2="203" y2="85" stroke="#ef4444" strokeWidth="1" />
          <line x1="217" y1="85" x2="230" y2="85" stroke="#ef4444" strokeWidth="1" />
        </g>

        {/* Pointing finger / arrow */}
        <path d="M 330 145 L 225 93" stroke="#e8864a" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrow-point)" />
        <circle cx="330" cy="145" r="4" fill="#e8864a" />
        <text x="338" y="148" fill="#e8864a" fontSize="10" fontWeight="bold">Your Finger Pointing</text>

        {/* Explanatory Annotations */}
        <text x="60" y="80" fill="#fef08a" fontSize="10" fontWeight="600">
          Physical Bulb:
        </text>
        <text x="60" y="94" fill="rgba(255,245,230,0.6)" fontSize="9">
          Has glass, metal & size &gt; 0
        </text>

        <text x="60" y="125" fill="#ef4444" fontSize="10" fontWeight="600">
          Point (Location):
        </text>
        <text x="60" y="139" fill="rgba(255,245,230,0.6)" fontSize="9">
          Zero size, pure spatial coordinate
        </text>
      </svg>

      <div className="la-visual-actions">
        <button
          className={`la-pill-btn ${highlightMode === 'bulb' ? 'active' : ''}`}
          onClick={() => setHighlightMode('bulb')}
        >
          View Bulb (Object)
        </button>
        <button
          className={`la-pill-btn ${highlightMode === 'point' ? 'active' : ''}`}
          onClick={() => setHighlightMode('point')}
        >
          View Point (Location)
        </button>
        <button
          className={`la-pill-btn ${highlightMode === 'both' ? 'active' : ''}`}
          onClick={() => setHighlightMode('both')}
        >
          Compare Both
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. VISUAL: Drawn Dot on Paper (Q3)
// ==========================================
function StandinCircleVisual() {
  const [zoomLevel, setZoomLevel] = useState(1);

  // At zoom 1: inkRadius is 3.5px, completely covering the red center point.
  // As zoom increases: inkRadius expands to reveal the physical ink blob vs infinitesimal center point.
  const inkRadius = 3.5 + (zoomLevel - 1) * 7.5;
  const isZoomed = zoomLevel > 1;

  return (
    <div className="la-visual-card">
      <div className="la-visual-subhead">
        Visual Model: Zooming into a Drawn Dot on Paper
      </div>
      <svg className="la-svg-canvas" viewBox="0 0 420 180">
        <defs>
          <radialGradient id="inkTexture" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={isZoomed ? 0.35 : 0.95} />
            <stop offset="85%" stopColor="#2563eb" stopOpacity={isZoomed ? 0.22 : 0.95} />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={isZoomed ? 0.1 : 0.85} />
          </radialGradient>
        </defs>

        {/* Paper Background */}
        <rect x="30" y="15" width="360" height="150" rx="8" fill="#241e1a" stroke="rgba(255,245,230,0.18)" />
        <text x="45" y="35" fill="rgba(255,245,230,0.4)" fontSize="9">Sheet of Paper</text>

        {/* Subtle microscope grid lines when zoomed */}
        {isZoomed && (
          <g opacity="0.12">
            <line x1="30" y1="90" x2="390" y2="90" stroke="#fff" strokeWidth="0.5" strokeDasharray="4,4" />
            <line x1="210" y1="15" x2="210" y2="165" stroke="#fff" strokeWidth="0.5" strokeDasharray="4,4" />
          </g>
        )}

        {/* The true mathematical point at the exact center */}
        {/* At zoom 1 it is completely covered underneath the ink dot */}
        <circle cx="210" cy="90" r="2" fill="#ef4444" />
        {isZoomed && (
          <g>
            <circle cx="210" cy="90" r="7" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2,2" />
            <line x1="198" y1="90" x2="222" y2="90" stroke="#ef4444" strokeWidth="0.8" />
            <line x1="210" y1="78" x2="210" y2="102" stroke="#ef4444" strokeWidth="0.8" />
          </g>
        )}

        {/* Drawn Ink Dot (Covers the point at 1x; expands as we zoom in) */}
        <circle
          cx="210"
          cy="90"
          r={inkRadius}
          fill="url(#inkTexture)"
          stroke="#60a5fa"
          strokeWidth={isZoomed ? 1.5 : 0}
        />

        {/* Annotations */}
        {!isZoomed ? (
          <g>
            <line x1="210" y1="90" x2="280" y2="65" stroke="#60a5fa" strokeWidth="1.2" />
            <circle cx="280" cy="65" r="2.5" fill="#60a5fa" />
            <text x="286" y="68" fill="#60a5fa" fontSize="9.5" fontWeight="bold">
              Pen Dot (covering the point)
            </text>
            <text x="210" y="145" textAnchor="middle" fill="rgba(255,245,230,0.65)" fontSize="9">
              At 1x scale, the ink dot completely covers the location. Zoom in to look closer!
            </text>
          </g>
        ) : (
          <g>
            {/* Ink speck outline label */}
            <line
              x1={210 + inkRadius * 0.707}
              y1={90 - inkRadius * 0.707}
              x2="305"
              y2="45"
              stroke="#60a5fa"
              strokeWidth="1.2"
            />
            <circle cx="305" cy="45" r="2.5" fill="#60a5fa" />
            <text x="312" y="48" fill="#60a5fa" fontSize="9" fontWeight="bold">
              Ink Speck (Area &gt; 0)
            </text>

            {/* True center point label */}
            <line x1="210" y1="90" x2="305" y2="95" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="305" cy="95" r="2.5" fill="#ef4444" />
            <text x="312" y="98" fill="#ef4444" fontSize="9" fontWeight="bold">
              True Point (Area = 0)
            </text>

            <text x="210" y="155" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">
              Zoom {zoomLevel}x: The ink dot has physical width, but the mathematical point at center has zero size!
            </text>
          </g>
        )}
      </svg>

      <div className="la-visual-actions">
        <button
          className={`la-pill-btn ${zoomLevel === 1 ? 'active' : ''}`}
          onClick={() => setZoomLevel(1)}
        >
          1x (Covered Pen Dot)
        </button>
        <button
          className={`la-pill-btn ${zoomLevel === 3 ? 'active' : ''}`}
          onClick={() => setZoomLevel(3)}
        >
          3x (Magnifying Glass)
        </button>
        <button
          className={`la-pill-btn ${zoomLevel === 7 ? 'active' : ''}`}
          onClick={() => setZoomLevel(7)}
        >
          7x (Microscope View)
        </button>
      </div>

      <div className="la-slider-control">
        <label>Zoom Magnification: <strong>{zoomLevel}x</strong></label>
        <input
          type="range"
          min="1"
          max="8"
          step="0.5"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

// ==========================================
// 3. VISUAL: Boundless Space (Q4, Q5)
// ==========================================
function BoundlessSpaceVisual() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % 400);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="la-visual-card">
      <div className="la-visual-subhead">
        Visual Model: Total Freedom of Motion (Deep Space — No Walls, No End)
      </div>
      <svg className="la-svg-canvas" viewBox="0 0 420 170">
        {/* Background stars */}
        {[
          [30, 40], [90, 120], [150, 30], [220, 140], [290, 50], [360, 110],
          [70, 70], [180, 90], [250, 25], [330, 150], [400, 60]
        ].map(([sx, sy], i) => (
          <circle
            key={i}
            cx={(sx + offset * 0.2) % 420}
            cy={sy}
            r={i % 2 === 0 ? 1.5 : 2.5}
            fill="#ffffff"
            opacity={(i % 3 + 1) * 0.25}
          />
        ))}

        {/* Motion Ray stretching infinitely */}
        <line x1="30" y1="85" x2="390" y2="85" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" />
        <polygon points="390,81 405,85 390,89" fill="#3b82f6" />

        {/* Drifting traveler */}
        <g transform={`translate(${(offset * 0.9) % 360 + 30}, 85)`}>
          <circle cx="0" cy="0" r="10" fill="#e8864a" />
          <circle cx="0" cy="0" r="16" fill="none" stroke="#e8864a" strokeWidth="1" opacity="0.4" />
          <text x="0" y="3" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">YOU</text>
        </g>

        <text x="20" y="150" fill="rgba(255,245,230,0.7)" fontSize="9.5">
          Boundless Space: Pick any direction → walk forever → never stopped.
        </text>
      </svg>
    </div>
  );
}

// ==========================================
// 4. ACTIVITY: The Square (Q6)
// ==========================================
function TheSquareActivity() {
  const [posX, setPosX] = useState(150);
  const [posY, setPosY] = useState(100);
  const [hitWall, setHitWall] = useState(null);
  const [trail, setTrail] = useState([{ x: 150, y: 100 }]);

  const minX = 70;
  const maxX = 250;
  const minY = 20;
  const maxY = 180;

  const move = (dx, dy) => {
    const nextX = Math.min(maxX, Math.max(minX, posX + dx));
    const nextY = Math.min(maxY, Math.max(minY, posY + dy));

    if (nextX === minX || nextX === maxX || nextY === minY || nextY === maxY) {
      let wallName = 'Boundary Wall';
      if (nextX === minX) wallName = 'Left Wall';
      else if (nextX === maxX) wallName = 'Right Wall';
      else if (nextY === minY) wallName = 'Top Wall';
      else if (nextY === maxY) wallName = 'Bottom Wall';
      setHitWall(wallName);
    } else {
      setHitWall(null);
    }

    setPosX(nextX);
    setPosY(nextY);
    setTrail((prev) => [...prev.slice(-12), { x: nextX, y: nextY }]);
  };

  const handleReset = () => {
    setPosX(150);
    setPosY(100);
    setHitWall(null);
    setTrail([{ x: 150, y: 100 }]);
  };

  return (
    <div className="la-activity-box">
      <div className="la-activity-header">
        <span className="la-activity-badge">Interactive Simulation</span>
        <strong>The Square: Try Walking in Different Directions</strong>
      </div>

      <svg className="la-activity-svg" viewBox="0 0 320 200">
        {/* Exterior outside square */}
        <rect x="0" y="0" width="320" height="200" fill="#181412" />

        {/* Square interior */}
        <rect x={minX} y={minY} width={maxX - minX} height={maxY - minY} fill="#231e1a" />

        {/* Visible boundary walls */}
        <rect
          x={minX}
          y={minY}
          width={maxX - minX}
          height={maxY - minY}
          fill="none"
          stroke={hitWall ? '#ef4444' : '#e8864a'}
          strokeWidth="3.5"
          style={{ transition: 'stroke 0.2s' }}
        />

        {/* Trail */}
        {trail.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="2" fill="#f59e0b" opacity={(i + 1) / trail.length * 0.7} />
        ))}

        {/* Learner Avatar */}
        <circle cx={posX} cy={posY} r="8" fill="#10b981" />
        <circle cx={posX} cy={posY} r="14" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
        <text x={posX} y={posY + 3} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">YOU</text>

        {/* Wall labels */}
        <text x="160" y="15" textAnchor="middle" fill="rgba(255,245,230,0.4)" fontSize="8">WALL</text>
        <text x="160" y="195" textAnchor="middle" fill="rgba(255,245,230,0.4)" fontSize="8">WALL</text>
        <text x="50" y="105" textAnchor="middle" fill="rgba(255,245,230,0.4)" fontSize="8">WALL</text>
        <text x="270" y="105" textAnchor="middle" fill="rgba(255,245,230,0.4)" fontSize="8">WALL</text>
      </svg>

      {/* Collision Alert */}
      {hitWall ? (
        <div className="la-alert-box wall-hit">
          ⛔ <strong>{hitWall} Hit!</strong> Motion is stopped. You cannot walk past the boundary!
        </div>
      ) : (
        <div className="la-alert-box wall-safe">
          🚶 Walking inside square... Pick a direction to test boundaries.
        </div>
      )}

      {/* Direction Controls */}
      <div className="la-dir-pad">
        <div className="la-dir-row">
          <button className="la-dir-btn" onClick={() => move(-25, -25)}>↖ NW</button>
          <button className="la-dir-btn" onClick={() => move(0, -35)}>↑ North</button>
          <button className="la-dir-btn" onClick={() => move(25, -25)}>↗ NE</button>
        </div>
        <div className="la-dir-row">
          <button className="la-dir-btn" onClick={() => move(-35, 0)}>← West</button>
          <button className="la-dir-btn reset" onClick={handleReset}>Center ↺</button>
          <button className="la-dir-btn" onClick={() => move(35, 0)}>East →</button>
        </div>
        <div className="la-dir-row">
          <button className="la-dir-btn" onClick={() => move(-25, 25)}>↙ SW</button>
          <button className="la-dir-btn" onClick={() => move(0, 35)}>↓ South</button>
          <button className="la-dir-btn" onClick={() => move(25, 25)}>↘ SE</button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. VISUAL: Radiating Directions (Q8, Q9)
// ==========================================
function RadiatingDirectionsVisual() {
  const [angle, setAngle] = useState(45);

  const rays = useMemo(() => {
    const list = [];
    for (let deg = 0; deg < 360; deg += 15) {
      const rad = (deg * Math.PI) / 180;
      list.push({
        deg,
        x2: 210 + Math.cos(rad) * 65,
        y2: 85 + Math.sin(rad) * 65
      });
    }
    return list;
  }, []);

  const chosenRad = (angle * Math.PI) / 180;
  const chosenX = 210 + Math.cos(chosenRad) * 75;
  const chosenY = 85 + Math.sin(chosenRad) * 75;

  return (
    <div className="la-visual-card">
      <div className="la-visual-subhead">
        Visual Model: Infinitely Many Continuous Directions at a Single Point
      </div>
      <svg className="la-svg-canvas" viewBox="0 0 420 180">
        {/* Radiating 360 Rays */}
        {rays.map((r) => (
          <line
            key={r.deg}
            x1="210"
            y1="85"
            x2={r.x2}
            y2={r.y2}
            stroke="rgba(255, 245, 230, 0.12)"
            strokeWidth="1"
          />
        ))}

        {/* Selected Ray */}
        <line x1="210" y1="85" x2={chosenX} y2={chosenY} stroke="#10b981" strokeWidth="2.5" />
        <circle cx={chosenX} cy={chosenY} r="3.5" fill="#10b981" />

        {/* Origin Point */}
        <circle cx="210" cy="85" r="5" fill="#ef4444" />
        <circle cx="210" cy="85" r="10" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
        <text x="210" y="105" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">
          Your Location (Point)
        </text>

        {/* Angle indicator */}
        <text x="340" y="35" fill="#10b981" fontSize="10" fontWeight="bold">
          Facing: {angle}°
        </text>
        <text x="340" y="50" fill="rgba(255,245,230,0.5)" fontSize="8.5">
          Between any 2 angles, ∞ more exist!
        </text>
      </svg>

      <div className="la-slider-control">
        <label>Rotate Chosen Direction: <strong>{angle}°</strong></label>
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

// ==========================================
// 6. VISUAL: Floor Navigation (Q10, Q12)
// ==========================================
function FloorNavigationVisual() {
  const [directionsCount, setDirectionsCount] = useState(2);

  return (
    <div className="la-visual-card">
      <div className="la-visual-subhead">
        Visual Model: Flat Floor Surface — 1 Direction (Line) vs. 2 Directions (Entire Plane)
      </div>
      <svg className="la-svg-canvas" viewBox="0 0 420 180">
        {/* Isometric / flat floor plane */}
        <polygon
          points="80,145 160,35 360,35 280,145"
          fill="rgba(232, 134, 74, 0.08)"
          stroke="rgba(232, 134, 74, 0.3)"
          strokeWidth="1.5"
        />

        {/* Origin */}
        <circle cx="180" cy="90" r="4" fill="#ef4444" />
        <text x="175" y="105" fill="#ef4444" fontSize="9" fontWeight="bold">Origin</text>

        {/* Direction 1 (Forward / Along Line) */}
        <line x1="120" y1="90" x2="300" y2="90" stroke="#3b82f6" strokeWidth={directionsCount === 1 ? 3 : 2} />
        <polygon points="300,86 312,90 300,94" fill="#3b82f6" />
        <text x="315" y="93" fill="#60a5fa" fontSize="9" fontWeight="bold">Direction 1</text>

        {/* Direction 2 (Sideways / Across Surface) */}
        {directionsCount === 2 && (
          <>
            <line x1="210" y1="45" x2="150" y2="135" stroke="#10b981" strokeWidth="2" />
            <polygon points="146,131 140,142 154,136" fill="#10b981" />
            <text x="110" y="145" fill="#10b981" fontSize="9" fontWeight="bold">Direction 2</text>

            {/* Shaded reachable plane */}
            <text x="210" y="165" textAnchor="middle" fill="#10b981" fontSize="9.5" fontWeight="bold">
              ✓ 2 directions span every coordinate on the flat floor (Dimension = 2)
            </text>
          </>
        )}

        {directionsCount === 1 && (
          <text x="210" y="165" textAnchor="middle" fill="#f59e0b" fontSize="9.5" fontWeight="bold">
            ⚠️ 1 direction only covers a 1D line — points off this line cannot be reached!
          </text>
        )}
      </svg>

      <div className="la-visual-actions">
        <button
          className={`la-pill-btn ${directionsCount === 1 ? 'active' : ''}`}
          onClick={() => setDirectionsCount(1)}
        >
          Use 1 Direction (Line)
        </button>
        <button
          className={`la-pill-btn ${directionsCount === 2 ? 'active' : ''}`}
          onClick={() => setDirectionsCount(2)}
        >
          Use 2 Directions (Entire Floor)
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 7. ACTIVITY: The Canvas (Q11) ⭐ Defining Activity
// ==========================================
function TheCanvasActivity() {
  const [activeMode, setActiveMode] = useState('one_dir'); // 'one_dir' | 'two_dir'
  const [slider1, setSlider1] = useState(1);
  const [slider2, setSlider2] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState(null);

  const origin = { x: 200, y: 110 };

  // Fixed basis direction 1 & direction 2
  const v1 = { x: 75, y: -25 };  // points toward dot 1
  const v2 = { x: -45, y: -45 }; // points toward dot 2

  const targetDots = [
    { id: 1, name: 'T₁ (on line 1)', x: origin.x + v1.x * 1.5, y: origin.y + v1.y * 1.5, onLine1: true },
    { id: 2, name: 'T₂ (direction 2)', x: origin.x + v2.x * 1.5, y: origin.y + v2.y * 1.5, onLine1: false },
    { id: 3, name: 'T₃', x: origin.x + v1.x * 1.0 + v2.x * 1.2, y: origin.y + v1.y * 1.0 + v2.y * 1.2, onLine1: false },
    { id: 4, name: 'T₄', x: origin.x + v1.x * -0.8 + v2.x * 0.9, y: origin.y + v1.y * -0.8 + v2.y * 0.9, onLine1: false },
    { id: 5, name: 'T₅', x: origin.x + v1.x * 1.2 + v2.x * -0.9, y: origin.y + v1.y * 1.2 + v2.y * -0.9, onLine1: false },
    { id: 6, name: 'T₆', x: origin.x + v1.x * -1.2 + v2.x * -0.7, y: origin.y + v1.y * -1.2 + v2.y * -0.7, onLine1: false },
    { id: 7, name: 'T₇ (on line 1)', x: origin.x + v1.x * -1.5, y: origin.y + v1.y * -1.5, onLine1: true },
  ];

  // Calculate current walker position
  const currentPos = {
    x: origin.x + v1.x * slider1 + (activeMode === 'two_dir' ? v2.x * slider2 : 0),
    y: origin.y + v1.y * slider1 + (activeMode === 'two_dir' ? v2.y * slider2 : 0)
  };

  // Auto-solve for target dot
  const handleReachDot = (dot) => {
    setSelectedTarget(dot);
    if (activeMode === 'one_dir') {
      if (dot.onLine1) {
        // Dot 1 is at 1.5, Dot 7 is at -1.5
        setSlider1(dot.id === 1 ? 1.5 : -1.5);
      }
    } else {
      // Solve 2x2 system
      const det = v1.x * v2.y - v2.x * v1.y;
      const px = dot.x - origin.x;
      const py = dot.y - origin.y;
      const c1 = (px * v2.y - py * v2.x) / det;
      const c2 = (v1.x * py - v1.y * px) / det;
      setSlider1(Number(c1.toFixed(2)));
      setSlider2(Number(c2.toFixed(2)));
    }
  };

  return (
    <div className="la-activity-box">
      <div className="la-activity-header">
        <span className="la-activity-badge">Defining Activity</span>
        <strong>The Canvas: Grid &amp; Axes Hidden</strong>
      </div>

      <div className="la-activity-tabs">
        <button
          className={`la-tab-btn ${activeMode === 'one_dir' ? 'active' : ''}`}
          onClick={() => {
            setActiveMode('one_dir');
            setSlider2(0);
          }}
        >
          1. Test One Fixed Direction
        </button>
        <button
          className={`la-tab-btn ${activeMode === 'two_dir' ? 'active' : ''}`}
          onClick={() => setActiveMode('two_dir')}
        >
          2. Unlock Second Direction (Dimension 2)
        </button>
      </div>

      <svg className="la-activity-svg canvas-clean" viewBox="0 0 400 220">
        {/* Line 1 (Fixed Direction 1) */}
        <line
          x1={origin.x - v1.x * 3}
          y1={origin.y - v1.y * 3}
          x2={origin.x + v1.x * 3}
          y2={origin.y + v1.y * 3}
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeDasharray={activeMode === 'two_dir' ? '4,4' : 'none'}
        />

        {/* Direction 2 Line if unlocked */}
        {activeMode === 'two_dir' && (
          <line
            x1={origin.x - v2.x * 2.5}
            y1={origin.y - v2.y * 2.5}
            x2={origin.x + v2.x * 2.5}
            y2={origin.y + v2.y * 2.5}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
        )}

        {/* Target Dots scattered */}
        {targetDots.map((dot) => {
          const isSelected = selectedTarget?.id === dot.id;
          return (
            <g
              key={dot.id}
              onClick={() => handleReachDot(dot)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={dot.x}
                cy={dot.y}
                r={isSelected ? 6 : 4.5}
                fill={isSelected ? '#f59e0b' : '#a89e94'}
              />
              <text x={dot.x + 8} y={dot.y + 3} fill="rgba(255,245,230,0.8)" fontSize="8.5">
                {dot.name}
              </text>
            </g>
          );
        })}

        {/* Origin */}
        <circle cx={origin.x} cy={origin.y} r="5" fill="#ef4444" />
        <text x={origin.x - 22} y={origin.y + 15} fill="#ef4444" fontSize="8.5" fontWeight="bold">
          Origin
        </text>

        {/* Walk Path: Step 1 along v1, then step 2 along v2 */}
        {activeMode === 'two_dir' && slider2 !== 0 && (
          <>
            <line
              x1={origin.x}
              y1={origin.y}
              x2={origin.x + v1.x * slider1}
              y2={origin.y + v1.y * slider1}
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
            <line
              x1={origin.x + v1.x * slider1}
              y1={origin.y + v1.y * slider1}
              x2={currentPos.x}
              y2={currentPos.y}
              stroke="#10b981"
              strokeWidth="2.5"
            />
          </>
        )}

        {/* Current Position Marker */}
        <circle cx={currentPos.x} cy={currentPos.y} r="6.5" fill="#f59e0b" />
        <circle cx={currentPos.x} cy={currentPos.y} r="11" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <text x={currentPos.x} y={currentPos.y - 10} textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">
          YOU
        </text>
      </svg>

      {/* Observation message banner */}
      {activeMode === 'one_dir' ? (
        <div className="la-alert-box wall-safe">
          {selectedTarget && !selectedTarget.onLine1 ? (
            <span style={{ color: '#ef4444' }}>
              ❌ <strong>{selectedTarget.name} is unreachable!</strong> With only 1 direction, you can only slide along the blue line.
            </span>
          ) : (
            <span>💡 <strong>1 Direction test:</strong> Click any dot or adjust the slider. Notice that dots off the line are impossible to reach!</span>
          )}
        </div>
      ) : (
        <div className="la-alert-box wall-safe" style={{ borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
          <span style={{ color: '#10b981' }}>
            🎯 <strong>2 Directions active:</strong> Walk along Direction 1, then turn and walk along Direction 2. Every dot on the canvas is reachable!
          </span>
        </div>
      )}

      {/* Sliders */}
      <div className="la-canvas-controls">
        <div className="la-slider-row">
          <label>Direction 1 Step (c₁): <strong>{slider1}</strong></label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={slider1}
            onChange={(e) => setSlider1(Number(e.target.value))}
          />
        </div>
        {activeMode === 'two_dir' && (
          <div className="la-slider-row">
            <label>Direction 2 Step (c₂): <strong>{slider2}</strong></label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={slider2}
              onChange={(e) => setSlider2(Number(e.target.value))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. ACTIVITY: Verification (Q13)
// ==========================================
function VerificationActivity() {
  const origin = { x: 200, y: 110 };
  const v1 = { x: 70, y: -20 };
  const v2 = { x: -40, y: -50 };

  const [newDot, setNewDot] = useState({ x: 280, y: 55 });
  const [reached, setReached] = useState(false);

  // Compute exact c1 and c2
  const { c1, c2 } = useMemo(() => {
    const det = v1.x * v2.y - v2.x * v1.y;
    const px = newDot.x - origin.x;
    const py = newDot.y - origin.y;
    return {
      c1: Number(((px * v2.y - py * v2.x) / det).toFixed(2)),
      c2: Number(((v1.x * py - v1.y * px) / det).toFixed(2))
    };
  }, [newDot]);

  const handleSpawnDot = () => {
    const randX = Math.floor(60 + Math.random() * 280);
    const randY = Math.floor(30 + Math.random() * 150);
    setNewDot({ x: randX, y: randY });
    setReached(false);
  };

  const handleVerify = () => {
    setReached(true);
  };

  return (
    <div className="la-activity-box">
      <div className="la-activity-header">
        <span className="la-activity-badge">Verification Step</span>
        <strong>Show That Dimension = 2 Holds For Any New Dot</strong>
      </div>

      <svg className="la-activity-svg canvas-clean" viewBox="0 0 400 210">
        {/* Origin */}
        <circle cx={origin.x} cy={origin.y} r="5" fill="#ef4444" />
        <text x={origin.x - 24} y={origin.y + 15} fill="#ef4444" fontSize="8.5" fontWeight="bold">Origin</text>

        {/* Direction 1 and Direction 2 Basis rays */}
        <line x1={origin.x} y1={origin.y} x2={origin.x + v1.x} y2={origin.y + v1.y} stroke="#3b82f6" strokeWidth="2" />
        <text x={origin.x + v1.x + 5} y={origin.y + v1.y} fill="#60a5fa" fontSize="8.5">v₁</text>

        <line x1={origin.x} y1={origin.y} x2={origin.x + v2.x} y2={origin.y + v2.y} stroke="#10b981" strokeWidth="2" />
        <text x={origin.x + v2.x - 12} y={origin.y + v2.y} fill="#10b981" fontSize="8.5">v₂</text>

        {/* Reached path when verified */}
        {reached && (
          <>
            <line
              x1={origin.x}
              y1={origin.y}
              x2={origin.x + v1.x * c1}
              y2={origin.y + v1.y * c1}
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
            <line
              x1={origin.x + v1.x * c1}
              y1={origin.y + v1.y * c1}
              x2={newDot.x}
              y2={newDot.y}
              stroke="#10b981"
              strokeWidth="2.5"
            />
          </>
        )}

        {/* Target Dot */}
        <circle cx={newDot.x} cy={newDot.y} r="6" fill="#f59e0b" />
        <circle cx={newDot.x} cy={newDot.y} r="12" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
        <text x={newDot.x + 8} y={newDot.y + 3} fill="#f59e0b" fontSize="9" fontWeight="bold">
          New Target Dot
        </text>
      </svg>

      <div className="la-alert-box wall-safe">
        {reached ? (
          <span style={{ color: '#10b981' }}>
            ✓ <strong>Verified!</strong> Target reached by walking <strong>{c1} · v₁</strong>, then turning and walking <strong>{c2} · v₂</strong>.
          </span>
        ) : (
          <span>A new random dot has appeared. Can only 2 fixed directions reach it?</span>
        )}
      </div>

      <div className="la-visual-actions">
        <button className="la-pill-btn active" onClick={handleVerify}>
          Test Walk with 2 Directions 🚶
        </button>
        <button className="la-pill-btn" onClick={handleSpawnDot}>
          Spawn Another Random Dot 🎲
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 9. VISUAL: Dimension Trap (Q15)
// ==========================================
function DimensionTrapVisual() {
  const [angle, setAngle] = useState(60);

  const rad = (angle * Math.PI) / 180;
  const rayX = 210 + Math.cos(rad) * 60;
  const rayY = 90 + Math.sin(rad) * 60;

  return (
    <div className="la-visual-card">
      <div className="la-visual-subhead">
        Visual Model: Dimension = 2 vs. Available Directions = Infinite
      </div>
      <svg className="la-svg-canvas" viewBox="0 0 420 180">
        {/* Shaded 2D plane */}
        <rect x="70" y="20" width="280" height="140" rx="8" fill="rgba(59, 130, 246, 0.08)" stroke="rgba(59, 130, 246, 0.2)" />

        {/* 2 Basis Directions */}
        <line x1="210" y1="90" x2="280" y2="90" stroke="#3b82f6" strokeWidth="2.5" />
        <polygon points="280,87 288,90 280,93" fill="#3b82f6" />
        <text x="290" y="93" fill="#60a5fa" fontSize="9" fontWeight="bold">Basis v₁</text>

        <line x1="210" y1="90" x2="210" y2="35" stroke="#10b981" strokeWidth="2.5" />
        <polygon points="207,35 210,27 213,35" fill="#10b981" />
        <text x="215" y="35" fill="#10b981" fontSize="9" fontWeight="bold">Basis v₂</text>

        {/* Rotating angle direction */}
        <line x1="210" y1="90" x2={rayX} y2={rayY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
        <circle cx={rayX} cy={rayY} r="3" fill="#f59e0b" />

        {/* Origin */}
        <circle cx="210" cy="90" r="4" fill="#ef4444" />
        <text x="175" y="105" fill="#ef4444" fontSize="8.5" fontWeight="bold">You (Origin)</text>

        <text x="80" y="145" fill="rgba(255,245,230,0.6)" fontSize="9">
          • Minimum directions needed to span: <strong>2 (Dimension = 2)</strong>
        </text>
        <text x="80" y="157" fill="#fbbf24" fontSize="9">
          • Number of directions you can look or turn toward: <strong>Infinitely many</strong>
        </text>
      </svg>
      <div className="la-slider-control">
        <label>Rotate Gaze: <strong>{angle}°</strong></label>
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

// ==========================================
// VISUAL DISPATCHER
// ==========================================
function QuestionVisualDispatcher({ q }) {
  if (q.activityType === 'square') return <TheSquareActivity />;
  if (q.activityType === 'canvas') return <TheCanvasActivity />;
  if (q.activityType === 'verification') return <VerificationActivity />;
  if (q.visualType === 'point_bulb') return <PointBulbVisual />;
  if (q.visualType === 'standin_circle') return <StandinCircleVisual />;
  if (q.visualType === 'boundless_space') return <BoundlessSpaceVisual />;
  if (q.visualType === 'radiating_directions') return <RadiatingDirectionsVisual />;
  if (q.visualType === 'floor_navigation') return <FloorNavigationVisual />;
  if (q.visualType === 'dimension_trap') return <DimensionTrapVisual />;
  return null;
}

// ==========================================
// MAIN MODULE COMPONENT
// ==========================================
export default function LinearAlgebraModule({ onBack, questions = CONCEPTUAL_QUESTIONS }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const isAnswered = userAnswers[currentIndex] !== undefined;

  const totalQuestions = questions.length;
  const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;

  const isOptionCorrect = (optIdx) => {
    return optIdx === currentQ.correct;
  };

  const handleSelectOption = (idx) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (currentQ.inputType === 'mcq') {
      if (selectedOption === null) return;
      const correct = isOptionCorrect(selectedOption);
      setUserAnswers((prev) => ({
        ...prev,
        [currentIndex]: {
          type: 'mcq',
          selected: selectedOption,
          isCorrect: correct
        }
      }));
      setSubmitted(true);
    } else {
      const trimmed = typedAnswer.trim();
      if (!trimmed) return;

      let isCorrect = true;
      const lower = trimmed.toLowerCase();
      if (currentQ.keywords && currentQ.keywords.length > 0) {
        isCorrect = currentQ.keywords.some((kw) => lower.includes(kw.toLowerCase()));
      }

      setUserAnswers((prev) => ({
        ...prev,
        [currentIndex]: {
          type: 'text',
          answer: trimmed,
          isCorrect: isCorrect
        }
      }));
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (currentQ.inputType === 'text' || (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const loadQuestionState = (idx) => {
    setCurrentIndex(idx);
    const existing = userAnswers[idx];
    if (existing) {
      if (existing.type === 'mcq') {
        setSelectedOption(existing.selected);
        setTypedAnswer('');
      } else {
        setSelectedOption(null);
        setTypedAnswer(existing.answer || '');
      }
      setSubmitted(true);
    } else {
      setSelectedOption(null);
      setTypedAnswer('');
      setSubmitted(false);
    }
    setShowHint(false);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      loadQuestionState(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      loadQuestionState(currentIndex - 1);
    }
  };

  const handleJumpTo = (idx) => {
    loadQuestionState(idx);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setTypedAnswer('');
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
          <h2 className="la-celebration-title">Set 01: Point to Dimension Completed!</h2>
          <p className="la-celebration-sub">
            You completed {correctCount} of {totalQuestions} conceptual reflections and activities ({accuracy}% intuition score).
          </p>

          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.75rem' }}>
            <button className="la-btn-primary" onClick={handleRestart}>
              Explore Again 🔄
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

  const answeredInfo = userAnswers[currentIndex];
  const userWasCorrect = answeredInfo?.isCorrect ?? true;

  const canSubmit = currentQ.inputType === 'mcq'
    ? selectedOption !== null
    : typedAnswer.trim().length > 0;

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
        <h1 className="la-title">From Point to Dimension</h1>
        <p className="la-subtitle">Conceptual foundations of Linear Algebra (Set 01)</p>
      </div>

      {/* Segmented Progress Stepper */}
      <div className="la-stepper-bar">
        {questions.map((q, idx) => {
          const answered = userAnswers[idx];
          const isCurrent = idx === currentIndex;
          let className = 'la-step-pill';
          if (answered) className += answered.isCorrect ? ' completed' : ' partially-completed';
          if (isCurrent) className += ' active';

          return (
            <button
              key={q.id}
              className={className}
              onClick={() => handleJumpTo(idx)}
              title={`Q${idx + 1}: ${q.title}`}
            />
          );
        })}
      </div>

      {/* Question Card */}
      <div className="la-card">
        {/* Stage & Topic Banner */}
        <div className="la-stage-banner">
          <span className="la-stage-label">{currentQ.stage}</span>
        </div>

        <div className="la-card-header">
          <span className="la-topic-badge">{currentQ.topic}</span>
          <span className="la-question-num">
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Question Prompt with line breaks preserved */}
        <div className="la-prompt-wrapper">
          {currentQ.prompt.split('\n\n').map((para, pIdx) => (
            <p key={pIdx} className="la-prompt-paragraph">
              {para}
            </p>
          ))}
        </div>

        {/* Interactive / Visual Simulation Component */}
        <QuestionVisualDispatcher q={currentQ} />

        {/* 1. MCQ MODE: Render option buttons */}
        {currentQ.inputType === 'mcq' && (
          <>
            <div className="la-options-label">Select an answer:</div>
            <div className="la-options-stack">
              {currentQ.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = selectedOption === i;
                const isCorrectChoice = i === currentQ.correct;

                let optionClass = 'la-option-btn';
                if (isSelected) optionClass += ' selected';
                if (submitted) {
                  if (isCorrectChoice) optionClass += ' correct';
                  else if (isSelected) optionClass += ' incorrect';
                }

                return (
                  <button
                    key={i}
                    className={optionClass}
                    onClick={() => handleSelectOption(i)}
                    disabled={submitted}
                  >
                    <span className="la-option-letter">{letter}</span>
                    <span className="la-option-text">{opt}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* 2. ANSWER-BASED MODE: User types their observation / answer */}
        {currentQ.inputType !== 'mcq' && (
          <div className="la-input-section">
            <div className="la-options-label">
              {currentQ.type === 'activity' ? 'Your Observation:' : 'Your Answer:'}
            </div>

            {!submitted ? (
              <div className="la-input-wrapper">
                {currentQ.inputType === 'textarea' ? (
                  <textarea
                    className="la-textarea-input"
                    rows={3}
                    placeholder={currentQ.placeholder || 'Type what you observe...'}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    className="la-text-input"
                    placeholder={currentQ.placeholder || 'Type your answer...'}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                )}
                <div className="la-input-hint">
                  {currentQ.inputType === 'textarea'
                    ? 'Press Ctrl+Enter or click Submit below'
                    : 'Press Enter or click Submit below'}
                </div>
              </div>
            ) : (
              <div className="la-submitted-box">
                <div className="la-submitted-header">
                  <span className="la-submitted-tag">Your Submitted Observation:</span>
                </div>
                <p className="la-submitted-quote">"{typedAnswer}"</p>
              </div>
            )}
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
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {currentQ.type === 'activity'
                ? 'Submit Observation'
                : currentQ.inputType !== 'mcq'
                ? 'Submit Answer'
                : 'Check Answer'}
            </button>
          ) : (
            <button className="la-btn-primary" onClick={handleNext}>
              {currentIndex < totalQuestions - 1 ? 'Next Question →' : 'Finish Set 🏆'}
            </button>
          )}
        </div>

        {/* After Submission: Show Rubric & Explanation */}
        {submitted && (
          <div className="la-explanation-card">
            <div
              className={`la-status-pill ${userWasCorrect ? 'success' : 'failure'}`}
            >
              {userWasCorrect ? (
                <>✓ Genuine Observation / Correct Intuition!</>
              ) : (
                <>✗ Consider the mathematical definition below:</>
              )}
            </div>

            {/* Author Rubric (What learners typically notice) */}
            {currentQ.rubric && currentQ.rubric.length > 0 && (
              <div className="la-rubric-card">
                <div className="la-rubric-title">
                  <span>📋</span> <strong>Author Rubric — Acceptable Observations:</strong>
                </div>
                <ul className="la-rubric-list">
                  {currentQ.rubric.map((obs, rIdx) => (
                    <li key={rIdx} className="la-rubric-item">
                      <span className="la-rubric-check">✓</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="la-explanation-text">
              <strong>Why This Matters: </strong>
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
          Set 01: Point to Dimension
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
