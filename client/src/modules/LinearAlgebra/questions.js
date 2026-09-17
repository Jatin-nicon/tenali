/**
 * Conceptual Questions — From Point to Dimension
 * Set 01 of the Conceptual Questions series
 *
 * Faithfully adapted from 01-point-to-dimension.md
 * Supports both MCQ-based questions and Answer-based (typed observation / reflection) questions.
 */

export const CONCEPTUAL_QUESTIONS = [
  // STAGE 1 — Point: the thing behind the dot
  {
    id: 1,
    stage: 'Stage 1 — Point: the thing behind the dot',
    topic: 'Point / Reflection',
    title: 'Pointing at the Bulb',
    prompt: `Sit in your room. Look at the bulb on the wall or ceiling across the room. Point at it with your finger.

Now ask yourself: are you pointing at the bulb — or at the spot where the bulb is hanging?

Think about it. The bulb has size, a glass body, a metal base. A point has none of that. So your finger cannot be marking the bulb itself. It must be marking something else.

What is your finger really marking?`,
    type: 'reflection',
    inputType: 'text',
    placeholder: 'What is your finger really marking? (e.g., the spot, location, position...)',
    rubric: [
      'The place / the spot / the location',
      "The bulb's position"
    ],
    keywords: ['location', 'spot', 'place', 'position', 'where', 'coord', 'point'],
    hint: 'Does a mathematical point have physical glass, wires, and volume like a bulb does?',
    explanation: 'A point is not an object. It is a location in space. The bulb is an object that occupies a location. When you point at the bulb, your finger is standing in for that location — not for the bulb itself. The dot you draw on paper, the pixel on a screen, your finger in the air — all of these are stand-ins for a location. None of them are the location.',
    visualType: 'point_bulb'
  },
  {
    id: 2,
    stage: 'Stage 1 — Point: the thing behind the dot',
    topic: 'Point / MCQ',
    title: 'Drawn Dot vs. Bulb: Which is a Point?',
    prompt: 'You see two things: a tiny dot drawn on paper with a pen, and an actual light bulb across the room. Which one is a \'point\' in the mathematical sense?',
    type: 'mcq',
    inputType: 'mcq',
    options: [
      '(a) The drawn dot on the paper',
      '(b) The bulb',
      '(c) Both — they are both points',
      '(d) Neither'
    ],
    correct: 1,
    hint: 'Re-read carefully: is a drawing of a point the point itself, or is an object occupying a location?',
    explanation: 'The bulb is an object occupying a location in space. The drawn dot on paper is a physical mark of ink — a visible stand-in for a location. The ink mark is not the location itself.',
    visualType: 'point_bulb'
  },
  {
    id: 3,
    stage: 'Stage 1 — Point: the thing behind the dot',
    topic: 'Point / Reflection',
    title: 'Why Draw Dots at All?',
    prompt: 'If a drawn dot on paper is only a physical stand-in for a point, why do we draw dots at all when we want to mark a point?',
    type: 'reflection',
    inputType: 'text',
    placeholder: 'Why do we draw dots when marking a point on paper?',
    rubric: [
      "Because we can't draw \"nothing\" on paper",
      'Because we have to put something visible'
    ],
    keywords: ['visible', 'see', 'nothing', "can't draw", 'cant draw', 'show', 'mark', 'represent', 'stand', 'invisible', 'look', 'something'],
    hint: 'How can you discuss an invisible, zero-dimensional location on paper without marking it visually?',
    explanation: 'We need something visible to talk about an invisible thing. A mathematical point has zero size and is completely invisible. The drawn dot on paper (physically a tiny speck of ink) is the visible stand-in; the point is the actual location it represents.',
    visualType: 'standin_circle'
  },

  // STAGE 2 — Space: a boundless arena
  {
    id: 4,
    stage: 'Stage 2 — Space: a boundless arena',
    topic: 'Space / Reflection',
    title: 'Walking in Deep Space',
    prompt: 'Imagine you are floating alone in deep space, far from any star, planet, or wall. You pick a direction and start walking (somehow). What can stop you?',
    type: 'reflection',
    inputType: 'text',
    placeholder: 'What can stop you? (Type your answer...)',
    rubric: [
      'Nothing — a space has total freedom of motion in any chosen direction'
    ],
    keywords: ['nothing', 'none', 'no one', 'no wall', "can't stop", 'cant stop', 'no boundary', 'unrestricted', 'zero'],
    hint: 'Consider spatial limits: is there any physical barrier or boundary in empty space?',
    explanation: 'A space is a place where movement in any chosen direction is never restricted. That is the whole idea.',
    visualType: 'boundless_space'
  },
  {
    id: 5,
    stage: 'Stage 2 — Space: a boundless arena',
    topic: 'Space / MCQ',
    title: 'What is a Space?',
    prompt: 'Which of these best matches what a mathematician means by "space"?',
    type: 'mcq',
    inputType: 'mcq',
    options: [
      '(a) The room you are sitting in',
      '(b) The football field',
      '(c) Anywhere you can move without ever being stopped',
      '(d) The surface of the Earth'
    ],
    correct: 2,
    hint: 'Do rooms, football fields, or planet surfaces have edges or walls?',
    explanation: '(a), (b), (d) all have boundaries or surfaces — walls, sidelines, ground. Movement is restricted. Only (c) describes total freedom of motion, which is what makes a space a space.',
    visualType: 'boundless_space'
  },
  {
    id: 6,
    stage: 'Stage 2 — Space: a boundless arena',
    topic: 'Space / GeoGebra Activity — The Square',
    title: 'The Square: Moving Inside Walls',
    prompt: `You are standing inside this square (with visible walls). Pick a direction. Try to walk in it. What happens?
Now pick another direction. Walk. What happens this time?
Try a few more directions. Describe what you notice:`,
    type: 'activity',
    activityType: 'square',
    inputType: 'textarea',
    placeholder: 'Describe what happens as you try walking in different directions inside the square...',
    rubric: [
      'I hit a wall',
      'I can only walk a short distance before stopping',
      'I keep having to change direction',
      'The corners feel unreachable from the inside without turning',
      'Movement is restricted',
      'This is not a space — something always stops me'
    ],
    keywords: ['wall', 'stop', 'bound', 'hit', 'restrict', 'corner', 'short', 'cant', "can't", 'turn', 'barrier', 'limit', 'block', 'obstacle'],
    hint: 'Interact with the square simulation below: try different directions and observe where motion stops.',
    explanation: 'This is the counter-example to space. You can move, but you are always stopped. So this bounded square is not a space, even though it is "a place." In mathematics, space requires unrestricted freedom of movement.'
  },
  {
    id: 7,
    stage: 'Stage 2 — Space: a boundless arena',
    topic: 'Space / Open Hook 🎯',
    title: 'The Infinite Sheet of Paper',
    prompt: `Now imagine an infinite sheet of paper — stretching forever in two directions — but it has some width (so it is not a single line). Is this a space?

Take a moment. Think about moving along the sheet versus stepping off it into 3D. What is your intuition?`,
    type: 'open_hook',
    inputType: 'textarea',
    placeholder: 'Is this a space? Type your thoughts and intuition...',
    rubric: [
      'If restricted to the sheet: yes, motion in 2 directions never stops',
      'If in 3D: no, you cannot move perpendicular (up/down) off the paper'
    ],
    keywords: [],
    hint: 'Think about whether an observer is restricted to 2D motion or can jump into 3D.',
    explanation: '🎯 Hook deliberately left open! If an entity is confined to the 2D plane, it experiences total freedom of motion within that plane (a 2D space). But relative to 3D space, vertical movement is impossible. We will resolve this fully as we explore dimension and basis!'
  },

  // STAGE 3 — Directions: how many can you pick?
  {
    id: 8,
    stage: 'Stage 3 — Directions: how many can you pick?',
    topic: 'Directions / Reflection',
    title: 'How Many Directions at One Spot?',
    prompt: 'Go back to the deep-space setup from Q4. You are at one spot. You pick a direction and walk. You stop. You pick another direction and walk. How many directions could you have chosen, in total, while standing at that one spot?',
    type: 'reflection',
    inputType: 'mcq',
    options: [
      '1',
      '2',
      '4',
      'Infinitely many'
    ],
    correct: 3,
    hint: 'Can you rotate by half a degree? A tenth of a degree? A millionth of a degree?',
    explanation: 'Infinitely many. At any point in space, you can face any direction — up, down, sideways, slanted, almost-but-not-quite-left. Between any two directions there are infinitely more.',
    visualType: 'radiating_directions'
  },
  {
    id: 9,
    stage: 'Stage 3 — Directions: how many can you pick?',
    topic: 'Directions / MCQ',
    title: 'Available Directions in Space',
    prompt: 'You are dropped at one location in space. How many directions are available for you to move in?',
    type: 'mcq',
    inputType: 'mcq',
    options: [
      '(a) 1',
      '(b) 2',
      '(c) 4',
      '(d) Infinitely many'
    ],
    correct: 3,
    hint: 'Remember what we discovered in Q8 about rotating around any angle.',
    explanation: 'Space is boundless — directions are too.',
    visualType: 'radiating_directions'
  },

  // STAGE 4 — Dimension: the minimum number of directions
  {
    id: 10,
    stage: 'Stage 4 — Dimension: the minimum number of directions',
    topic: 'Dimension / Reflection',
    title: 'Navigating the Flat Floor',
    prompt: `Now a different question. Forget "how many directions are available." Ask instead: what is the minimum number of directions I need to remember so that, by walking along those directions (and combinations of them), I can reach every point in the space?

Think about the flat floor you are sitting on. You can't fly. You can't go through the floor. You are stuck on the surface. How many directions (at minimum) do you need to reach any spot on that floor?`,
    type: 'reflection',
    inputType: 'text',
    placeholder: 'Minimum directions needed to reach any spot on the floor? (e.g. 2)',
    rubric: [
      '2 directions (e.g. forward/backward and left/right)'
    ],
    keywords: ['2', 'two', 'pair', 'both'],
    hint: 'Pick one direction and try to walk to every spot. Can you? Pick two directions and try again. Now can you?',
    explanation: 'On a flat floor, 1 direction only allows you to move along a single straight line. With 2 directions (e.g., forward/back and left/right), any combination allows you to reach every spot on the floor!',
    visualType: 'floor_navigation'
  },
  {
    id: 11,
    stage: 'Stage 4 — Dimension: the minimum number of directions',
    topic: 'Dimension / GeoGebra Activity — The Canvas ⭐',
    title: 'The Canvas (Defining Activity)',
    prompt: `1. Pick one direction — by looking at one of the dots and walking straight toward it. Mark this direction; it is now fixed.
2. Can you reach every other dot on the canvas using only this one direction? Try sliding your position along that line.
3. Pick a second direction — by looking at another dot and walking straight toward it. Mark this direction; it is now fixed too.
4. Now try again. Using only these two fixed directions, can you reach every dot on the canvas?`,
    type: 'activity',
    activityType: 'canvas',
    inputType: 'textarea',
    placeholder: 'Describe what you notice about reaching dots with 1 direction vs. 2 directions...',
    rubric: [
      'With one direction I could only reach dots lying on that line',
      'Dots off the line were unreachable',
      'With two directions I could reach any dot by combining walks',
      'I had to walk some amount along direction 1, then turn and walk some amount along direction 2',
      'One direction was not enough; two was enough'
    ],
    keywords: ['line', 'reach', 'unreachable', 'two', '2', 'combine', 'combination', 'enough', 'dot', 'plane', 'canvas', 'walk', 'turn'],
    hint: 'Try the 1 Direction vs 2 Directions controls in the canvas below to test reaching dots.',
    explanation: 'This is the defining activity for dimension. You discover that 2 directions are enough for the canvas — and that 1 is not. The canvas therefore has dimension 2.'
  },
  {
    id: 12,
    stage: 'Stage 4 — Dimension: the minimum number of directions',
    topic: 'Dimension / MCQ',
    title: 'Dimension of the Floor',
    prompt: `Dimension is defined as the minimum number of directions you need so that, by moving along those directions, you can reach every point in the space.

By this definition, what is the dimension of the flat floor you are standing on?`,
    type: 'mcq',
    inputType: 'mcq',
    options: [
      '(a) 1',
      '(b) 2',
      '(c) 3',
      '(d) 4'
    ],
    correct: 1,
    hint: 'How many directions did we discover were necessary and sufficient in Q10 & Q11?',
    explanation: 'You need exactly 2 directions (e.g. "forward / sideways" or "north / east") to reach any point. 1 is too few; 3 is more than necessary.',
    visualType: 'floor_navigation'
  },
  {
    id: 13,
    stage: 'Stage 4 — Dimension: the minimum number of directions',
    topic: 'Dimension / GeoGebra Activity — Verification',
    title: 'Verification: Reaching Any New Dot',
    prompt: 'A new dot has appeared. Using only your two fixed directions, can you reach it? Try it. Walk along direction 1, then direction 2, and see if you land on the dot.',
    type: 'activity',
    activityType: 'verification',
    inputType: 'textarea',
    placeholder: 'Describe what you observe: can the new dot be reached using only the 2 fixed directions?',
    rubric: [
      'Yes, I reached it',
      'I had to walk a specific amount in direction 1, then a specific amount in direction 2',
      'The dot was reachable from my origin using only the two fixed directions',
      "I could see the dot's position as a combination of the two directions"
    ],
    keywords: ['yes', 'reached', 'reach', 'combination', 'amount', 'two', '2', 'walk', 'origin', 'land', 'turn'],
    hint: 'Use the two direction test walk in the verification canvas to reach the new target dot.',
    explanation: 'This is the verification step. The claim "this space has dimension 2" is now shown to be true — not assumed.'
  },
  {
    id: 14,
    stage: 'Stage 4 — Dimension: the minimum number of directions',
    topic: 'Dimension / MCQ',
    title: 'Definition of Dimension',
    prompt: 'Which of these is the correct definition of dimension?',
    type: 'mcq',
    inputType: 'mcq',
    options: [
      '(a) The total number of directions available at a point',
      '(b) The number of walls around you',
      '(c) The minimum number of directions needed to reach every point in the space',
      '(d) The number of corners in the space'
    ],
    correct: 2,
    hint: 'Remember: available directions are infinite, but dimension is about the minimum needed to span the space.',
    explanation: 'Dimension is about the minimum. (a) confuses dimension with "how many directions exist" (which is always infinite). (b) and (d) confuse the geometry of containers with the freedom of motion.'
  },
  {
    id: 15,
    stage: 'Stage 4 — Dimension: the minimum number of directions',
    topic: 'Dimension / Reflection (Common Trap)',
    title: 'Directions Available vs. Dimension',
    prompt: 'In a space of dimension 2, you are standing at one point. How many directions are available to you?',
    type: 'reflection',
    inputType: 'mcq',
    options: [
      '1',
      '2',
      '4',
      'Infinitely many'
    ],
    correct: 3,
    hint: 'Do not confuse the minimum basis size (2) with the number of directions you can look or turn!',
    explanation: 'Infinitely many. Dimension 2 means at minimum 2 directions are enough — it does not mean only 2 directions exist. Between any two of the "fixed" directions you can rotate to face infinitely many angles. The two fixed directions form a basis; the actual space of choices is still infinite.',
    visualType: 'dimension_trap'
  },

  // STAGE 5 — Closing check
  {
    id: 16,
    stage: 'Stage 5 — Closing check',
    topic: 'Synthesis / MCQ',
    title: 'Closing Check: The Essence of Space',
    prompt: 'Which of these must be true for something to count as a "space" in the mathematical sense?',
    type: 'mcq',
    inputType: 'mcq',
    options: [
      '(a) It has walls',
      '(b) You can move in at least one direction',
      '(c) Movement in any chosen direction is never restricted',
      '(d) It is very large'
    ],
    correct: 2,
    hint: 'Recall the definition established from deep space and the bounded square counter-example.',
    explanation: 'Space = total freedom of motion. (a) and (d) restrict or qualify; (b) is too weak (a corridor has 1 direction of motion but is not a space).'
  }
];

export const INITIAL_QUESTIONS = CONCEPTUAL_QUESTIONS;
