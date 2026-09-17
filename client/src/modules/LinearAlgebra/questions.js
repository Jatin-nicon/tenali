/**
 * Linear Algebra Intuition Questions Bank
 *
 * Starter set of intuition-building questions ready for expansion.
 * Each question supports visual vector plots, story context, hints, and deep intuition explanations.
 */

export const INITIAL_QUESTIONS = [
  {
    id: 1,
    title: 'The Stepping Stone Vectors',
    topic: 'Linear Combinations',
    story: 'You are navigating a robot on a 2D floor plane. The robot has two thrusters: Thruster A shoots it along vector u = (1, 2), and Thruster B shoots it along vector v = (3, 1).',
    prompt: 'Can you fire some combination of Thruster A and Thruster B (scaled by non-zero amounts) to reach the point (5, 5)?',
    type: 'mcq',
    options: [
      'Yes, 2u + 1v = (5, 5)',
      'Yes, 1u + 2v = (5, 5)',
      'No, (5, 5) lies outside the span of u and v',
      'Yes, 3u - 1v = (5, 5)'
    ],
    correct: 0,
    hint: 'Calculate 2·(1, 2) + 1·(3, 1). What is the x-sum and y-sum?',
    explanation: '2·u + 1·v = 2·(1, 2) + 1·(3, 1) = (2+3, 4+1) = (5, 5). Because vectors u and v point in different, non-parallel directions, their linear combinations can reach every single coordinate in the 2D plane!',
    visual: {
      xRange: [-1, 7],
      yRange: [-1, 7],
      vectors: [
        { label: 'u (1, 2)', x: 1, y: 2, color: '#3b82f6' },
        { label: 'v (3, 1)', x: 3, y: 1, color: '#10b981' },
        { label: '2u + v', x: 5, y: 5, color: '#f59e0b', dashed: true }
      ],
      target: { x: 5, y: 5, label: 'Target (5, 5)' }
    }
  },
  {
    id: 2,
    title: 'The Collinear Trap',
    topic: 'Linear Dependence & Span',
    story: 'Imagine two vectors: u = (2, 4) and w = (-1, -2). A student claims they can reach any 2D point (x, y) by combining them.',
    prompt: 'What is the true geometric span of all combinations c₁·u + c₂·w?',
    type: 'mcq',
    options: [
      'The entire 2D Cartesian plane',
      'Only a single 1D straight line passing through the origin (y = 2x)',
      'Only the upper half-plane where y ≥ 0',
      'A parabola centered at (0, 0)'
    ],
    correct: 1,
    hint: 'Notice that u = -2·w. Are these vectors pointing in genuinely independent directions?',
    explanation: 'Since u = -2·w, vector u and vector w are linearly dependent—they point along the exact same line through the origin (slope = 2). No matter how you scale and add them, you are trapped forever on that 1D line y = 2x and can never step off it into the rest of the 2D plane!',
    visual: {
      xRange: [-4, 4],
      yRange: [-6, 6],
      vectors: [
        { label: 'u (2, 4)', x: 2, y: 4, color: '#ef4444' },
        { label: 'w (-1, -2)', x: -1, y: -2, color: '#8b5cf6' }
      ],
      spanLine: { slope: 2, label: 'Span: Line y = 2x' }
    }
  },
  {
    id: 3,
    title: 'The Invisible Collapse (Null Space)',
    topic: 'Kernel & Zero Output',
    story: 'A transformation matrix collapses 2D space down to a single number: T(x, y) = 3x - 6y. We want to know which non-zero inputs completely disappear into zero.',
    prompt: 'Which of the following input vectors (x, y) gets mapped directly to 0?',
    type: 'mcq',
    options: [
      '(2, 1)',
      '(1, 2)',
      '(3, 6)',
      '(4, 1)'
    ],
    correct: 0,
    hint: 'Plug each (x, y) into 3x - 6y and check which one equals 0.',
    explanation: 'Testing (2, 1): 3(2) - 6(1) = 6 - 6 = 0! Any scalar multiple t·(2, 1) satisfies 3(2t) - 6(t) = 0. All of these points form the Kernel (Null Space) of the transformation—an entire line of inputs that the matrix flattens to 0.',
    visual: {
      xRange: [-2, 5],
      yRange: [-2, 5],
      vectors: [
        { label: 'Kernel Vector (2, 1)', x: 2, y: 1, color: '#06b6d4' }
      ],
      target: { x: 2, y: 1, label: 'Collapses to 0' }
    }
  },
  {
    id: 4,
    title: 'Dimension & Independence',
    topic: 'Dimension & Basis',
    story: 'In 3-dimensional space, you are given 2 linearly independent vectors: v₁ = (1, 0, 0) and v₂ = (0, 1, 0).',
    prompt: 'How many dimensions does the span of these two vectors cover in 3D space?',
    type: 'mcq',
    options: [
      '1 dimension (a line)',
      '2 dimensions (a flat 2D plane: the xy-plane)',
      '3 dimensions (all of 3D volume)',
      '0 dimensions (a point)'
    ],
    correct: 1,
    hint: 'Can two vectors ever fill 3-dimensional space?',
    explanation: 'Two linearly independent vectors always span a 2-dimensional subspace (a flat plane through the origin). In this case, combinations of (1,0,0) and (0,1,0) span the entire xy-plane (where z = 0). To reach anywhere with z ≠ 0, you would need a 3rd independent vector with a z-component!',
    visual: {
      xRange: [-1, 3],
      yRange: [-1, 3],
      vectors: [
        { label: 'v₁ (1, 0)', x: 1, y: 0, color: '#3b82f6' },
        { label: 'v₂ (0, 1)', x: 0, y: 1, color: '#10b981' }
      ]
    }
  }
];

export default INITIAL_QUESTIONS;
