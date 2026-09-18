/**
 * Cluster 1 — Stage 1: Point
 *
 * Goal: The learner earns the idea of a "spot" through observation.
 * The word "point" is never used inside the questions — it is offered as a
 * naming choice at the head of Stage 2 (Naming Handover).
 *
 * Faithfully adapted from Conceptual questions/clusters/cluster 1.md
 */

export const ENVIRONMENTS = [
  { id: 'room', label: 'In a room', icon: '🏠', note: 'wall or ceiling' },
  { id: 'outside', label: 'Outside (street, park, beach, etc.)', icon: '🌳', note: 'open ground or street' },
  { id: 'vehicle', label: 'In a vehicle (car, bus, train)', icon: '🚗', note: 'interior transit' }
];

export const ENVIRONMENT_OBJECTS = {
  room: ['Bulb', 'Clock', 'Hanger', 'Switch'],
  outside: ['Tree', 'Sign', 'Lamp Post', 'Bench'],
  vehicle: ['Handle', 'Window', 'Seat']
};

export const UNSEEN_OBJECTS_DESCRIPTIONS = {
  room: 'in the room behind you, where a chair sits',
  outside: 'behind you, where a bench or tree sits',
  vehicle: 'behind you, where a seat sits'
};

export const PATH_META = {
  title: 'Understanding the Point',
  subtitle: 'A Discovery Journey: From Physical Observation to Pure Location',
  totalQuestions: 13
};

export const PHASES = [
  { id: 1, name: 'Phase 1: Noticing the Spot', range: [1, 5] },
  { id: 2, name: 'Phase 2: Why We Draw Marks', range: [6, 7] },
  { id: 3, name: 'Phase 3: The Spot Has No Size', range: [8, 10] },
  { id: 4, name: 'Phase 4: A Spot Exists Unseen', range: [11, 13] }
];

