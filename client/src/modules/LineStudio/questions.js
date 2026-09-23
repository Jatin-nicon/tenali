/**
 * Cluster 2 — The Equation of a Line
 *
 * Goal: From the point earned in Cluster 1, the learner earns the embodied
 * insight — equal movement along x and y produces a straight line — then sees
 * that insight play out across a family of lines (y = x, y = 2x, y = 10x, all
 * passing through origin), and finally meets the algebraic shape that captures
 * the whole family, y = a*x + b.
 *
 * The terms "slope" and "y-intercept" are deliberately NOT used.
 * The scaffolding names "steepness / tilt" (for a) and "where the line crosses
 * the y-axis" (for b) carry the intuition.
 *
 * Faithfully adapted from Conceptual questions/clusters/cluster 2.md
 */

export const PATH_META = {
  title: 'The Equation of a Line',
  subtitle: 'From Equal Movement to the Equation y = a·x + b',
  totalQuestions: 6
};

export const PHASES = [
  { id: 1, name: 'Phase 1: Plotting & Stepping', range: [1, 3] },
  { id: 2, name: 'Phase 2: Seeing & Drawing the Line', range: [4, 5] },
  { id: 3, name: 'Phase 3: The Equation of a Line', range: [6, 6] }
];

export const STAGE_0_INTRO = {
  id: 1,
  title: 'Plot Any Two Points',
  prompt: 'Plot any two different points of your choice on the canvas.',
  subtext: 'Type two distinct points into the input bar above (e.g. A = (x, y) or (x, y)):',
  insight: 'Every straight line starts with points sharing equal movement!'
};

export const LINE_PATH_QUESTIONS = [
  {
    id: 1,
    phaseId: 1,
    phaseTitle: 'Phase 1: Plotting & Stepping',
    title: 'Plot Any Two Points',
    prompt: 'Plot any two different points of your choice on the canvas.',
    subtext: 'Type two distinct points into the input bar above (e.g. A = (x, y) or (x, y)):',
    type: 'plot_points',
    creditExplanation: 'Two distinct points plotted successfully on the coordinate grid!',
    earns: 'Any straight line in the universe begins with two points!'
  },
  {
    id: 2,
    phaseId: 1,
    phaseTitle: 'Phase 1: Plotting & Stepping',
    title: 'Measure Movement in X and Y',
    prompt: 'Tell me how much you moved in X, and how much shift happened in Y.',
    subtext: 'Enter the change in x (Δx) and change in y (Δy) from your first point to your second point:',
    type: 'step_inputs',
    creditExplanation: 'Step movement in X and shift in Y verified!',
    earns: 'The movement between points is measured by how much you move in x and how much you shift in y.'
  },
  {
    id: 3,
    phaseId: 1,
    phaseTitle: 'Phase 1: Plotting & Stepping',
    title: 'Move in Same Pattern 3 More Times',
    prompt: 'Move in the same pattern 3 more times: plot points C, D, and E using the exact same step.',
    subtext: 'Plot points C, D, and E in the input bar above:',
    type: 'plot_points',
    creditExplanation: 'Points C, D, and E plotted along the exact same step rhythm!',
    earns: 'Repeating the same movement step creates a continuous chain of points along a straight path.'
  },
  {
    id: 4,
    phaseId: 2,
    phaseTitle: 'Phase 2: Seeing & Drawing the Line',
    title: 'Guess the Visible Pattern',
    prompt: 'What pattern is becoming visible across the points, can you guess?',
    subtext: 'Observe all five plotted points on the canvas and choose the geometric pattern they make:',
    type: 'mcq',
    options: [
      { id: 'q4_line', text: 'A line (Straight Line)', isCorrect: true },
      { id: 'q4_curve', text: 'A curved parabola', isCorrect: false },
      { id: 'q4_circle', text: 'A circle', isCorrect: false },
      { id: 'q4_random', text: 'Random scattered dots', isCorrect: false }
    ],
    creditExplanation: 'All five points form a straight line! Repeating the exact same delta (step) produces an unwavering straight path.',
    earns: 'When every step is the same small movement (same Δx, same Δy), points fall on a straight line.'
  },
  {
    id: 5,
    phaseId: 2,
    phaseTitle: 'Phase 2: Seeing & Drawing the Line',
    title: 'Draw the Pattern Using its Name',
    prompt: 'You can draw that pattern using exactly the pattern name: in GeoGebra, type Line(A, B).',
    subtext: 'Type Line(A, B) in the input bar above to connect the points:',
    type: 'draw_line',
    creditExplanation: 'Drawing Line(A, B) creates a line that passes directly through every single point!',
    earns: 'A single straight line passes through every point built from equal movement. The line IS that equal movement extended infinitely.'
  },
  {
    id: 6,
    phaseId: 3,
    phaseTitle: 'Phase 3: The Equation of a Line',
    title: 'Explore y = a·x + b',
    prompt: 'Now let\'s explore something amazing: change "a" and "b" and type your observation.',
    subtext: 'The equation of the line is y = a·x + b. Move sliders "a" and "b" above and write down what you observe:',
    type: 'slider_observation',
    creditExplanation: 'You observed how knob a controls the tilt/steepness and knob b controls where the line crosses the y-axis!',
    earns: 'The equation y = a·x + b describes every line in the family. Knob a controls steepness, and knob b controls where it crosses the y-axis.'
  }
];

export const CLUSTER_2_SUMMARY = {
  title: 'The Equation of a Line: Complete!',
  namingHandover: {
    title: 'The Naming Handover',
    quote: "From now on, we'll call this kind of pattern — where every point on a line satisfies y = a·x + b — the EQUATION OF A LINE.\n\nThe two numbers you've been calling 'the steepness' and 'where the line crosses the y-axis' keep their scaffolding names here. The idea is what matters: pick those two numbers, and you've drawn the line."
  },
  takeaways: [
    'Points that share an equal-movement step (same Δx, same Δy) always line up.',
    'Line(A, B) connects points with a straight path extended infinitely.',
    'Lines of the form y = a·x all pass through the origin (0, 0).',
    'The algebraic shape y = a·x + b describes the entire family of lines.',
    'Knob a controls how the line tilts (its steepness).',
    'Knob b controls where the line crosses the y-axis.',
    'Every single point on the line satisfies the equation without exception.',
    'Two numbers (a and b) decide everything about a line in this family.'
  ],
  challenges: [
    {
      id: 'c1',
      title: 'Crossing at 3 with Steepness 2',
      description: 'Set steepness a = 2 and y-crossing b = 3',
      targetA: 2,
      targetB: 3
    },
    {
      id: 'c2',
      title: 'Flat Horizontal Line at -1',
      description: 'Set steepness a = 0 and y-crossing b = -1',
      targetA: 0,
      targetB: -1
    },
    {
      id: 'c3',
      title: 'Downward Line Through Origin',
      description: 'Set steepness a = -2 and y-crossing b = 0',
      targetA: -2,
      targetB: 0
    },
    {
      id: 'c4',
      title: 'Steep Climb Through 5',
      description: 'Set steepness a = 4 and y-crossing b = 5',
      targetA: 4,
      targetB: 5
    }
  ],
  nextCluster: 'Next Destination: Curves & Systems of Lines (What happens when lines intersect, or when the rhythm itself accelerates?)'
};
