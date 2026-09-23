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
  subtitle: 'From Equal Movement to the Two Knobs of a Line',
  totalQuestions: 11
};

export const PHASES = [
  { id: 1, name: 'Phase 1: Plotting Points on a Pattern', range: [1, 3] },
  { id: 2, name: 'Phase 2: Seeing the Line', range: [4, 5] },
  { id: 3, name: 'Phase 3: From Family to Form', range: [6, 7] },
  { id: 4, name: 'Phase 4: The Two Knobs', range: [8, 11] }
];

export const STAGE_0_INTRO = {
  id: 1,
  title: 'Plot Two Points: A = (1, 2) and B = (2, 4)',
  prompt: 'Plot points A and B on the canvas to begin discovering the pattern of a line.',
  subtext: 'Plot points A and B on the canvas to begin exploring the coordinate grid.',
  insight: 'Every straight line you will ever meet starts with points sharing equal movement!'
};

export const LINE_PATH_QUESTIONS = [
  {
    id: 1,
    phaseId: 1,
    phaseTitle: 'Phase 1: Plotting Points on a Pattern',
    title: 'Plot Two Points',
    prompt: 'Plot point A at (1, 2) and point B at (2, 4) on the canvas to begin exploring the coordinate grid.',
    subtext: 'Plot both points on the coordinate grid using the input bar above:',
    type: 'plot_points',
    creditExplanation: 'Point A at (1, 2) and Point B at (2, 4) plotted successfully on the coordinate grid!',
    earns: 'Two points plotted at (1, 2) and (2, 4).'
  },
  {
    id: 2,
    phaseId: 1,
    phaseTitle: 'Phase 1: Plotting Points on a Pattern',
    title: 'Plot More Points',
    prompt: 'Now plot some more points that continue the pattern: point C at (3, 6), point D at (4, 8), and point E at (5, 10).',
    subtext: 'Plot points C, D, and E on the coordinate grid using the input bar above:',
    type: 'plot_points',
    creditExplanation: 'Points C(3, 6), D(4, 8), and E(5, 10) plotted successfully on the grid!',
    earns: 'Five points plotted along the pattern: (1, 2), (2, 4), (3, 6), (4, 8), and (5, 10).'
  },
  {
    id: 3,
    phaseId: 1,
    phaseTitle: 'Phase 1: Plotting Points on a Pattern',
    title: 'Observe Pattern & Join Points',
    prompt: 'Look at all the plotted points on the canvas: what pattern are they making? Then use the line function to join two points.',
    subtext: 'Observe the pattern below, then use GeoGebra to join two points with a line:',
    type: 'observe_and_line',
    options: [
      { id: 'q3_line', text: 'They form a straight line', isCorrect: true },
      { id: 'q3_circle', text: 'They form a circle', isCorrect: false },
      { id: 'q3_curve', text: 'They form a curved parabola', isCorrect: false },
      { id: 'q3_random', text: 'They are scattered randomly', isCorrect: false }
    ],
    creditExplanation: 'All five points form a straight line! Drawing Line(A, B) creates a line passing directly through every single point.',
    earns: 'Five points with equal movement form a straight line. Joining two points with a line passes through all of them!'
  },
  {
    id: 4,
    phaseId: 2,
    phaseTitle: 'Phase 2: Seeing the Line',
    title: 'Why Do They Line Up?',
    prompt: 'Pick any two adjacent points (like A to B, or D to E). How much did x grow, and how much did y grow? In one phrase — why do all five points line up?',
    subtext: 'Enter the step movement in x and y as two numbers, then select why the points fall on a straight path:',
    type: 'step_and_mcq',
    stepPlaceholder: 'e.g. Δx, Δy',
    validSteps: ['1, 2', '1,2', '+1, +2', '+1,+2', '1 and 2', 'x=1, y=2', 'x:1, y:2'],
    options: [
      { id: 'q4_step', text: 'Because the same small step was used every time', isCorrect: true },
      { id: 'q4_coincidence', text: "It's just a coincidence", isCorrect: false },
      { id: 'q4_canvas', text: 'Because the canvas is small', isCorrect: false },
      { id: 'q4_tool', text: 'Because GeoGebra forces them to align', isCorrect: false }
    ],
    creditExplanation: 'Equal movement every step (+1 in x, +2 in y) produces a straight path. Equal movement = straight line.',
    noCreditExplanation: 'It is not a coincidence: repeating the exact same delta (step) produces an unwavering straight path.',
    earns: 'When every step is the same small movement (same Δx, same Δy), points fall on a straight line.'
  },
  {
    id: 5,
    phaseId: 2,
    phaseTitle: 'Phase 2: Seeing the Line',
    title: 'Connect Them with a Line',
    prompt: 'Connect points A and B by typing Line(A, B) into GeoGebra. Does this line pass through C, D, E, and F too? Which best describes why?',
    subtext: 'Draw the line between A and B on the canvas and observe how it intersects all the other points:',
    type: 'mcq',
    options: [
      { id: 'q5_rel', text: 'They all share the same y = 2x relationship', isCorrect: true },
      { id: 'q5_luck', text: 'It passes through them by pure luck', isCorrect: false },
      { id: 'q5_guess', text: 'The line tool is just guessing', isCorrect: false },
      { id: 'q5_coords', text: 'All points on any line share the exact same coordinates', isCorrect: false }
    ],
    creditExplanation: 'Every single point obeys the relationship y = 2x. The line IS that equal-movement rule extended forever in both directions!',
    noCreditExplanation: 'Points C, D, E, F were created with the same rhythm; the line through A and B embodies that exact same relationship.',
    earns: 'A single straight line passes through every point built from equal movement. The line IS the movement extended infinitely.'
  },
  {
    id: 6,
    phaseId: 3,
    phaseTitle: 'Phase 3: From Family to Form',
    title: 'Three Lines Through the Origin',
    prompt: 'Plot the three lines: y = x, y = 2·x, and y = 10·x. Look at all three lines together on the canvas. What do they all share?',
    subtext: 'Observe their crossing points on the coordinate axes:',
    type: 'mcq',
    options: [
      { id: 'q6_origin', text: 'They all pass through (0, 0) — the origin', isCorrect: true },
      { id: 'q6_one', text: 'They all pass through (1, 1)', isCorrect: false },
      { id: 'q6_ten', text: 'They all pass through (10, 10)', isCorrect: false },
      { id: 'q6_none', text: "They don't share any common point", isCorrect: false }
    ],
    creditExplanation: 'All lines of the form y = a·x pass through the origin (0, 0). When x = 0, y = a · 0 = 0, no matter what number a is!',
    noCreditExplanation: 'Check the center of the grid: at x = 0, all three equations give y = 0. They all intersect at (0, 0).',
    earns: 'Lines of the form y = a·x (with no "+ b") all pass through the origin (0, 0).'
  },
  {
    id: 7,
    phaseId: 3,
    phaseTitle: 'Phase 3: From Family to Form',
    title: 'Meet the Two Knobs: y = a·x + b',
    prompt: 'Now look at the general form y = a·x + b. Drag the sliders below the canvas to see how a and b control the line. Set slider a = 2 and slider b = 0. Compare this line to y = 2·x from Level 6. Which best describes them?',
    subtext: 'Set a = 2 and b = 0 using the sliders or controls below:',
    type: 'mcq',
    options: [
      { id: 'q7_overlap', text: 'They look like the exact same line — they overlap', isCorrect: true },
      { id: 'q7_diff', text: "They're completely different lines", isCorrect: false },
      { id: 'q7_cross', text: 'They cross each other in the middle', isCorrect: false },
      { id: 'q7_short', text: 'One is shorter than the other', isCorrect: false }
    ],
    creditExplanation: 'y = 2·x and y = 2·x + 0 are the exact same line! The form y = a·x + b captures the whole family.',
    noCreditExplanation: 'Since b = 0 adds nothing, 2·x + 0 is identical to 2·x. The two lines coincide perfectly across the entire plane.',
    earns: 'The form y = a·x + b is the algebraic rule of any line in this family. With a = 2 and b = 0, it draws y = 2·x.'
  },
  {
    id: 8,
    phaseId: 4,
    phaseTitle: 'Phase 4: The Two Knobs',
    title: 'Move a Only (Tilt & Steepness)',
    prompt: 'Keep b = 0. Move ONLY slider a: try setting a = 3, then a = -1, then a = 0. In one phrase — what does knob a control?',
    subtext: 'Watch the line rotate and tilt as a changes:',
    type: 'mcq',
    options: [
      { id: 'q8_tilt', text: 'How the line tilts — its steepness', isCorrect: true },
      { id: 'q8_pos', text: 'Where the line sits on the canvas', isCorrect: false },
      { id: 'q8_len', text: 'How long the line is', isCorrect: false },
      { id: 'q8_col', text: 'The color of the line', isCorrect: false }
    ],
    creditExplanation: 'Knob a controls how the line tilts — how steep or shallow it is, going upward (positive a) or downward (negative a), or flat (a = 0).',
    noCreditExplanation: 'Notice that changing a spins the line around the pivot, altering its tilt and steepness without shifting its center.',
    earns: 'Knob a controls how the line tilts — its steepness as x moves forward.'
  },
  {
    id: 9,
    phaseId: 4,
    phaseTitle: 'Phase 4: The Two Knobs',
    title: 'Move b Only (Where the Line Crosses the y-Axis)',
    prompt: 'Keep a = 2. Notice where the line crosses the y-axis when b = 0, when b = 5, and when b = -2. In one phrase — what does knob b control?',
    subtext: 'Enter the y-axis crossing value for each b, then answer what b controls:',
    type: 'y_intercept_multistep',
    checks: [
      { bVal: 0, expected: '0', prompt: 'Where does the line cross the y-axis when b = 0?' },
      { bVal: 5, expected: '5', prompt: 'Where does the line cross the y-axis when b = 5?' },
      { bVal: -2, expected: '-2', prompt: 'Where does the line cross the y-axis when b = -2?' }
    ],
    options: [
      { id: 'q9_cross', text: 'Where the line crosses the y-axis', isCorrect: true },
      { id: 'q9_tilt', text: 'How the line tilts — its steepness', isCorrect: false },
      { id: 'q9_len', text: 'How long the line is', isCorrect: false },
      { id: 'q9_col', text: 'The color of the line', isCorrect: false }
    ],
    creditExplanation: 'Knob b is where the line crosses the y-axis! At x = 0, y = a·(0) + b = b. Changing b shifts the entire line up or down.',
    noCreditExplanation: 'When x is 0, the equation y = a·x + b simplifies directly to y = b. So b dictates the exact spot where the line crosses the y-axis.',
    earns: 'Knob b determines where the line crosses the y-axis. At b = 0 it passes through (0, 0); at b = 5 it crosses at (0, 5); at b = -2 it crosses at (0, -2).'
  },
  {
    id: 10,
    phaseId: 4,
    phaseTitle: 'Phase 4: The Two Knobs',
    title: 'Verify on the Canvas: The Law of the Line',
    prompt: 'Set a and b to any values you like. Pick any point on the line and read its (x, y). If you compute a·x + b, does the result equal y?',
    subtext: 'Test this relationship for points on your line to confirm:',
    type: 'verify_law',
    options: [
      { id: 'q10_yes', text: 'Yes, a·x + b always equals y for any point on the line', isCorrect: true },
      { id: 'q10_no', text: 'No, only some points obey the equation', isCorrect: false }
    ],
    creditExplanation: 'The equation y = a·x + b is the law of the line — every point on the line satisfies it, without exception!',
    noCreditExplanation: 'Every point that sits on the line was generated by that exact relationship; computing a·x + b always yields y.',
    earns: 'The equation y = a·x + b is the law of the line — every point on it obeys.'
  },
  {
    id: 11,
    phaseId: 4,
    phaseTitle: 'Phase 4: The Two Knobs',
    title: 'What Two Numbers Decide Everything?',
    prompt: 'For any straight line in this family drawn with y = a·x + b, what decides everything about it?',
    subtext: 'Consider how many independent numbers are required to define the line completely:',
    type: 'mcq',
    options: [
      { id: 'q11_two', text: 'Two numbers — how steep it is, and where it crosses the y-axis', isCorrect: true },
      { id: 'q11_one', text: 'Just one number — how steep the line is', isCorrect: false },
      { id: 'q11_three', text: 'Three numbers — steepness, start spot, and line length', isCorrect: false },
      { id: 'q11_each', text: 'Every point on the line requires its own separate number', isCorrect: false }
    ],
    creditExplanation: 'Exactly two numbers decide the line: a (how steep the line tilts) and b (where the line crosses the y-axis). Pick those two numbers, and the line is locked in!',
    noCreditExplanation: 'Lines are infinite, so length is not a parameter. Knob a and knob b together fully determine every point on the line.',
    earns: 'Any line in the family y = a·x + b is fully decided by two numbers: a (steepness) and b (y-crossing).'
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