export const POINT_PATH_QUESTIONS = [
  {
    id: 1,
    phaseId: 1,
    phaseTitle: 'Phase 1: Noticing the Spot',
    title: 'Physical Surroundings',
    prompt: 'Where are you right now?',
    subtext: 'Choose the environment that best matches your surroundings:',
    type: 'environment_select'
  },
  {
    id: 2,
    phaseId: 1,
    phaseTitle: 'Phase 1: Noticing the Spot',
    title: 'Spot an Object',
    prompt: 'Look around. Is there an object you can point at?',
    subtext: 'Choose an object in your surroundings (or select one that best matches what you see):',
    type: 'object_select'
  },
  {
    id: 3,
    phaseId: 1,
    phaseTitle: 'Phase 1: Noticing the Spot',
    title: 'Where Does Your Finger Land?',
    prompt: 'Point your finger at it. Where is your finger aimed — at the object itself, or at the spot where the object is?',
    subtext: 'Think about it: The chosen object has size, weight, and volume. Where does your point of gaze really land?',
    type: 'mcq_spot_aim',
    correct: 1,
    creditExplanation: 'Your finger lands on the spot, not the whole object.',
    noCreditExplanation: 'Your finger lands on a single spot, not the whole object.'
  },
  {
    id: 4,
    phaseId: 1,
    phaseTitle: 'Phase 1: Noticing the Spot',
    title: 'Drawing a Dot',
    prompt: 'Now, take any piece of paper in front of you. Draw a tiny dot on it — just one small dot, nothing else. Done?',
    subtext: 'Draw it physically on paper in front of you, or confirm using the digital dot canvas below:',
    type: 'draw_dot',
    buttonText: 'Done — Dot is Drawn! ✓'
  },
  {
    id: 5,
    phaseId: 1,
    phaseTitle: 'Phase 1: Noticing the Spot',
    title: 'Representation vs. Occupation',
    prompt: 'Of the two — which one represents the place in space (stands in for it), and which one occupies it (has a body, is at it)?',
    subtext: 'Comparing: The drawn dot on paper vs. Your chosen object.',
    type: 'mcq_represent_occupy',
    correct: 0,
    creditExplanation: 'The drawn dot is a stand-in for the spot; the object has a body and is at the spot.',
    noCreditExplanation: 'The drawn dot has no body, so it does not occupy; the object has a physical body and occupies that spot in space.'
  },
  {
    id: 6,
    phaseId: 2,
    phaseTitle: 'Phase 2: Why We Draw Marks',
    title: 'Inspecting the Paper',
    prompt: 'You have drawn a dot on a paper just now. What does the paper look like after?',
    subtext: 'Inspect your paper closely. What do you see on it now?',
    type: 'typed_paper_look',
    placeholder: 'Describe in one short phrase (e.g. a small dark mark on a page...)',
    creditKeywords: ['dot', 'mark', 'spot', 'speck', 'ink', 'paper', 'visible', 'blank', 'point', 'circle'],
    creditFeedback: 'A visible mark has been placed on the paper!'
  },
  {
    id: 7,
    phaseId: 2,
    phaseTitle: 'Phase 2: Why We Draw Marks',
    title: 'Why Draw Marks?',
    prompt: 'Why do we draw dots / marks on paper at all when we want to mark a spot?',
    subtext: 'Consider why mathematicians and humans put marks down when talking about locations:',
    type: 'mcq_why_draw',
    options: [
      'Because circles look pretty',
      "Because it's a tradition",
      'Because we have to put something visible on paper',
      'Because circles are the easiest shape to draw'
    ],
    correct: 2,
    creditExplanation: 'The point itself cannot be drawn; we need a stand-in (the smallest visible thing on paper).',
    noCreditExplanation: 'A pure spot has no color or ink — without drawing a visible stand-in, paper remains completely blank.'
  },
  {
    id: 8,
    phaseId: 3,
    phaseTitle: 'Phase 3: The Spot Has No Size',
    title: 'Memory of Object & Spot',
    prompt: 'From earlier — do you remember the object you pointed at AND the spot your finger was at?',
    subtext: 'Bring back that mental picture of your finger aiming toward the object:',
    type: 'yes_no_memory',
    choices: ['Yes, I remember both', 'No']
  },
  {
    id: 9,
    phaseId: 3,
    phaseTitle: 'Phase 3: The Spot Has No Size',
    title: 'Body & Dimensions of the Object',
    prompt: 'Does the object have size, like a body — length, width, something you can see?',
    subtext: 'Look at the 3D model: Notice it has physical width, height, and depth in space.',
    type: 'yes_no_size',
    choices: ['Yes, it has physical size / body', 'No']
  },
  {
    id: 10,
    phaseId: 3,
    phaseTitle: 'Phase 3: The Spot Has No Size',
    title: 'Size of the Spot',
    prompt: 'Does the spot have size too, or only the object?',
    subtext: 'Think carefully: Does a location in empty space take up volume, or does it have zero size?',
    type: 'spot_size_input',
    options: [
      'Only the object has size (the spot has zero size)',
      'Both have size',
      'Neither has size',
      'Only the spot has size'
    ],
    correct: 0,
    creditKeywords: ['only the object', 'spot has no size', 'no size', 'just the object', 'only object', 'zero size', 'neither has size is false', 'object has size'],
    creditExplanation: 'The spot has no size — only the object occupying it has physical size.',
    noCreditExplanation: 'A spot is purely a location; it has no length, width, or thickness whatsoever.'
  },
  {
    id: 11,
    phaseId: 4,
    phaseTitle: 'Phase 4: A Spot Exists Unseen',
    title: 'Closing Your Eyes',
    prompt: 'Close your eyes. Done?',
    subtext: 'Take a breath and close your physical eyes for a moment to shift into your mind’s eye:',
    type: 'close_eyes_toggle',
    choices: ['Yes, eyes are closed', 'No']
  },
  {
    id: 12,
    phaseId: 4,
    phaseTitle: 'Phase 4: A Spot Exists Unseen',
    title: 'Picture a Spot in Mind’s Eye',
    prompt: 'Picture a spot: Can you picture it?',
    subtext: 'You are facing forward. Without turning around, picture that exact location behind you:',
    type: 'yes_no_picture',
    choices: ['Yes, I can picture it clearly', 'No']
  },
  {
    id: 13,
    phaseId: 4,
    phaseTitle: 'Phase 4: A Spot Exists Unseen',
    title: 'Existence Without Sight',
    prompt: 'Can you still point at that spot — even though you cannot see it?',
    subtext: 'Does a spot need eyes or light to exist, or does space hold locations unconditionally?',
    type: 'unseen_existence',
    choices: ['Yes, I can point at it ✓', 'No'],
    placeholder: 'Add one short phrase (e.g. Yes, spots exist in space even unseen...)',
    creditKeywords: ['yes', 'can', 'unseen', 'think', 'mind', 'exists', 'know', 'still there', 'behind'],
    creditExplanation: 'A spot exists whether you see it or not; you can think of one you are not looking at.',
    noCreditExplanation: 'Even in total darkness or behind you, locations exist in space.'
  }
];

export const CLUSTER_1_SUMMARY = {
  title: 'Understanding the Point: Complete!',
  namingHandover: {
    title: 'The Naming Handover',
    quote: "From now on, we'll call what you've been calling 'spot' a POINT. The word 'point' is just a name — a shorthand. You can still call it a spot if you like. The idea matters more than the word."
  },
  takeaways: [
    'A spot is a place / location, not the object that sits at it.',
    'The drawn dot, your finger, a screen pixel — all are stand-ins for the same spot.',
    'A drawing is a stand-in; an object has a body and occupies a place.',
    'We need stand-ins because we cannot draw "nothing" on paper.',
    'A spot has no size — only the object at the spot has size.',
    'A spot can be thought of without being seen, drawn, or pointed at.'
  ],
  nextCluster: 'Next Destination: Space (If a point is a location, what kind of place is the location in?)'
};

// Aliases for compatibility
export const CLUSTER_1_QUESTIONS = POINT_PATH_QUESTIONS;
export const INITIAL_QUESTIONS = POINT_PATH_QUESTIONS;
export const CONCEPTUAL_QUESTIONS = POINT_PATH_QUESTIONS;
