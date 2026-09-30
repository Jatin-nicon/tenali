/**
 * Complete Matrix Mystics Curriculum Dataset
 * Generated automatically: 53 Questions across 6 Modules
 */

export const MODULES = [
  {
    "id": 1,
    "title": "Linear Relations & Algebraic Foundations",
    "emoji": "📈",
    "start": 1,
    "end": 16,
    "count": 16,
    "desc": "Direct proportionality, family of slopes, affine lines vs vector subspaces, and matrices as functions."
  },
  {
    "id": 2,
    "title": "Systems, Cryptography & Equilibrium",
    "emoji": "🔐",
    "start": 17,
    "end": 23,
    "count": 7,
    "desc": "Hill Cipher, simultaneous equations, overdetermined systems, least squares, and Markov chain steady states."
  },
  {
    "id": 3,
    "title": "Subspaces, Orthogonality & Dimensional Collapse",
    "emoji": "📐",
    "start": 24,
    "end": 38,
    "count": 15,
    "desc": "Dot products, dynamic parameterization, spans, orthogonal complements, null spaces, and dimensional collapse."
  },
  {
    "id": 4,
    "title": "The Four Fundamental Subspaces & Transposition",
    "emoji": "🏛️",
    "start": 39,
    "end": 45,
    "count": 7,
    "desc": "Row space, column space, null space, left null space, transposition, rank, and the Fundamental Theorem."
  },
  {
    "id": 5,
    "title": "Subspace Construction & The Pseudo-Inverse",
    "emoji": "🔮",
    "start": 46,
    "end": 50,
    "count": 5,
    "desc": "Building 2D subspaces in ℝ³, orthogonal complements, reverse-engineering matrices, bijections, and the pseudo-inverse."
  },
  {
    "id": 6,
    "title": "Real-World Matrix Applications",
    "emoji": "🌐",
    "start": 51,
    "end": 53,
    "count": 3,
    "desc": "Netflix recommender systems, Google PageRank eigenvectors, and SVD dimensionality reduction."
  }
];

export const QUESTIONS = [
  {
    "id": 1,
    "module": 1,
    "questionNumber": 1,
    "questionCode": "M1Q1",
    "quizNumber": 1,
    "title": "Direct Proportionality: The Piggy Bank Ray",
    "emoji": "💰",
    "original_question": "Ram and Lakshman were two brothers, Ram's pocket money was twice as much as Lakshman. The good boy that Ram and Lakshman were, they did not spend their pocket money on anything. They instead saved the same in their piggy bank. Every week, they would check their savings so far. Assume the first week's savings was (R_1,L_1) and second week's (R_2,L_2) and so on. They try plotting their weekly savings on a graph sheet. How will the points look like?",
    "goal": "Observe direct proportion geometrically: all savings points lie on a ray through the origin.",
    "core_concept": "Direct proportionality y = kx forms a line passing through (0,0) because zero input yields zero output.",
    "story": "Ram and Lakshman save their pocket money every week with Ram saving twice as much as Lakshman (R = 2L). Plot their weekly savings (R, L) on a coordinate plane.",
    "ggbType": "graphing",
    "ggbHint": "Plot points like (20,10) and (40,20). Then draw the line Line((0,0),(20,10)).",
    "ggbSteps": [
      "Click in the GeoGebra input bar.",
      "Type: (20, 10) and press Enter.",
      "Type: (40, 20) and press Enter.",
      "Type: Line((0,0), (20,10)) and press Enter.",
      "Notice both points lie precisely on the line passing through (0,0)!"
    ],
    "quiz": [
      {
        "id": "M1Q1E1",
        "question": "Ram's money is twice Lakshman's. If Lakshman has ₹10, how much does Ram have?",
        "options": [
          "Twenty rupees amount",
          "Same as Lakshman has",
          "Five rupees amount",
          "Thirty rupees amount"
        ],
        "correct_option": "Twenty rupees amount",
        "explanation": "R = 2 × L = 2 × 10 = 20, so Ram has twenty rupees."
      },
      {
        "id": "M1Q1M1",
        "question": "If (R, L) = (10, 5) and (R, L) = (14, 7) are two weekly points, what line passes through both?",
        "options": [
          "Curved line parabola",
          "Straight line shifted",
          "Straight line origin",
          "Curved line circle"
        ],
        "correct_option": "Straight line origin",
        "explanation": "Both points satisfy R = 2L, which is a straight line through the origin."
      },
      {
        "id": "M1Q1H1",
        "question": "Three brothers save with ratios 2:1, 3:1, 1:2. How many distinct lines do their points form?",
        "options": [
          "Three distinct lines",
          "One single line",
          "Two distinct lines",
          "Four distinct lines"
        ],
        "correct_option": "Three distinct lines",
        "explanation": "Each ratio gives a unique slope through origin, so three distinct lines."
      },
      {
        "id": "M1Q01R1",
        "question": "Cricket squad has batsmen and bowlers in ratio 3:1. Total squad = 20. How many batsmen?",
        "options": [
          "15 players",
          "5 players",
          "10 players",
          "20 players"
        ],
        "correct_option": "15 players",
        "explanation": "Ratio 3:1 of 20 gives 15 batsmen and 5 bowlers, since 3/4 of 20 is 15."
      },
      {
        "id": "M1Q1M2",
        "question": "For R = kL, what value of k forces all points onto the L-axis?",
        "options": [
          "The value unit one",
          "The value double",
          "The value four",
          "The value zero"
        ],
        "correct_option": "The value zero",
        "explanation": "If k = 0 then R = 0 for every L, so every point lies on the L-axis."
      }
    ]
  },
  {
    "id": 2,
    "module": 1,
    "questionNumber": 2,
    "questionCode": "M1Q2",
    "quizNumber": 2,
    "title": "Grid Walking & The Collinear Footpath",
    "emoji": "🗺️",
    "original_question": "Atul's house is centered at origin (0,0) he walks straight (along the x-axis) for 2 units and then takes a left and walks 1 unit to reach Bala's house, after that he takes a right turn and walks for one unit and then a left turn and walks for one unit and reaches Chetan's house. He continues in a similar style, takes a right turn 1 unit and then left turn one unit and reaches Divya's house. Are the houses of Bala, Chetan and Divya on a straight line? What is the equation of this line? Plot this on Geogebra",
    "goal": "Plot discrete grid steps and prove collinearity through constant slope (m = 1).",
    "core_concept": "Points with equal slopes between consecutive coordinates lie on a single affine line: y = x - 1.",
    "story": "Atul starts at (0,0). Bala is at (2,1). Chetan is at (3,2). Divya is at (4,3). Check if these houses form a straight line.",
    "ggbType": "graphing",
    "ggbHint": "Plot B=(2,1), C=(3,2), D=(4,3). Then create Line(B, C) and check if D lies on it.",
    "ggbSteps": [
      "Type: B = (2, 1) and press Enter.",
      "Type: C = (3, 2) and press Enter.",
      "Type: D = (4, 3) and press Enter.",
      "Type: Line(B, C) and press Enter.",
      "Observe the line equation y = x - 1 passes directly through D!"
    ],
    "quiz": [
      {
        "id": "M1Q2E1",
        "question": "Atul starts at (0,0) and walks 2 units along the x-axis. What is his new position?",
        "options": [
          "(0, 2)",
          "(2, 2)",
          "(1, 0)",
          "(2, 0)"
        ],
        "correct_option": "(2, 0)",
        "explanation": "Walking along the x-axis keeps y = 0; moving 2 right gives (2,0)."
      },
      {
        "id": "M1Q2M1",
        "question": "What is the slope of the line through (2,1) and (3,1)?",
        "options": [
          "1/2",
          "0",
          "1",
          "2/3"
        ],
        "correct_option": "0",
        "explanation": "Equal y-values give Δy = 0, so slope = 0/1 = 0."
      },
      {
        "id": "M1Q2H1",
        "question": "If Atul repeats (right 2, up 3) from origin, on what line do his endpoints lie?",
        "options": [
          "y equals 2x",
          "y equals 3x",
          "y equals 4x",
          "y equals 1.5x"
        ],
        "correct_option": "y equals 1.5x",
        "explanation": "Endpoints are (2,3),(4,6),(6,9); y/x = 3/2 = 1.5, so line is y = 1.5x."
      },
      {
        "id": "M1Q02R1",
        "question": "Grid-city delivery stops at (0,1), (2,1), (4,1). What y-value do they share?",
        "options": [
          "y equals 2",
          "y equals 1",
          "y equals 3",
          "y equals 0"
        ],
        "correct_option": "y equals 1",
        "explanation": "All three points have second coordinate 1, so they share y = 1."
      },
      {
        "id": "M1Q2M2",
        "question": "What is the slope of the line through (2,1) and (4,1)?",
        "options": [
          "half unit",
          "two units",
          "zero slope",
          "one unit"
        ],
        "correct_option": "zero slope",
        "explanation": "Both points have y = 1, so rise = 0 and slope = 0."
      }
    ]
  },
  {
    "id": 3,
    "module": 1,
    "questionNumber": 3,
    "questionCode": "M1Q3",
    "quizNumber": 3,
    "title": "Family of Slopes: Pivoting Around the Center",
    "emoji": "🎯",
    "original_question": "Plot the lines y=x, y=2x, y=10x.",
    "goal": "Visualize how varying the slope steepens the trajectory while holding the origin fixed.",
    "core_concept": "Lines of the form y = mx form a 1D vector subspace of ℝ² passing through (0,0) with varying slope m.",
    "story": "Plot three distinct lines y = x, y = 2x, and y = 10x on the same plane and observe their shared anchor.",
    "ggbType": "graphing",
    "ggbHint": "Type: y = x, then y = 2x, then y = 10x.",
    "ggbSteps": [
      "Type: y = x and press Enter.",
      "Type: y = 2*x and press Enter.",
      "Type: y = 10*x and press Enter.",
      "Observe that higher slopes rotate the line counter-clockwise toward the vertical axis."
    ],
    "quiz": [
      {
        "id": "M1Q3E1",
        "question": "For y = x, what is y when x = 3?",
        "options": [
          "It equals four",
          "It equals three",
          "It equals seven",
          "It equals eight"
        ],
        "correct_option": "It equals three",
        "explanation": "On y = x, the output equals the input, so y = 3 when x = 3."
      },
      {
        "id": "M1Q3M1",
        "question": "Find the slope of y = 2x.",
        "options": [
          "Slope is just two",
          "Slope is just three",
          "Slope is just four",
          "Slope is just seven"
        ],
        "correct_option": "Slope is just two",
        "explanation": "In y = mx, the coefficient m is the slope, so y = 2x has slope 2."
      },
      {
        "id": "M1Q3H1",
        "question": "For x > 0, arrange the y-values of y = x, y = 2x and y = 10x in increasing order.",
        "options": [
          "x, then 20x",
          "x, then 10x",
          "x, then 2x",
          "x, then 100x"
        ],
        "correct_option": "x, then 2x",
        "explanation": "For x > 0, multiplying by 1 < 2 < 10 keeps the order, so x < 2x < 10x."
      },
      {
        "id": "M1Q03R1",
        "question": "Car covers 60 km in 1 hour. Distance-time slope (km/h)?",
        "options": [
          "Seventy",
          "Eighty",
          "Sixty",
          "Ninety"
        ],
        "correct_option": "Sixty",
        "explanation": "Slope equals rise/run = 60 km / 1 h = 60, so the slope is sixty km/h."
      },
      {
        "id": "M1Q3M2",
        "question": "Find the slope of y = 10x.",
        "options": [
          "Slope is just two",
          "Slope is just four",
          "Slope is just one",
          "Slope is just ten"
        ],
        "correct_option": "Slope is just ten",
        "explanation": "The slope equals the coefficient of x, so y = 10x has slope 10."
      }
    ]
  },
  {
    "id": 4,
    "module": 1,
    "questionNumber": 4,
    "questionCode": "M1Q4",
    "quizNumber": 4,
    "title": "The Origin Anchor: The Geometry of (0,0)",
    "emoji": "⚓",
    "original_question": "Observe that they all pass through the origin. Why?",
    "goal": "Understand why linear functions without constant terms must pass through the origin.",
    "core_concept": "For any equation y = mx, setting x = 0 yields y = m(0) = 0. A vector subspace must contain the zero vector.",
    "story": "Why do all proportional relationships pass through (0,0)? If you invest zero, you get zero return.",
    "ggbType": "graphing",
    "ggbHint": "Check the point (0,0) on each line: substitute x=0 into y=mx.",
    "ggbSteps": [
      "Type: (0, 0) and press Enter to mark the origin point.",
      "Type: y = 5*x and press Enter.",
      "Type: y = -3*x and press Enter.",
      "Notice that no matter the value of m, when x=0, y=0 always holds."
    ],
    "quiz": [
      {
        "id": "M1Q4E1",
        "question": "On y = mx, the y-value at x = 0 is:",
        "options": [
          "the value 1",
          "the value 2",
          "the value 0",
          "the value m"
        ],
        "correct_option": "the value 0",
        "explanation": "Substituting x = 0 into y = mx gives y = m·0 = 0, so the point (0, 0) lies on every line y = mx."
      },
      {
        "id": "M1Q4M1",
        "question": "Substituting x = 0 into y = mx + b gives y equal to:",
        "options": [
          "the value b",
          "the value m",
          "the value 0",
          "the value x"
        ],
        "correct_option": "the value b",
        "explanation": "When x = 0, the term m·x vanishes leaving y = b, so the y-intercept of y = mx + b is exactly b."
      },
      {
        "id": "M1Q4H1",
        "question": "Which substitution step proves y = mx passes through the origin?",
        "options": [
          "x=0 gives y=m",
          "x=1 gives y=m",
          "x=0 gives y=0",
          "x=1 gives y=0"
        ],
        "correct_option": "x=0 gives y=0",
        "explanation": "Setting x = 0 in y = mx yields y = m·0 = 0, so the point (0, 0) satisfies the equation for every m."
      },
      {
        "id": "M1Q04R1",
        "question": "Car fuel starts at 50 L and stays at 50 L. Does fuel-time pass through origin?",
        "options": [
          "Yes, on origin",
          "Always drops",
          "Cannot decide",
          "No, starts 50"
        ],
        "correct_option": "No, starts 50",
        "explanation": "At t = 0 fuel is already 50 L, so the graph starts at (0, 50), not at the origin."
      },
      {
        "id": "M1Q4M2",
        "question": "A line through the origin written as y = mx + c must have:",
        "options": [
          "the value c=1",
          "the value c=0",
          "the value m=0",
          "any constant c"
        ],
        "correct_option": "the value c=0",
        "explanation": "Passing through (0, 0) forces b = c = 0 because at x = 0 the line gives y = c; hence c must equal zero."
      }
    ]
  },
  {
    "id": 5,
    "module": 1,
    "questionNumber": 5,
    "questionCode": "M1Q5",
    "quizNumber": 5,
    "title": "Affine Shifts: Breaking the Origin Anchor",
    "emoji": "🧱",
    "original_question": "Plot y=2x+1. Observe, Why doesn't it pass through the origin?",
    "goal": "Distinguish between linear vector subspaces (passing through 0) and affine lines (offset by b).",
    "core_concept": "The constant term b = 1 creates a vertical displacement: at x = 0, y = 1 ≠ 0. Hence it is affine, not a linear subspace.",
    "story": "Add a constant offset to y = 2x to form y = 2x + 1. Notice how the line is shifted off the origin anchor.",
    "ggbType": "graphing",
    "ggbHint": "Plot y = 2x and y = 2x + 1 side-by-side to view the parallel offset.",
    "ggbSteps": [
      "Type: y = 2*x and press Enter.",
      "Type: y = 2*x + 1 and press Enter.",
      "Type: (0, 1) and press Enter to mark the y-intercept.",
      "Observe the two lines are parallel, but y = 2x + 1 misses (0,0)."
    ],
    "quiz": [
      {
        "id": "M1Q5E1",
        "question": "What is y when x=0 on y=2x+1?",
        "options": [
          "Zero",
          "One",
          "Two",
          "Three"
        ],
        "correct_option": "One",
        "explanation": "At x=0 the line gives y=2(0)+1=1, so the y-value is 1."
      },
      {
        "id": "M1Q5M1",
        "question": "y=2x+1 versus y=2x — which lies above?",
        "options": [
          "y=2x+1",
          "y=2x",
          "Coincide always",
          "Depends on x"
        ],
        "correct_option": "y=2x+1",
        "explanation": "For every x, 2x+1 exceeds 2x by exactly 1, so y=2x+1 is always above y=2x."
      },
      {
        "id": "M1Q5H1",
        "question": "y=2x+1 is y=2x shifted how?",
        "options": [
          "Up by one",
          "Down by one",
          "Left by one",
          "Right by one"
        ],
        "correct_option": "Up by one",
        "explanation": "Adding +1 to the right side translates the whole graph vertically up by one unit."
      },
      {
        "id": "M1Q05R1",
        "question": "Phone plan costs ₹300/month + ₹0.50/min. What is the y-intercept (cost at 0 minutes)?",
        "options": [
          "₹300",
          "₹0.50",
          "₹300.50",
          "₹0"
        ],
        "correct_option": "₹300",
        "explanation": "When minutes = 0 the monthly fixed fee ₹300 is the only charge, so the y-intercept is ₹300."
      },
      {
        "id": "M1Q5M2",
        "question": "The vertical gap between y=2x+1 and y=2x?",
        "options": [
          "Zero",
          "One",
          "Two",
          "Equals x"
        ],
        "correct_option": "One",
        "explanation": "Subtracting gives (2x+1) − 2x = 1, a constant vertical gap of 1 unit."
      }
    ]
  },
  {
    "id": 6,
    "module": 1,
    "questionNumber": 6,
    "questionCode": "M1Q6",
    "quizNumber": 6,
    "title": "Dynamic Sliders: Decoupling Slope & Intercept",
    "emoji": "🎛️",
    "original_question": "Plot y=ax+b, with a and b as parameters which you should be able to vary. What do you observe?",
    "goal": "Use interactive GeoGebra sliders to decouple rotational slope from translational intercept.",
    "core_concept": "Parameter 'a' rotates the line around its y-intercept, while parameter 'b' translates the line vertically.",
    "story": "Create dynamic sliders for 'a' and 'b' and drag them to observe how each parameter controls the geometry.",
    "ggbType": "graphing",
    "ggbHint": "Create sliders: a = 1, b = 0, then enter y = a*x + b.",
    "ggbSteps": [
      "Type: a = 1 and press Enter.",
      "Type: b = 0 and press Enter.",
      "Type: y = a*x + b and press Enter.",
      "Drag slider 'a' to observe rotation; drag slider 'b' to observe vertical translation."
    ],
    "quiz": [
      {
        "id": "M1Q6E1",
        "question": "In y = ax + b, which letter is the slope?",
        "options": [
          "the letter a",
          "the letter b",
          "the letter x",
          "the letter y"
        ],
        "correct_option": "the letter a",
        "explanation": "By convention y = ax + b names a as the slope and b as the y-intercept, mirroring y = mx + c."
      },
      {
        "id": "M1Q6M1",
        "question": "If the slope a is doubled, what happens to y = ax + b?",
        "options": [
          "becomes fully vertical",
          "becomes slightly curved",
          "steepens by factor 2",
          "stays perfectly unchanged"
        ],
        "correct_option": "steepens by factor 2",
        "explanation": "Doubling the slope a doubles the rate of vertical change per unit x, so the line is twice as steep."
      },
      {
        "id": "M1Q6H1",
        "question": "For which value of a does the line y = ax + b become horizontal?",
        "options": [
          "a equals exactly 0",
          "a equals exactly 1",
          "a equals exactly b",
          "a equals exactly -1"
        ],
        "correct_option": "a equals exactly 0",
        "explanation": "A horizontal line has slope zero, so a must equal 0; the intercept b can be any constant."
      },
      {
        "id": "M1Q06R1",
        "question": "Spring obeys F = kx. In y = ax + b form, what is b?",
        "options": [
          "Length x",
          "Zero force",
          "Force kx",
          "Constant k"
        ],
        "correct_option": "Zero force",
        "explanation": "F = kx + 0, so the intercept b is zero, meaning no offset force at natural length."
      },
      {
        "id": "M1Q6M2",
        "question": "If the intercept b is doubled, what happens to y = ax + b?",
        "options": [
          "stays perfectly fixed",
          "doubles the slope",
          "becomes fully flat",
          "shifts rigid upward"
        ],
        "correct_option": "shifts rigid upward",
        "explanation": "Doubling b raises the y-intercept while the slope a is unchanged, so the line slides rigidly upward."
      }
    ]
  },
  {
    "id": 7,
    "module": 1,
    "questionNumber": 7,
    "questionCode": "M1Q7",
    "quizNumber": 7,
    "title": "Simultaneous Systems & The 2×2 Matrix",
    "emoji": "⚔️",
    "original_question": "Consider the following simultaneous equation: 2x+3y=7, 3x+4y=10. Do you see a 2x2 matrix here? What is the importance of seeing a matrix in this problem? Why study matrices in general? Do you observe that this problem can be retold as: [[2, 3], [3, 4]] [x, y]^T = [7, 10]^T",
    "goal": "Unify the row picture (intersecting lines) and the matrix-vector equation Ax = b.",
    "core_concept": "A system of linear equations is compactified into matrix multiplication Ax = b, representing a linear transformation.",
    "story": "Solve the two equations 2x + 3y = 7 and 3x + 4y = 10 geometrically by finding their single intersection point.",
    "ggbType": "graphing",
    "ggbHint": "Enter: 2x + 3y = 7, then 3x + 4y = 10, then Intersect.",
    "ggbSteps": [
      "Type: 2*x + 3*y = 7 and press Enter.",
      "Type: 3*x + 4*y = 10 and press Enter.",
      "Type: Intersect(2*x + 3*y = 7, 3*x + 4*y = 10) and press Enter.",
      "Confirm the unique intersection point is (2, 1)."
    ],
    "quiz": [
      {
        "id": "M1Q7E1",
        "question": "In the equations 2x + 3y = 7 and 3x + 4y = 10, what are the coefficients of x?",
        "options": [
          "3 and 4",
          "2 and 3",
          "2 and 7",
          "7 and 10"
        ],
        "correct_option": "2 and 3",
        "explanation": "The x-coefficients are 2 (from 2x) and 3 (from 3x); 7 and 10 are right-hand constants, not x-coefficients."
      },
      {
        "id": "M1Q7M1",
        "question": "Which matrix equation encodes 2x + 3y = 7 and 3x + 4y = 10?",
        "options": [
          "[[2,3],[3,4]]·[7,10] = [x,y]",
          "[[2,3],[3,4]]·[x,y] = [7,10]",
          "[[7,10],[7,10]]·[x,y] = [3,4]",
          "[[2,7],[3,10]]·[x,y] = [3,4]"
        ],
        "correct_option": "[[2,3],[3,4]]·[x,y] = [7,10]",
        "explanation": "The coefficient matrix multiplies the unknown vector [x,y] to produce the constant vector [7,10]."
      },
      {
        "id": "M1Q7H1",
        "question": "Why is the matrix form A·x = b considered compact?",
        "options": [
          "Hides variables",
          "Hides equations",
          "Hides constant terms",
          "Hides matrix entries"
        ],
        "correct_option": "Hides variables",
        "explanation": "The matrix form bundles many coefficients and equations, hiding the individual variables inside x."
      },
      {
        "id": "M1Q07R1",
        "question": "Phones/covers: 2p + 3c = 70, 3p + 4c = 100. Matrix form is:",
        "options": [
          "x = A b form",
          "x b = A form",
          "A x = b form",
          "b x = A form"
        ],
        "correct_option": "A x = b form",
        "explanation": "Combining the coefficients into A and the unknowns into x gives the form A·x = b."
      },
      {
        "id": "M1Q7M2",
        "question": "Given A·x = b, multiplying both sides by A⁻¹ yields which result?",
        "options": [
          "x = A⁻¹·b",
          "x = b·A⁻¹",
          "x = A·b",
          "x = A⁻¹·A"
        ],
        "correct_option": "x = A⁻¹·b",
        "explanation": "A⁻¹·A·x = A⁻¹·b simplifies to x = A⁻¹·b since A⁻¹·A is the identity."
      }
    ]
  },
  {
    "id": 8,
    "module": 1,
    "questionNumber": 8,
    "questionCode": "M1Q8",
    "quizNumber": 8,
    "title": "Linear Invertibility: Reversible 1D Engines",
    "emoji": "🔄",
    "original_question": "Consider a simple function f(x) = 3x+2. This function is invertible right? Can you tell us what is alpha such that f(alpha)=17? Is such an alpha unique? How did you find such an alpha? Is this always possible?",
    "goal": "Understand 1-to-1 mappings and function invertibility algebraically and graphically.",
    "core_concept": "A non-zero slope linear function is bijective (injective and surjective), ensuring a unique preimage for every output.",
    "story": "Given f(x) = 3x + 2, find the unique starting input alpha that yields the output 17.",
    "ggbType": "graphing",
    "ggbHint": "Plot f(x) = 3x + 2 and the horizontal line y = 17.",
    "ggbSteps": [
      "Type: f(x) = 3*x + 2 and press Enter.",
      "Type: y = 17 and press Enter.",
      "Type: Intersect(f, y = 17) and press Enter.",
      "Observe the unique intersection coordinate is (5, 17), so alpha = 5."
    ],
    "quiz": [
      {
        "id": "M1Q8E1",
        "question": "For f(x) = 3x + 2, what is f(0)?",
        "options": [
          "Zero",
          "Two",
          "Three",
          "Five"
        ],
        "correct_option": "Two",
        "explanation": "f(0) = 3(0) + 2 = 2, since the constant term alone remains when x is zero."
      },
      {
        "id": "M1Q8M1",
        "question": "The inverse function of f(x) = 3x + 2 is f⁻¹(y) = ?",
        "options": [
          "(y - 2)/3",
          "(y + 2)/3",
          "3y + 2",
          "3y - 2"
        ],
        "correct_option": "(y - 2)/3",
        "explanation": "Solving y = 3x + 2 for x gives x = (y - 2)/3, which is f⁻¹(y)."
      },
      {
        "id": "M1Q8H1",
        "question": "Show that f(x) = mx + c is invertible for any value of m that satisfies which condition?",
        "options": [
          "m equals zero",
          "m nonzero",
          "m positive only",
          "m negative only"
        ],
        "correct_option": "m nonzero",
        "explanation": "If m ≠ 0 the slope is nonzero and the map is one-to-one, hence invertible."
      },
      {
        "id": "M1Q08R1",
        "question": "f(x) = 3x + 2. Solve f(α) = 17. α is:",
        "options": [
          "Number 3",
          "Number 7",
          "Number 4",
          "Number 5"
        ],
        "correct_option": "Number 5",
        "explanation": "3α + 2 = 17 gives 3α = 15 so α = 5; the input value is number 5."
      },
      {
        "id": "M1Q8M2",
        "question": "Verify: what is f(f⁻¹(17))?",
        "options": [
          "Five",
          "Ten",
          "Seventeen",
          "Twenty"
        ],
        "correct_option": "Seventeen",
        "explanation": "By definition of inverse, f(f⁻¹(y)) = y, so f(f⁻¹(17)) = 17."
      }
    ]
  },
  {
    "id": 9,
    "module": 1,
    "questionNumber": 9,
    "questionCode": "M1Q9",
    "quizNumber": 9,
    "title": "Evaluating Nonlinear Functions: The Forward Path",
    "emoji": "🎢",
    "original_question": "Consider the function f(x)=x^2-10, what is f(5)?",
    "goal": "Evaluate nonlinear quadratic functions and visualize the forward input-output mapping.",
    "core_concept": "Quadratic mappings send single inputs to outputs along a parabolic curve.",
    "story": "Drop x = 5 into the parabolic function f(x) = x² - 10 to find where it lands on the curve.",
    "ggbType": "graphing",
    "ggbHint": "Plot f(x) = x^2 - 10 and plot the point (5, f(5)).",
    "ggbSteps": [
      "Type: f(x) = x^2 - 10 and press Enter.",
      "Type: P = (5, f(5)) and press Enter.",
      "Observe that P evaluates to (5, 15)."
    ],
    "quiz": [
      {
        "id": "M1Q9E1",
        "question": "For f(x) = x² - 10, what is f(1)?",
        "options": [
          "A negative integer",
          "Exactly nine below",
          "Negative nine below",
          "Some positive digit"
        ],
        "correct_option": "Some positive digit",
        "explanation": "f(1) = 1² - 10 = 1 - 10 = -9, which is negative."
      },
      {
        "id": "M1Q9M1",
        "question": "Plugging x = 5 into f(x) = x² - 10, the middle step 5² equals:",
        "options": [
          "Equals twenty five",
          "Equals fifty value",
          "Equals twenty value",
          "Equals ten value"
        ],
        "correct_option": "Equals twenty five",
        "explanation": "5² = 5·5 = 25, then 25 - 10 = 15."
      },
      {
        "id": "M1Q9H1",
        "question": "Step-by-step, f(5) for f(x) = x² - 10 simplifies to:",
        "options": [
          "Twenty five minus ten",
          "Twenty five plus ten",
          "Twenty five itself alone",
          "Ten minus five itself"
        ],
        "correct_option": "Twenty five minus ten",
        "explanation": "Square first: 5² = 25, then subtract 10 to get 15."
      },
      {
        "id": "M1Q09R1",
        "question": "f(x) = x² − 10. f(5) equals:",
        "options": [
          "Number 15",
          "Number 25",
          "Number -15",
          "Number 5"
        ],
        "correct_option": "Number 15",
        "explanation": "Plugging x = 5 gives 5² − 10 = 25 − 10 = 15, so f(5) is number 15."
      },
      {
        "id": "M1Q9M2",
        "question": "For f(x) = x² + 10, what is f(5)?",
        "options": [
          "Equals fifteen value",
          "Equals thirty five",
          "Equals twenty five",
          "Equals forty five"
        ],
        "correct_option": "Equals thirty five",
        "explanation": "f(5) = 5² + 10 = 25 + 10 = 35."
      }
    ]
  },
  {
    "id": 10,
    "module": 1,
    "questionNumber": 10,
    "questionCode": "M1Q10",
    "quizNumber": 10,
    "title": "Branching Preimages: Non-Unique Quadratic Inverses",
    "emoji": "🔀",
    "original_question": "Consider the function f(x)=x^2-10, if f(alpha)=54, what is alpha?",
    "goal": "Discover why functions that fail the horizontal line test possess non-unique preimages.",
    "core_concept": "Because x² = 64 has two solutions (+8 and -8), quadratic functions are not globally invertible on ℝ.",
    "story": "Solve f(alpha) = 54 for f(x) = x² - 10. Notice that two distinct starting inputs produce the exact same output.",
    "ggbType": "graphing",
    "ggbHint": "Plot f(x) = x^2 - 10 and y = 54, then find both intersections.",
    "ggbSteps": [
      "Type: f(x) = x^2 - 10 and press Enter.",
      "Type: y = 54 and press Enter.",
      "Type: Intersect(f, y = 54) and press Enter.",
      "Observe two distinct intersection points: (-8, 54) and (8, 54)."
    ],
    "quiz": [
      {
        "id": "M1Q10E1",
        "question": "f(α)=54 means α²-10=?",
        "options": [
          "44",
          "54",
          "64",
          "74"
        ],
        "correct_option": "54",
        "explanation": "α²-10=54."
      },
      {
        "id": "M1Q10M1",
        "question": "Solve α²-10=54:",
        "options": [
          "α=±8",
          "α=8 only",
          "α=±6",
          "α=64"
        ],
        "correct_option": "α=±8",
        "explanation": "α²=64."
      },
      {
        "id": "M1Q10H1",
        "question": "f(α)=54 solutions:",
        "options": [
          "±8",
          "8 only",
          "±6",
          "±10"
        ],
        "correct_option": "±8",
        "explanation": "α²=64."
      },
      {
        "id": "M1Q10R1",
        "question": "α² − 10 = 54. Then α² equals:",
        "options": [
          "Number 54",
          "Number 64",
          "Number 44",
          "Number 100"
        ],
        "correct_option": "Number 64",
        "explanation": "Adding 10 to both sides gives α² = 54 + 10 = 64, so α² is number 64."
      },
      {
        "id": "M1Q10M2",
        "question": "f(α)=90: α²=?",
        "options": [
          "80",
          "90",
          "100",
          "110"
        ],
        "correct_option": "100",
        "explanation": "90+10=100."
      }
    ]
  },
  {
    "id": 11,
    "module": 1,
    "questionNumber": 11,
    "questionCode": "M1Q11",
    "quizNumber": 11,
    "title": "Cubic Curves: Higher-Order Preimages",
    "emoji": "〰️",
    "original_question": "Consider the function g(x)=x^3-x^2-10x+2, if g(x)=-22 what is x?",
    "goal": "Solve higher-order polynomial equations graphically using function preimages.",
    "core_concept": "Cubic equations can intersect horizontal lines at up to 3 points, demonstrating multi-valued inverse branches.",
    "story": "Explore the cubic polynomial g(x) = x³ - x² - 10x + 2 and locate the preimages where the curve hits y = -22.",
    "ggbType": "graphing",
    "ggbHint": "Plot g(x) = x^3 - x^2 - 10*x + 2 and y = -22.",
    "ggbSteps": [
      "Type: g(x) = x^3 - x^2 - 10*x + 2 and press Enter.",
      "Type: y = -22 and press Enter.",
      "Type: Intersect(g, y = -22) and press Enter.",
      "Find the real roots satisfying g(x) + 22 = 0."
    ],
    "quiz": [
      {
        "id": "M1Q11E1",
        "question": "g(0)?",
        "options": [
          "0",
          "2",
          "-2",
          "10"
        ],
        "correct_option": "2",
        "explanation": "0-0-0+2=2."
      },
      {
        "id": "M1Q11M1",
        "question": "g(3)=-10. Is 3 a root of g(x)=-22?",
        "options": [
          "No, -10≠-22",
          "Yes",
          "Approximately",
          "Cannot determine"
        ],
        "correct_option": "No, -10≠-22",
        "explanation": "Not -22."
      },
      {
        "id": "M1Q11H1",
        "question": "Find x: g(x)=-22 via IVT:",
        "options": [
          "x∈(-4,-3)",
          "x∈(0,1)",
          "x∈(3,4)",
          "x∈(1,2)"
        ],
        "correct_option": "x∈(-4,-3)",
        "explanation": "g(-4)=-38<-22<-4=g(-3)."
      },
      {
        "id": "M1Q11R1",
        "question": "g(x) = x³ − x² − 10x + 2. g(0) equals:",
        "options": [
          "Number 0",
          "Number -10",
          "Number 2",
          "Number 10"
        ],
        "correct_option": "Number 2",
        "explanation": "Plugging x = 0 gives 0 − 0 − 0 + 2 = 2, so g(0) is number 2."
      },
      {
        "id": "M1Q11M2",
        "question": "g(4)=10. Root of g(x)=-22?",
        "options": [
          "No, 10≠-22",
          "Yes",
          "If rounded",
          "Cannot determine"
        ],
        "correct_option": "No, 10≠-22",
        "explanation": "Not -22."
      }
    ]
  },
  {
    "id": 12,
    "module": 1,
    "questionNumber": 12,
    "questionCode": "M1Q12",
    "quizNumber": 12,
    "title": "Dimensional Arenas: The Geometries of ℝ, ℝ², and ℝ³",
    "emoji": "🌌",
    "original_question": "Do you know what is ℝ, ℝ² and ℝ³ ?",
    "goal": "Understand coordinate spaces: the 1D line ℝ, the 2D plane ℝ², and the 3D volume ℝ³.",
    "core_concept": "ℝⁿ represents an n-dimensional vector space: n independent degrees of spatial freedom.",
    "story": "Explore how mathematical space scales from a 1D line to a 2D sheet of paper and a 3D physical room.",
    "ggbType": "3d",
    "ggbHint": "Open 3D graphics view and plot a point (x, y, z) such as (2, 3, 4).",
    "ggbSteps": [
      "Switch to 3D Graphics view.",
      "Type: (2, 0, 0) for a 1D x-axis point.",
      "Type: (2, 3, 0) for a 2D xy-plane point.",
      "Type: (2, 3, 4) for a full 3D spatial coordinate.",
      "Rotate the 3D axes to view the depth dimension."
    ],
    "quiz": [
      {
        "id": "M1Q12E1",
        "question": "ℝ stands for set of all __ numbers.",
        "options": [
          "Natural",
          "Real",
          "Integer",
          "Rational"
        ],
        "correct_option": "Real",
        "explanation": "ℝ = real numbers."
      },
      {
        "id": "M1Q12M1",
        "question": "ℝ is __-dimensional.",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "correct_option": "1",
        "explanation": "Line."
      },
      {
        "id": "M1Q12H1",
        "question": "ℝ⁰ is:",
        "options": [
          "Empty set",
          "{0}",
          "A point",
          "ℝ"
        ],
        "correct_option": "A point",
        "explanation": "Empty tuple = single point."
      },
      {
        "id": "M1Q12R1",
        "question": "Earth surface point (latitude, longitude) is a vector in:",
        "options": [
          "ℝ",
          "ℝ³",
          "ℝ⁴",
          "ℝ²"
        ],
        "correct_option": "ℝ²",
        "explanation": "Two coordinates form an ordered pair, which lives in ℝ²."
      },
      {
        "id": "M1Q12M2",
        "question": "ℝ² is __-dimensional.",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct_option": "2",
        "explanation": "Plane."
      }
    ]
  },
  {
    "id": 13,
    "module": 1,
    "questionNumber": 13,
    "questionCode": "M1Q13",
    "quizNumber": 13,
    "title": "2D Vector Transformations: The Mapping Function φ",
    "emoji": "🌀",
    "original_question": "Consider the function phi : ℝ² -> ℝ² defined by phi(x,y)=(2x+3y,3x+4y). What has this to do with the previous question?",
    "goal": "Connect algebraic 2D vector mappings phi(x, y) to the simultaneous equation system from Q7.",
    "core_concept": "The transformation phi maps coordinates (x, y) into a new 2D coordinate using matrix rows [2 3] and [3 4].",
    "story": "Watch how the vector transformation phi takes any input coordinate (x, y) and stretches/shears it into (2x+3y, 3x+4y).",
    "ggbType": "geometry",
    "ggbHint": "Create input vector u = (1, 0) and compute phi(u) = (2, 3).",
    "ggbSteps": [
      "Type: u = Vector((1, 0)) and press Enter.",
      "Type: v = Vector((0, 1)) and press Enter.",
      "Type: u_trans = Vector((2, 3)) and press Enter.",
      "Type: v_trans = Vector((3, 4)) and press Enter.",
      "Notice how the unit vectors map to the column vectors of the transformation!"
    ],
    "quiz": [
      {
        "id": "M1Q13E1",
        "question": "φ(0,0)?",
        "options": [
          "(0,0)",
          "(2,3)",
          "(3,4)",
          "(1,1)"
        ],
        "correct_option": "(0,0)",
        "explanation": "(0+0, 0+0)."
      },
      {
        "id": "M1Q13M1",
        "question": "φ(1,0)=(2,3). φ(2,0)?",
        "options": [
          "(4,6)",
          "(2,3)",
          "(6,8)",
          "(3,4)"
        ],
        "correct_option": "(4,6)",
        "explanation": "2×(2,3)=(4,6)."
      },
      {
        "id": "M1Q13H1",
        "question": "Show φ(x,y)=A·(x,y)ᵀ. Key step:",
        "options": [
          "Matrix-vector product",
          "Just add",
          "Multiply all",
          "Divide by 2"
        ],
        "correct_option": "Matrix-vector product",
        "explanation": "A·v = (2x+3y, 3x+4y)."
      },
      {
        "id": "M1Q13R1",
        "question": "φ(x, y) = (2x+3y, 3x+4y). φ(1, 0) equals:",
        "options": [
          "(2, 3)",
          "(3, 4)",
          "(1, 0)",
          "(0, 0)"
        ],
        "correct_option": "(2, 3)",
        "explanation": "Plugging (1, 0) gives (2·1 + 3·0, 3·1 + 4·0) = (2, 3)."
      },
      {
        "id": "M1Q13M2",
        "question": "φ(0,1)=(3,4). φ(0,2)?",
        "options": [
          "(6,8)",
          "(3,4)",
          "(2,6)",
          "(3,8)"
        ],
        "correct_option": "(6,8)",
        "explanation": "2×(3,4)=(6,8)."
      }
    ]
  },
  {
    "id": 14,
    "module": 1,
    "questionNumber": 14,
    "questionCode": "M1Q14",
    "quizNumber": 14,
    "title": "Matrix Inversion: The Reversible 2D Machine",
    "emoji": "🔓",
    "original_question": "Is the function phi invertible? In the question above on matrices, we see that it is of the form Ax = b. Note that we can invert the matrix, using the method that was taught to us in our high school to find out the value for the variables x and y. This is one of the many applications of matrices.",
    "goal": "Calculate the matrix inverse A⁻¹ and verify that A⁻¹A = I.",
    "core_concept": "A matrix is invertible if and only if its determinant is non-zero (det(A) = 2(4) - 3(3) = -1 ≠ 0).",
    "story": "Since det([[2,3],[3,4]]) = -1, the transformation preserves 2D area and can be completely reversed.",
    "ggbType": "graphing",
    "ggbHint": "Verify the determinant: 2*4 - 3*3 = -1.",
    "ggbSteps": [
      "Type: A = {{2, 3}, {3, 4}} in the CAS/input.",
      "Type: Invert(A) and press Enter.",
      "Observe the inverse matrix is {{-4, 3}, {3, -2}}.",
      "Multiply Invert(A) * {{7}, {10}} to recover x = 2, y = 1."
    ],
    "quiz": [
      {
        "id": "M1Q14E1",
        "question": "ad-bc for [[a,b],[c,d]] is called:",
        "options": [
          "Determinant",
          "Trace",
          "Eigenvalue",
          "Rank"
        ],
        "correct_option": "Determinant",
        "explanation": "Standard name."
      },
      {
        "id": "M1Q14M1",
        "question": "det([[1,3],[2,7]])=?",
        "options": [
          "1",
          "7",
          "-1",
          "6"
        ],
        "correct_option": "1",
        "explanation": "7-6=1."
      },
      {
        "id": "M1Q14H1",
        "question": "Invert [[2,3],[3,4]] using augmented matrix:",
        "options": [
          "[[-4,3],[3,-2]]",
          "[[4,-3],[-3,2]]",
          "[[2,3],[3,4]]",
          "[[1,0],[0,1]]"
        ],
        "correct_option": "[[-4,3],[3,-2]]",
        "explanation": "Row reduce [A|I]."
      },
      {
        "id": "M1Q14R1",
        "question": "A = [[2,3],[3,4]]. The determinant is:",
        "options": [
          "Plus one",
          "Minus one",
          "Minus two",
          "Zero value"
        ],
        "correct_option": "Minus one",
        "explanation": "Det = 2·4 − 3·3 = 8 − 9 = −1, so the determinant of A is minus one."
      },
      {
        "id": "M1Q14M2",
        "question": "det([[1,1],[1,1]])=?",
        "options": [
          "0",
          "1",
          "2",
          "-1"
        ],
        "correct_option": "0",
        "explanation": "1-1=0."
      }
    ]
  },
  {
    "id": 15,
    "module": 1,
    "questionNumber": 15,
    "questionCode": "M1Q15",
    "quizNumber": 15,
    "title": "Matrices as Geometric Transformation Engines",
    "emoji": "🏭",
    "original_question": "We will now see matrices as functions. Instead of phi we will write the matrix itself: [[2, 3], [3, 4]] : ℝ² -> ℝ².",
    "goal": "Re-conceptualize matrices from static number grids into dynamic spatial transformation engines.",
    "core_concept": "A matrix acts as an active operator that bends, stretches, and rotates space.",
    "story": "Think of a matrix not as a table of numbers, but as an engine that consumes 2D vectors and outputs transformed 2D vectors.",
    "ggbType": "geometry",
    "ggbHint": "Draw a polygon on the unit square and apply the matrix transformation.",
    "ggbSteps": [
      "Type: poly1 = Polygon((0,0), (1,0), (1,1), (0,1)) and press Enter.",
      "Type: ApplyMatrix({{2, 3}, {3, 4}}, poly1) and press Enter.",
      "Observe how the unit square is transformed into an area-preserving sheared parallelogram!"
    ],
    "quiz": [
      {
        "id": "M1Q15E1",
        "question": "A=[[2,3],[3,4]] is a function from __ to __.",
        "options": [
          "ℝ² to ℝ²",
          "ℝ to ℝ",
          "ℝ³ to ℝ³",
          "ℝ² to ℝ"
        ],
        "correct_option": "ℝ² to ℝ²",
        "explanation": "Square matrix, same dim."
      },
      {
        "id": "M1Q15M1",
        "question": "[[1,2],[3,4]] sends (1,0) to:",
        "options": [
          "(1,3)",
          "(2,4)",
          "(3,7)",
          "(1,2)"
        ],
        "correct_option": "(1,3)",
        "explanation": "First column."
      },
      {
        "id": "M1Q15H1",
        "question": "Any matrix A: ℝⁿ→ℝᵐ is linear because:",
        "options": [
          "A(αx+βy)=αAx+βAy",
          "A(x+y)=Ax+Ay only",
          "A(cx)=cAx only",
          "None above"
        ],
        "correct_option": "A(αx+βy)=αAx+βAy",
        "explanation": "Full linearity."
      },
      {
        "id": "M1Q15R1",
        "question": "Scaling matrix S(x, y) = (2x, 3y). Its matrix form is:",
        "options": [
          "[[3,0],[0,2]]",
          "[[2,3],[0,0]]",
          "[[2,0],[0,3]]",
          "[[0,0],[2,3]]"
        ],
        "correct_option": "[[2,0],[0,3]]",
        "explanation": "The diagonal entries scale x and y, so the matrix is [[2,0],[0,3]]."
      },
      {
        "id": "M1Q15M2",
        "question": "[[1,2],[3,4]] sends (0,1) to:",
        "options": [
          "(1,3)",
          "(2,4)",
          "(3,7)",
          "(1,2)"
        ],
        "correct_option": "(2,4)",
        "explanation": "Second column."
      }
    ]
  },
  {
    "id": 16,
    "module": 1,
    "questionNumber": 16,
    "questionCode": "M1Q16",
    "quizNumber": 16,
    "title": "Singular Collapse: Unveiling the Kernel / Null Space",
    "emoji": "🕳️",
    "original_question": "Consider the function [[1, 2], [2, 4]] : ℝ² -> ℝ². This matrix takes a few elements to the origin. What are those elements? Plot this using Geogebra.",
    "goal": "Discover the null space (kernel) of a singular matrix and visualize dimensional collapse.",
    "core_concept": "Because row 2 is double row 1, det(A) = 0. The entire line x + 2y = 0 collapses to (0,0).",
    "story": "When a matrix has dependent rows, it crushes an entire line of input coordinates directly into the origin!",
    "ggbType": "graphing",
    "ggbHint": "Plot the line x + 2y = 0. Pick points like (-2, 1) and multiply by [[1,2],[2,4]].",
    "ggbSteps": [
      "Type: x + 2*y = 0 and press Enter.",
      "Type: P = (-2, 1) and press Enter.",
      "Type: Q = (4, -2) and press Enter.",
      "Calculate: [1 2; 2 4] * [-2; 1] = [0; 0].",
      "Notice that every single point on this line is crushed into the origin!"
    ],
    "quiz": [
      {
        "id": "M1Q16E1",
        "question": "A=[[1,2],[2,4]]. A·(x,y)ᵀ = ?",
        "options": [
          "(x+2y, 2x+4y)",
          "(2x+4y, x+2y)",
          "(x+y, 2x+4y)",
          "(x+2y, x+4y)"
        ],
        "correct_option": "(x+2y, 2x+4y)",
        "explanation": "Matrix-vector product."
      },
      {
        "id": "M1Q16M1",
        "question": "Solve A·x=0: every solution has form (x,y) = t·__.",
        "options": [
          "(-2,1)",
          "(1,-2)",
          "(2,1)",
          "(1,1)"
        ],
        "correct_option": "(-2,1)",
        "explanation": "Parametrised by t."
      },
      {
        "id": "M1Q16H1",
        "question": "Rank of A = [[1,2],[2,4]] is:",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "correct_option": "1",
        "explanation": "One independent row."
      },
      {
        "id": "M1Q16R1",
        "question": "A = [[1,2],[2,4]]. The condition A·(x, y) = (0, 0) is:",
        "options": [
          "Both zero",
          "x = 2y only",
          "y = 2x only",
          "x + 2y = 0"
        ],
        "correct_option": "x + 2y = 0",
        "explanation": "The first row gives x + 2y = 0; the second row is just twice this equation."
      },
      {
        "id": "M1Q16M2",
        "question": "The null space of A is the line x + 2y = 0.",
        "options": [
          "True",
          "False",
          "Only if det≠0",
          "Cannot determine"
        ],
        "correct_option": "True",
        "explanation": "x = -2y gives the line."
      }
    ]
  },
  {
    "id": 17,
    "module": 2,
    "questionNumber": 1,
    "questionCode": "M2Q1",
    "quizNumber": 17,
    "title": "Cryptography and the Matrix Machine",
    "emoji": "🔐",
    "original_question": "A is assigned 0, B:1, C:2, and so on up to Z:25\nAssume you denoted every letter with a number, as given in the table above.\nYou need to encrypt the word SUDARSHANA which stands for the numbers: 18, 20, 3, 0, 17, 18, 7, 0, 13,0.\nYou encrypt this using a matrix given by : [[2, 3], [3, 4]].\nSo SUDARSHANA will end up becoming: 96, 134, 6, 9, 88, 123, 14, 21, 26, 39.\nGiven these numbers, how will you decrypt the message and get back SUDARSHANA?\nThis is a well known cryptographic protocol called the Hill Cipher. You can read more online.",
    "goal": "Decrypt the Hill Cipher by computing the matrix inverse A⁻¹ and applying it to ciphertext pairs.",
    "core_concept": "Matrix multiplication encodes vector pairs; multiplying by the matrix inverse A⁻¹ decodes them reversibly.",
    "story": "A secret message 'SUDARSHANA' was encrypted with a 2×2 matrix. Use the inverse matrix machine to recover the plain text.",
    "ggbType": "graphing",
    "ggbHint": "Compute inverse of {{2,3},{3,4}} and multiply by cipher vectors {{96},{134}}.",
    "ggbSteps": [
      "Type: A = {{2, 3}, {3, 4}} and press Enter.",
      "Type: invA = Invert(A) and press Enter.",
      "Type: invA * {{96}, {134}} to recover the first pair [18, 20] ('S', 'U').",
      "Notice how the inverse matrix acts as the private decryption key!"
    ],
    "quiz": [
      {
        "question": "The plain-text word SUDARSHANA yielded ten distinct numbers, but the encryption process required us to group them into pairs (like 18 and 20) before doing any math. Why was this pairing geometrically necessary?",
        "options": [
          "To prevent frequency analysis, cryptographic protocols always require combining a consonant with a vowel to mask the underlying language.",
          "The encryption matrix is a 2 × 2 transformation, meaning it acts strictly as an engine that consumes and outputs two-dimensional spatial coordinates.",
          "Because the determinant of the encryption matrix is exactly 2, the mathematical rules dictate that inputs must be processed in sets of two to avoid fractional remainders.",
          "Grouping numbers into pairs naturally converts the linear data stream into a curved trajectory, which is significantly harder for codebreakers to trace."
        ],
        "correct_option": "The encryption matrix is a 2 × 2 transformation, meaning it acts strictly as an engine that consumes and outputs two-dimensional spatial coordinates.",
        "explanation": "A 2 × 2 matrix represents a transformation of ℝ² space. It is physically built to accept a 2D coordinate vector (an x and a y) and stretch/rotate it into a new 2D coordinate vector. It simply does not know how to process a single 1D number or a 3D block of three numbers."
      },
      {
        "question": "Visualize the Transformation Picture from Module 1. What exactly did the encryption matrix do to the first pair of numbers to turn (18, 20) into (96, 134)?",
        "options": [
          "It isolated the x and y variables, multiplying the 18 purely along the horizontal axis and the 20 purely along the vertical axis to generate a secure distance.",
          "It shifted the central origin of the graph by (18, 20) units, effectively making the plain-text coordinate the new mathematical center of the cipher system.",
          "It physically grasped the original coordinate at (18, 20) and relocated it across the geometric plane to a completely new, disguised destination at (96, 134).",
          "It squared the original coordinates and mapped them onto a three-dimensional sphere, ensuring the encrypted values could not be read on a flat piece of paper."
        ],
        "correct_option": "It physically grasped the original coordinate at (18, 20) and relocated it across the geometric plane to a completely new, disguised destination at (96, 134).",
        "explanation": "Encryption is simply the act of moving data to a place where an eavesdropper cannot recognize it. Think of the matrix as a spatial wind. The matrix multiplication Ax picked up the original, readable coordinate (S, U) located at (18, 20), and blew it far across the grid to a completely new coordinate at (96, 134)."
      },
      {
        "question": "The core question asks: 'Given these numbers, how will you decrypt the message?' Using the language of linear algebra, what is the exact mathematical mechanism required to get SUDARSHANA back?",
        "options": [
          "You must multiply the encrypted cipher coordinates by the inverse of the original encryption matrix to reverse-engineer the geometric mapping.",
          "You must divide the encrypted cipher coordinates (96, 134) directly by the original 2 × 2 matrix to mathematically isolate the original variables.",
          "You must swap the rows of the original encryption matrix and multiply it by the cipher text, which physically reverses the directional vectors.",
          "You apply the exact same original matrix to the cipher numbers, but strategically subtract the results from 26 (the total length of the alphabet)."
        ],
        "correct_option": "You must multiply the encrypted cipher coordinates by the inverse of the original encryption matrix to reverse-engineer the geometric mapping.",
        "explanation": "This tests a major algebraic trap! If the forward equation is Ax = b, you cannot simply 'divide' by matrix A. Matrix division does not exist. To isolate the starting point x, you must multiply the destination (b) by the Inverse Matrix (A⁻¹). The inverse is a custom-built machine that perfectly retraces the steps from (96, 134) backward to (18, 20)."
      },
      {
        "question": "What would logically happen if the sender accidentally used the 'broken' singular matrix [[1, 2], [2, 4]] from Module 1 to encrypt this message?",
        "options": [
          "The encryption would actually be significantly stronger, as the collapsed matrix lacks an identifiable geometric pattern, completely baffling codebreakers.",
          "The encrypted numbers would spiral infinitely into decimal fractions, making it computationally difficult to match them back to whole letters of the alphabet.",
          "Space would collapse, causing multiple different letter combinations to land on the exact same encrypted coordinate, making accurate decryption impossible.",
          "The matrix would physically ignore the second letter of every pair, securely mapping only half of the message to the destination plane while deleting the rest."
        ],
        "correct_option": "Space would collapse, causing multiple different letter combinations to land on the exact same encrypted coordinate, making accurate decryption impossible.",
        "explanation": "A secure cipher requires a perfectly unique 1-to-1 mapping. As we learned in M1Q16, a singular matrix collapses 2D space into a flat 1D line (the Null Space issue). This means entirely different letter pairs (like 'AB' and 'CD') might both get encrypted into the exact same output numbers (like '45, 90'). The history of the data is destroyed, making it impossible to know which word the sender originally wrote."
      },
      {
        "question": "In the context of a secure cryptographic protocol, what real-world digital asset does the Inverse Matrix (A⁻¹) directly represent?",
        "options": [
          "It acts as the public encryption lock that allows anyone on the internet to send a scrambled message, but strictly prevents them from reading it.",
          "It calculates the absolute computational time it would take a hacker to crack the cipher without knowing the original matrix variables.",
          "It represents the secure physical channel (like an encrypted fiber-optic cable) over which the scrambled message (96, 134) safely travels.",
          "It acts as the highly secure, privately held decryption key required to unlock the cipher and perfectly run the mathematical scramble in reverse."
        ],
        "correct_option": "It acts as the highly secure, privately held decryption key required to unlock the cipher and perfectly run the mathematical scramble in reverse.",
        "explanation": "Anyone intercepting the message only sees a string of massive, confusing numbers. Without knowing the exact matrix used to scramble them, discovering the inverse is mathematically incredibly difficult (especially when scaled up to larger dimensions). The Inverse Matrix is the private key; whoever possesses it holds the exclusive power to run the matrix machine backward."
      }
    ]
  },
  {
    "id": 18,
    "module": 2,
    "questionNumber": 2,
    "questionCode": "M2Q2",
    "quizNumber": 18,
    "title": "Real-World Constraints and the Geometric Intersection",
    "emoji": "☕",
    "original_question": "We encounter equations very often in our lives. Consider for example, the following situation at Baker's Cafe. The manager has a very important estimate to make. Mostly, visitors at his cafe happen to be families and they are often comprised of Children and/or Adults. He observes that there are 3 adults and 1 child at a table and their bill turns out to be Rs.1200/-. There is yet another table with 2 children and 1 adult and their bill comes out to be Rs.1000/-. Can the manager estimate the consumption of a Child/Adult? This is popularly called the Simultaneous Equations and we all remember from our school days, multiple ways in which these can be solved.\n3A + 1C = 1200\n1A + 2C = 1000",
    "goal": "Estimate Adult and Child meal prices by finding the unique intersection of two constraint lines.",
    "core_concept": "Row picture: lines intersect at a unique coordinate (280, 360). Column picture: finding linear combinations of adult and child columns.",
    "story": "The cafe manager needs to know how much an Adult vs a Child consumes. Two table bills provide two geometric constraints.",
    "ggbType": "graphing",
    "ggbHint": "Plot lines 3x + y = 1200 and x + 2y = 1000, then find their intersection.",
    "ggbSteps": [
      "Type: 3*x + y = 1200 and press Enter.",
      "Type: x + 2*y = 1000 and press Enter.",
      "Type: Intersect(3*x + y = 1200, x + 2*y = 1000) and press Enter.",
      "Read the intersection coordinate (280, 360): Adult = Rs 280, Child = Rs 360."
    ],
    "quiz": [
      {
        "question": "In the traditional 'Row Picture,' what does the single algebraic equation 3A + 1C = 1200 geometrically represent before you even look at the second table's bill?",
        "options": [
          "It calculates a bounded, triangular area of profit the manager makes strictly from the first table.",
          "It defines a single, highly specific spatial coordinate that perfectly locks in the final prices of the adult and child meals.",
          "It maps out a continuous geometric line, representing an infinite number of possible price combinations that could technically total 1200.",
          "It restricts the mathematical graph to a single positive quadrant, ensuring that neither the adults nor the children can have a negative price."
        ],
        "correct_option": "It maps out a continuous geometric line, representing an infinite number of possible price combinations that could technically total 1200.",
        "explanation": "A single equation with two variables cannot give you a single answer. If 3A + 1C = 1200, maybe the adult meal is Rs. 400 (and the child eats for free), or maybe the adult meal is Rs. 300 and the child meal is Rs. 300. Geometrically, this infinite set of 'possible realities' forms a single, unbroken straight line across the 2D plane. You are trapped somewhere on that line, but you don't know exactly where."
      },
      {
        "question": "The manager must observe a second table (1A + 2C = 1000) to actually solve the problem. Geometrically, what does solving for the crossing of these two lines physically accomplish?",
        "options": [
          "It isolates the one unique spatial coordinate in the entire 2D plane that successfully obeys the financial rules of both tables at the exact same time.",
          "The intersection algebraically adds the dimensions of the two tables together to find the overall average spatial cost per person.",
          "It permanently bends the two mathematical trajectories so they run completely parallel to one another, preventing future contradictions.",
          "The crossing point establishes the absolute mathematical baseline, proving that the central origin (0, 0) must be shifted upward."
        ],
        "correct_option": "It isolates the one unique spatial coordinate in the entire 2D plane that successfully obeys the financial rules of both tables at the exact same time.",
        "explanation": "The first line is the set of all prices that make Table 1's bill correct. The second line is the set of all prices that make Table 2's bill correct. The geometric intersection is the singular coordinate that physically exists on both lines simultaneously. That intersection is the unique price point that perfectly balances both realities."
      },
      {
        "question": "If we upgrade this high-school algebra into a modern Matrix Transformation (Mx = b), what does the actual 2 × 2 matrix engine [[3,1],[1,2]] itself represent in the cafe?",
        "options": [
          "The matrix acts as the final digital ledger, firmly locking in the ultimate monetary targets the manager is attempting to reach.",
          "The matrix represents the fluctuating prices themselves, operating directly upon the human customers to calculate total revenue.",
          "The 2 × 2 matrix algebraically calculates the absolute geographic distance between the first table and the second table.",
          "The matrix is a rigid mapping engine, built entirely from the physical human seating arrangements, designed to transform unknown prices into the final bills."
        ],
        "correct_option": "The matrix is a rigid mapping engine, built entirely from the physical human seating arrangements, designed to transform unknown prices into the final bills.",
        "explanation": "In the equation Mx = b, the x vector is the unknown prices (Adult, Child). The b vector is the target destination (the final bills: 1200, 1000). The matrix itself is the 'machine' that converts human beings into money. Its coefficients (3, 1 and 1, 2) are the strict physical constraints dictated purely by how many people sat down to eat."
      },
      {
        "question": "Let's completely change our perspective and read the matrix using the 'Column Picture.' What does the first vertical column [3, 1]ᵀ mathematically track about the cafe?",
        "options": [
          "It perfectly isolates Table 1, showing that exactly 3 adults and 1 child sat down together to generate the first bill.",
          "It represents the complete physical presence of the adults across the entire system, tracking exactly how the 'Adult price' impacts both bills simultaneously.",
          "It isolates the exact amount of money contributed solely by the adults to the final financial ledger.",
          "It defines the absolute physical difference in seating capacity between the first and second tables."
        ],
        "correct_option": "It represents the complete physical presence of the adults across the entire system, tracking exactly how the 'Adult price' impacts both bills simultaneously.",
        "explanation": "This is a classic trap! Option A describes the Row Picture. Reading columns separates the variables. The first column is strictly attached to the Adult price variable (A). The top number (3) is how many adults are at Table 1. The bottom number (1) is how many adults are at Table 2. The column vector tells you the directional impact of the adult price on the entire restaurant at once."
      },
      {
        "question": "What would happen to the geometry of the system if the manager recorded a second table with 6 Adults and 2 Children, and their bill was Rs. 2400?",
        "options": [
          "The second equation would generate a perfectly perpendicular line, making the intersection significantly easier to pinpoint on the graph.",
          "The math would physically collapse into a single point at the origin, forcing both the adult and child prices to instantly default to zero.",
          "The second equation is a mathematically redundant rule, meaning the two lines would perfectly overlap and completely destroy the possibility of finding one unique solution.",
          "The matrix engine would simply rotate the original lines to find a completely new, more expensive central coordinate."
        ],
        "correct_option": "The second equation is a mathematically redundant rule, meaning the two lines would perfectly overlap and completely destroy the possibility of finding one unique solution.",
        "explanation": "6A + 2C = 2400 is literally just the first table (3A + 1C = 1200) multiplied by 2. It provides zero new information! Geometrically, if you plotted this, the second line would be drawn directly on top of the first line. Because they intersect infinitely, the matrix singularizes (collapses). Without a second, independent geometric constraint, a unique price for the adult and child becomes mathematically impossible to find."
      }
    ]
  },
  {
    "id": 19,
    "module": 2,
    "questionNumber": 3,
    "questionCode": "M2Q3",
    "quizNumber": 19,
    "title": "Overdetermined Systems and the Messy Real World",
    "emoji": "📐",
    "original_question": "While we were taught the so called two variables and two unknowns, what if there were more equations than unknowns?\n3A + 1C = 1200\n1A + 2C = 1000\n1A + 1C = 900",
    "goal": "Discover why overdetermined systems (3 equations, 2 unknowns) generally produce an error triangle.",
    "core_concept": "With m > n independent equations, three lines in ℝ² almost never meet at a single point, resulting in no exact solution.",
    "story": "A third table bill of Rs 900 for 1 Adult + 1 Child is recorded, but 280 + 360 = 640 ≠ 900. Real-world data contradicts perfection!",
    "ggbType": "graphing",
    "ggbHint": "Plot all three lines: 3x+y=1200, x+2y=1000, x+y=900.",
    "ggbSteps": [
      "Type: 3*x + y = 1200 and press Enter.",
      "Type: x + 2*y = 1000 and press Enter.",
      "Type: x + y = 900 and press Enter.",
      "Zoom in on the intersection area to see the geometric 'triangle of error'."
    ],
    "quiz": [
      {
        "question": "You have exactly two variables (Adults and Children) but you now have three distinct equations. Geometrically, what happens when you attempt to plot these three constraints on a standard two-dimensional graph?",
        "options": [
          "Because they represent a single unified restaurant, all three lines will automatically converge at one flawless central coordinate.",
          "The three distinct straight lines will almost certainly miss a perfectly shared intersection, creating a small empty triangle between them instead.",
          "The introduction of a third variable constraint physically lifts the graph off the paper, converting the lines into planes within a three-dimensional volume.",
          "The extra equation forces at least two of the lines to run perfectly parallel to each other to avoid a mathematical contradiction."
        ],
        "correct_option": "The three distinct straight lines will almost certainly miss a perfectly shared intersection, creating a small empty triangle between them instead.",
        "explanation": "Two lines on a 2D plane will usually cross at exactly one point. But a third independent line will almost never pass perfectly through that exact same crossing point unless the universe perfectly aligned it. Because real-world data is messy, the three lines will cross each other at three different places, forming a small geometric 'triangle of error.'"
      },
      {
        "question": "From a strictly real-world perspective at the Baker's Cafe, what does this geometric 'miss' actually mean for the manager?",
        "options": [
          "The algebraic system has completely collapsed, mathematically proving that it is impossible to set static prices for food items.",
          "The manager has successfully collected enough historical data to calculate the exact, flawless average price across every table in the restaurant.",
          "The collected data is inherently contradictory, strongly suggesting a recording error, an unlisted discount, or an extra dessert was secretly added to one of the bills.",
          "The restaurant's pricing structure requires the introduction of imaginary numbers to properly balance the ledger."
        ],
        "correct_option": "The collected data is inherently contradictory, strongly suggesting a recording error, an unlisted discount, or an extra dessert was secretly added to one of the bills.",
        "explanation": "The mathematics is simply exposing a lie in the data! The first two tables suggest an Adult meal is Rs. 280 and a Child meal is Rs. 360. If that were completely true, the third table (1 Adult + 1 Child) should be exactly Rs. 640. But their bill is Rs. 900. The numbers literally do not add up, meaning the real-world data contains hidden inconsistencies."
      },
      {
        "question": "If you ignore the third table for a moment, and manually solve for the variables A and C using strictly the first two equations, how will those specific answers interact with the third equation (1A + 1C = 900)?",
        "options": [
          "The unique prices calculated from the first two tables will fail to add up to 900, directly and completely violating the third mathematical rule.",
          "The prices will perfectly satisfy the third equation, proving that overdetermined systems are highly stable.",
          "The third equation will mathematically erase the first two coordinates, forcing the variables to automatically adjust their own weights to balance the final equation.",
          "The third equation will act as a geometric multiplier, scaling the answers from the first two tables upward until they reach the 900 target."
        ],
        "correct_option": "The unique prices calculated from the first two tables will fail to add up to 900, directly and completely violating the third mathematical rule.",
        "explanation": "Solving equation 1 and 2 yields A = 280 and C = 360. This is the single coordinate that satisfies those two lines. When you plug this coordinate into the third equation, you get 280 + 360 = 640. Because 640 ≠ 900, the third rule is broken. Any point you pick to satisfy two of the tables will automatically violate the rules of the remaining table."
      },
      {
        "question": "If we eventually package this 3 × 2 problem into a Matrix Transformation engine (Mx = b), what geometric dimensional mapping is the system actively attempting to perform?",
        "options": [
          "The matrix strictly maps three independent inputs to two separate targets, shrinking a 3D physical volume down to a flat 2D plane.",
          "Because there are three physical equations, the matrix engine demands three independent spatial dimensions as its input fuel.",
          "The matrix permanently traps all the variables within a 1-dimensional tracking line to ensure they can safely intersect without contradiction.",
          "The system takes two spatial inputs (Adult and Child prices) but attempts to satisfy three distinct targets, effectively trying to map a flat 2D space into a 3D destination."
        ],
        "correct_option": "The system takes two spatial inputs (Adult and Child prices) but attempts to satisfy three distinct targets, effectively trying to map a flat 2D space into a 3D destination.",
        "explanation": "The matrix will have two columns and three rows. The input vector x has two variables, meaning it starts in a 2D space (ℝ²). The target destination b will be the three bills (1200, 1000, 900), which is a coordinate floating in 3D space (ℝ³). The machine is trying to map a 2D piece of paper into a 3D room."
      },
      {
        "question": "Because a 'perfect' geometric solution literally does not exist for this system, how do advanced mathematicians resolve this contradiction?",
        "options": [
          "They mathematically delete the most expensive table from the system to force the remaining lines to cross cleanly, reverting to standard high-school algebra.",
          "They rotate the standard Cartesian grid by exactly 90 degrees to artificially align the divergent lines into a perfect crossing point.",
          "They abandon the search for perfection and systematically seek a new coordinate that minimizes the overall geometric distance to all three lines simultaneously.",
          "They introduce a massive scalar multiplier to reset the baseline to zero, bypassing the physical contradiction entirely."
        ],
        "correct_option": "They abandon the search for perfection and systematically seek a new coordinate that minimizes the overall geometric distance to all three lines simultaneously.",
        "explanation": "This is brilliant foreshadowing for upcoming modules. Since the lines form a triangle of error and miss each other, we cannot find an answer that makes the equations perfectly true. Instead, mathematicians use 'Least Squares Approximation.' They find the single coordinate in the very center of that triangle—the point that is 'least wrong' and closest to all three lines at once."
      }
    ]
  },
  {
    "id": 20,
    "module": 2,
    "questionNumber": 4,
    "questionCode": "M2Q4",
    "quizNumber": 20,
    "title": "The Anatomy of an Overdetermined Matrix",
    "emoji": "🏛️",
    "original_question": "Note that the previous question can be modelled as a matrix:\n3A + 1C = 1200\n1A + 2C = 1000\n1A + 1C = 900\nObserve this is same as:\n[[3, 1], [1, 2], [1, 1]] [A, C]^T = [1200, 1000, 900]^T",
    "goal": "Model the 3×2 overdetermined system as a mapping from a 2D input space into a 3D target space.",
    "core_concept": "The matrix takes a 2D parameter vector [A, C]^T and outputs a vector in ℝ³. Its reachable destinations form a 2D plane in ℝ³.",
    "story": "Transforming the cafe equations into matrix form reveals that we are attempting to reach a 3D target using only two steering wheels.",
    "ggbType": "3d",
    "ggbHint": "In 3D view, plot column vectors u=(3,1,1) and v=(1,2,1), and the target b=(1200,1000,900).",
    "ggbSteps": [
      "Switch to 3D Graphics view.",
      "Type: u = Vector((3, 1, 1)) and press Enter.",
      "Type: v = Vector((1, 2, 1)) and press Enter.",
      "Type: Plane((0,0,0), u, v) to visualize the reachable Column Space.",
      "Observe that target vector b = (1200, 1000, 900) floats completely off this 2D sheet!"
    ],
    "quiz": [
      {
        "question": "When you read the exact mapping notation for this 3 × 2 matrix, what specific geometric dimensional shift is the engine actively performing?",
        "options": [
          "It actively requires three independent spatial coordinates as its input fuel to calculate a flat, two-dimensional geometric output space.",
          "It strictly restricts all mathematical movement to a flat 2D plane to ensure the algebraic equations remain perfectly balanced.",
          "It consumes a 2D input coordinate and physically maps it directly into a 3D destination space.",
          "It scales a massive 3-dimensional volume uniformly so that it fits flawlessly inside a singular 1-dimensional line."
        ],
        "correct_option": "It consumes a 2D input coordinate and physically maps it directly into a 3D destination space.",
        "explanation": "The input vector has exactly two variables: [A, C]ᵀ. This means the machine demands a 2D coordinate as its fuel (ℝ²). However, the matrix itself has three rows, meaning it outputs a final vector with three distinct numbers (the bills). Therefore, the machine takes a flat 2D point and projects it into a 3D volumetric space (ℝ³)."
      },
      {
        "question": "Let's ignore the rows completely and read the matrix using the 'Column Picture.' Geometrically, what do the two vertical columns of the matrix physically represent?",
        "options": [
          "They trace the three intersecting lines of the simultaneous equations perfectly across a standard Cartesian grid.",
          "They act as two independent 3D directional arrows, which are stretched or shrunk by the unknown variables A and C.",
          "The first column mathematically captures the total amount of money paid exclusively by the adults, while the second strictly isolates the children's financial contribution to the system.",
          "They serve as the fixed coordinates of the target destination, locking the final restaurant bills into their final spatial place."
        ],
        "correct_option": "They act as two independent 3D directional arrows, which are stretched or shrunk by the unknown variables A and C.",
        "explanation": "The matrix is built from two columns: [3, 1, 1]ᵀ and [1, 2, 1]ᵀ. These are two distinct direction arrows living inside a 3D universe. The variables A and C are simply the instructions (the scalars) telling you exactly how far to walk along those two specific 3D arrows to build your final output. Option C is a massive trap—the columns track the number of people, not the money!"
      },
      {
        "question": "If you can scale and add these two column vectors using any numbers you want for A and C, what geometric shape will all the possible combinations sweep out?",
        "options": [
          "A solid three-dimensional volume, because the mathematical system contains exactly three independent equations that expand outward into space.",
          "A single, infinitely long straight 1D line passing through the origin.",
          "A flat 2D plane floating suspended inside a 3D universe.",
          "A series of three distinct intersecting planes that enclose a small, triangular pocket of geometric error where the target destination is trapped."
        ],
        "correct_option": "A flat 2D plane floating suspended inside a 3D universe.",
        "explanation": "This is the legendary Column Space. Because you only have two base vectors (two directions to walk), combining them can only ever sweep out a flat 2D sheet of paper. But because those column vectors have three coordinates each, that flat sheet of paper is floating suspended inside a larger 3D room."
      },
      {
        "question": "In the previous quiz, we discovered this cafe problem has no perfect solution. Looking exclusively through the lens of the Column Space geometry, why does the mathematics fail?",
        "options": [
          "The two fundamental column vectors of the matrix point in the exact same direction, causing the entire spatial geometry of the system to collapse under its own weight into a single line.",
          "The target 3D coordinate representing the final bills floats completely off the 2D plane that the matrix can reach.",
          "The matrix engine physically lacks the algebraic stability required to process numerical destination values that extend beyond the first geometric quadrant.",
          "The physical intersection of the spatial lines occurs strictly inside a negative spatial dimension."
        ],
        "correct_option": "The target 3D coordinate representing the final bills floats completely off the 2D plane that the matrix can reach.",
        "explanation": "This is one of the most profound visuals in linear algebra. The matrix can only map inputs onto its flat 2D Column Space plane. The target vector [1200, 1000, 900]ᵀ is a specific coordinate floating in that same 3D room. The problem has no solution because that target point is hovering in the air off the paper. The matrix machine is physically incapable of reaching it!"
      },
      {
        "question": "By pulling the numbers out of the algebraic equations to form the abstract matrix A, what conceptual clarity does a mathematician ultimately gain?",
        "options": [
          "It physically isolates the restaurant's rigid seating structure from the fluctuating monetary prices.",
          "It allows the manager to artificially increase the variables until the three distinct mathematical lines perfectly converge onto a single spatial point.",
          "It directly merges the input parameters with the final bills to completely eliminate the possibility of algebraic fractions.",
          "It mathematically forces the children's consumption rate to become perfectly proportional to the adults' consumption, solving the system implicitly."
        ],
        "correct_option": "It physically isolates the restaurant's rigid seating structure from the fluctuating monetary prices.",
        "explanation": "The matrix A contains only the numbers of people (3, 1, 1 and 1, 2, 1). This is the underlying structural architecture of the system. By isolating it into a matrix, we separate the 'engine' (the human layout at the tables) from the 'fuel' (the prices A and C) and the 'exhaust' (the total bills). This allows us to study the structure of the cafe completely independent of whatever the prices happen to be on a given day."
      }
    ]
  },
  {
    "id": 21,
    "module": 2,
    "questionNumber": 5,
    "questionCode": "M2Q5",
    "quizNumber": 21,
    "title": "The Geometry of Guessing and Error",
    "emoji": "🎯",
    "original_question": "One obvious way to solve this, is to guess the values :-). Can you get closer to the solution by guessing? Note that there is no solution to this question. You can just reduce the error. Do you see why?",
    "goal": "Visualize error minimization and understand the geometric foundation of Least Squares approximation.",
    "core_concept": "The point on the Column Space plane closest to the floating target is its orthogonal projection; the error vector is perpendicular to the plane.",
    "story": "If you cannot hit a bird hovering in the air while trapped on the floor, the closest you can get is standing directly underneath it.",
    "ggbType": "3d",
    "ggbHint": "Project target b onto the 2D plane spanned by the columns.",
    "ggbSteps": [
      "Plot the Column Space plane in 3D view.",
      "Plot the target point b = (12, 10, 9).",
      "Drop a perpendicular line from b to the plane.",
      "Find the projection point p where the perpendicular hits the plane—this minimizes ||Ax - b||!"
    ],
    "quiz": [
      {
        "question": "When you arbitrarily 'guess' prices for the variables A (Adult) and C (Child), what are you physically doing within the geometric Column Picture?",
        "options": [
          "You are navigating to a specific, unique coordinate strictly confined to the flat 2D plane created by the matrix's columns.",
          "You are testing different three-dimensional coordinates in the air to see which one perfectly aligns with the mathematical target.",
          "You are systematically rotating the foundational column vectors until they point directly at the required cafe bills.",
          "You are incrementally shifting the entire target vector until it safely intersects with the physical boundaries of the matrix system."
        ],
        "correct_option": "You are navigating to a specific, unique coordinate strictly confined to the flat 2D plane created by the matrix's columns.",
        "explanation": "The variables A and C are simply scalars—instructions telling you how far to walk along the two established column vectors. Because the matrix only has two columns, combining them can only ever build a flat 2D sheet of paper (the Column Space). Every single time you guess a new pair of prices, you are simply walking to a new spot resting perfectly flat on that specific 2D paper."
      },
      {
        "question": "The text explicitly states, 'there is no solution to this question.' Visually, what strictly guarantees this failure?",
        "options": [
          "The three mathematical lines form a completely parallel geometric structure, meaning an intersection is theoretically impossible no matter what numbers are guessed.",
          "The fundamental column vectors cancel each other out, mathematically collapsing the reachable space into a single unmoving point at the origin.",
          "The exact 3D coordinate representing the final bills is physically floating in the space outside the flat 2D plane that the matrix is capable of reaching.",
          "The manager collected financial targets that require a complex four-dimensional mapping engine to properly process."
        ],
        "correct_option": "The exact 3D coordinate representing the final bills is physically floating in the space outside the flat 2D plane that the matrix is capable of reaching.",
        "explanation": "The matrix machine can only reach destinations that live on its 2D Column Space plane. The bills from the cafe form a 3D target destination: [1200, 1000, 900]ᵀ. Because this specific target point is hovering in the 3D room completely off the 2D sheet of paper, the matrix machine is physically incapable of ever reaching it. Perfection is impossible."
      },
      {
        "question": "When you guess the prices and calculate the three resulting bills, you generate 'error.' How is this specific error visualized in the 3D space?",
        "options": [
          "It forms a flat geometric triangle connecting your guessed coordinate, the target destination, and the absolute origin.",
          "It manifests as a physical, straight-line bridge drawn directly from your current position on the 2D plane to the floating 3D target in the air.",
          "It curves organically around the spatial axes, representing the mathematical friction between the guessed inputs and the rigid matrix constraints.",
          "It calculates the exact scalar angle between the fundamental row vectors and the flat column space."
        ],
        "correct_option": "It manifests as a physical, straight-line bridge drawn directly from your current position on the 2D plane to the floating 3D target in the air.",
        "explanation": "Think of the space physically. You guessed a price, which dropped a pin somewhere on the flat 2D floor. The actual cafe bills form a target bird hovering in the air above the floor. The error is literally the physical, straight-line distance spanning from the pin you placed on the ground directly up to the bird in the air."
      },
      {
        "question": "What is the precise algebraic mechanism used to calculate the exact numerical values of this specific 'error vector' after you make a guess?",
        "options": [
          "By dividing the actual given cafe bill totals directly by the newly calculated theoretical bill values.",
          "By mathematically projecting the 3D target bills down onto the 2D column space and measuring the remaining shadow.",
          "By multiplying your guessed variables directly against the final target destination vector.",
          "By strictly subtracting your newly calculated theoretical bills from the actual given cafe bill totals."
        ],
        "correct_option": "By strictly subtracting your newly calculated theoretical bills from the actual given cafe bill totals.",
        "explanation": "Error is simply the mathematical difference between where you landed and where you wanted to be. If your guessed prices calculate bills of (1300, 950, 950) but the real bills are (1200, 1000, 900), you just subtract the two vectors. The resulting vector [-100, 50, -50]ᵀ is the exact mathematical 'error vector' telling you how wrong your guess was."
      },
      {
        "question": "The question challenges you to 'reduce the error.' Geometrically, if you want the absolute best guess with the smallest possible error, where must you stand on the flat 2D plane?",
        "options": [
          "The exact coordinate located perpendicularly straight down beneath the floating target.",
          "The coordinate that sits exactly halfway between the central origin and the outermost column vector boundary.",
          "The specific location where the two base column vectors perfectly intersect with the mathematical target line.",
          "You must travel infinitely far along the steepest directional gradient until the spatial error strictly zeroes out."
        ],
        "correct_option": "The exact coordinate located perpendicularly straight down beneath the floating target.",
        "explanation": "This is the brilliant core of Least Squares Approximation! If a bird is hovering in the air (the target) and you must stay on the flat ground (the Column Space), you cannot catch the bird. The absolute closest you can ever get to it is to walk to the exact spot on the ground directly underneath it. That vertical, 90-degree perpendicular drop represents the shortest possible distance (the minimized error)."
      }
    ]
  },
  {
    "id": 22,
    "module": 2,
    "questionNumber": 6,
    "questionCode": "M2Q6",
    "quizNumber": 22,
    "title": "Markov Chains and the Geometry of Equilibrium",
    "emoji": "😊",
    "original_question": "In the figure below: [Markov Chain: Happy / Stressed]\nIf 1000 people were to start in one state, what will be the distribution of people eventually?",
    "goal": "Calculate the steady-state equilibrium of a 2-state stochastic transition matrix.",
    "core_concept": "The equilibrium is the eigenvector corresponding to eigenvalue λ = 1, where inbound flow equals outbound flow: 0.7H = 0.5S.",
    "story": "1000 people transition daily between Happy and Stressed states. Regardless of the starting room, the system settles into a stable dynamic equilibrium.",
    "ggbType": "graphing",
    "ggbHint": "Solve 0.7*H = 0.5*S with H + S = 1000. Plot both lines in 2D.",
    "ggbSteps": [
      "Type: 0.7*x = 0.5*y and press Enter.",
      "Type: x + y = 1000 and press Enter.",
      "Type: Intersect(0.7*x = 0.5*y, x + y = 1000) and press Enter.",
      "Notice the system stabilizes at roughly 417 Happy and 583 Stressed people!"
    ],
    "quiz": [
      {
        "question": "If we convert the flowchart from markov2.png into a mathematical Transition Matrix, what foundational real-world rule strictly governs the numbers within it?",
        "options": [
          "The matrix requires the horizontal rows to sum to exactly 1.0 to ensure that the probability of being happy always equals the probability of being stressed.",
          "Each vertical column must sum to exactly 1.0, mathematically enforcing the physical reality that no person is magically created or destroyed during a transition.",
          "The determinant of the final matrix must dynamically scale to precisely 1000 to safely hold the entire physical population.",
          "The sum of the main diagonal numbers must equal the total number of physical states to maintain geometric balance."
        ],
        "correct_option": "Each vertical column must sum to exactly 1.0, mathematically enforcing the physical reality that no person is magically created or destroyed during a transition.",
        "explanation": "This is a 'Stochastic Matrix.' Look at the 'Happy' circle in the image. Exactly 0.3 (30%) stay Happy, and 0.7 (70%) leave to become Stressed. 0.3 + 0.7 = 1.0. Because people cannot spontaneously disappear into thin air, the outgoing probabilities leaving any specific state (which form the vertical columns of the matrix) must always sum perfectly to 100%."
      },
      {
        "question": "The question asks what happens to the population distribution 'eventually.' Visually and physically, what does this long-term mathematical stability actually look like?",
        "options": [
          "The dominant 0.7 probability completely overtakes the system, eventually driving all 1000 people permanently into the Stressed state.",
          "All transitions physically stop over time, freezing every individual permanently in whatever emotional state they happen to be in.",
          "People continue to constantly change states every day, but the system stabilizes because the exact number of people becoming happy perfectly equals the exact number of people becoming stressed.",
          "The system mathematically oscillates back and forth in a repeating loop between two extreme baseline populations."
        ],
        "correct_option": "People continue to constantly change states every day, but the system stabilizes because the exact number of people becoming happy perfectly equals the exact number of people becoming stressed.",
        "explanation": "'Eventually' refers to the Steady State (or dynamic equilibrium). The transitions never stop! Every single day, 70% of the currently Happy people will still get Stressed. The system only stabilizes when it acts like a bathtub where the faucet is pouring water in at the exact same speed the drain is letting it out. The individuals change, but the total headcount in each room remains perfectly still."
      },
      {
        "question": "If we write this final equilibrium algebraically as Mx = x (where M is the matrix and x is the final population), what profound concept of Linear Algebra does this specific state represent?",
        "options": [
          "The steady state acts as a true mathematical eigenvector, meaning the matrix machine processes it, but its actual spatial coordinate remains entirely unshifted.",
          "The steady state forces the entire matrix to completely collapse into a one-dimensional Null Space, destroying historical coordinate data.",
          "It permanently inverts the underlying transition probabilities to prevent the system from suffering a geometric overflow.",
          "It establishes a rigid spatial boundary that actively repels any coordinates attempting to cross into a negative graphical quadrant."
        ],
        "correct_option": "The steady state acts as a true mathematical eigenvector, meaning the matrix machine processes it, but its actual spatial coordinate remains entirely unshifted.",
        "explanation": "This is a magnificent introduction to Eigenvectors. Usually, a matrix M grabs a vector and blows it to a totally new location in space. However, if a vector is an eigenvector (with an eigenvalue of λ = 1), the matrix machine processes it, but the vector physically refuses to move or stretch. The final 1000-person distribution is literally just the primary eigenvector of the probability matrix!"
      },
      {
        "question": "The prompt asks what happens 'If 1000 people were to start in one state...'. What happens to the final eventual distribution if everyone starts Happy versus if everyone starts Stressed?",
        "options": [
          "The initial state permanently offsets the final numbers, meaning starting with 1000 Happy people creates a fundamentally different equilibrium than starting with 1000 Stressed people.",
          "The gravitational pull of the transition rules eventually erases the starting history, pulling the system to the exact same final distribution regardless of where the 1000 people began.",
          "Starting entirely in one state causes the matrix to singularize, forcing the variables to default directly to zero.",
          "If everyone starts in a single state, the system bypasses the arrows and immediately divides the population exactly in half to balance the mathematical graph."
        ],
        "correct_option": "The gravitational pull of the transition rules eventually erases the starting history, pulling the system to the exact same final distribution regardless of where the 1000 people began.",
        "explanation": "A beautiful property of regular Markov Chains is that history is eventually forgotten. The transition matrix acts like a gravitational funnel. It pulls the 2D spatial coordinate toward the exact same single eigenvector regardless of where you initially drop the 1000 people on the coordinate plane. The rules of the system determine the final destination, not the starting line."
      },
      {
        "question": "Without guessing or running a massive simulation, how can you algebraically determine the exact ratio of the final population using the visual flowchart?",
        "options": [
          "The distribution strictly balances at a perfect 50/50 split because the mathematical laws of continuous probability always seek a flat horizontal average over infinite time.",
          "The system naturally settles at a continuous geometric ratio of 7 Happy people for every 5 Stressed people, favoring the absolute largest numerical percentage on the board.",
          "By simply multiplying the starting population of 1000 directly against the highest percentage on the diagram, bypassing the simultaneous equations entirely.",
          "By setting the inbound flow mathematically equal to the outbound flow (0.7H = 0.5S), revealing a strict internal ratio of exactly 5 Happy people for every 7 Stressed people."
        ],
        "correct_option": "By setting the inbound flow mathematically equal to the outbound flow (0.7H = 0.5S), revealing a strict internal ratio of exactly 5 Happy people for every 7 Stressed people.",
        "explanation": "To find the steady state, the number of Happy people becoming Stressed (0.7 × H) must equal the number of Stressed people becoming Happy (0.5 × S). Algebraically, 0.7H = 0.5S simplifies directly to the fraction H/S = 5/7. Because there are 12 'parts' total (5 + 7), the final state will permanently maintain roughly 417 Happy people and 583 Stressed people!"
      }
    ]
  },
  {
    "id": 23,
    "module": 2,
    "questionNumber": 7,
    "questionCode": "M2Q7",
    "quizNumber": 23,
    "title": "Scaling Dimensions and 3D Equilibrium",
    "emoji": "🏙️",
    "original_question": "In the figure below: [3-State Markov Chain: Park, Apartment, Restaurant]\nIf 1000 people were to start in one state, what will be the distribution of people eventually?",
    "goal": "Solve for the stationary 3D eigenvector of a 3-state Markov transition matrix.",
    "core_concept": "In a 3D Markov system, column probabilities sum to 1. Setting inflow equal to outflow at each node yields a 1D line of eigenvectors intersecting P+A+R=1000.",
    "story": "A population of 1000 moves between Park, Apartment, and Restaurant. Watch how the 3D probability matrix funnels any starting vector to the exact same steady state.",
    "ggbType": "3d",
    "ggbHint": "In 3D view, plot the simplex plane x + y + z = 1000 and find the steady state coordinate.",
    "ggbSteps": [
      "Switch to 3D Graphics view.",
      "Type: x + y + z = 1000 and press Enter (the total population plane).",
      "Enter the balance equations between Park, Apartment, and Restaurant.",
      "The intersection of the balance planes with x+y+z=1000 pinpoints the unique steady-state distribution!"
    ],
    "quiz": [
      {
        "question": "When translating the flowchart from markov3.png into a mathematical transition matrix, what geometric shift has occurred compared to the previous Happy/Stressed problem?",
        "options": [
          "The addition of a third state forces the matrix to dynamically project a flat 2D population map onto a curved surface to account for the overlap.",
          "Because the total population remains strictly locked at 1000, the system algebraically collapses the three locations down into a two-dimensional mathematical plane.",
          "The matrix now fundamentally acts as an engine that consumes a 3D spatial coordinate as its input and maps it to a new 3D spatial coordinate.",
          "The underlying mathematical rules require the introduction of a new imaginary axis to safely buffer the intersecting probability vectors."
        ],
        "correct_option": "The matrix now fundamentally acts as an engine that consumes a 3D spatial coordinate as its input and maps it to a new 3D spatial coordinate.",
        "explanation": "The system now has exactly three variables (Park, Apartment, Restaurant). This means an input vector representing the population distribution requires three distinct numbers, placing it squarely in 3D space (ℝ³). The transition matrix grabs that 3D coordinate and calculates a completely new 3D coordinate for the next time step. The transformation is strictly ℝ³ → ℝ³."
      },
      {
        "question": "Look at the arrows pointing away from the Apartment. Why is it mathematically critical that 0.5 + 0.1 + 0.4 = 1.0?",
        "options": [
          "It guarantees that the Apartment will always eventually hold exactly one-third of the total population, maintaining geographic symmetry.",
          "These outbound probabilities form a single vertical column in the matrix, and they must perfectly sum to 1 to mathematically prevent human beings from spontaneously disappearing from the universe.",
          "The sum of these arrows must equal 1 to perfectly offset the inbound arrows coming from the Park, ensuring the overall matrix determinant remains balanced.",
          "It proves that the geometric center of the transition matrix sits exactly at the origin of the 3D grid."
        ],
        "correct_option": "These outbound probabilities form a single vertical column in the matrix, and they must perfectly sum to 1 to mathematically prevent human beings from spontaneously disappearing from the universe.",
        "explanation": "In a Stochastic Matrix, the vertical columns track where people go. The people leaving the Apartment only have three choices: go to the Park (50%), stay in the Apartment (10%), or go to the Restaurant (40%). Because all 1000 people must physically exist somewhere after transitioning, the probabilities of all possible destinations from a single starting point must perfectly add up to 100%."
      },
      {
        "question": "The prompt asks what the distribution will be 'eventually.' Visually speaking, what does this final steady-state coordinate actually look like inside the 3D grid?",
        "options": [
          "It is a rapidly rotating spatial vector that constantly cycles through the Park, Apartment, and Restaurant axes as the days pass.",
          "It forms a rigid triangular plane that continuously expands outward toward infinity as more people transition between the locations.",
          "It is a single, stationary coordinate arrow floating in 3D space that the matrix engine processes without changing its direction or length.",
          "It represents a geometric collapse where all three spatial axes forcibly merge into a single unmoving point at (0, 0, 0)."
        ],
        "correct_option": "It is a single, stationary coordinate arrow floating in 3D space that the matrix engine processes without changing its direction or length.",
        "explanation": "This is the definition of an Eigenvector (specifically, one with an eigenvalue of λ = 1). While the matrix violently tosses most 3D coordinates around the room, there is one specific, magical population ratio that, when pushed through the matrix, lands right back on itself. The system is still physically churning, but the overall shape of the population vector remains completely frozen in place."
      },
      {
        "question": "The question specifically notes: 'If 1000 people were to start in one state...'. What happens to the final geometric equilibrium if everyone starts entirely in the Park, versus starting entirely in the Restaurant?",
        "options": [
          "The initial state acts as a massive mathematical anchor, heavily distorting the final probabilities to favor wherever the people began.",
          "The gravitational pull of the transition matrix completely overpowers the starting conditions, pulling the population to the exact same final 3D coordinate regardless of where they began.",
          "Starting 1000 people in the Park causes the system to never reach equilibrium because the Park has the highest overall retention rate.",
          "Placing all inputs into a single dimension instantly singularizes the transformation matrix, making a long-term solution algebraically impossible."
        ],
        "correct_option": "The gravitational pull of the transition matrix completely overpowers the starting conditions, pulling the population to the exact same final 3D coordinate regardless of where they began.",
        "explanation": "A beautiful property of regular Markov Chains is that history is completely erased over time. The transition matrix acts like a funnel. You can drop a marble (the starting population) anywhere you want in the 3D space, and the matrix will perpetually bounce it closer and closer to the exact same final eigenvector. The rules of the machine determine the destination, not the starting line."
      },
      {
        "question": "How do we conceptually find the exact numerical distribution of the final steady state without blindly guessing?",
        "options": [
          "We construct a system of simultaneous equations by setting the algebraic expression for everyone entering a specific location perfectly equal to everyone leaving it.",
          "We simply locate the single highest percentage on the visual diagram and multiply it by 1000 to find the dominant center of gravity.",
          "We mathematically cross-multiply the three diagonal retention probabilities to find the absolute maximum geometric limit of the system.",
          "We plot the three largest transition arrows on a graph and calculate their geometric intersection to find the population center."
        ],
        "correct_option": "We construct a system of simultaneous equations by setting the algebraic expression for everyone entering a specific location perfectly equal to everyone leaving it.",
        "explanation": "This brings the curriculum perfectly full circle back to Question 2 (The Cafe Equations)! To find the equilibrium, the system must balance. The total number of people entering the Park from other places must exactly equal the number of people leaving the Park. By setting the 'Inflow' equal to the 'Outflow' for each location, you simply generate a standard system of intersecting planes (simultaneous equations) that you can cleanly solve for the final coordinate!"
      }
    ]
  },
  {
    "id": 24,
    "module": 3,
    "questionNumber": 1,
    "questionCode": "M3Q1",
    "quizNumber": 24,
    "title": "Orthogonality and the Geometry of the Dot Product",
    "emoji": "📐",
    "original_question": "Use Geogebra:\nDraw the vector [[1], [1]]. Find out all those vectors which are perpendicular to this vector.",
    "goal": "Discover all vectors perpendicular to [1, 1]^T geometrically and verify their dot product equals zero.",
    "core_concept": "Two vectors in ℝ² are orthogonal if and only if their dot product vanishes: 1x + 1y = 0 => y = -x.",
    "story": "Given the diagonal vector [1, 1]^T pointing into Quadrant I, sweep out every perpendicular vector in the plane.",
    "ggbType": "graphing",
    "ggbHint": "Type: u = Vector((1, 1))",
    "ggbSteps": [
      "Type: u = Vector((1, 1))",
      "Type: x + y = 0",
      "Observe the perpendicular line passes through (0,0) with slope -1."
    ],
    "quiz": [
      {
        "question": "When attempting to find a vector perpendicular to [1, 1]ᵀ, what strict mathematical bridge connects the physical geometry of a 90-degree angle to a solvable algebra equation?",
        "options": [
          "The sum of their individual coordinate magnitudes must perfectly cancel out, creating a stable zero-sum system across the spatial grid.",
          "The dot product of the two vectors must equate exactly to zero.",
          "You must calculate the cross product of the spatial vectors and ensure the resulting third-dimensional scalar evaluates to exactly one.",
          "The geometric slopes of both independent vectors must be added together to verify they form a perfect horizontal line extending across the x-axis."
        ],
        "correct_option": "The dot product of the two vectors must equate exactly to zero.",
        "explanation": "The Dot Product is the ultimate mathematical test for orthogonality (perpendicularity). If you have two vectors in space, the geometric angle between them is precisely 90 degrees if, and only if, their dot product equals exactly zero. It is the defining mechanical rule for navigating perpendicular space."
      },
      {
        "question": "If you successfully find all possible vectors that are completely perpendicular to [1, 1]ᵀ and plot them simultaneously on a standard grid, what specific geometric shape will physically appear?",
        "options": [
          "A single, isolated coordinate located precisely at (-1, 1), as it is the absolute only mathematical point that perfectly balances the original vector's trajectory.",
          "A completely flat two-dimensional plane that acts as a continuous orthogonal boundary, completely blocking the original vector from extending forward.",
          "An infinitely long straight line passing perfectly through the central origin, sloping diagonally downward from the top-left to the bottom-right.",
          "A bounded circular ring that constantly maintains a strict 90-degree tangent against the primary axis, no matter how far the original vector is stretched."
        ],
        "correct_option": "An infinitely long straight line passing perfectly through the central origin, sloping diagonally downward from the top-left to the bottom-right.",
        "explanation": "There isn't just one perpendicular vector; there are infinitely many of them! The original vector points diagonally up into Quadrant I. Any vector that points perfectly perpendicular to it (like (-2, 2), (5, -5), or (100, -100)) will work. If you plot all of these infinite valid vectors in Geogebra, they perfectly align to form a single, unbroken straight diagonal line cutting through the (0, 0) origin."
      },
      {
        "question": "By applying the correct rule for perpendicularity to an unknown vector [x, y]ᵀ, what fundamental algebraic constraint is placed upon the resulting spatial coordinates?",
        "options": [
          "The system establishes the strict ratio xy = -1, proving that perpendicular variables must behave inversely to one another as they stretch toward infinity.",
          "The variables must satisfy the equation x + y = 0, physically forcing the vertical coordinate to always act as the exact negative opposite of the horizontal coordinate.",
          "The horizontal and vertical components must become perfectly identical to each other, permanently generating the parallel mathematical constraint x - y = 0.",
          "The equation mathematically locks the x variable at positive one and exclusively forces the y variable to adjust downward to compensate for the sudden geometric shift."
        ],
        "correct_option": "The variables must satisfy the equation x + y = 0, physically forcing the vertical coordinate to always act as the exact negative opposite of the horizontal coordinate.",
        "explanation": "This tests a major conceptual trap! Option A is the formula for the slopes of perpendicular lines (m₁ × m₂ = -1), which students often mistakenly apply to the coordinates of vectors. To find perpendicular vectors, we take the dot product: 1(x) + 1(y) = 0. This gives us the equation x + y = 0, which mathematically rearranges to y = -x."
      },
      {
        "question": "Let us elevate this geometry into the realm of matrix transformations. If you convert the original vector into a 1 × 2 matrix M = [1 1], what does the newly drawn infinite line of perpendicular vectors actually represent?",
        "options": [
          "It strictly defines the Column Space of the machine, explicitly mapping out every single theoretical destination that the matrix is physically capable of reaching in the real world.",
          "It highlights the foundational Eigenvector of the mathematical system, offering a powerful visual proof that these specific coordinates are entirely immune to being stretched, skewed, or rotated by the matrix.",
          "It geometrically represents the Null Space, meaning any coordinate on this specific perpendicular line will be completely crushed directly into the number zero by the mathematical engine.",
          "It establishes the exact algebraic boundary where the internal matrix determinant physically shifts from a positive spatial orientation into a negative geometric reflection."
        ],
        "correct_option": "It geometrically represents the Null Space, meaning any coordinate on this specific perpendicular line will be completely crushed directly into the number zero by the mathematical engine.",
        "explanation": "This is a masterful connection between geometry and algebra! If you set up the transformation Mx = 0, you get 1x + 1y = 0. The geometric line of perpendicular vectors you just visualized is the exact same thing as the Null Space. Orthogonal vectors and Null Spaces are deeply, permanently intertwined; the vectors in the Null Space are always perfectly perpendicular to the vectors that make up the matrix's rows!"
      },
      {
        "question": "When the matrix M = [1 1] processes any of these perpendicular vectors and strictly outputs the value 0, what is physically happening to the fabric of the mathematical space?",
        "options": [
          "The system brutally squashes a full two-dimensional input downward into a single one-dimensional number, permanently destroying the coordinate's historical data.",
          "The matrix strictly preserves the structural integrity of the input vector, acting as a temporary holding mechanism that safely stores the geometric data at the origin until the inverse matrix can properly retrieve it.",
          "The operation mathematically filters the input to completely remove the horizontal axis, allowing only the vertical axis to freely pass through to the final destination.",
          "The geometric engine isolates the original coordinate and actively elevates it into a secondary, significantly more stable three-dimensional spatial volume."
        ],
        "correct_option": "The system brutally squashes a full two-dimensional input downward into a single one-dimensional number, permanently destroying the coordinate's historical data.",
        "explanation": "The matrix is 1 × 2. It requires a 2D input vector (an x and a y), meaning its Domain is ℝ². However, because it only has one row, it spits out a single scalar number (like 0), meaning its Codomain is ℝ¹. The machine is physically flattening a massive 2D geometric grid down onto a single 1D number line. Reversing the machine is impossible because millions of different inputs all crash into the exact same zero destination."
      }
    ]
  },
  {
    "id": 25,
    "module": 3,
    "questionNumber": 2,
    "questionCode": "M3Q2",
    "quizNumber": 25,
    "title": "The Architecture of the Dot Product",
    "emoji": "⚙️",
    "original_question": "Do you observe that we are asking for vectors [[x], [y]] such that, [[1, 1]] [[x], [y]] = 0",
    "goal": "Recognize matrix row multiplication as a dot product defining the geometric Null Space.",
    "core_concept": "A 1×2 matrix equation [1 1][x, y]^T = 0 literally defines the Null Space as the orthogonal complement of the row.",
    "story": "Writing perpendicularity as a matrix equation [1 1]v = 0 reveals the mechanical bridge between algebra and geometry.",
    "ggbType": "graphing",
    "ggbHint": "Type: [1, 1] * (x, y) = 0",
    "ggbSteps": [
      "Type: [1, 1] * (x, y) = 0",
      "Observe that this yields the line y = -x.",
      "Notice the matrix crushes this entire line to the scalar 0."
    ],
    "quiz": [
      {
        "question": "When you translate the algebraic equation 1(x) + 1(y) = 0 into the formal matrix notation [1 1][x, y]ᵀ = 0, what fundamental algebraic reality is the notation explicitly revealing?",
        "options": [
          "It leverages the cross product to calculate the exact spatial area trapped between the horizontal row and the vertical column.",
          "The matrix multiplication is literally just calculating the dot product between the matrix's single row and the input spatial vector.",
          "It algebraically adds the dimensional lengths of both vectors together to confirm they perfectly balance at a net value of zero.",
          "The notation dictates dividing the vertical component by the horizontal row to determine the exact geometric slope of the transformation."
        ],
        "correct_option": "The matrix multiplication is literally just calculating the dot product between the matrix's single row and the input spatial vector.",
        "explanation": "Matrix multiplication is literally just a highly organized, systemic way of calculating dot products! To multiply a matrix by a vector, you take the first row of the matrix, lay it over the vertical column vector, multiply the corresponding pieces, and add them up. A 1 × 2 matrix multiplied by a 2 × 1 vector is the purest algebraic definition of the dot product."
      },
      {
        "question": "By deliberately setting this specific matrix equation equal to exactly zero (Mx = 0), what profound geometric concept are you formally defining?",
        "options": [
          "It defines the continuous planar surface of the Column Space, showing every possible destination the machine can physically reach.",
          "It highlights the core Eigen Space, capturing the specific vectors that safely pass through the matrix without changing direction or length.",
          "This exact mathematical notation formally defines the geometric Null Space, identifying the complete set of input coordinates that the matrix permanently crushes into nothingness.",
          "It actively maps out the fundamental Row Space, tracking how the foundational vectors are stretched across the grid during the transformation."
        ],
        "correct_option": "This exact mathematical notation formally defines the geometric Null Space, identifying the complete set of input coordinates that the matrix permanently crushes into nothingness.",
        "explanation": "The Null Space of any matrix M is strictly defined as the set of all input vectors x that get mapped directly to the zero vector (0) upon transformation. It is the mathematical 'black hole' of the system, where all the geometric information contained within those specific input vectors is permanently destroyed."
      },
      {
        "question": "Based on the mechanical connection established between the dot product and this matrix notation, what is the permanent, universal geometric relationship between a matrix's rows and its Null Space?",
        "options": [
          "The Null Space always exists completely perpendicular to the Row Space.",
          "The solution space naturally aligns to run perfectly parallel alongside the foundational row vectors, expanding them infinitely.",
          "Because the output is constrained to zero, the resulting spatial line must mathematically curve to stay completely tangent to the matrix rows.",
          "The mathematical zero-condition proves that the Null Space and the Row Space physically occupy the exact same geometric dimensions."
        ],
        "correct_option": "The Null Space always exists completely perpendicular to the Row Space.",
        "explanation": "This is a monumental, unbreakable rule in Linear Algebra! Because the Null Space is calculated by setting the dot product of the matrix rows and the input vector to zero (Row · x = 0), the geometric consequence is absolute. The vectors living in the Null Space are always, universally, 100% orthogonal (perpendicular) to the vectors that make up the Row Space."
      },
      {
        "question": "Let us look at the dimensional mapping power of this specific 1 × 2 matrix engine. What exactly is this transformation physically doing to the spatial grid?",
        "options": [
          "It accepts a 2D coordinate and reflects it across the origin, safely preserving all historical geometric data within a new 2D quadrant.",
          "The machine absorbs a single 1D scalar value and forcibly inflates it outward to construct a complete, infinite 2D geometric surface.",
          "The system fundamentally consumes an infinite two-dimensional grid and physically flattens the entire universe down onto a single 1D number line.",
          "It requires the immediate introduction of a third spatial axis (z) to securely store the variables while the calculation is forced to equal zero."
        ],
        "correct_option": "The system fundamentally consumes an infinite two-dimensional grid and physically flattens the entire universe down onto a single 1D number line.",
        "explanation": "The matrix [1 1] is 1 × 2. It requires a 2D input vector (an x and a y), meaning its Domain is ℝ². However, because it only has one row, it spits out a single scalar number (like 0), meaning its Codomain is ℝ¹. The machine is literally a dimensional trash compactor, crushing flat 2D space into a 1D line."
      },
      {
        "question": "Connect this massive dimensional collapse back to the 'One-Way Street' concept from Module 1. What happens when we try to find the inverse of this specific matrix to reverse-engineer a starting coordinate?",
        "options": [
          "The machine is effortlessly reversible because the zero output acts as a perfect universal anchor point for the inverse matrix to grab onto.",
          "Reversing the engine simply requires shifting the final answer geometrically by the constant value of the original row elements.",
          "It is fully reversible as long as you swap the elements of the row vector and multiply the entire resulting structure by negative one.",
          "Because an entire infinite line of distinct starting coordinates all get smashed into the exact same zero destination, the history of the data is destroyed, making the transformation completely impossible to reverse."
        ],
        "correct_option": "Because an entire infinite line of distinct starting coordinates all get smashed into the exact same zero destination, the history of the data is destroyed, making the transformation completely impossible to reverse.",
        "explanation": "Just like the broken matrix from the climax of Module 1, this 1 × 2 matrix is fundamentally non-invertible (singular). If a friend tells you the machine's output was 0, you have absolutely no idea if their starting input was (-2, 2), (5, -5), or (-100, 100). Because an entire infinite line of perpendicular vectors all crash into the exact same destination, reversing the machine to find the 'true' starting point is physically impossible."
      }
    ]
  },
  {
    "id": 26,
    "module": 3,
    "questionNumber": 3,
    "questionCode": "M3Q3",
    "quizNumber": 26,
    "title": "Parameterization and Dynamic Orthogonality",
    "emoji": "🎛️",
    "original_question": "Use Geogebra and solve the above question with [[1], [1]] replaced by [[a], [b]]. Use (a,b) as parameters and check what happens to (x,y).",
    "goal": "Use sliders for (a,b) to observe how the orthogonal null line rotates synchronously at 90 degrees.",
    "core_concept": "For any non-zero row vector [a, b], its null space is the line ax + by = 0, always perpendicular with slope -a/b.",
    "story": "Rotate the primary vector [a, b] like the hand of a clock and watch the solution line spin bolted at a rigid 90-degree angle.",
    "ggbType": "graphing",
    "ggbHint": "Create sliders a = 1 and b = 1.",
    "ggbSteps": [
      "Create sliders a = 1 and b = 1.",
      "Type: u = Vector((a, b))",
      "Type: a*x + b*y = 0",
      "Drag sliders and observe the persistent 90° angle!"
    ],
    "quiz": [
      {
        "question": "When you replace the static numbers with parameters to calculate the dot product [a b][x, y]ᵀ = 0, what exact algebraic constraint is generated by the engine?",
        "options": [
          "The dot product physically isolates the variables from each other, resulting in the parallel geometric equations a = x and b = y.",
          "The mathematical operation seamlessly scales with the new inputs, creating the generalized linear constraint ax + by = 0.",
          "It generates the complex ratio ax/by = 0, forcing the spatial coordinates into a strictly asymptotic curved trajectory.",
          "The parameters inherently act as geometric exponents, mapping the two-dimensional solution space tightly against a parabolic boundary limit."
        ],
        "correct_option": "The mathematical operation seamlessly scales with the new inputs, creating the generalized linear constraint ax + by = 0.",
        "explanation": "The mechanical rule of the dot product remains exactly the same regardless of whether you use constants or unknown parameters. You simply multiply the corresponding horizontal elements (a and x) and add them to the corresponding vertical elements (b and y). Setting this strictly equal to zero constructs the generalized, foundational equation ax + by = 0."
      },
      {
        "question": "Imagine opening Geogebra and dragging the parameterized row vector (a, b) around the grid in circles. What specifically happens to the infinite line of solutions (x, y) as you move the vector?",
        "options": [
          "The infinite solution line physically detaches from the central origin of the grid and translates perfectly sideways, maintaining a completely parallel trajectory right alongside the changing primary vector.",
          "The solution space violently curves backward upon itself to avoid crossing the primary vector, forming a continuously expanding protective geometric circle.",
          "As the primary vector spins around the grid like the hand of a clock, the solution line mechanically rotates with it, permanently locked at a strict 90-degree angle.",
          "The infinite line rigidly locks in its original spatial position, forcing the underlying Cartesian grid to stretch and distort around it to compensate for the changing parameters."
        ],
        "correct_option": "As the primary vector spins around the grid like the hand of a clock, the solution line mechanically rotates with it, permanently locked at a strict 90-degree angle.",
        "explanation": "Because the geometric rule of the equation is ax + by = 0 (the dot product is zero), the mathematical system strictly demands absolute perpendicularity. The vector (a, b) acts like a metal shaft, and the Null Space line (x, y) acts like a propeller blade securely bolted to it. As you spin the shaft, the propeller is mechanically forced to spin in perfect tandem, always maintaining that 90-degree offset."
      },
      {
        "question": "No matter how wildly you change the values of a and b, the Null Space line never physically leaves the central (0, 0) origin coordinate. Why is this geometric anchor permanent?",
        "options": [
          "The geometric constraints of the 2D Cartesian plane fundamentally demand that all unbounded algebraic lines must eventually intersect the absolute center coordinate to maintain spatial symmetry across the four distinct mathematical quadrants.",
          "Because the mathematical transformation strictly equals zero, plugging in the input coordinate (0, 0) will always perfectly balance the equation a(0) + b(0) = 0, regardless of your parameter choices.",
          "The continuous shifting of the row parameters physically cancels out all underlying constant values, pushing the mathematical line to hover precisely at y = 1 before dropping back to the center.",
          "The generalized parameters physically lack the numerical mass required to actively pull the rigid geometric line away from the central intersection of the axes."
        ],
        "correct_option": "Because the mathematical transformation strictly equals zero, plugging in the input coordinate (0, 0) will always perfectly balance the equation a(0) + b(0) = 0, regardless of your parameter choices.",
        "explanation": "The Null Space equation Mx = 0 represents a linear transformation without any external +C constant shifts. If you plug in the zero vector [0, 0]ᵀ, the resulting math (0 + 0 = 0) is an unbreakable universal truth. Therefore, the Null Space line is permanently pinned to the origin, acting as the pivot point for its rotation."
      },
      {
        "question": "How can we algebraically prove that the Null Space line is always perpendicular to the parameterized row vector (a, b)?",
        "options": [
          "By manually isolating the vertical y variable on one side of the equation, the resulting slope of the Null Space evaluates strictly to a divided by b, geometrically proving it travels parallel to the original vector.",
          "The variables mathematically simplify directly to y = -x, demonstrating that the parameters physically cancel each other out over time.",
          "Solving for y reveals a geometric slope of precisely -a/b, which is the exact negative reciprocal of the row vector's natural slope, mathematically guaranteeing an orthogonal relationship.",
          "The mathematical slope continuously fluctuates between positive and negative infinity, proving that spatial measurements are entirely irrelevant to parameterized vector spaces."
        ],
        "correct_option": "Solving for y reveals a geometric slope of precisely -a/b, which is the exact negative reciprocal of the row vector's natural slope, mathematically guaranteeing an orthogonal relationship.",
        "explanation": "Starting with ax + by = 0, you subtract ax to get by = -ax. Then, dividing by b gives you y = -(a/b)x. The primary row vector [a, b]ᵀ inherently has a geometric slope of b/a (rise over run). The perpendicular Null Space line has a slope of -a/b. In standard coordinate geometry, two lines whose slopes are 'negative reciprocals' are always 100% perfectly perpendicular."
      },
      {
        "question": "By proving this condition holds true for absolutely any random combination of parameters (a, b), what profound universal law of linear algebra have you just discovered?",
        "options": [
          "It rigorously proves that a matrix's Null Space is always permanently, physically orthogonal to its Row Space.",
          "The spatial coordinates satisfying this specific zero condition definitively establish that the foundational mathematical Row Space operates on a perfectly parallel geometric plane right alongside the foundational Null Space.",
          "It confirms that any continuous physical alteration to the parameters of a matrix will permanently destroy the pre-existing geometric Null Space boundaries.",
          "The experiment dictates that the Column Space possesses enough mathematical gravity to strictly control the directional rotation of all underlying parameterized variables."
        ],
        "correct_option": "It rigorously proves that a matrix's Null Space is always permanently, physically orthogonal to its Row Space.",
        "explanation": "The vector [a b] acts as the single row of our mathematical matrix. By proving that the solution line (x, y) always spins to remain perfectly 90-degrees offset from it regardless of what numbers you choose, you have rigorously proven one of the most important rules in all of linear algebra: The Null Space (the geometric solution space) and the Row Space (the physical vectors making up the matrix) are universal geometric opposites. They are always perfectly orthogonal."
      }
    ]
  },
  {
    "id": 27,
    "module": 3,
    "questionNumber": 4,
    "questionCode": "M3Q4",
    "quizNumber": 27,
    "title": "Scaling Orthogonality into Three Dimensions",
    "emoji": "📦",
    "original_question": "What is (x,y,z) satisfying the following equation? (Use Geogebra)\n[[1, 2, 3]] [[x], [y], [z]] = 0",
    "goal": "Elevate orthogonality into ℝ³: a single row constraint creates a 2D plane perpendicular to [1, 2, 3]^T.",
    "core_concept": "In ℝ³, 1 linear constraint removes 1 degree of freedom (3 - 1 = 2), creating a 2D plane of solutions passing through (0,0,0).",
    "story": "The vector [1, 2, 3] acts as a flagpole (normal vector) sticking straight out of a flat 2D ground plane.",
    "ggbType": "3d",
    "ggbHint": "Switch to 3D Graphics view.",
    "ggbSteps": [
      "Switch to 3D Graphics view.",
      "Type: u = Vector((1, 2, 3))",
      "Type: 1*x + 2*y + 3*z = 0",
      "Observe the plane is perpendicular to vector u!"
    ],
    "quiz": [
      {
        "question": "When you physically perform the matrix multiplication [1 2 3][x, y, z]ᵀ = 0, what exact algebraic constraint is generated by the engine?",
        "options": [
          "It strictly separates the variables into three distinct 1D equations, locking each dimension to zero independently.",
          "The matrix elements scale each variable independently, forcing them into a strict sequential order like x = 1, y = 2, z = 3 to safely reach the origin.",
          "The mathematical operation isolates the spatial vectors into a fraction, ultimately defining a constant proportional ratio between the depth and the height of the Cartesian grid.",
          "The dot product seamlessly blends the three spatial variables together to construct the continuous linear constraint x + 2y + 3z = 0."
        ],
        "correct_option": "The dot product seamlessly blends the three spatial variables together to construct the continuous linear constraint x + 2y + 3z = 0.",
        "explanation": "The dot product mechanism effortlessly scales up into ℝ³. You simply multiply the corresponding horizontal elements from the row against the vertical elements from the column vector, and add them all together: 1(x) + 2(y) + 3(z). Setting this output strictly equal to zero generates the singular constraint x + 2y + 3z = 0."
      },
      {
        "question": "If you open Geogebra and plot every single (x, y, z) coordinate that perfectly satisfies this equation, what specific geometric shape will you see floating on the screen?",
        "options": [
          "The valid coordinates sweep out a completely flat, infinite 2D sheet of paper (a plane) slicing cleanly through the absolute center of the 3D space.",
          "The variables align perfectly to create a single, infinitely long 1D line shooting diagonally outward from the central origin.",
          "The continuous interaction of the three spatial dimensions forces the coordinates to strictly curve outward, generating a hollow, three-dimensional parabolic sphere.",
          "The strict zero-constraint completely locks all variables in place, reducing the entire geometric reality to a single, unmoving dot."
        ],
        "correct_option": "The valid coordinates sweep out a completely flat, infinite 2D sheet of paper (a plane) slicing cleanly through the absolute center of the 3D space.",
        "explanation": "In a 2D space (ℝ²), the equation ax + by = 0 creates a 1D line. In a 3D space (ℝ³), the equation ax + by + cz = 0 creates a flat 2D plane floating inside the 3D volume. Because there is no constant numerical offset (it equals strictly 0), this geometric plane is permanently anchored directly to the (0, 0, 0) origin."
      },
      {
        "question": "Geometrically speaking, how does this resulting shape physically interact with the original Row Space vector [1 2 3]?",
        "options": [
          "The generated shape perfectly wraps around the original row vector, actively using it as a central rotational pivot axis for the entire spatial system.",
          "Every point existing within the solution space extends perfectly parallel to the original matrix row, stretching it further into infinity along a singular mathematical dimension.",
          "The spatial coordinates continually bounce off the original row vector, creating a mirrored mathematical reflection across the primary boundary.",
          "The geometric plane acts like a flat floor that sits at a perfect 90-degree angle (perpendicular) to the original row vector pointing out into space."
        ],
        "correct_option": "The geometric plane acts like a flat floor that sits at a perfect 90-degree angle (perpendicular) to the original row vector pointing out into space.",
        "explanation": "The universal law of the dot product holds true! The single row vector [1 2 3] acts as a 'Normal Vector'—a single flagpole pointing out into 3D space. The flat 2D plane you constructed (the Null Space) acts like the ground. Any vector you draw resting upon that flat ground will dot to zero against the flagpole."
      },
      {
        "question": "The matrix machine accepts a massive three-dimensional coordinate (x, y, z) as its fuel, but it outputs exactly one single number (0). What does this reveal about its physical mapping power?",
        "options": [
          "The algebraic rules cleanly slice the input coordinate exactly in half.",
          "The matrix mathematically takes an infinite 3D volumetric space and squashes it completely flat onto a singular 1D number line.",
          "The system meticulously preserves the internal structure of the 3-dimensional input vectors, establishing a highly stable 3-dimensional output space that safely bypasses the restrictive zero-constraint imposed by the algebraic engine.",
          "It actively calculates the absolute geographic distance between the three spatial dimensions."
        ],
        "correct_option": "The matrix mathematically takes an infinite 3D volumetric space and squashes it completely flat onto a singular 1D number line.",
        "explanation": "The matrix is 1 × 3. It demands an ℝ³ input vector, but because it only possesses a single row, it spits out a single ℝ¹ scalar number. This is a massive dimensional collapse. The matrix acts like a trash compactor, taking the entirety of 3D physical volume and squashing it flat onto a 1D scale."
      },
      {
        "question": "Because the Null Space of this specific matrix is a flat 2D plane floating in a 3D room, what does this mathematically tell us about the 'Degrees of Freedom' inside the equation?",
        "options": [
          "Because the target destination is strictly hardcoded to the number zero, the algebraic engine demands that you manually lock down all three spatial variables simultaneously to prevent the resulting geometric plane from shifting off of the central origin.",
          "By randomly selecting numbers for exactly two of the variables, the underlying mathematical rule automatically forces the final third variable into its required place.",
          "Because there are three spatial dimensions, the mathematical system inherently requires exactly one independent variable to strictly control the final output location.",
          "The rigid constraints of the system dictate that you can only navigate the space by systematically shifting the x-axis before touching the other variables."
        ],
        "correct_option": "By randomly selecting numbers for exactly two of the variables, the underlying mathematical rule automatically forces the final third variable into its required place.",
        "explanation": "The rule x + 2y + 3z = 0 is a single constraint. It locks away exactly one 'degree of freedom.' If you start with 3 dimensions of physical movement (x, y, z) and apply 1 mathematical rule, you have 3 - 1 = 2 dimensions of absolute freedom remaining. Mathematically, you can choose any completely random numbers you want for y and z (your two parameters), and the equation will strictly force x to adapt to make the rule true."
      }
    ]
  },
  {
    "id": 28,
    "module": 3,
    "questionNumber": 5,
    "questionCode": "M3Q5",
    "quizNumber": 28,
    "title": "Parametric Lines and the Anatomy of Scaling",
    "emoji": "📏",
    "original_question": "Use Geogebra and plot all the points in the set below.\nT = { alpha(1,2,1) | alpha in ℝ }",
    "goal": "Visualize how varying a single parameter alpha sweeps out a 1-dimensional line in 3D space.",
    "core_concept": "A single vector scaled by a parameter forms a 1-dimensional subspace (line through origin) with 1 degree of freedom.",
    "story": "The scalar alpha acts as a gas pedal, driving forward and backward along the direction vector (1, 2, 1).",
    "ggbType": "3d",
    "ggbHint": "In 3D view, create slider alpha.",
    "ggbSteps": [
      "In 3D view, create slider alpha.",
      "Type: P = alpha * (1, 2, 1)",
      "Enable trace or draw Line((0,0,0), (1,2,1)).",
      "Observe the 1D trajectory through the origin."
    ],
    "quiz": [
      {
        "question": "When you look at the set definition T = {α(1, 2, 1) | α ∈ ℝ}, what is the mathematical role of the symbol α as it ranges across all real numbers?",
        "options": [
          "It acts as a static anchor point, permanently locking the vector's terminal coordinate to a fixed position on the coordinate grid.",
          "It serves as a dynamic scalar multiplier, physically stretching, shrinking, or reversing the direction of the base vector.",
          "It transforms the linear system into a quadratic matrix, altering the internal determinant to prevent spatial distortion.",
          "It acts as an absolute boundary limit, restricting the vector from exceeding a magnitude of one."
        ],
        "correct_option": "It serves as a dynamic scalar multiplier, physically stretching, shrinking, or reversing the direction of the base vector.",
        "explanation": "The scalar α (alpha) is the engine of parameterization. As α takes on values like 0, 1, -3, or 10.5, it scales the base vector [1, 2, 1]ᵀ. If α = 0, you land at the origin. If α = 2, you double its length to (2, 4, 2). It is a continuous slider that dictates how far you travel along the path."
      },
      {
        "question": "If you open Geogebra and plot every single point generated by allowing α to sweep through all real numbers, what specific geometric shape will materialize in the 3D room?",
        "options": [
          "A flat, infinite two-dimensional plane slicing cleanly through the center of the coordinate space.",
          "A closed, hollow spherical shell centered directly on the positive octant.",
          "An infinitely long, straight one-dimensional line passing directly through the central origin.",
          "A continuous, three-dimensional helical spiral winding upward along the z-axis."
        ],
        "correct_option": "An infinitely long, straight one-dimensional line passing directly through the central origin.",
        "explanation": "You are starting at the origin and moving strictly along a single direction vector in 3D space (direction = [1, 2, 1]). Because you can walk forward infinitely or backward infinitely along that exact same directional track, the collection of all scaled points forms a single, unbroken 1D straight line cutting straight through (0, 0, 0)."
      },
      {
        "question": "What specific geometric feature of this plotted line is permanently guaranteed by the absence of any constant offset vector (such as adding +(3, 4, 5))?",
        "options": [
          "The line is strictly anchored to pass directly through the absolute central origin coordinate (0, 0, 0).",
          "The line is forced to run completely parallel alongside the standard z-axis, maintaining a fixed horizontal distance.",
          "The line is constrained to bounce symmetrically between the positive and negative Cartesian quadrants.",
          "The line must maintain a continuous, unyielding 90-degree angle against every vector in the Row Space."
        ],
        "correct_option": "The line is strictly anchored to pass directly through the absolute central origin coordinate (0, 0, 0).",
        "explanation": "Notice the set definition: T = {α(1, 2, 1)}. There is no extra vector added to the end. If you set α = 0, the math evaluates to 0(1, 2, 1) = (0, 0, 0). Because zero is always a valid choice for a real number α, the resulting line is permanently pinned to the origin. Adding an offset would shift the line off-center, but a pure scalar multiple always passes through zero."
      },
      {
        "question": "How does this parametric line T fundamentally relate to the Null Space of the 1 × 3 matrix we explored in the previous question (x + 2y + 3z = 0)?",
        "options": [
          "The line T acts as the normal flagpole vector that sits at a 90-degree angle to the Null Space plane.",
          "The line T is mathematically identical to the Null Space plane, sharing the exact same dimensional footprint.",
          "The line T represents the trajectory of the input vector as it is permanently crushed down into the number zero.",
          "The direction vector (1, 2, 1) defining this line is actually the exact normal vector (the Row Space vector) that is perpendicular to the Null Space plane."
        ],
        "correct_option": "The direction vector (1, 2, 1) defining this line is actually the exact normal vector (the Row Space vector) that is perpendicular to the Null Space plane.",
        "explanation": "This is a breathtaking connection! The vector (1, 2, 1) represents the coefficients of the plane equation 1x + 2y + 1z = 0. That vector is the 'flagpole' (the Row Space vector) pointing straight out of the 2D Null Space floor. The set T describes the infinite line shooting outward along that flagpole, piercing straight through the center of the orthogonal plane."
      },
      {
        "question": "If you were to feed every single point belonging to this set T into the matrix machine M = [1 2 1], what would be the resulting output for every single calculation?",
        "options": [
          "A continuously expanding set of 3D spatial coordinates that scale upward in direct proportion to the magnitude of α.",
          "A single scalar number that continuously changes depending on whether α is positive, negative, or zero.",
          "An infinite series of negative reciprocals that mirror the original vector across the primary Cartesian axes.",
          "The exact scalar number zero, every single time without exception."
        ],
        "correct_option": "A single scalar number that continuously changes depending on whether α is positive, negative, or zero.",
        "explanation": "This brings the entire module together! The set T is built from multiples of the vector (1, 2, 1). If you take any point on that line—say, α = 5, giving you the vector (5, 10, 5)—and multiply it by the matrix [1 2 1], you are calculating the dot product: 1(5) + 2(10) + 1(5) = 5 + 20 + 5 = 30. The set T represents the Row Space direction, meaning it doesn't dot to zero against itself—it outputs its own squared length scaled by α!"
      }
    ]
  },
  {
    "id": 29,
    "module": 3,
    "questionNumber": 6,
    "questionCode": "M3Q6",
    "quizNumber": 29,
    "title": "Expanding the Spatial Web",
    "emoji": "🌐",
    "original_question": "Use Geogebra and plot all the points in the set below.\nS = { beta(2,7,3) | beta in ℝ }",
    "goal": "Plot a second independent 1D parametric line in ℝ³ and observe its interaction with line T.",
    "core_concept": "Two independent direction vectors through the origin form distinct lines that intersect uniquely at (0, 0, 0).",
    "story": "Fire a second laser beam along vector (2, 7, 3). Both beams pierce the 3D room, meeting only at the absolute center.",
    "ggbType": "3d",
    "ggbHint": "In 3D view, type: Line((0,0,0), (2,7,3))",
    "ggbSteps": [
      "In 3D view, type: Line((0,0,0), (2,7,3))",
      "Compare with Line((0,0,0), (1,2,1)) from the previous question.",
      "Confirm both lines intersect exclusively at (0,0,0)."
    ],
    "quiz": [
      {
        "question": "When you allow the parameter β to sweep across all real numbers (ℝ), how does the resulting geometric shape of set S compare to the shape of set T from the previous question?",
        "options": [
          "Because the numerical coordinates (2, 7, 3) are physically larger than (1, 2, 1), set S generates a mathematically thicker, more robust cylindrical path through the space.",
          "It sweeps out the exact same type of infinite, one-dimensional straight line, just pointing in a completely different spatial direction.",
          "The continuous variation of β mathematically forces the base vector to curve outward, establishing a stable two-dimensional planar boundary.",
          "Because all the coordinate numbers are positive, the resulting geometric trajectory is permanently trapped inside the first octant of the 3D grid, unable to cross the axes."
        ],
        "correct_option": "It sweeps out the exact same type of infinite, one-dimensional straight line, just pointing in a completely different spatial direction.",
        "explanation": "A scalar multiplier (β) applied to a single direction vector always builds a straight 1D line, regardless of what the specific numbers inside the vector are. The vector [2, 7, 3]ᵀ simply dictates the tilt and yaw of the line in the 3D room, but the fundamental geometric nature of the object remains exactly identical to set T."
      },
      {
        "question": "What physical mechanism occurs within the 3D space when the parameter β slides into the negative numbers (e.g., β = -2)?",
        "options": [
          "The negative scalar algebraically subtracts the base vector from itself, slowly shifting the entire mathematical line downward along the vertical z-axis.",
          "The mathematical engine violently throws the trajectory into reverse, tracing out the exact opposite half of the line shooting backward through the origin.",
          "The spatial coordinates mathematically collapse into the complex plane, rendering the negative geometry completely invisible on a standard Cartesian grid.",
          "The magnitude of the vector shrinks proportionally, but the geometric direction remains permanently locked in the positive quadrant to preserve the matrix's structural integrity."
        ],
        "correct_option": "The mathematical engine violently throws the trajectory into reverse, tracing out the exact opposite half of the line shooting backward through the origin.",
        "explanation": "Vectors possess both length and direction. When you multiply a vector by a negative scalar, you don't just change its size; you flip its direction 180 degrees. If positive β values build the line shooting forward out of the origin, negative β values build the exact same line shooting backward into the negative depths of the 3D room."
      },
      {
        "question": "Set T was the line α(1, 2, 1) and Set S is the line β(2, 7, 3). If you plot both of these infinite lines in the exact same 3D room, how do they physically interact?",
        "options": [
          "Because they possess completely different directional slopes, they are 'skew lines' that will fundamentally miss each other in the vast 3D space and never cross.",
          "They intersect infinitely many times, mathematically weaving around each other to form a stable geometric cylinder.",
          "They collide at exactly one location in the entire universe: the central origin (0, 0, 0).",
          "The intersection calculates the exact cross product of the two vectors, spontaneously spawning a third perpendicular line perfectly orthogonal to both."
        ],
        "correct_option": "They collide at exactly one location in the entire universe: the central origin (0, 0, 0).",
        "explanation": "In a 3D room, it is very easy for two random lines to completely miss each other (skew lines). However, look at their algebraic definitions: neither set has a constant offset added to it. This means if you set α = 0 and β = 0, both equations output the exact same coordinate: (0, 0, 0). They are two totally different laser beams that perfectly cross at the exact center of the universe."
      },
      {
        "question": "Imagine you are allowed to walk along the line T for a while, stop, and then immediately start walking parallel to the line S. What geometric shape can you build by combining these two movements?",
        "options": [
          "The combination of these two independent 1D paths allows you to physically sweep out a flat, infinite 2D plane suspended in the 3D room.",
          "Walking along two distinct vectors in sequence physically curves your trajectory, naturally generating a three-dimensional parabolic dome.",
          "The mathematical system restricts your overall movement to the outer boundaries, forming a rigid, filled-in geometric triangle strictly anchored at the origin.",
          "The combination of two direction vectors forces the system to calculate the absolute spatial average, resulting in a single, newly centered 1D line."
        ],
        "correct_option": "The combination of these two independent 1D paths allows you to physically sweep out a flat, infinite 2D plane suspended in the 3D room.",
        "explanation": "This is the birth of the Span (or Linear Combinations). If you only have one vector (one direction to walk), you are trapped on a 1D line. But if you have two independent vectors, you can walk forward/backward along the first, and then left/right along the second. That newfound freedom allows you to map out an entire flat 2D sheet of paper (a plane) inside the 3D room!"
      },
      {
        "question": "Why is Set S mathematically defined as a strictly '1-dimensional' geometric object, even though its coordinates (2, 7, 3) clearly live inside a 3-dimensional universe?",
        "options": [
          "The set is classified as 1-dimensional exclusively because its algebraic formula lacks any exponential variables like squares, cubes, or square roots.",
          "The physical space naturally compresses any vector containing three distinct positive coordinates into a singular flat trajectory to prevent coordinate overlap.",
          "It is algebraically impossible for any singular vector to possess more than one dimension unless it is actively multiplied by a highly structured 3 × 3 matrix engine.",
          "Because you only possess one single slider (β) to control your movement, you strictly possess only one mathematical degree of freedom."
        ],
        "correct_option": "Because you only possess one single slider (β) to control your movement, you strictly possess only one mathematical degree of freedom.",
        "explanation": "Dimensionality is not about the room you live in; it is about your freedom to move. Even though the vector lives in a 3D room (ℝ³), you are trapped on a track. The parameter β is your only steering wheel. Because you only have one parameter to change, you only have 1 Degree of Freedom, making the object you live on strictly 1-dimensional."
      }
    ]
  },
  {
    "id": 30,
    "module": 3,
    "questionNumber": 7,
    "questionCode": "M3Q7",
    "quizNumber": 30,
    "title": "Linear Combinations and the Architecture of the Span",
    "emoji": "📜",
    "original_question": "Use Geogebra and plot all the points in the set below.\nW = { alpha(1,2,1) + beta(2,7,3) | alpha, beta in ℝ }",
    "goal": "Construct the 2D plane spanned by two independent 3D vectors via linear combinations.",
    "core_concept": "Combining two independent vectors with two parameters (alpha, beta) sweeps out a 2D plane (Span) in ℝ³.",
    "story": "Walk alpha steps along the first vector, then beta steps parallel to the second. Together, they sweep out a flat 2D sheet.",
    "ggbType": "3d",
    "ggbHint": "Type: u = Vector((1, 2, 1))",
    "ggbSteps": [
      "Type: u = Vector((1, 2, 1))",
      "Type: v = Vector((2, 7, 3))",
      "Type: Plane((0,0,0), u, v)",
      "Observe the flat 2D plane suspended inside the 3D room."
    ],
    "quiz": [
      {
        "question": "Set W asks you to add the scaled movement of the first vector (α) to the scaled movement of the second vector (β). If you plot absolutely every possible combination in Geogebra, what distinct geometric shape fills the 3D room?",
        "options": [
          "The mathematical addition of two distinct 3-dimensional vectors actively inflates the spatial trajectory, resulting in a fully realized, solid 3D geometric sphere.",
          "It sweeps out a perfectly flat, infinitely expanding two-dimensional plane that slices cleanly through the absolute center of the universe.",
          "It strictly forms two intersecting 1-dimensional lines that create a giant X-shape at the origin, but completely fails to fill in the empty space between them.",
          "The linear parameters force the vectors to mathematically bend around the origin, naturally generating a hollow parabolic boundary."
        ],
        "correct_option": "It sweeps out a perfectly flat, infinitely expanding two-dimensional plane that slices cleanly through the absolute center of the universe.",
        "explanation": "Think of this as walking instructions. The parameter α tells you how many steps to walk forward or backward along the first line. From that exact spot, β tells you how many steps to walk left or right parallel to the second line. By combining these two independent directions, you map out an entire flat sheet of paper (a 2D plane) suspended in the 3D room."
      },
      {
        "question": "Why is this resulting shape strictly classified as a '2-dimensional' surface, even though the coordinate vectors (1, 2, 1) and (2, 7, 3) clearly possess three distinct numbers?",
        "options": [
          "The geometric dot product of the two foundation vectors equals exactly zero, structurally limiting their combined mapping output to a lower mathematical dimension.",
          "The original vectors fundamentally cancel each other out across the vertical z-axis, completely flattening the physical reality of the math.",
          "You strictly possess exactly two independent control sliders (α and β) to navigate the space.",
          "The standard Cartesian grid cannot physically support the direct addition of two vectors without permanently collapsing the depth dimension to prevent an algebraic overflow."
        ],
        "correct_option": "You strictly possess exactly two independent control sliders (α and β) to navigate the space.",
        "explanation": "Dimensionality is about freedom, not the room you happen to be standing in. Because you only have two parameters (α and β) to control your movement, you only have two Degrees of Freedom. You can walk 'North/South' and 'East/West' on this slanted plane, but you mathematically possess no steering wheel that allows you to jump 'Up' off the surface."
      },
      {
        "question": "Because α and β can be any real number from negative to positive infinity, does this mean Set W allows you to reach absolutely any (x, y, z) coordinate in the entire 3D universe?",
        "options": [
          "No. The combination creates a flat plane that is infinitely thin. Any coordinate floating in the space above or below this specific slanted floor is physically impossible to reach.",
          "Yes, because possessing three distinct numbers in the foundation vectors algebraically guarantees complete and unrestricted access to the entire 3-dimensional volume.",
          "No, because the strictly positive numbers inside the foundation vectors permanently trap the final shape within the very first geometric octant.",
          "Yes, because both scalar parameters stretch infinitely, allowing the geometry to mathematically bend and cover the entire volumetric grid."
        ],
        "correct_option": "No. The combination creates a flat plane that is infinitely thin. Any coordinate floating in the space above or below this specific slanted floor is physically impossible to reach.",
        "explanation": "This is the exact same visual we used in the 'Baker's Cafe' Overdetermined System (M2Q4)! The plane you just built is exactly what a matrix's Column Space looks like. If a target coordinate (like a bird) is hovering in the air off of this specific flat 2D plane, you can never reach it, no matter what numbers you guess for α and β."
      },
      {
        "question": "What would violently happen to the geometric shape of Set W if the second vector was changed from (2, 7, 3) to (2, 4, 2)?",
        "options": [
          "The resulting geometric plane would physically shift to run perfectly parallel to the standard xy-axis.",
          "The system would instantly singularize into the zero vector, as the overlapping mathematics perfectly cancels out all directional momentum.",
          "The geometric mapping would brutally collapse back into a single 1-dimensional line, because the second vector offers absolutely no new directional freedom.",
          "It would expand the geometry into a completely filled 3-dimensional box."
        ],
        "correct_option": "The geometric mapping would brutally collapse back into a single 1-dimensional line, because the second vector offers absolutely no new directional freedom.",
        "explanation": "This is the ultimate test of Linear Independence! The vector (2, 4, 2) is literally just (1, 2, 1) multiplied by 2. It points in the exact same physical direction as the first vector. If both of your walking instructions tell you to walk along the exact same path, you are trapped on a 1D line. You need a completely independent, distinct direction to successfully tear open a 2D plane."
      },
      {
        "question": "In the formal vocabulary of Linear Algebra, what is the exact mathematical term used to describe the entire geometric process of scaling and adding these vectors together?",
        "options": [
          "The Orthogonal Projection of the origin.",
          "A geometric Cross Product calculation designed to strictly find spatial perpendicularity.",
          "The foundational Eigenvector Mapping, which proves these specific coordinates cannot be rotated by an external matrix.",
          "A Linear Combination, which formally defines the continuous mathematical Span of the two base vectors."
        ],
        "correct_option": "A Linear Combination, which formally defines the continuous mathematical Span of the two base vectors.",
        "explanation": "When you multiply vectors by scalars and add them together (αv + βw), you are creating a 'Linear Combination.' The total collection of every single place you can possibly reach by doing this is formally called the 'Span' of those vectors. You have just built a 2D plane that represents the absolute Span of (1, 2, 1) and (2, 7, 3)."
      }
    ]
  },
  {
    "id": 31,
    "module": 3,
    "questionNumber": 8,
    "questionCode": "M3Q8",
    "quizNumber": 31,
    "title": "Orthogonal Complements and the Normal Vector",
    "emoji": "🚩",
    "original_question": "In the set W of previous question, find out all the points (x,y,z) satisfying the following: (Use Geogebra)\n[[w1, w2, w3]] [[x], [y], [z]] = 0\nwhere (w1,w2,w3) in W. Note that wi's are real numbers.",
    "goal": "Find the orthogonal complement of the 2D plane W, proving it is a 1-dimensional normal line.",
    "core_concept": "Because W has dimension 2 in ℝ³, the space of vectors perpendicular to ALL vectors in W has dimension 3 - 2 = 1.",
    "story": "Find the single flagpole that stands at a perfect 90-degree angle to every possible blade of grass on the 2D plane W.",
    "ggbType": "3d",
    "ggbHint": "Type: eq1: 1*x + 2*y + 1*z = 0",
    "ggbSteps": [
      "Type: eq1: 1*x + 2*y + 1*z = 0",
      "Type: eq2: 2*x + 7*y + 3*z = 0",
      "Type: Intersect(eq1, eq2)",
      "Observe the intersection of the two planes is a single 1D straight line!"
    ],
    "quiz": [
      {
        "question": "The equation requires [w₁ w₂ w₃][x, y, z]ᵀ = 0 for absolutely every vector w inside the plane W. Translated into physical geometry, what is this prompt actually asking you to find?",
        "options": [
          "It is asking you to mathematically calculate the exact outer geometric boundary of the plane by applying a cross product to the input variables.",
          "It is asking you to find all spatial coordinates that are simultaneously perfectly perpendicular to the entire flat 2D plane we built in the previous question.",
          "It requires locating a specific target vector that perfectly balances the spatial gravity of the row space by running completely parallel to the plane.",
          "It is asking for the singular algebraic coordinate where the two fundamental walking directions physically cancel each other out, bringing the system to rest."
        ],
        "correct_option": "It is asking you to find all spatial coordinates that are simultaneously perfectly perpendicular to the entire flat 2D plane we built in the previous question.",
        "explanation": "The dot product strictly checks for a 90-degree angle. Because w represents every single vector living on the flat 2D plane W, asking for w · x = 0 is asking you to find a vector x that is orthogonal to the entire floor. You are looking for a flagpole pointing straight up into the air."
      },
      {
        "question": "Based purely on the physical degrees of freedom within a 3D universe, what specific geometric shape will this set of perpendicular solutions (x, y, z) form?",
        "options": [
          "The resulting geometry will form a secondary 2-dimensional plane that acts as a mirrored mathematical reflection across the central origin.",
          "The continuous parameters will geometrically inflate the solution into a solid 3-dimensional volume containing every possible orthogonal vector.",
          "The strict algebraic zero-constraint physically collapses the entire spatial output down to a single, 0-dimensional point permanently locked at (0, 0, 0).",
          "Because the original plane traps exactly two dimensions of movement, the orthogonal vectors pointing directly away from it can only ever form a single, 1-dimensional straight line."
        ],
        "correct_option": "Because the original plane traps exactly two dimensions of movement, the orthogonal vectors pointing directly away from it can only ever form a single, 1-dimensional straight line.",
        "explanation": "You live in a 3D room (ℝ³). The plane W takes up exactly 2 dimensions of that space. That leaves exactly 3 - 2 = 1 dimension of freedom remaining. Therefore, the set of all vectors perfectly perpendicular to that 2D plane will form a single, 1-dimensional straight line (a normal line) passing through the origin."
      },
      {
        "question": "Set W contains an infinite number of vectors. How can you practically compute the solution for (x, y, z) without manually doing infinite dot products?",
        "options": [
          "You only need to guarantee that (x, y, z) dots to zero against the two foundational base vectors (1, 2, 1) and (2, 7, 3), because if you are perpendicular to the foundation, you are mathematically perpendicular to the entire structure.",
          "You must systematically calculate the geometric inverse of the spatial matrix W and multiply it by the absolute zero vector to trace the complete mathematical trajectory.",
          "You divide the target destination vector (x, y, z) directly by the scalar parameters α and β to mathematically separate the independent dimensional variables.",
          "You have to physically plot at least three completely random points on the plane to ensure the underlying triangle of geometric error is fully resolved."
        ],
        "correct_option": "You only need to guarantee that (x, y, z) dots to zero against the two foundational base vectors (1, 2, 1) and (2, 7, 3), because if you are perpendicular to the foundation, you are mathematically perpendicular to the entire structure.",
        "explanation": "The plane is built entirely by scaling and adding (1, 2, 1) and (2, 7, 3). This is the magic of linearity! If a vector (x, y, z) is perfectly 90 degrees to both of those foundational base vectors, the distributive property of algebra guarantees it will also be 90 degrees to any combination of them. You only need to solve two dot products: 1x + 2y + 1z = 0 and 2x + 7y + 3z = 0."
      },
      {
        "question": "When you write out the two dot product requirements, you generate a system of two algebraic equations: 1x + 2y + 1z = 0 and 2x + 7y + 3z = 0. If you plot these two individual equations in Geogebra, what geometric mechanism physically generates your final 1D line answer?",
        "options": [
          "The two equations form completely parallel lines that curve infinitely toward a shared asymptote to contain the variables.",
          "The vectors align perfectly to create a rigid planar boundary that traps the variables safely inside the first positive Cartesian octant.",
          "Each equation represents a vast 2D plane floating in space, and your final 1D line of solutions is the exact physical crease where those two distinct planes slice through each other.",
          "It mathematically forces all variables to equalize at exactly zero, making any geometric intersection visually impossible to track on a standard grid."
        ],
        "correct_option": "Each equation represents a vast 2D plane floating in space, and your final 1D line of solutions is the exact physical crease where those two distinct planes slice through each other.",
        "explanation": "As we learned in M3Q4, a single equation like 1x + 2y + 1z = 0 creates a flat 2D plane. Because you now have two of these rules happening at the same time, Geogebra will draw two distinct flat planes. The coordinate (x, y, z) must make both rules true simultaneously. Geometrically, this is the exact intersection line where the two planes physically cut through each other!"
      },
      {
        "question": "By stacking the two foundation vectors to form a 2 × 3 matrix M = [[1, 2, 1], [2, 7, 3]], what massive, overarching universal truth of Linear Algebra does this entire experiment visualize?",
        "options": [
          "It proves that the Column Space strictly dictates the direction of the row vectors during a multi-dimensional matrix transformation.",
          "This exact geometric process visually proves that the Null Space of a matrix is precisely the normal line extending perfectly perpendicular out of its Row Space plane.",
          "The experiment confirms that whenever a matrix has more columns than rows, the spatial dimensions inherently collapse into an unsolvable algebraic contradiction.",
          "It demonstrates that the Eigenvector of a geometric plane is always securely located within its own internal mathematical boundaries."
        ],
        "correct_option": "This exact geometric process visually proves that the Null Space of a matrix is precisely the normal line extending perfectly perpendicular out of its Row Space plane.",
        "explanation": "This is the masterpiece of Module 3. The two rows of the matrix create a 2D plane (the Row Space). By setting Mx = 0, you are finding all vectors (x, y, z) that dot to zero against those rows. The resulting 1D line of answers is the Null Space. You have just physically visualized the supreme law of matrices: The Row Space and the Null Space are always perfect, 100% geometric opposites (Orthogonal Complements)."
      }
    ]
  },
  {
    "id": 32,
    "module": 3,
    "questionNumber": 9,
    "questionCode": "M3Q9",
    "quizNumber": 32,
    "title": "The Illusion of the Third Dimension",
    "emoji": "👁️",
    "original_question": "Given the matrix A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], find out all the possible (x,y,z) such that:\n[[1, 2, 3], [4, 5, 6], [7, 8, 9]] [[x], [y], [z]] = 0\nObserve carefully, what has this question got to do with previous five questions in this module",
    "goal": "Discover linear dependence in a 3×3 matrix: row 3 = 2(row 2) - row 1, collapsing rank to 2.",
    "core_concept": "Even though A has 3 rows, row 3 is redundant. The Row Space is 2D, so the Null Space is a 1D line (3 - 2 = 1).",
    "story": "A terrifying 3×3 matrix is an illusion! The third equation brings zero new information, leaving an intact 1D line of solutions.",
    "ggbType": "3d",
    "ggbHint": "Type: eq1: x + 2*y + 3*z = 0",
    "ggbSteps": [
      "Type: eq1: x + 2*y + 3*z = 0",
      "Type: eq2: 4*x + 5*y + 6*z = 0",
      "Type: eq3: 7*x + 8*y + 9*z = 0",
      "Observe all 3 planes intersect along the exact same 1D line: Line passing through (1, -2, 1)!"
    ],
    "quiz": [
      {
        "question": "When you set up the matrix equation Ax = 0, it appears you have three distinct spatial rules: 1x + 2y + 3z = 0, 4x + 5y + 6z = 0, and 7x + 8y + 9z = 0. However, what profound geometric illusion is the third equation hiding?",
        "options": [
          "It strictly forces all three of the variables to cancel each other out, collapsing the entire 3D system directly back to the origin coordinate.",
          "The third equation is merely a mathematical combination of the first two rules, meaning it provides absolutely zero new geometric constraints to the system.",
          "Because the numerical values increase symmetrically down the rows, the third equation acts as an orthogonal boundary that permanently seals the variables inside the first Cartesian octant.",
          "It demands the immediate introduction of a highly complex, four-dimensional tracking parameter to safely prevent the geometric boundaries from overflowing."
        ],
        "correct_option": "The third equation is merely a mathematical combination of the first two rules, meaning it provides absolutely zero new geometric constraints to the system.",
        "explanation": "Look at the numbers carefully! If you take the second row (4, 5, 6), multiply it by 2, and then subtract the first row (1, 2, 3), you get exactly the third row (7, 8, 9). The third equation is completely redundant. It is simply an echo of the first two equations, meaning it brings absolutely no new information to the table."
      },
      {
        "question": "If you extract the three rows of this matrix and plot them as physical vectors in Geogebra, what specific geometric shape will their total Span strictly sweep out in the 3D room?",
        "options": [
          "They will mathematically stretch to cover the entire 3-dimensional volume, because the matrix explicitly contains three distinct rows of data pointing into space.",
          "The continuous variation of the vectors will organically curve around the central spatial axis, generating a stable, three-dimensional parabolic dome.",
          "Because the third row is structurally dependent on the first two, all three vectors will lie perfectly flat on a single 2-dimensional plane.",
          "The overlapping spatial coordinates will rigorously force the geometry to collapse inward, isolating the variables on a single 1-dimensional line."
        ],
        "correct_option": "Because the third row is structurally dependent on the first two, all three vectors will lie perfectly flat on a single 2-dimensional plane.",
        "explanation": "This tests the core concept of the Span! Even though there are three vectors living inside a 3D room, the third vector is just a combination of the first two. It physically cannot point 'up' or 'away' from the flat surface created by rows 1 and 2. Therefore, the Row Space of this massive 3 × 3 matrix is actually just a completely flat, 2D sheet of paper."
      },
      {
        "question": "Knowing that the foundational Row Space of this matrix is actually just a flat 2D plane, what must geometrically happen when we calculate the Null Space (Ax = 0)?",
        "options": [
          "The Null Space will automatically expand into a secondary 2-dimensional plane to safely maintain mathematical equilibrium across the 3D spatial grid.",
          "Because the matrix is perfectly square (3 × 3), the continuous algebraic constraints will trap the variables strictly at the 0-dimensional origin coordinate (0, 0, 0).",
          "The mathematical system violently isolates the spatial coordinates and effectively projects them backward to rest upon the foundational Row Space itself.",
          "The Null Space will form a single, 1-dimensional straight line containing every coordinate that is simultaneously perpendicular to the entire Row Space plane."
        ],
        "correct_option": "The Null Space will form a single, 1-dimensional straight line containing every coordinate that is simultaneously perpendicular to the entire Row Space plane.",
        "explanation": "The rule from M3Q8 remains unbroken! The matrix asks for Ax = 0, meaning we need a vector (x, y, z) that is 90 degrees to all three rows. But since all three rows lie on the exact same flat 2D plane, finding the Null Space just means finding the 'flagpole' vector pointing straight up into the air, perfectly perpendicular to that floor. The Null Space is a 1D line!"
      },
      {
        "question": "If you graph the three equations as distinct flat planes in Geogebra, how will they physically intersect in the 3D universe?",
        "options": [
          "The first two planes will slice through each other to form a crease (a line), and the third plane will pass perfectly through that exact same crease.",
          "The three independent planes will collide at exactly three distinct mathematical locations, completely failing to find a shared intersection and forming a small, geometric triangle of permanent algebraic error floating in the 3D space.",
          "Because the algebraic numbers scale symmetrically, the three geometric planes will run perfectly parallel to each other, never physically touching at any coordinate.",
          "The third plane will mathematically slice the established crease perfectly in half at a strict 90-degree angle, instantly forcing the final destination coordinate to evaluate to zero."
        ],
        "correct_option": "The first two planes will slice through each other to form a crease (a line), and the third plane will pass perfectly through that exact same crease.",
        "explanation": "The first equation is a flat plane. The second equation is another flat plane. When they intersect, they form an infinite 1D line (the crease). Because the third equation is just a redundant combination of the first two, it does not slice across the crease to trap the solution at a single dot. Instead, it spins on its axis and passes flawlessly through that exact same intersection line, leaving the infinite 1D line completely intact!"
      },
      {
        "question": "The prompt strictly asks: 'what has this question got to do with previous five questions in this module?' What is the ultimate conceptual realization here?",
        "options": [
          "It definitively proves that an overdetermined system possessing more equations than variables can only be properly solved using advanced Least Squares geometry.",
          "It demonstrates that adding a third spatial dimension permanently breaks the foundational laws of parametric linear combinations we established in the previous module.",
          "It reveals that this intimidating 3 × 3 problem is geometrically identical to the previous quiz: we are simply finding the 1D normal line perpendicular to a 2D plane.",
          "It mathematically establishes that every foundational transition matrix eventually settles into a highly stable 3-dimensional geometric eigenvector state, regardless of whatever initial parameters the user inputs."
        ],
        "correct_option": "It reveals that this intimidating 3 × 3 problem is geometrically identical to the previous quiz: we are simply finding the 1D normal line perpendicular to a 2D plane.",
        "explanation": "This is the massive 'Aha!' moment of Matrix Mystics. A terrifying wall of numbers like a 3 × 3 matrix is not something to blindly crunch with algebra. When you visualize it, you realize it is literally the exact same problem you just solved in M3Q8. You have a 2D plane of rows, and you are hunting for the 1D line of the Null Space. The geometry never changes, only the disguises do."
      }
    ]
  },
  {
    "id": 33,
    "module": 3,
    "questionNumber": 10,
    "questionCode": "M3Q10",
    "quizNumber": 33,
    "title": "The Fundamental Subspaces of the Matrix",
    "emoji": "🏛️",
    "original_question": "Given the matrix A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] what does the following three sets represent?\n(i) ℛ = { alpha(1,2,3) + beta(4,5,6) + gamma(7,8,9) | alpha, beta, gamma in ℝ }\n(ii) C = { alpha(1,4,7) + beta(2,5,8) + gamma(3,6,9) | alpha, beta, gamma in ℝ }\n(iii) N = { (x,y,z) | x(1,4,7) + y(2,5,8) + z(3,6,9) = 0 }\nUse only Geogebra :)",
    "goal": "Identify and plot the Row Space ℛ, Column Space C, and Null Space N for matrix A.",
    "core_concept": "ℛ is the 2D plane spanned by rows; C is the 2D plane spanned by columns; N is the 1D line perpendicular to ℛ.",
    "story": "Deconstruct matrix A into its constituent organs: its internal wiring (Row Space), its reachable map (Column Space), and its black hole (Null Space).",
    "ggbType": "3d",
    "ggbHint": "In 3D view, plot the plane spanned by (1,2,3) and (4,5,6) -> Row Space.",
    "ggbSteps": [
      "In 3D view, plot the plane spanned by (1,2,3) and (4,5,6) -> Row Space.",
      "Plot the plane spanned by (1,4,7) and (2,5,8) -> Column Space.",
      "Plot the normal line (1, -2, 1) -> Null Space.",
      "Observe how these geometric objects define the matrix."
    ],
    "quiz": [
      {
        "question": "Set (i), labeled ℛ, asks you to plot the Span of the three horizontal rows of the matrix. Based on the geometric illusion we shattered in the previous question, what shape will this actually create in Geogebra?",
        "options": [
          "Because the set definition strictly contains three independent parameters (α, β, γ) attached to three 3D vectors, the resulting geometric shape must mathematically expand to fill the entire solid volume of the 3D universe.",
          "It physically manifests as a perfectly flat 2D plane, because the third row is just a redundant linear combination of the first two and offers no new spatial freedom.",
          "It forms a single 1D line because all three vectors share a common geometric intersection perfectly anchored at the origin.",
          "It geometrically isolates the x, y, and z axes to form three distinct, mutually orthogonal planes that intersect at the absolute center."
        ],
        "correct_option": "It physically manifests as a perfectly flat 2D plane, because the third row is just a redundant linear combination of the first two and offers no new spatial freedom.",
        "explanation": "Set ℛ represents the Row Space. Even though there are three parameters (α, β, γ), the vector (7, 8, 9) is just 2(4, 5, 6) - 1(1, 2, 3). Because the third vector literally just points back along the path created by the first two, you only truly possess two degrees of freedom. Your movement is permanently restricted to a flat 2D sheet of paper."
      },
      {
        "question": "Set (ii), labeled 𝒞, asks you to plot the Span of the vertical columns of the matrix. If you look closely at these column vectors, what geometric reality does this set map out?",
        "options": [
          "It defines the Column Space, which mathematically forms a flat 2D plane because the third column vector offers no new directional freedom.",
          "It acts as the orthogonal complement to set ℛ, generating a secondary plane that sits perfectly at a 90-degree angle to the Row Space.",
          "The set physically calculates the internal spatial determinant of the matrix engine by meticulously adding the dimensional column vectors together to track the total amount of volumetric stretching.",
          "It geometrically calculates the trajectory of the primary eigenvector to ensure the system does not rotate."
        ],
        "correct_option": "It defines the Column Space, which mathematically forms a flat 2D plane because the third column vector offers no new directional freedom.",
        "explanation": "Set 𝒞 is the Column Space—the complete set of all reachable destinations for the matrix machine. Just like the rows, the columns are linearly dependent! The third column (3, 6, 9) is exactly 2(2, 5, 8) - 1(1, 4, 7). Therefore, the matrix cannot reach everywhere in the 3D room. It can only ever spit out answers that live on this one specific, slanted 2D plane."
      },
      {
        "question": "Set (iii), labeled 𝒩, asks you to find all (x, y, z) coordinates that satisfy x(1, 4, 7) + y(2, 5, 8) + z(3, 6, 9) = 0. What is this equation physically asking you to do?",
        "options": [
          "It mathematically computes the physical distance between the three column vectors to ensure they remain linearly independent across the standard Cartesian grid.",
          "It forms a 3D spherical boundary that safely traps the row space coordinates from expanding to infinity.",
          "By setting the linear combination of the columns strictly to zero, the equation mathematically proves that the geometric Column Space is permanently pinned to the origin, thereby preventing the matrix from shifting the variables into a negative coordinate quadrant.",
          "It defines the Null Space by asking which specific combination of input variables (x, y, z) will perfectly scale and cancel the columns out to zero."
        ],
        "correct_option": "It defines the Null Space by asking which specific combination of input variables (x, y, z) will perfectly scale and cancel the columns out to zero.",
        "explanation": "This is the exact same equation as Ax = 0, just written using the 'Column Picture' instead of the 'Row Picture'! Set 𝒩 is the Null Space. It asks: 'How much of column 1, plus how much of column 2, plus how much of column 3 will perfectly cancel each other out so that we land exactly back at (0, 0, 0)?'"
      },
      {
        "question": "Now, bring these geometric objects together. Inside the 3D room, what is the exact physical relationship between Set ℛ (the Row Space) and Set 𝒩 (the Null Space)?",
        "options": [
          "Because both sets are generated by the exact same underlying 3 × 3 matrix engine, the Null Space and the Row Space physically occupy the exact same geometric dimensions to maintain algebraic symmetry.",
          "The 1D line of 𝒩 sits perfectly perpendicular to the flat 2D plane of ℛ.",
          "The geometric dimensions mathematically collapse, forcing the Row Space to rotate continuously until it physically aligns parallel with the Null Space trajectory.",
          "The Row Space physically wraps around the Null Space to create a protective, hollow parabolic boundary limit."
        ],
        "correct_option": "The 1D line of 𝒩 sits perfectly perpendicular to the flat 2D plane of ℛ.",
        "explanation": "We proved this in M3Q8! The Row Space ℛ is a flat 2D plane. The Null Space 𝒩 is a 1D line. Because the Null Space is defined by vectors that dot to zero against the rows, that 1D line must act as the 'normal vector'—the flagpole that shoots straight up, 100% perfectly orthogonal to the 2D floor of the Row Space."
      },
      {
        "question": "Stepping back, why is it so mathematically profound that these three specific sets (ℛ, 𝒞, and 𝒩) are taught together at the climax of this module?",
        "options": [
          "They represent three of the Fundamental Subspaces of Linear Algebra: the physical architecture of the matrix's rules (ℛ), the exact geometric destinations the machine can reach (𝒞), and the specific coordinates it crushes into nothingness (𝒩).",
          "They simply represent three different geometric ways of writing the exact same 2D plane.",
          "They mathematically isolate the exact transition probabilities of a Markov Chain, converting dynamic continuous flow into static, readable geometry.",
          "They explicitly define the strict coordinate boundaries of an overdetermined system where no perfect mathematical intersection can ever physically exist."
        ],
        "correct_option": "They represent three of the Fundamental Subspaces of Linear Algebra: the physical architecture of the matrix's rules (ℛ), the exact geometric destinations the machine can reach (𝒞), and the specific coordinates it crushes into nothingness (𝒩).",
        "explanation": "Every matrix in the universe is defined by its Fundamental Subspaces. You have now learned to completely pull apart the engine. ℛ (Row Space) is the internal wiring. 𝒞 (Column Space) is the entire map of places the machine can take you. 𝒩 (Null Space) is the black hole of the machine where data gets destroyed. Seeing these as real, interacting geometric shapes is the true mastery of Matrix Mystics."
      }
    ]
  },
  {
    "id": 34,
    "module": 3,
    "questionNumber": 11,
    "questionCode": "M3Q11",
    "quizNumber": 34,
    "title": "Orthogonal Complements and the Universal Split",
    "emoji": "⚡",
    "original_question": "Did you observe that every vector of ℛ is perpendicular to every vector of N?",
    "goal": "Verify geometrically and algebraically that the Row Space and Null Space are orthogonal complements.",
    "core_concept": "By definition of Ax = 0, every row vector dots to zero against every null space vector, making ℛ ⊥ N throughout ℝ³.",
    "story": "Close your eyes, pick ANY arrow on the 2D Row Space floor and ANY arrow along the 1D Null Space line: they form a flawless 90-degree angle!",
    "ggbType": "3d",
    "ggbHint": "Take vector r = (1, 2, 3) from ℛ.",
    "ggbSteps": [
      "Take vector r = (1, 2, 3) from ℛ.",
      "Take vector n = (1, -2, 1) from N.",
      "Compute dot product: 1(1) + 2(-2) + 3(1) = 1 - 4 + 3 = 0.",
      "Conclude: every vector in ℛ is universally perpendicular to every vector in N."
    ],
    "quiz": [
      {
        "question": "When we state that a specific coordinate vector n physically lives inside the Null Space (𝒩), what fundamental geometric action did we use to verify its placement?",
        "options": [
          "We mathematically scaled the vector n until its spatial magnitude perfectly matched the internal determinant of the row space to ensure dimensional stability.",
          "We calculated the strict cross product of n and the matrix columns to confirm they formed a parallel geometric boundary layer across the grid.",
          "We took the dot product of n against every matrix row and got exactly zero.",
          "We projected n directly onto the column space to verify it evaluated to the positive identity matrix, proving spatial independence."
        ],
        "correct_option": "We took the dot product of n against every matrix row and got exactly zero.",
        "explanation": "The Null Space is strictly defined by the equation Ax = 0. Mechanically, this means you are taking your input vector x and calculating the dot product against Row 1, Row 2, and Row 3. If every single one of those dot products outputs a zero, the vector has successfully passed the test and is officially granted entry into the Null Space."
      },
      {
        "question": "You verified that the Null Space line is perfectly 90 degrees to the two foundational row vectors. Why does this algebraically guarantee it is also perpendicular to every other vector floating on the entire infinite Row Space plane ℛ?",
        "options": [
          "The zero-constraint actively pulls the Row plane and the Null line into a parallel alignment.",
          "Because the entire plane is built by scaling and adding the base rows; if a vector is perfectly perpendicular to the foundation, the distributive property of algebra mathematically guarantees it remains perfectly perpendicular to any combination of those foundation pieces.",
          "The geometric boundaries of any 2D plane naturally force all external vectors to curve tangentially along its surface.",
          "It strictly doesn't; there are specific mathematical blind spots on the 2D plane."
        ],
        "correct_option": "Because the entire plane is built by scaling and adding the base rows; if a vector is perfectly perpendicular to the foundation, the distributive property of algebra mathematically guarantees it remains perfectly perpendicular to any combination of those foundation pieces.",
        "explanation": "This is the magic of linearity! Every single vector in the Row Space (ℛ) is just a linear combination of the base rows: α(Row 1) + β(Row 2). If a Null Space vector n dots to zero against Row 1, and dots to zero against Row 2, then doing the math n · (αRow1 + βRow2) will just equal α(0) + β(0) = 0. If you are perfectly perpendicular to the structural foundation of a building, you are mathematically perpendicular to the entire building."
      },
      {
        "question": "If you close your eyes and randomly select any vector pointing anywhere on the flat 2D Row Space plane, and any vector pointing anywhere along the 1D Null Space line, what will the physical angle between those two specific arrows always be?",
        "options": [
          "Exactly 90 degrees, without exception.",
          "It depends entirely on the scalar parameters chosen; larger scalar multiples will continuously stretch the angle beyond 90 degrees into an obtuse trajectory.",
          "Exactly 0 degrees, because the mathematical system eventually forces both spaces to permanently merge at the absolute central origin coordinate to prevent infinite expansion.",
          "The angle fluctuates continuously between 45 and 90 degrees depending on the specific Cartesian quadrant the geometric vectors are currently occupying during the transformation."
        ],
        "correct_option": "Exactly 90 degrees, without exception.",
        "explanation": "Because every vector in 𝒩 is perpendicular to every vector in ℛ, the relationship is absolute. You can pick a tiny vector pointing North on the Row Space plane, and a massive vector pointing straight down into the basement on the Null Space line. If you measure the angle between those two specific arrows, it will be flawlessly, perfectly 90 degrees."
      },
      {
        "question": "The Row Space (ℛ) is a 2-dimensional plane. The Null Space (𝒩) is a 1-dimensional line strictly perpendicular to it. When you combine their geometric dimensions together (2 + 1 = 3), what profound truth about the 3-dimensional universe (ℝ³) does this reveal?",
        "options": [
          "The two separate geometric spaces strictly overlap each other along the primary coordinate axes.",
          "The perpendicular combination perfectly balances the Cartesian quadrants, ensuring the matrix determinant evaluates to a positive integer.",
          "It mathematically establishes that any system possessing linearly dependent row vectors fundamentally requires a highly complex fourth spatial dimension.",
          "These two strictly orthogonal spaces fundamentally split the entire 3-dimensional universe between them, acting as perfect geometric complements that account for every possible coordinate in reality."
        ],
        "correct_option": "These two strictly orthogonal spaces fundamentally split the entire 3-dimensional universe between them, acting as perfect geometric complements that account for every possible coordinate in reality.",
        "explanation": "This is the concept of Orthogonal Complements. In a 3D room (ℝ³), if the Row Space eats up exactly 2 dimensions of freedom (a flat floor), there is exactly 1 dimension of freedom remaining (the vertical line). Together, the floor and the vertical line perfectly account for all 3 dimensions of physical reality. Absolutely any 3D coordinate in the entire universe can be reached by walking along the Row Space floor, and then taking an elevator up or down parallel to the Null Space line!"
      },
      {
        "question": "Knowing this absolute perpendicular relationship, when the matrix engine actually calculates Ax = 0, what is the machine physically searching for?",
        "options": [
          "It is explicitly searching for the specific scalar multipliers that will perfectly expand the geometric Row Space until it safely encompasses the Column Space and balances the dimensions.",
          "It is scanning the entire universe to find vectors that cast absolutely zero geometric shadow upon the Row Space plane.",
          "It computes the absolute geometric center of the overdetermined coordinate triangle to mathematically minimize the resulting spatial error across the entire transformation grid.",
          "It is aggressively locating the specific spatial coordinates that force the primary row vectors to uncouple and run perfectly parallel to each other."
        ],
        "correct_option": "It is scanning the entire universe to find vectors that cast absolutely zero geometric shadow upon the Row Space plane.",
        "explanation": "Think about shining a flashlight directly down from the ceiling. If you hold a pen at a slant, it casts a shadow on the floor. But if you hold the pen perfectly, 100% straight up and down (perpendicular), it casts zero shadow—just a single dot. By solving Ax = 0, the matrix is hunting for the specific vectors that cast no shadow on its Row Space plane. It is literally searching for its own geometric blind spot."
      }
    ]
  },
  {
    "id": 35,
    "module": 3,
    "questionNumber": 12,
    "questionCode": "M3Q12",
    "quizNumber": 35,
    "title": "The Anatomy of a Dimensional Collapse",
    "emoji": "📉",
    "original_question": "Consider the matrix B = [[1, 2], [2, 4]]. Draw the line 2y+x=4. Seeing the matrix B as a function B: ℝ² -> ℝ², where does B take the line 2y+x=4?\nWhere does it take:\ni) 2y+x=10\nii) 2y+x=62\niii) 2y+x=1800",
    "goal": "Watch a singular matrix crush entire 1D lines of input data into isolated single output points.",
    "core_concept": "Because lines x+2y=k run parallel to the Null Space x+2y=0, B maps the entire infinite line to the single point (k, 2k).",
    "story": "Feed an entire infinite line of coordinates into matrix B. Out pops a single, isolated dot! A whole dimension of history is destroyed.",
    "ggbType": "graphing",
    "ggbHint": "Type: x + 2*y = 4 and press Enter.",
    "ggbSteps": [
      "Type: x + 2*y = 4 and press Enter.",
      "Compute B * [x, y]^T = [x+2y, 2(x+2y)]^T = [4, 8].",
      "Type: (4, 8) and press Enter.",
      "Notice line 2y+x=4 collapses to (4, 8), line =10 to (10, 20), etc."
    ],
    "quiz": [
      {
        "question": "When you feed every single coordinate from the infinite line 2y + x = 4 into the matrix machine B = [[1, 2], [2, 4]], what does the resulting geometric output look like?",
        "options": [
          "The line mathematically rotates 90 degrees and scales its length by a factor of the determinant, preserving the 1-dimensional structure but fundamentally altering its trajectory across the Cartesian plane.",
          "The entire line is instantly crushed into a single dot at (4, 8).",
          "The operation maps the variables directly onto the primary eigenvector, mathematically forcing the line to pass perfectly through the central origin while maintaining absolute spatial symmetry.",
          "It generates a completely parallel output line shifted precisely 4 units away from the foundational row space plane, safely maintaining equilibrium."
        ],
        "correct_option": "The entire line is instantly crushed into a single dot at (4, 8).",
        "explanation": "Multiplying the matrix by a vector [x, y]ᵀ gives [x + 2y, 2(x + 2y)]ᵀ. If your input coordinate lives on the line where x + 2y = 4, the machine simply replaces that entire equation with the number 4, instantly outputting the singular dot [4, 8]ᵀ."
      },
      {
        "question": "You are now asked to process the lines 2y + x = 10, 2y + x = 62, and 2y + x = 1800. As you feed these distinct parallel lines into the matrix, what physically happens to them?",
        "options": [
          "Every line perfectly mirrors the original trajectory.",
          "The matrix strictly absorbs the massive constants into the origin.",
          "Each massive, infinite line is instantaneously compacted into a single specific dot—the line equating to 10 becomes (10, 20), the line equating to 62 becomes (62, 124), and so on.",
          "The increasing constants mathematically push the lines further apart."
        ],
        "correct_option": "Each massive, infinite line is instantaneously compacted into a single specific dot—the line equating to 10 becomes (10, 20), the line equating to 62 becomes (62, 124), and so on.",
        "explanation": "The rule [x + 2y, 2(x + 2y)]ᵀ applies universally. If you input any point from the line x + 2y = 1800, the matrix just reads the equation and outputs the coordinate (1800, 3600). The machine takes distinct 1-dimensional lines and crushes every single one of them into distinct 0-dimensional dots."
      },
      {
        "question": "Why does the matrix B specifically target lines with the exact structural form 2y + x = k and brutally collapse them, rather than rotating them like a normal transformation?",
        "options": [
          "Because the algebraic values precisely match the positive coordinates of the Column Space, safely locking the geometry in the first Cartesian quadrant and preventing any negative spatial expansion.",
          "These specific lines run completely parallel to the matrix's Null Space.",
          "The strict geometric inverse of matrix B algebraically demands that any equation containing a 2y variable must be instantly compressed to prevent overlapping dimensions from causing an algebraic overflow.",
          "The geometric slope of the line evaluates to exactly negative one-half, perfectly aligning with the internal determinant."
        ],
        "correct_option": "These specific lines run completely parallel to the matrix's Null Space.",
        "explanation": "What is the Null Space of this matrix? It is the line x + 2y = 0. The line x + 2y = 10 is completely parallel to it! Walking along that line is walking in the exact direction of the Null Space. Because the matrix crushes the Null Space to zero, it completely ignores any movement in that direction, forcing the entire line to map to the exact same output dot."
      },
      {
        "question": "If you plotted all of these resulting output dots—(4, 8), (10, 20), (62, 124), and (1800, 3600)—on a brand new Geogebra grid, where are they actually landing in the physical output space?",
        "options": [
          "They form a bounded, solid 2D triangle.",
          "Regardless of the original input constant, every single output coordinate will land perfectly along a single, infinitely extending 1-dimensional track strictly defined by the equation y = 2x.",
          "They scatter orthogonally across the Cartesian grid.",
          "They mathematically wrap around the zero coordinate."
        ],
        "correct_option": "Regardless of the original input constant, every single output coordinate will land perfectly along a single, infinitely extending 1-dimensional track strictly defined by the equation y = 2x.",
        "explanation": "Look at the coordinates of the dots: (4, 8), (10, 20), (62, 124). The y-coordinate is always exactly double the x-coordinate. No matter what crazy line you feed into this matrix, the output will always be trapped on the single 1D line y = 2x."
      }
    ]
  },
  {
    "id": 36,
    "module": 3,
    "questionNumber": 13,
    "questionCode": "M3Q13",
    "quizNumber": 36,
    "title": "The Generalized Collapse and the Parameter k",
    "emoji": "🔤",
    "original_question": "In general B = [[1, 2], [2, 4]] : ℝ² -> ℝ², where does this function take 2y+x=k? (where k is a constant)",
    "goal": "Generalize the dimensional collapse algebraically: B maps the line x + 2y = k to the coordinate (k, 2k).",
    "core_concept": "For any constant k, all points on x+2y=k evaluate to [k, 2k]^T. Reversing this mapping is impossible since data is lost.",
    "story": "As slider k sweeps from -∞ to +∞, each parallel line of the 2D input plane is squashed into a single dot on the line y = 2x.",
    "ggbType": "graphing",
    "ggbHint": "Create slider k.",
    "ggbSteps": [
      "Create slider k.",
      "Type: x + 2*y = k",
      "Type: P = (k, 2*k)",
      "Drag slider k to watch every parallel line crush into its own unique dot on y = 2x."
    ],
    "quiz": [
      {
        "question": "By replacing specific numerical constants with the generalized parameter k, you are now feeding the equation 2y + x = k into the matrix machine B. What is the exact geometric output?",
        "options": [
          "It generates a new parallel line in the output space that is physically shifted exactly k units away from the central origin, perfectly preserving the original spatial dimensions of the input.",
          "It physically maps the entire infinite line strictly to the coordinate (k, 2k).",
          "It continually stretches the trajectory until the resulting geometry reaches a scalar magnitude of exactly k, naturally forming a bounded geometric circle that safely traps all underlying matrix variables.",
          "The equation mathematically isolates the constant, reflecting the system perfectly across the primary boundary."
        ],
        "correct_option": "It physically maps the entire infinite line strictly to the coordinate (k, 2k).",
        "explanation": "The top row of the output is exactly 1x + 2y. The bottom row is exactly 2x + 4y, which factors to 2(x + 2y). If the rule for your input line is x + 2y = k, then the output coordinate is instantly forced to become [k, 2k]ᵀ."
      },
      {
        "question": "Imagine k as a continuous slider in Geogebra, allowing you to sweep through thousands of parallel lines on the input grid. As k changes, what is this singular matrix physically doing to the entirety of the 2D universe?",
        "options": [
          "The continuous mathematical operation folds the Cartesian grid in half.",
          "It completely rotates the foundational grid by 90 degrees.",
          "It literally takes every single parallel line that makes up the flat 2D plane and ruthlessly crushes each one into its own unique, isolated dot resting on a single predetermined track.",
          "The matrix acts as a massive geometric filter, preserving only positive trajectories."
        ],
        "correct_option": "It literally takes every single parallel line that makes up the flat 2D plane and ruthlessly crushes each one into its own unique, isolated dot resting on a single predetermined track.",
        "explanation": "By sweeping k from negative infinity to positive infinity, you are feeding the entire universe into the machine. The matrix processes this massive 2D space by taking each individual line and squashing it into a single dot along the output track y = 2x. It physically flattens the universe."
      },
      {
        "question": "If someone shows you the final output coordinate (k, 2k) and asks you to use an inverse matrix to find the exact starting position, why will you mathematically fail?",
        "options": [
          "Reversing the machine is a straightforward process of taking the output coordinate and dividing it by the determinant of matrix B, which safely retrieves the exact starting position without failure.",
          "Because the output coordinate is perfectly scaled by the constant k, the inverse matrix can securely lock onto that parameter and reverse the trajectory smoothly across the entire grid.",
          "The unique starting history of the data is permanently destroyed.",
          "It is impossible because the coordinate (k, 2k) is actually a 2-dimensional vector attempting to exist in a strictly 1-dimensional mathematical space, causing an unavoidable, fatal algebraic contradiction."
        ],
        "correct_option": "The unique starting history of the data is permanently destroyed.",
        "explanation": "If the output dot is (10, 20), the starting coordinate could have been (10, 0), or (0, 5), or (20, -5). Every single coordinate living on the line 2y + x = 10 crashes into that exact same destination. No inverse machine can ever figure out where you originally started."
      },
      {
        "question": "What profound geometric feature is instantly revealed if you set the parameter k to exactly 0?",
        "options": [
          "The input line maps perfectly to (0, 0), formally revealing the geometric Null Space of the matrix.",
          "The physical system violently collapses into an undefined state.",
          "The constant acts as an exponential multiplier, instantly inflating the line.",
          "It causes the output coordinates to perfectly mirror the input coordinates."
        ],
        "correct_option": "The input line maps perfectly to (0, 0), formally revealing the geometric Null Space of the matrix.",
        "explanation": "If k = 0, the input line is x + 2y = 0. Because the output formula is (k, 2k), plugging in 0 yields (0, 0). By definition, the set of all vectors that a matrix crushes to zero is the Null Space."
      }
    ]
  },
  {
    "id": 37,
    "module": 3,
    "questionNumber": 14,
    "questionCode": "M3Q14",
    "quizNumber": 37,
    "title": "The Range and the Column Space",
    "emoji": "🎯",
    "original_question": "Given B = [[1, 2], [2, 4]] : ℝ² -> ℝ². What is the range of this function?",
    "goal": "Determine that the Range of matrix B is the 1-dimensional line y = 2x, exactly its Column Space.",
    "core_concept": "The Range is the span of the columns [1, 2]^T and [2, 4]^T. Because column 2 is 2*(column 1), the Range is strictly 1D.",
    "story": "Even though matrix B outputs into a 2D room (Codomain ℝ²), its actual footprint (Range) is trapped on a single 1D rail.",
    "ggbType": "graphing",
    "ggbHint": "Type: u = Vector((1, 2))",
    "ggbSteps": [
      "Type: u = Vector((1, 2))",
      "Type: v = Vector((2, 4))",
      "Type: y = 2*x",
      "Observe that all outputs of B must lie on the line y = 2x!"
    ],
    "quiz": [
      {
        "question": "In the formal language of Linear Algebra, what exactly is the 'Range' of a matrix transformation?",
        "options": [
          "It is the rigid geometric boundary that naturally encompasses the primary Eigenvectors to prevent spatial overflow during the transformation, guaranteeing the matrix remains perfectly stable across dimensions.",
          "It is formally defined as the mathematical Null Space, representing all the original input data that the machine permanently destroyed during the calculation.",
          "The Range is geometrically identical to the Column Space, representing absolutely every spatial destination the machine is physically capable of reaching.",
          "It is the overarching determinant of the system, constantly tracking the total volumetric stretching of the input coordinates."
        ],
        "correct_option": "The Range is geometrically identical to the Column Space, representing absolutely every spatial destination the machine is physically capable of reaching.",
        "explanation": "The Range is the complete set of all possible outputs. Because matrix multiplication is just a linear combination of the columns, the places you can reach (the Range) is literally just the Span of the matrix's columns (the Column Space)."
      },
      {
        "question": "By looking at the constituent columns of the matrix B = [[1, 2], [2, 4]], what specific geometric shape strictly defines the Range of this function?",
        "options": [
          "The output space continuously expands to form a solid, unbounded 2-dimensional plane that actively mirrors the original input Domain across the standard Cartesian axes.",
          "Every mapped coordinate lands strictly on the 1-dimensional line y = 2x.",
          "The matrix strictly reflects all input vectors into the negative Cartesian quadrants.",
          "It geometrically isolates the independent variables, trapping the entire output within a single 0-dimensional point at the origin to securely prevent the determinant from collapsing."
        ],
        "correct_option": "Every mapped coordinate lands strictly on the 1-dimensional line y = 2x.",
        "explanation": "The first column vector is [1, 2]ᵀ. The second column vector is [2, 4]ᵀ. Both point in the exact same physical direction (a slope of rise 2, run 1). Therefore, the machine can only ever output coordinates that live on this one specific 1D track."
      },
      {
        "question": "Why is the Range of this 2 × 2 matrix severely restricted to a single line, rather than successfully spanning an entire flat sheet of paper?",
        "options": [
          "Because the strict mathematical dot product calculated between the two constituent column vectors evaluates to precisely zero.",
          "Because the independent variables inherently cancel each other out.",
          "The second column vector [2, 4]ᵀ is simply a scaled replica of the first column vector [1, 2]ᵀ, meaning it offers absolutely no independent directional steering wheel to pull the geometry off that single track.",
          "The physical Cartesian grid permanently restricts square matrices to a maximum output of one dimension."
        ],
        "correct_option": "The second column vector [2, 4]ᵀ is simply a scaled replica of the first column vector [1, 2]ᵀ, meaning it offers absolutely no independent directional steering wheel to pull the geometry off that single track.",
        "explanation": "To build a 2D plane, you need two completely independent directions to walk in. But this matrix's 'East' steering wheel is just telling you to walk twice as far 'North'. Because the columns are linearly dependent, you are permanently trapped on a 1D line."
      },
      {
        "question": "The prompt states the matrix function is B : ℝ² ↦ ℝ². This notation means the machine requires a 2D input (Domain) and spits out answers into a 2D room (Codomain). How do we reconcile this notation with the fact that the Range is just a 1D line?",
        "options": [
          "While the machine physically outputs coordinates into a vast 2-dimensional room (the Codomain), its actual reachable footprint (the Range) is severely restricted to a single, infinitely thin 1-dimensional track floating inside that room.",
          "The matrix physically alters the universe itself, permanently deleting the standard x-axis to safely balance the mathematical algebraic equation and strictly force the remaining variables into a linear trajectory.",
          "The mathematical system instantly generates a third spatial dimension to securely house the input variables that completely missed the primary output trajectory, creating a bounded volumetric holding space.",
          "It mathematically establishes a rigid proof that the foundational Domain and the resulting Range are physically identical geometric spaces."
        ],
        "correct_option": "While the machine physically outputs coordinates into a vast 2-dimensional room (the Codomain), its actual reachable footprint (the Range) is severely restricted to a single, infinitely thin 1-dimensional track floating inside that room.",
        "explanation": "The Codomain (ℝ²) is just the physical room the machine spits answers into. The Range (the 1D line y = 2x) is the actual space the answers occupy. Think of the Codomain as a blank wall, and the Range as a laser beam sweeping across that wall. The beam lives inside the 2D room, but it is strictly a 1D object."
      }
    ]
  },
  {
    "id": 38,
    "module": 3,
    "questionNumber": 15,
    "questionCode": "M3Q15",
    "quizNumber": 38,
    "title": "The Grand Epiphany of Dimensional Collapse",
    "emoji": "💡",
    "original_question": "You have achieved the required wisdom if you have realized that:\nB = [[1, 2], [2, 4]] : ℝ² -> ℝ².\n'B collapses a dimension'.",
    "goal": "Achieve the core insight of linear algebra: singular matrices destroy dimensions, eating them into the Null Space.",
    "core_concept": "Rank-Nullity Theorem: dim(Domain) = dim(Range) + dim(Null Space). 2 = 1 + 1. Determinant = 0 confirms area collapses to 0.",
    "story": "You now see matrices not as numbers, but as geometric machines that bend, stretch, and collapse the fabric of space.",
    "ggbType": "graphing",
    "ggbHint": "Draw a unit square in GeoGebra.",
    "ggbSteps": [
      "Draw a unit square in GeoGebra.",
      "Apply matrix B = {{1, 2}, {2, 4}} to the square.",
      "Watch the 2D square completely flatten into a 1D line segment with zero area!"
    ],
    "quiz": [
      {
        "question": "The prompt states the ultimate realization is that matrix B 'collapses a dimension.' Geometrically speaking, what does this catastrophic event physically look like?",
        "options": [
          "It strictly removes the standard vertical y-axis from the spatial grid, forcing all input variables to rely entirely on horizontal x-axis transformations to safely maintain dimensional equilibrium.",
          "It physically consumes the massive, flat 2-dimensional Cartesian plane and aggressively flattens the entire universe onto a single, infinitely thin 1-dimensional line.",
          "The matrix engine mathematically halves the scalar magnitude of every input vector to prevent the output space from overflowing its strictly defined geometric boundaries during the transformation process.",
          "It requires the underlying spatial system to naturally project the inputs onto a complex plane to safely hide the redundant geometric data."
        ],
        "correct_option": "It physically consumes the massive, flat 2-dimensional Cartesian plane and aggressively flattens the entire universe onto a single, infinitely thin 1-dimensional line.",
        "explanation": "You start in a 2D room (ℝ²), and you input a flat 2D sheet of paper covering the entire grid. But because the matrix's columns point in the exact same direction, it takes that entire flat 2D sheet and crushes it sideways into a single 1D string. One entire dimension of spatial freedom is erased."
      },
      {
        "question": "In the physical reality of the math, where exactly did that 'missing' dimension of space go?",
        "options": [
          "It is perfectly preserved within the primary Eigenvector, ensuring the structural integrity of the machine remains completely intact for future transformations and allowing for a seamless inverse geometric mapping.",
          "The missing dimension was directly consumed by the Null Space.",
          "The mathematical system forcibly relocates the missing geometric dimension into the orthogonal Column Space to safely balance the internal matrix determinant and strictly prevent an algebraic overflow error.",
          "It is aggressively projected onto a perpendicular plane that mirrors the foundation directly across the origin."
        ],
        "correct_option": "The missing dimension was directly consumed by the Null Space.",
        "explanation": "Conservation of Dimensions! If you start with 2 dimensions, and the machine only outputs a 1-dimensional shape, the missing 1 dimension of freedom must have been destroyed by the Null Space. Entire 1D lines of inputs were getting crushed into single 0D dots. The Null Space ate the missing dimension."
      },
      {
        "question": "How is this violent geometric collapse mathematically measured and confirmed by the matrix's Determinant?",
        "options": [
          "The determinant evaluates to exactly zero, mathematically proving that any 2D geometric shape fed into the machine will be brutally squashed until it possesses zero physical area.",
          "The determinant is strictly negative.",
          "The system calculates a fractional determinant, proving the coordinate grid was proportionally scaled downward by a factor of one-half to safely compress the variables into a stable singular state.",
          "The determinant actively isolates the zero vectors to permanently lock the spatial grid into a stabilized equilibrium."
        ],
        "correct_option": "The determinant evaluates to exactly zero, mathematically proving that any 2D geometric shape fed into the machine will be brutally squashed until it possesses zero physical area.",
        "explanation": "The determinant measures how much a matrix stretches or shrinks 2D area. For matrix B, the determinant is (1 × 4) - (2 × 2) = 0. If you draw a 2D square on the input grid and feed it in, it gets completely flattened onto a 1D line. What is the 2D area of a 1D line? Zero."
      },
      {
        "question": "Can this dimensional collapse be reversed using an inverse matrix?",
        "options": [
          "The collapse is easily undone by mathematically generating the inverse matrix.",
          "You can successfully reverse the process as long as you project the collapsed 1D line directly across the Null Space.",
          "Because infinite inputs crash into identical outputs, the history is annihilated, making it non-invertible.",
          "Reversal simply requires dividing the flattened output strictly by the constant parameter."
        ],
        "correct_option": "Because infinite inputs crash into identical outputs, the history is annihilated, making it non-invertible.",
        "explanation": "Because infinite inputs crash into the exact same outputs, the history of the data is annihilated. You cannot reconstruct a 2D space from a 1D line without guessing. This is exactly why a matrix with a determinant of zero has no inverse."
      },
      {
        "question": "You have 'achieved the required wisdom.' Looking back at all of Module 3, what is the grand, overarching realization about what matrices actually are?",
        "options": [
          "Matrices simply represent an abstract ledger system designed solely to isolate independent variables in overdetermined linear equations, permanently ensuring that spatial geometry remains entirely separate from algebraic calculation.",
          "Matrices inherently require symmetrically scaled inputs to successfully process and balance the underlying dimensional math, safely preventing the coordinate grid from collapsing into an unstable and unreadable geometric state.",
          "Matrices are not just passive grids of algebraic numbers used to solve equations; they are active geometric engines capable of stretching, rotating, and permanently destroying the fabric of mathematical space.",
          "Every mathematical matrix naturally seeks a stable 2D steady-state distribution regardless of the initial starting coordinates or internal spatial parameters."
        ],
        "correct_option": "Matrices are not just passive grids of algebraic numbers used to solve equations; they are active geometric engines capable of stretching, rotating, and permanently destroying the fabric of mathematical space.",
        "explanation": "A matrix is a function. It is a machine that reshapes the universe. When you see a grid of numbers, you are no longer seeing an algebra trick—you are seeing the DNA of a geometric transformation that defines exactly how a space will bend, fold, or collapse."
      }
    ]
  },
  {
    "id": 39,
    "module": 4,
    "questionNumber": 1,
    "questionCode": "M4Q1",
    "quizNumber": 39,
    "title": "Visualizing the Subspaces",
    "emoji": "🗺️",
    "original_question": "Given the matrix M = [[1, 3], [2, 6]]. Use Geogebra to plot ℛ, C & N. what do you observe?\n(i) ℛ = { alpha(1,3) + beta(2,6) | alpha, beta in ℝ }\n(ii) C = { alpha(1,2) + beta(3,6) | alpha, beta in ℝ }\n(iii) N = { (x,y) | x(1,2) + y(3,6) = 0, for all x,y in ℝ }",
    "goal": "Plot the Row Space, Column Space, and Null Space of M on Geogebra and observe their 1D geometry.",
    "core_concept": "Because row 2 is 2*(row 1) and col 2 is 3*(col 1), ℛ is the line y = 3x, C is the line y = 2x, and N is the line x + 3y = 0.",
    "story": "Two sliders controlling two dependent vectors sweep out only a single line. The matrix flattens 2D space onto a 1D track.",
    "ggbType": "graphing",
    "ggbHint": "Type: y = 3*x (Row Space ℛ)",
    "ggbSteps": [
      "Type: y = 3*x (Row Space ℛ)",
      "Type: y = 2*x (Column Space C)",
      "Type: x + 3*y = 0 (Null Space N)",
      "Observe ℛ and N are perpendicular!"
    ],
    "quiz": [
      {
        "question": "Set (i) defines the Row Space (ℛ) as α(1, 3) + β(2, 6). Since the set possesses two independent scalar sliders (α and β) controlling two 2-dimensional vectors, what geometric shape will this mathematically sweep out on the Geogebra grid?",
        "options": [
          "It will perfectly sweep out a vast, unrestricted 2-dimensional plane covering the entire Cartesian grid, because the presence of two unique parameters algebraically guarantees two independent degrees of spatial freedom.",
          "Because the second vector (2, 6) is just a perfectly scaled replica of the first vector (1, 3), it offers no new directional freedom, meaning the entire Row Space physically collapses into a single 1-dimensional line.",
          "The overlapping mathematical constants force the geometric output to strictly isolate the primary spatial variables, bounding the trajectory inside a solid parabolic geometric boundary.",
          "It generates a single 0-dimensional point permanently anchored at (1, 3)."
        ],
        "correct_option": "Because the second vector (2, 6) is just a perfectly scaled replica of the first vector (1, 3), it offers no new directional freedom, meaning the entire Row Space physically collapses into a single 1-dimensional line.",
        "explanation": "This is a trap for students who blindly count parameters! Yes, there are two parameters (α and β), but the vectors they are scaling point in the exact same direction. (2, 6) is just 2 × (1, 3). Since both 'steering wheels' force you to walk along the exact same path, your physical freedom of movement is permanently restricted to a single 1D straight line defined by y = 3x."
      },
      {
        "question": "Now analyze Set (ii), the Column Space (𝒞). If you plot absolutely every possible combination of α(1, 2) + β(3, 6), where does the final geometric output physically land?",
        "options": [
          "The output seamlessly spans the entire ℝ² space perfectly because the matrix possesses two independent column vectors that ensure a non-zero determinant.",
          "The vectors curve asymptotically toward the standard y-axis to maintain determinant equilibrium.",
          "It strictly maps to the 1-dimensional line y = 2x.",
          "It forms a rigid, 2-dimensional triangular boundary securely anchored by the coordinates (1, 2) and (3, 6) to prevent spatial overflow during transformations."
        ],
        "correct_option": "It strictly maps to the 1-dimensional line y = 2x.",
        "explanation": "The Column Space is the exact map of everywhere the matrix can possibly reach. Look at the columns: [1, 2]ᵀ and [3, 6]ᵀ. Just like the rows, the second column is a direct multiple of the first (it is exactly 3× the first). The matrix cannot step off this single track. It can only ever output coordinates where the y-value is exactly double the x-value (y = 2x)."
      },
      {
        "question": "Set (iii) defines the Null Space (𝒩) using the equation x(1, 2) + y(3, 6) = 0. Geometrically speaking, what is this specific algebraic equation asking you to do?",
        "options": [
          "It asks for the exact combination of scaling factors (x, y) that perfectly destructs the column vectors, forcing the final coordinate to land exactly on the absolute central origin.",
          "It asks you to calculate the orthogonal projection of the Row Space directly onto the vertical y-axis to isolate the independent geometric variables.",
          "It is actively seeking the primary eigenvector of the matrix engine to ensure the underlying spatial boundaries are preserved without catastrophic geometric rotation.",
          "It asks you to find the exact geometric inverse of the 2 × 2 matrix system."
        ],
        "correct_option": "It asks for the exact combination of scaling factors (x, y) that perfectly destructs the column vectors, forcing the final coordinate to land exactly on the absolute central origin.",
        "explanation": "The Null Space asks: 'How do we mix the columns together so they perfectly cancel out to zero?' It is looking for the specific ingredients (x and y) that will scale the vector (1, 2) and the vector (3, 6) so that when you add them up, you are trapped at (0, 0). For example, picking x = -3 and y = 1 does this perfectly: -3(1, 2) + 1(3, 6) = (-3, -6) + (3, 6) = (0, 0)."
      },
      {
        "question": "You have now plotted the Row Space (ℛ) and the Null Space (𝒩) on the exact same Geogebra grid. Both are 1-dimensional lines. What breathtaking geometric relationship physically materializes between them?",
        "options": [
          "They are completely parallel, never touching anywhere in the mathematical universe.",
          "They perfectly overlap, proving the input domain is completely self-contained and highly stable.",
          "They form a perfect 90-degree intersection.",
          "They intersect at exactly 45 degrees to safely maintain matrix determinant balance across the quadrants."
        ],
        "correct_option": "They form a perfect 90-degree intersection.",
        "explanation": "The Row Space is the line α(1, 3). The Null Space contains vectors like (-3, 1). If you plot the line passing through (1, 3) and the line passing through (-3, 1), they are flawlessly, perfectly perpendicular. You just verified the Fundamental Theorem of Linear Algebra with your own eyes: The Row Space and Null Space are Orthogonal Complements!"
      },
      {
        "question": "This matrix M is formally operating as a function mapping ℝ² ↦ ℝ². Based on your Geogebra plots of 𝒞 and 𝒩, what is this machine fundamentally doing to the fabric of the 2D universe?",
        "options": [
          "It perfectly preserves the 2-dimensional area of the inputs, seamlessly mapping every unique starting coordinate to a perfectly unique, reversible destination coordinate inside the Column Space.",
          "It expands the flat 2D plane into a fully realized 3D geometric volume by utilizing the independent column vectors as orthogonal depth parameters.",
          "It mathematically isolates the standard Cartesian axes and safely reflects the spatial geometry across the origin without any permanent loss of coordinate data.",
          "The matrix is aggressively crushing the entire 2-dimensional Cartesian plane down onto the 1-dimensional track of the Column Space, permanently destroying one complete dimension of mathematical freedom inside the Null Space."
        ],
        "correct_option": "The matrix is aggressively crushing the entire 2-dimensional Cartesian plane down onto the 1-dimensional track of the Column Space, permanently destroying one complete dimension of mathematical freedom inside the Null Space.",
        "explanation": "This is the dimensional collapse we studied in Module 3, now formally defined! The machine accepts a massive 2D input (the Domain), but its Range (the Column Space 𝒞) is only a 1D line. The 'missing' dimension was eaten by the Null Space (𝒩), which crushes entire 1D lines of input data directly into single dots. A 2 × 2 singular matrix flattens its reality."
      }
    ]
  },
  {
    "id": 40,
    "module": 4,
    "questionNumber": 2,
    "questionCode": "M4Q2",
    "quizNumber": 40,
    "title": "The Law of Orthogonal Complements",
    "emoji": "⚖️",
    "original_question": "Note that ℛ and N are orthogonal.",
    "goal": "Prove mechanically why matrix multiplication Mx = 0 forces ℛ ⊥ N.",
    "core_concept": "The dot product of [1, 3] with any vector [-3t, t]^T in N equals 1(-3t) + 3(t) = 0, proving perpendicularity.",
    "story": "The equation Mx = 0 is a physical orthogonality test. Every row of M is perpendicular to every vector in the Null Space.",
    "ggbType": "graphing",
    "ggbHint": "Plot vector r = Vector((1, 3))",
    "ggbSteps": [
      "Plot vector r = Vector((1, 3))",
      "Plot vector n = Vector((-3, 1))",
      "Compute Angle(r, n)",
      "Notice the angle is exactly 90 degrees!"
    ],
    "quiz": [
      {
        "question": "The text explicitly declares that the Row Space (ℛ) and the Null Space (𝒩) are orthogonal. What specific mechanical operation inside the equation Ax = 0 guarantees this 90-degree geometric relationship?",
        "options": [
          "Matrix multiplication strictly isolates the independent spatial coordinates and forces them into a parallel trajectory to safely maintain structural equilibrium.",
          "It mathematically calculates the exact cross product of the column vectors, naturally generating a third perpendicular parameter that balances the system.",
          "The zero-vector naturally aligns parallel to the primary eigenvector mapping, anchoring the geometry.",
          "The fundamental operation of matrix multiplication literally calculates the dot product between every single row vector of the matrix and the input vector x, and strictly setting that mathematical result to zero inherently defines absolute perpendicularity."
        ],
        "correct_option": "The fundamental operation of matrix multiplication literally calculates the dot product between every single row vector of the matrix and the input vector x, and strictly setting that mathematical result to zero inherently defines absolute perpendicularity.",
        "explanation": "The algebraic equation Ax = 0 is not just a random formula; it is a physical test for orthogonality. To multiply matrix A by vector x, you take the dot product of Row 1 with x, then Row 2 with x, and so on. If every single one of those dot products outputs a zero, the vector x is perfectly 90 degrees to every row."
      },
      {
        "question": "If an input vector x successfully dots to zero against the specific rows of the matrix, why does this geometrically guarantee it is perpendicular to the entire infinite plane of the Row Space (ℛ)?",
        "options": [
          "The geometric boundaries of any 2D Cartesian plane naturally force all external vectors to curve tangentially along its surface, effectively preventing any true orthogonal intersections at infinity.",
          "The distributive property mathematically ensures it remains perpendicular to any linear combination.",
          "Because the overarching spatial determinant universally scales all internal variables down to a single zero-dimensional point, permanently eliminating acute angles.",
          "The matrix strictly rotates the vectors into a parallel subspace."
        ],
        "correct_option": "The distributive property mathematically ensures it remains perpendicular to any linear combination.",
        "explanation": "The Row Space is the Span (all possible linear combinations) of the rows. If a vector is perfectly perpendicular to the structural foundation of a building (the individual rows), the distributive property of algebra guarantees it is mathematically perpendicular to the entire building (the combinations)."
      },
      {
        "question": "In M4Q1, the input Domain was ℝ² (a 2D room). The Row Space was a 1D line, and the Null Space was a perpendicular 1D line. When you combine their geometric dimensions (1 + 1 = 2), what profound truth about the mathematical universe does this reveal?",
        "options": [
          "They physically overlap each other at the origin to securely balance the matrix determinant.",
          "The perpendicular combination actively forces the underlying matrix output to violently expand into a highly complex 3-dimensional volume to prevent an algebraic overflow.",
          "These two strictly orthogonal spaces fundamentally split the entire foundational universe between them, acting as perfect geometric complements that seamlessly account for every single spatial dimension inside the input Domain.",
          "They permanently trap the primary eigenvector at the absolute zero coordinate."
        ],
        "correct_option": "These two strictly orthogonal spaces fundamentally split the entire foundational universe between them, acting as perfect geometric complements that seamlessly account for every single spatial dimension inside the input Domain.",
        "explanation": "This is the concept of Orthogonal Complements. In a 2-dimensional room, if the Row Space eats up exactly 1 dimension of freedom, there is exactly 1 dimension of freedom remaining. The Null Space perfectly claims whatever dimensions the Row Space leaves behind. Together, they form the complete 2D universe."
      },
      {
        "question": "Using the physical metaphor of shining a flashlight straight down, what is the Null Space actively doing in relation to the Row Space?",
        "options": [
          "It represents the exact set of vectors that cast zero physical shadow onto the Row Space.",
          "It represents the exact vectors that permanently mirror the Row Space coordinates across the primary Cartesian axes to safely maintain positive determinant geometry.",
          "It strictly identifies vectors that align perfectly parallel to the foundational Row Space matrix engine.",
          "It continuously calculates the maximum possible spatial projection distance across the matrix."
        ],
        "correct_option": "It represents the exact set of vectors that cast zero physical shadow onto the Row Space.",
        "explanation": "An orthogonal projection is mathematically identical to casting a shadow. If you hold a pencil perfectly, 100% straight up and down against a flat table, it casts no shadow. Because the Null Space is perfectly perpendicular to the Row Space, any vector living in the Null Space has absolutely zero projection (zero shadow) on the Row Space."
      },
      {
        "question": "Because the Row Space and Null Space are perfect orthogonal complements, what incredible rule applies to absolutely any random input vector v you choose to drop into the Domain?",
        "options": [
          "Any input vector is completely destroyed by the matrix engine unless it naturally aligns with the positive Cartesian quadrants to safely stabilize the structural bounds.",
          "It rigorously proves that the matrix is entirely non-invertible.",
          "It mathematically dictates that the Column Space must physically reside within the exact same geometric dimensions as the Null Space to securely balance the transformation.",
          "Absolutely any input vector in the entire universe can be physically constructed by walking a specific calculated distance along the Row Space, stopping, and then turning exactly 90 degrees to walk along the Null Space."
        ],
        "correct_option": "Absolutely any input vector in the entire universe can be physically constructed by walking a specific calculated distance along the Row Space, stopping, and then turning exactly 90 degrees to walk along the Null Space.",
        "explanation": "Because they cleanly split the universe, they form a perfect grid system. You can pick any random coordinate in the entire Domain space, and you can reach it simply by splitting your movement into two pieces: a piece that lives entirely in the Row Space, and a piece that lives entirely in the Null Space."
      }
    ]
  },
  {
    "id": 41,
    "module": 4,
    "questionNumber": 3,
    "questionCode": "M4Q3",
    "quizNumber": 41,
    "title": "Transposing Space and the Left Null Space",
    "emoji": "🔄",
    "original_question": "What is the null-space of M = [[1, 3], [2, 6]] & the null-space of M^T?",
    "goal": "Compute the Null Space of M and the Left Null Space N(M^T).",
    "core_concept": "N(M) is the line x + 3y = 0. Transposing swaps rows and columns, so N(M^T) is the line x + 2y = 0.",
    "story": "Transposing a matrix is a space-swapper: the old columns become new rows, and its null space becomes the Left Null Space.",
    "ggbType": "graphing",
    "ggbHint": "Type: x + 3*y = 0 (Null Space of M)",
    "ggbSteps": [
      "Type: x + 3*y = 0 (Null Space of M)",
      "Type: M_T = {{1, 2}, {3, 6}}",
      "Type: x + 2*y = 0 (Null Space of M^T)",
      "Observe they form two distinct 1D lines through the origin."
    ],
    "quiz": [
      {
        "question": "Let's start with the original matrix M = [[1, 3], [2, 6]]. To find its Null Space (𝒩(M)), we set Mx = 0. Geometrically, what does this mathematically evaluate to on the Cartesian grid?",
        "options": [
          "It calculates the internal determinant equilibrium of the column vectors, securely mapping the spatial variables onto the primary eigenvector bounded strictly by the trajectory y = 3x.",
          "It forms a completely flat 2-dimensional plane passing precisely through the absolute central origin to safely contain the geometry.",
          "It is the 1-dimensional line completely defined by the equation x + 3y = 0.",
          "It isolates the zero vectors, rotating the entire foundational grid by exactly 90 degrees to safely overlap with the overarching Column Space and prevent algebraic overflow."
        ],
        "correct_option": "It is the 1-dimensional line completely defined by the equation x + 3y = 0.",
        "explanation": "The Null Space asks for vectors [x, y]ᵀ that dot to zero against the rows of the matrix. The top row is [1, 3], yielding the strict equation 1x + 3y = 0. Because the bottom row [2, 6] is just a scaled copy (yielding 2x + 6y = 0), it provides no new restrictions. The Null Space is simply the 1D line where x + 3y = 0."
      },
      {
        "question": "The prompt then asks you to analyze Mᵀ (the transpose of the matrix). When you physically transpose a matrix, you flip it across its diagonal, turning its rows into columns. Geometrically, what is this operation actually doing to the architecture of the mathematical spaces?",
        "options": [
          "It mathematically calculates the exact negative reciprocal of the underlying determinant to safely prevent structural collapse.",
          "The transpose operation literally rips the original Column Space out of the output room and formally installs it as the brand new Row Space of the inverted machine, fundamentally swapping the physical roles of the domain and codomain.",
          "It applies a continuous orthogonal rotation that safely shifts the entire transformation grid into the complex mathematical plane, completely preserving the internal eigen-values without disturbing the existing geometry.",
          "It completely destroys the original matrix dimensions, brutally forcing a spatial collapse down into a single 0-dimensional scalar dot anchored at the origin."
        ],
        "correct_option": "The transpose operation literally rips the original Column Space out of the output room and formally installs it as the brand new Row Space of the inverted machine, fundamentally swapping the physical roles of the domain and codomain.",
        "explanation": "The Transpose is a 'Space Swapper.' Matrix M takes inputs from a Domain space and crushes them into a Codomain output space. Its columns define where it can reach. When you transpose to Mᵀ, those exact same columns now become the new rows! You have literally taken the output map of the original machine and turned it into the internal engine of a brand new machine."
      },
      {
        "question": "Now calculate the Null Space of this new transposed matrix (𝒩(Mᵀ)). The matrix Mᵀ evaluates to [[1, 2], [3, 6]]. What geometric shape does this new Null Space form?",
        "options": [
          "Because the matrix was physically transposed, the new mathematical null space naturally expands into a completely unrestricted 2-dimensional geometric plane to safely accommodate the shifted variables.",
          "It is permanently locked at the exact coordinate (3, 6) to rigorously prevent spatial inversion during the transformation process.",
          "It perfectly mirrors the original Null Space, flawlessly tracing the exact same 1-dimensional geometric line across the grid.",
          "It forms a distinct 1-dimensional straight line strictly governed by the equation x + 2y = 0."
        ],
        "correct_option": "It forms a distinct 1-dimensional straight line strictly governed by the equation x + 2y = 0.",
        "explanation": "Setting Mᵀy = 0 means taking the dot product against the new rows. The top row of Mᵀ is [1, 2], which generates the equation 1x + 2y = 0. The second row [3, 6] is just a multiple, offering no new rules. Therefore, the Null Space of the transpose is the 1D line x + 2y = 0."
      },
      {
        "question": "Let us look for the mind-blowing connection. We know the Column Space of the original matrix M is defined by vectors scaling the direction (1, 2). We just found the Null Space of Mᵀ is the line 1x + 2y = 0. What breathtaking physical reality does this expose?",
        "options": [
          "By mapping the exact coordinates of the transposed Null Space, you are physically discovering the hidden 'shadow space' of the output room—the specific set of geometric vectors that sit perfectly 90 degrees orthogonal to the original machine's Column Space.",
          "It proves that the transposed matrix and the original matrix must permanently share the exact same internal structural determinant regardless of how the parameters scale.",
          "The transposed null space aggressively expands to perfectly envelop the primary row vectors, confirming that spatial transformations permanently maintain a fully parallel trajectory.",
          "It safely forces all active spatial variables on the Cartesian plane to eventually evaluate to exactly zero."
        ],
        "correct_option": "By mapping the exact coordinates of the transposed Null Space, you are physically discovering the hidden 'shadow space' of the output room—the specific set of geometric vectors that sit perfectly 90 degrees orthogonal to the original machine's Column Space.",
        "explanation": "Look at the math! The Column Space of M is the line running in the direction of the vector [1, 2]ᵀ. The Null Space of Mᵀ is defined by x + 2y = 0. If you pick a vector in that Null Space, like [-2, 1]ᵀ, and dot it against the Column Space vector [1, 2]ᵀ, you get -2(1) + 1(2) = 0. They are flawlessly, universally perpendicular!"
      },
      {
        "question": "Because this new space 𝒩(Mᵀ) is perfectly perpendicular to the Column Space, it is formally known as the 'Left Null Space.' Geometrically, what is a Left Null Space?",
        "options": [
          "It mathematically represents the continuous 3-dimensional volumetric scaling factor applied to the Cartesian grid during an overdetermined linear operation.",
          "It strictly isolates the dependent variables inside the primary coordinate system to securely prevent algebraic overlap.",
          "It is the exact geometric blind spot of the output space.",
          "It is the foundational 2-dimensional plane that acts as a structural mirror, perfectly reflecting the input Domain across the absolute central origin to maintain structural matrix equilibrium."
        ],
        "correct_option": "It is the exact geometric blind spot of the output space.",
        "explanation": "Just like the regular Null Space (𝒩(M)) is the 'blind spot' of the input room (perpendicular to the rows), the Left Null Space (𝒩(Mᵀ)) is the 'blind spot' of the output room. It contains all the coordinates in the universe that the matrix M is physically incapable of casting a shadow on, because it sits perfectly 90 degrees away from the Column Space."
      }
    ]
  },
  {
    "id": 42,
    "module": 4,
    "questionNumber": 4,
    "questionCode": "M4Q4",
    "quizNumber": 42,
    "title": "The Fundamental Theorem of Linear Algebra",
    "emoji": "🏛️",
    "original_question": "Do you observe that C(M) ⊥ N(M^T) and ℛ(M) ⊥ N(M)?",
    "goal": "Confirm the Fundamental Theorem of Linear Algebra: both input and output rooms are split into orthogonal halves.",
    "core_concept": "In ℝ²: Domain splits into ℛ(M) ⊕ N(M); Codomain splits into C(M) ⊕ N(M^T).",
    "story": "The crowning achievement of linear algebra: the matrix perfectly partitions both its input room and its output room into orthogonal complements.",
    "ggbType": "graphing",
    "ggbHint": "Plot C(M): y = 2*x",
    "ggbSteps": [
      "Plot C(M): y = 2*x",
      "Plot N(M^T): x + 2*y = 0",
      "Check Angle: slope 2 and slope -1/2 are negative reciprocals (90°).",
      "Verify both pairs of subspaces are universally orthogonal!"
    ],
    "quiz": [
      {
        "question": "The equation dictates that R(M) ⊥ N(M). The Row Space and the Null Space. Because both of these specific spaces are generated directly by analyzing the matrix's rows, how do they physically interact with the overall mathematical universe?",
        "options": [
          "They physically overlap each other within the codomain of the matrix, mathematically compressing the standard universe down to a single axis point to safely maintain the structural determinant equilibrium of the spatial transformation.",
          "They exist together in the input domain, acting as geometric complements that perfectly split the entire universe of starting coordinates into two completely independent, perpendicular dimensions.",
          "They securely force the geometric dimensions to collapse, shifting the underlying spatial variables to run parallel to each other inside the output parameters.",
          "The perpendicular relationship actively forces the underlying matrix output to violently expand into a highly complex dimensional volume to strictly prevent an algebraic overflow error in the Cartesian grid."
        ],
        "correct_option": "They exist together in the input domain, acting as geometric complements that perfectly split the entire universe of starting coordinates into two completely independent, perpendicular dimensions.",
        "explanation": "The Row Space (the vectors the matrix is built from) and the Null Space (the vectors the matrix crushes to zero) both live in the 'Input Room' (the Domain). Because they are Orthogonal Complements, they act like a perfect x and y axis for the entire input universe. Every single starting coordinate that exists can be perfectly mapped by walking a certain distance along the Row Space, and then turning exactly 90 degrees to walk along the Null Space."
      },
      {
        "question": "The equation also dictates that C(M) ⊥ N(Mᵀ). The Column Space and the Left Null Space. Geometrically speaking, what physical reality does this establish inside the output room (the Codomain)?",
        "options": [
          "It rigorously proves that the transposed matrix and the original matrix must permanently share the exact same internal structural determinant regardless of how the initial input parameters are scaled during matrix multiplication.",
          "They mathematically mirror the original Null Space, flawlessly tracing the exact same 1-dimensional geometric line across the input grid to prevent spatial distortion.",
          "The Column Space acts as the flat, physical floor representing absolutely every geometric destination the machine can successfully reach, while the Left Null Space acts as the vertical flagpole shooting straight up into the output universe, containing every single unreachable coordinate that perfectly avoids casting any spatial shadow onto that floor.",
          "It mathematically isolates the dependent variables inside the primary coordinate system, safely ensuring the geometric dimensions inherently cancel each other out."
        ],
        "correct_option": "The Column Space acts as the flat, physical floor representing absolutely every geometric destination the machine can successfully reach, while the Left Null Space acts as the vertical flagpole shooting straight up into the output universe, containing every single unreachable coordinate that perfectly avoids casting any spatial shadow onto that floor.",
        "explanation": "This is the exact same splitting phenomenon, but now it is happening in the 'Output Room'! The Column Space is the map of everywhere the matrix can go. The Left Null Space (the Null Space of the Transpose) is its perfect orthogonal opposite. Together, the reachable space and the perfectly unreachable 'blind spot' mathematically piece together to account for the entire, infinite output universe."
      },
      {
        "question": "When we use the perpendicular symbol (⊥) between two entire infinite spaces like C(M) and N(Mᵀ), instead of just between two standard vectors, what rigid geometric constraint is being declared?",
        "options": [
          "It means that absolutely every vector inside the first space forms a flawless 90-degree angle with absolutely every vector inside the second space.",
          "It dictates that the two sets must mathematically share an identical foundation of basis vectors, permanently locking their trajectories in a parallel orientation to completely prevent the spatial engine from singularizing.",
          "It signifies the matrix mathematically isolates the standard Cartesian axes and safely reflects the spatial geometry without any permanent loss of internal scaling data.",
          "It is a strict algebraic requirement forcing the system determinant to continuously evaluate to negative one, allowing the spatial coordinates to safely reflect directly across the primary origin."
        ],
        "correct_option": "It means that absolutely every vector inside the first space forms a flawless 90-degree angle with absolutely every vector inside the second space.",
        "explanation": "If two lines are perpendicular, it's just an intersection. But if two spaces are orthogonal (like a 1D line perfectly sticking straight out of a flat 2D plane), it means you can close your eyes, pick any random vector pointing anywhere on the plane, and pick any random vector pointing anywhere along the line, and the angle between those two specific arrows will be exactly 90 degrees. It is an absolute universal constraint."
      },
      {
        "question": "Because these specific pairs of subspaces are Orthogonal Complements that completely fill their respective rooms, what incredible 'shortcut' does this provide for measuring dimensions (Rank)?",
        "options": [
          "Because the strict mathematical dot product calculated between the two constituent spaces evaluates to precisely zero, it naturally seals the space and completely prevents any orthogonal expansion into higher coordinate dimensions.",
          "They permanently trap the primary eigenvector at the absolute zero coordinate, mathematically proving that any non-square matrix inherently possesses a fully reversible spatial architecture.",
          "Because these orthogonal complements fundamentally piece together to form the entire physical room they reside inside, knowing the exact dimensional size of the Column Space automatically allows you to mathematically deduce the exact remaining dimensions of the Left Null Space without performing any further algebraic calculation.",
          "It geometrically isolates the independent variables, trapping the entire output within a single 0-dimensional point to securely prevent dimensional collapse across the transformation."
        ],
        "correct_option": "Because these orthogonal complements fundamentally piece together to form the entire physical room they reside inside, knowing the exact dimensional size of the Column Space automatically allows you to mathematically deduce the exact remaining dimensions of the Left Null Space without performing any further algebraic calculation.",
        "explanation": "Think about a 3D room. If you know the Column Space takes up a flat 2D floor (Rank = 2), you don't even need to do any math to figure out the Left Null Space. Because they must add up to equal the entire 3D room (2 + Left Null = 3), the Left Null Space must be exactly a 1D line! The dimensions of the orthogonal complements always add up perfectly to the dimension of the room they live inside."
      },
      {
        "question": "The absolute climax of this module is proving the Fundamental Theorem of Linear Algebra. Geometrically, what unbreakable physical constraint does this theorem place on every single matrix engine in the universe?",
        "options": [
          "It requires the underlying spatial system to naturally project all inputs onto a complex plane to safely hide redundant geometric data and prevent determinant collapse.",
          "It algebraically dictates that orthogonal variables inherently create volumetric output by permanently shifting the Column Space dimensions.",
          "It mathematically guarantees that the matrix perfectly splits both its input room and its output room into flawless, perpendicular geometric halves, leaving absolutely no coordinate in the universe unaccounted for.",
          "It rigorously establishes that spaces with more algebraic equations than physical dimensions must automatically collapse their excess variables into the nearest parallel subspace."
        ],
        "correct_option": "It mathematically guarantees that the matrix perfectly splits both its input room and its output room into flawless, perpendicular geometric halves, leaving absolutely no coordinate in the universe unaccounted for.",
        "explanation": "You have arrived at the crowning achievement of the subject. The Fundamental Theorem doesn't just give these spaces a name; it proves that the universe is perfectly balanced. The Row Space and Null Space perfectly piece together the input room, while the Column Space and Left Null Space perfectly piece together the output room. The matrix leaves no physical blind spots."
      }
    ]
  },
  {
    "id": 43,
    "module": 4,
    "questionNumber": 5,
    "questionCode": "M4Q5",
    "quizNumber": 43,
    "title": "Mapping the Architecture of a Singular Engine",
    "emoji": "🔬",
    "original_question": "Consider A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. What is N(A), C(A), ℛ(A), N(A^T).",
    "goal": "Calculate all Four Fundamental Subspaces for the classic 3×3 singular matrix A.",
    "core_concept": "Rank = 2. ℛ(A) is a 2D plane; N(A) is the 1D line (1, -2, 1); C(A) is a 2D plane; N(A^T) is the 1D line (1, -2, 1).",
    "story": "Analyze the four chambers of this 3×3 engine. Because A is symmetric in its spacing, its input blind spot matches its output blind spot!",
    "ggbType": "3d",
    "ggbHint": "In 3D view, plot plane ℛ(A): x - 2y + z = 0",
    "ggbSteps": [
      "In 3D view, plot plane ℛ(A): x - 2y + z = 0",
      "Plot normal line N(A): t*(1, -2, 1)",
      "Plot plane C(A) and normal line N(A^T)",
      "Notice the input room and output room each split into a 2D floor and 1D flagpole!"
    ],
    "quiz": [
      {
        "question": "You previously discovered that the third row of matrix A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] is just a mathematical combination of the first two rows, and the exact same is true for its columns. Knowing this, what is the geometric reality of its Row Space R(A) and Column Space C(A)?",
        "options": [
          "Because the numerical parameters strictly increase sequentially across all three spatial dimensions, the matrix geometrically guarantees a fully realized 3-dimensional volumetric output that safely prevents any overlapping coordinate data from singularizing.",
          "Both spaces are strictly flat 2-dimensional planes.",
          "The overlapping constants force the geometric output to strictly isolate the primary spatial variables, bounding the trajectories inside a solid 1-dimensional parabolic boundary to maintain determinant equilibrium.",
          "They form perfectly overlapping 3-dimensional spheres anchored precisely at the central origin to stabilize the continuous transformation."
        ],
        "correct_option": "Both spaces are strictly flat 2-dimensional planes.",
        "explanation": "Even though this matrix is a massive 3 × 3 grid of numbers, it is physically broken. Because the third row (and third column) offer absolutely no independent directional freedom, the machine only possesses two active 'steering wheels.' Therefore, both the map of its internal wiring R(A) and the map of its reachable destinations C(A) are permanently restricted to flat 2D sheets of paper."
      },
      {
        "question": "Knowing that the Row Space R(A) is a 2-dimensional plane living inside the 3-dimensional Input Room (ℝ³), what exact geometric shape must the Null Space N(A) take?",
        "options": [
          "The geometric boundaries of the 3 × 3 system strictly force the Null Space to align perfectly parallel to the Row Space, establishing a safe algebraic equilibrium that traps variables inside the primary Cartesian octant.",
          "The zero-vector naturally expands into a secondary 2-dimensional plane that mirrors the Row Space directly across the overarching algebraic origin.",
          "It must act as the 1-dimensional flagpole standing perfectly perpendicular to the 2-dimensional Row Space floor.",
          "It is aggressively crushed into a single 0-dimensional point because the matrix's internal determinant fundamentally destroys all underlying spatial vectors before the transformation completes."
        ],
        "correct_option": "It must act as the 1-dimensional flagpole standing perfectly perpendicular to the 2-dimensional Row Space floor.",
        "explanation": "The Fundamental Theorem of Linear Algebra demands that the Row Space and Null Space are perfect Orthogonal Complements. If the Input Room is a 3D universe, and the Row Space claims a flat 2D floor, the Null Space must cleanly claim the remaining 1 dimension of physical freedom. It is the single 1D vertical line shooting straight out of that plane."
      },
      {
        "question": "Now looking at the Output Room (ℝ³), you know the Column Space C(A) is a 2-dimensional plane. What does the Left Null Space N(Aᵀ) physically represent in this universe?",
        "options": [
          "It geometrically defines the exact 1-dimensional line of unreachable coordinates that cast absolutely zero physical shadow onto the 2-dimensional Column Space floor.",
          "It mathematically isolates the dependent variables inside the primary coordinate system, safely ensuring the geometric dimensions inherently cancel each other out to prevent spatial distortion.",
          "It calculates the internal determinant equilibrium of the column vectors, securely mapping the spatial variables onto the primary eigenvector bounded strictly by the trajectory of the origin.",
          "It completely destroys the original matrix dimensions by forcing a spatial projection directly onto the complex mathematical plane."
        ],
        "correct_option": "It geometrically defines the exact 1-dimensional line of unreachable coordinates that cast absolutely zero physical shadow onto the 2-dimensional Column Space floor.",
        "explanation": "Just like the input room, the output room is perfectly split! The Column Space C(A) is the 2D flat floor of everywhere the machine can actually reach. The Left Null Space N(Aᵀ) is the 1D normal line shooting out of it. Any coordinate living on that line is not only physically unreachable by the matrix, but it also sits perfectly at 90 degrees to the entire reachable universe."
      },
      {
        "question": "If you actually calculate the specific numerical vectors, you will discover that the line generating N(A) and the line generating N(Aᵀ) both point in the exact same direction: (1, -2, 1). Why do the two blind spots of this specific matrix perfectly match?",
        "options": [
          "It strictly proves that any symmetric or sequentially numbered matrix automatically collapses its spatial parameters into a generalized 1-dimensional line to avoid an algebraic overflow.",
          "The transpose operation inherently forces all output parameters to perfectly mirror their corresponding input variables, guaranteeing a shared coordinate space regardless of the starting foundation.",
          "The overarching spatial determinant universally scales all internal variables down to a single dimension, permanently aligning the independent axes.",
          "Because the internal algebraic scaling pattern separating the horizontal rows is physically identical to the scaling pattern separating the vertical columns, the exact directional vector required to cancel out the inputs happens to be the exact same vector required to avoid the outputs."
        ],
        "correct_option": "Because the internal algebraic scaling pattern separating the horizontal rows is physically identical to the scaling pattern separating the vertical columns, the exact directional vector required to cancel out the inputs happens to be the exact same vector required to avoid the outputs.",
        "explanation": "Look at the numbers! Row 2 is exactly halfway between Row 1 and Row 3. Column 2 is exactly halfway between Column 1 and Column 3. Because the structural 'gap' between the numbers is perfectly identical horizontally and vertically, the specific vector (1, -2, 1) that perfectly balances the row equations also perfectly balances the column equations!"
      },
      {
        "question": "Stepping back, you have mapped the Input Room (ℝ³) by finding the dimension of R(A) and the dimension of N(A). What simple mathematical equation proves you have successfully accounted for the entire physical universe?",
        "options": [
          "3 × 1 = 3.",
          "3 - 1 = 2.",
          "2 + 1 = 3.",
          "3 + 0 = 3."
        ],
        "correct_option": "2 + 1 = 3.",
        "explanation": "This is the absolute beauty of the Rank-Nullity Theorem. You live in a 3-dimensional universe. The Row Space took up exactly 2 dimensions of that universe. The Null Space perfectly claimed the remaining 1 dimension. Added together (2 + 1), they flawlessly reconstruct the entire 3-dimensional space. Nothing is lost, and nothing is left over."
      }
    ]
  },
  {
    "id": 44,
    "module": 4,
    "questionNumber": 6,
    "questionCode": "M4Q6",
    "quizNumber": 44,
    "title": "Engineering Dimensional Collapse in Hyperspace",
    "emoji": "🌌",
    "original_question": "Consider a 4x4 matrix M: ℝ⁴ -> ℝ⁴ whose range is\na) 4-Dimension\nb) 3-Dimension\nc) 2-Dimension\nd) 1-Dimension\ne) 0-Dimension\nGive an example each for all the above 5 cases.",
    "goal": "Construct 4×4 matrices with ranges of dimensions 4, 3, 2, 1, and 0 using rank control.",
    "core_concept": "Rank can be dialed from 4 (Identity matrix) down to 0 (Zero matrix) by selectively zeroing diagonal entries or repeating columns.",
    "story": "You are the matrix engineer. Build machines that preserve all 4 dimensions, collapse 1, 2, or 3 dimensions, or obliterate the entire universe to a single dot.",
    "ggbType": "graphing",
    "ggbHint": "Rank 4: Identity matrix diag(1, 1, 1, 1)",
    "ggbSteps": [
      "Rank 4: Identity matrix diag(1, 1, 1, 1)",
      "Rank 3: diag(1, 1, 1, 0)",
      "Rank 2: diag(1, 1, 0, 0)",
      "Rank 1: diag(1, 0, 0, 0)",
      "Rank 0: Zero matrix (all zeros)."
    ],
    "quiz": [
      {
        "question": "To engineer a 4 × 4 matrix whose Range (Column Space) successfully preserves all 4 dimensions of spatial freedom, what fundamental algebraic requirement must be met?",
        "options": [
          "The geometric dot product calculated between all internal constituent columns must perfectly evaluate to exactly zero, safely sealing the output parameters from spatial overlap.",
          "The overarching spatial determinant must continuously evaluate to negative one, allowing the variables to seamlessly reflect directly across the primary origin.",
          "The columns must be symmetrically aligned to safely contain the primary eigenvectors, forcing the geometric boundaries into a rigid parallel structure.",
          "Every single column inside the matrix must represent a completely unique, independent direction of movement that cannot be constructed by scaling or adding any of the other columns together."
        ],
        "correct_option": "Every single column inside the matrix must represent a completely unique, independent direction of movement that cannot be constructed by scaling or adding any of the other columns together.",
        "explanation": "Dimensionality is freedom. To move freely in 4 different directions inside a 4D room, you need 4 completely independent 'steering wheels.' If even one column is just a combination of the others (for example, Column 4 is just Column 1 plus Column 2), you lose a steering wheel, and the output space immediately collapses into a lower dimension."
      },
      {
        "question": "Which of the following matrices guarantees a flawless 4-dimensional Range and acts as the perfect 1-to-1 mapping engine?",
        "options": [
          "A matrix completely filled with the number 4.",
          "The Identity Matrix, consisting of 1s down the main diagonal and 0s everywhere else.",
          "Any mathematically symmetrical matrix that balances positive and negative coordinate geometry across the primary axes.",
          "A matrix where every row is exactly double the value of the previous row."
        ],
        "correct_option": "The Identity Matrix, consisting of 1s down the main diagonal and 0s everywhere else.",
        "explanation": "The Identity Matrix is the purest form of linear independence. The columns are (1,0,0,0), (0,1,0,0), (0,0,1,0), and (0,0,0,1). Each column acts as a dedicated controller for exactly one unique spatial axis. Because they have absolutely no overlap, this machine maps every 4D input perfectly to a unique 4D output without ever crushing a single dimension."
      },
      {
        "question": "To intentionally build a matrix whose Range is strictly 3-dimensional, how must you manipulate the internal geometric wiring of the 4 × 4 engine?",
        "options": [
          "You construct a matrix where exactly three of the columns point in totally unique directions, but the fourth column is simply a mathematical copy or combination of the others, permanently destroying one degree of freedom.",
          "You physically remove one of the rows to safely compress the variables down into a stable geometric state that prevents determinant overflow.",
          "You mathematically force the entire system to project its final coordinates directly onto a perpendicular plane that mirrors the foundation.",
          "You isolate the independent variables and actively align them with the Null Space trajectory, guaranteeing the output remains completely parallel to the input domain."
        ],
        "correct_option": "You construct a matrix where exactly three of the columns point in totally unique directions, but the fourth column is simply a mathematical copy or combination of the others, permanently destroying one degree of freedom.",
        "explanation": "To collapse a single dimension, you simply break one of the steering wheels. You can keep the first three columns of the Identity Matrix, but make the fourth column an exact duplicate of the third column. You now have a 4 × 4 matrix, but because the fourth column offers no new directions to walk in, the machine can only ever reach a 3-dimensional volume of space."
      },
      {
        "question": "If you engineer a matrix whose Range is severely restricted to a 1-dimensional line, what breathtaking reality occurs inside the Input Room (ℝ⁴) due to the Law of Orthogonal Complements?",
        "options": [
          "The mathematical system instantly generates a hyper-dimensional geometric bubble to securely house the variables that completely missed the primary output trajectory.",
          "The geometric dimensions mathematically collapse, forcing the Row Space to violently rotate until it physically aligns perfectly parallel with the Column Space.",
          "Because the Range (Column Space) only occupies 1 dimension of freedom, the Null Space must aggressively expand to consume the remaining 3 dimensions, meaning the matrix crushes an entire massive 3-dimensional universe of data down into absolute zero every single time it operates.",
          "The matrix physically alters the universe itself, permanently deleting the standard axes to safely balance the algebraic equation."
        ],
        "correct_option": "Because the Range (Column Space) only occupies 1 dimension of freedom, the Null Space must aggressively expand to consume the remaining 3 dimensions, meaning the matrix crushes an entire massive 3-dimensional universe of data down into absolute zero every single time it operates.",
        "explanation": "This is the Rank-Nullity Theorem working in hyperspace! If the matrix outputs a tiny 1D line (Rank = 1), the missing dimensions didn't just vanish. They were eaten by the Null Space. If the Input Room has 4 dimensions, and the Row Space only takes up 1 dimension, the Null Space must be a massive, 3-dimensional solid volume. Everything inside that massive 3D volume is crushed instantly into the (0, 0, 0, 0) origin."
      },
      {
        "question": "What is the only possible matrix in the entire mathematical universe that possesses a 0-dimensional Range?",
        "options": [
          "A matrix entirely composed of the number one, which naturally neutralizes the internal dimensions by eliminating geometric variances.",
          "A matrix completely filled with zeros.",
          "A matrix completely filled with negative numbers, reflecting the coordinates into the negative quadrant to completely zero out the underlying Cartesian dimensions.",
          "A matrix structurally designed to mathematically separate the dependent variables from the primary axis, trapping the output exactly halfway between the foundation vectors."
        ],
        "correct_option": "A matrix completely filled with zeros.",
        "explanation": "A 0-dimensional geometric object is a single, unmoving dot (specifically, the origin). If the Range is 0-dimensional, it means absolutely every single vector you feed into the machine gets mapped directly to zero. The only machine that destroys every single number in the universe and outputs absolutely nothing but zero is the Zero Matrix."
      }
    ]
  },
  {
    "id": 45,
    "module": 4,
    "questionNumber": 7,
    "questionCode": "M4Q7",
    "quizNumber": 45,
    "title": "The Inescapable Grid",
    "emoji": "🕸️",
    "original_question": "Consider A : ℝ³ -> ℝ³\na) Show that if the range contains a point (a,b,c), then it should contain the entire set S, defined by: S = { alpha(a, b, c) | alpha in ℝ }.\nb) Show that if the range contains the points (a,b,c) and (d,e,f), then the range contains the entire set T defined by: T = { alpha(a,b,c) + beta(d,e,f) | alpha, beta in ℝ }.\nc) Note: S is of dimension 1, but T needn't be of dimension 2. Think!",
    "goal": "Prove that the Range of a linear map is closed under scalar multiplication and addition, defining a true Subspace.",
    "core_concept": "By linearity A(alpha*u + beta*v) = alpha*A(u) + beta*A(v). Hence the Range is an inescapable linear subspace.",
    "story": "Once you enter the Range of a matrix, no linear combination can ever escape. You are trapped inside an inescapable mathematical grid.",
    "ggbType": "3d",
    "ggbHint": "In 3D view, plot vector u = (1, 2, 3)",
    "ggbSteps": [
      "In 3D view, plot vector u = (1, 2, 3)",
      "Plot line S = alpha * u (closed under scaling)",
      "Plot vector v = (2, 4, 6) and notice T remains 1D because v is collinear with u!",
      "Plot independent v to see T expand into a full 2D plane."
    ],
    "quiz": [
      {
        "question": "The prompt states that if the matrix engine can reach the specific coordinate (a, b, c), it must automatically be able to reach the entire infinite set S = {α(a, b, c) | α ∈ ℝ}. Why is this geometrically and algebraically absolute?",
        "options": [
          "It mathematically forces all variables to equalize at exactly zero, making any geometric intersection visually impossible to track on a standard Cartesian grid.",
          "Because the underlying determinant aggressively isolates the spatial variables into a parallel trajectory to safely maintain dimensional equilibrium.",
          "The fundamental linearity of the matrix engine (A(αx) = αAx) guarantees that if it can physically reach a specific destination, it inherently possesses the continuous scalar multiplier required to stretch, shrink, or reverse that exact trajectory infinitely in both directions.",
          "It completely rotates the foundational grid by 90 degrees to safely overlap the Row Space."
        ],
        "correct_option": "The fundamental linearity of the matrix engine (A(αx) = αAx) guarantees that if it can physically reach a specific destination, it inherently possesses the continuous scalar multiplier required to stretch, shrink, or reverse that exact trajectory infinitely in both directions.",
        "explanation": "This is called being 'Closed under Scalar Multiplication.' If a matrix can shoot a laser beam and hit a specific coordinate, it hasn't just unlocked that one dot. By tweaking the input (multiplying it by α), the matrix can scale the output to hit any point along that exact same laser beam. The single point (a, b, c) organically implies an entire infinite 1-dimensional line."
      },
      {
        "question": "Now look at set T = {α(a, b, c) + β(d, e, f) | α, β ∈ ℝ}. If the machine can reach two specific points, this equation states it can reach every combination of them. Assuming the two points are fully independent, what does set T geometrically represent in the Output Room?",
        "options": [
          "A completely flat, infinite 2-dimensional plane.",
          "A solid, 3-dimensional spherical volume bounded strictly by the orthogonal cross product of the two foundation coordinates to safely prevent dimensional overflow.",
          "A rigid mathematical boundary reflecting the Cartesian quadrants directly across the primary central origin to establish a balanced trajectory.",
          "An infinite series of parallel 1-dimensional lines seamlessly stacked to naturally form a complex parabolic dome."
        ],
        "correct_option": "A completely flat, infinite 2-dimensional plane.",
        "explanation": "This is called being 'Closed under Addition' (Linear Combinations). If the machine can reach a point on the East wall, and a point on the North wall, you can mix those two directions (α and β) to reach absolutely anywhere on the flat 2-dimensional floor stretched between them."
      },
      {
        "question": "Part (c) drops a massive trap! It states that while S is firmly a 1-dimensional line, T might actually not be 2-dimensional. How could combining two distinct coordinates physically fail to create a 2D plane?",
        "options": [
          "Because spatial variables inherently cancel each other out over sequential matrix multiplications, permanently erasing the mathematical constants.",
          "If the overarching spatial determinant specifically scales the variables into a negative geometric quadrant, naturally reflecting the geometry and forcing an artificial boundary layer that crushes the output.",
          "Because the mathematical addition of two distinct 3-dimensional vectors strictly demands a continuous dimensional expansion to safely prevent the internal parameters from experiencing an algebraic overflow error.",
          "If the second coordinate (d, e, f) happens to sit perfectly on the exact same 1-dimensional line as (a, b, c), meaning it offers absolutely zero new directional freedom."
        ],
        "correct_option": "If the second coordinate (d, e, f) happens to sit perfectly on the exact same 1-dimensional line as (a, b, c), meaning it offers absolutely zero new directional freedom.",
        "explanation": "Linear Dependence strikes again! Just because you have two parameters (α and β) and two vectors, it does not guarantee 2 dimensions. If your first vector is (1, 2, 3) and your second vector is (2, 4, 6), your second 'steering wheel' is just pointing in the exact same direction as the first. The combination mathematically collapses, and your promised 2D plane violently crushes down into a 1D line."
      },
      {
        "question": "What happens to the geometric reality of set T if you decide to set both control sliders α = 0 and β = 0?",
        "options": [
          "It physically isolates the independent variables into an undefined mathematical state.",
          "It proves that the space must flawlessly pass through the absolute central origin coordinate (0, 0, 0).",
          "It rigorously establishes that linear combinations naturally generate a constant offset vector +C to safely stabilize the transformation matrix across the entire geometric domain.",
          "It completely destroys the original matrix dimensions, forcing a spatial collapse directly onto the complex mathematical plane."
        ],
        "correct_option": "It proves that the space must flawlessly pass through the absolute central origin coordinate (0, 0, 0).",
        "explanation": "Because scaling by zero is always a mathematically valid choice for a real number, any space generated by a linear combination αv + βw will always evaluate to (0, 0, 0) when the sliders are zero. This is a foundational rule: legitimate vector spaces never float randomly in the air; they are perfectly anchored to the origin."
      },
      {
        "question": "Together, these two rules (the space scales infinitely, and you can add any two points inside the space to find another point inside the space) form the absolute definition of what geometric concept?",
        "options": [
          "The Rank-Nullity Theorem.",
          "They define the strict Orthogonal Projection limits, mathematically guaranteeing that any spatial coordinates successfully avoid crossing the Null Space trajectory.",
          "They represent the absolute requirements for a geometric space to be formally classified as a 'Subspace,' proving that the Range is a self-contained mathematical universe where you can never accidentally combine vectors and fall off the edge.",
          "The Eigenvector Alignment Axiom."
        ],
        "correct_option": "They represent the absolute requirements for a geometric space to be formally classified as a 'Subspace,' proving that the Range is a self-contained mathematical universe where you can never accidentally combine vectors and fall off the edge.",
        "explanation": "This is the formal, textbook definition of a Subspace. A Subspace (like a line or a plane passing through the origin) is an inescapable grid. Once you are inside the Column Space, no matter how hard you stretch a vector (α), or how you add two vectors together, your final destination will always still land perfectly inside that same Column Space. You can never break out of the matrix's reach."
      }
    ]
  },
  {
    "id": 46,
    "module": 5,
    "questionNumber": 1,
    "questionCode": "M5Q1",
    "quizNumber": 46,
    "title": "Architecting the Cartesian Universe",
    "emoji": "🏗️",
    "original_question": "Give an example of two 2-dim subspaces in ℝ³. Let us call it S_1, S_2.",
    "goal": "Construct two distinct 2-dimensional planes in ℝ³ passing through (0,0,0) and observe their intersection line.",
    "core_concept": "Any two distinct 2D subspaces in ℝ³ must intersect in a 1D line passing through the origin.",
    "story": "Take two infinite sheets of paper inside a 3D room and force them both to touch the origin. They must slice through each other, creating a crease.",
    "ggbType": "3d",
    "ggbHint": "In 3D view, plot S1: z = 0 (the xy-plane)",
    "ggbSteps": [
      "In 3D view, plot S1: z = 0 (the xy-plane)",
      "Plot S2: x + y + z = 0 (a slanted plane through origin)",
      "Type: Intersect(z = 0, x + y + z = 0)",
      "Observe the intersection crease is an infinite 1D line through (0,0,0)!"
    ],
    "quiz": [
      {
        "question": "The prompt asks you to imagine a '2-dim subspace' floating inside the ℝ³ universe. Geometrically, what exactly are you visualizing in your mind?",
        "options": [
          "It naturally forms a bounded, spherical 2-dimensional boundary layer that mathematically traps the primary eigenvector trajectories to safely prevent an algebraic spatial overflow.",
          "It rigidly aligns as a completely parallel affine surface suspended precisely one unit above the foundational Cartesian axes to flawlessly maintain determinant equilibrium.",
          "A completely flat, infinite 2-dimensional plane that flawlessly passes through the absolute central origin coordinate.",
          "A massive, 3-dimensional volumetric void strictly contained within the primary positive octant of the coordinate system."
        ],
        "correct_option": "A completely flat, infinite 2-dimensional plane that flawlessly passes through the absolute central origin coordinate.",
        "explanation": "A 2-dimensional space is a flat sheet of paper. But for that sheet of paper to officially be classified as a 'Subspace' (an inescapable mathematical grid), it cannot just float randomly in the air. It must perfectly intersect the absolute origin of the universe (0, 0, 0)."
      },
      {
        "question": "If you are tasked with physically building this 2-dim subspace S₁ from scratch in Geogebra, what algebraic ingredients do you require to generate it?",
        "options": [
          "You must systematically combine three collinear coordinates to aggressively flatten the volumetric depth and map the geometric transformation directly onto the complex mathematical plane.",
          "You select exactly two completely independent vectors to act as the steering wheels and compute every possible scalar combination of them, sweeping out a vast, flat geometric surface that spans two independent directions.",
          "By calculating the exact orthogonal cross product of a singular foundational vector to naturally isolate the perpendicular parameters and establish a solid bounding boundary layer.",
          "You set the overarching matrix determinant strictly equal to negative one, allowing the spatial vectors to safely reflect across the primary origin axis."
        ],
        "correct_option": "You select exactly two completely independent vectors to act as the steering wheels and compute every possible scalar combination of them, sweeping out a vast, flat geometric surface that spans two independent directions.",
        "explanation": "To build a 2D plane (2 degrees of freedom), you need exactly two 'steering wheels.' Those steering wheels must be two independent vectors (they cannot point in the exact same direction). By taking all possible linear combinations of those two vectors (their Span), you successfully sweep out an entire flat 2D plane."
      },
      {
        "question": "Which of the following is a flawless, mathematically valid physical example of the 2-dim subspace S₁?",
        "options": [
          "The infinite flat sheet representing the standard xy-plane.",
          "The specific geometric trajectory mapped perfectly by scaling the singular basis vector (1, 1, 1) infinitely across all positive parameter values to prevent coordinate inversion.",
          "The infinite set of all spatial vectors strictly defined by the equation z = 1, which safely shifts the geometry upward to prevent the coordinates from collapsing into an undefined zero state.",
          "A massive 3-dimensional volumetric solid perfectly enclosed by the independent coordinates (1, 0, 0) and (0, 1, 0) to strictly maintain geometric equilibrium across the continuous transformation process."
        ],
        "correct_option": "The infinite flat sheet representing the standard xy-plane.",
        "explanation": "The xy-plane (where z = 0) is the most classic 2D subspace in existence. It is completely flat, it spans two dimensions (North/South and East/West), and it flawlessly passes exactly through the origin (0, 0, 0). Option C (where z = 1) is a trap; it is a flat plane, but because it misses the origin, it fails the subspace test."
      },
      {
        "question": "You have successfully built S₁ (perhaps the xy-plane) and a completely distinct 2D plane S₂ (perhaps a slanted plane). Because both of these flat planes are forced to share the exact same 3D room (ℝ³) and both must pass through the origin, what happens when they physically interact?",
        "options": [
          "Because the underlying determinant aggressively isolates the spatial variables into parallel trajectories, the two planes will permanently run alongside each other without ever physically intersecting.",
          "The spatial constraints organically force them to collide at exactly one singular 0-dimensional point located strictly at the absolute origin to safely maintain structural bounds.",
          "They are physically forced to slice directly through each other, permanently generating an infinite 1-dimensional straight crease passing perfectly through the origin.",
          "They perfectly wrap around each other to establish a 3-dimensional spherical void."
        ],
        "correct_option": "They are physically forced to slice directly through each other, permanently generating an infinite 1-dimensional straight crease passing perfectly through the origin.",
        "explanation": "You cannot put two infinite, flat sheets of paper inside a 3D room, force them both to touch the exact center of the room, and keep them from hitting each other. They must intersect! Geometrically, when two distinct 2D planes slice through each other, they create a crease. That crease is an infinite 1D line passing directly through (0, 0, 0)."
      },
      {
        "question": "Why is it an absolute, unbreakable mathematical law that both S₁ and S₂ must contain the specific coordinate (0, 0, 0)?",
        "options": [
          "To safely isolate the orthogonal projection boundaries and rigorously prevent the dependent variables from experiencing an overarching algebraic matrix overflow during geometric transposition.",
          "The fundamental rule of linear combinations demands that scaling any basis vector by zero must perfectly evaluate to the zero coordinate, geometrically proving that a true mathematical subspace can never float freely without an anchor.",
          "It mathematically guarantees that the internal determinant scaling factor remains perfectly locked to positive one.",
          "So the primary eigenvectors can reliably align perfectly parallel to the foundational Row Space matrix engine."
        ],
        "correct_option": "The fundamental rule of linear combinations demands that scaling any basis vector by zero must perfectly evaluate to the zero coordinate, geometrically proving that a true mathematical subspace can never float freely without an anchor.",
        "explanation": "A subspace is built by taking a linear combination of vectors: αv + βw. Because the parameters α and β can be any real number, you are always allowed to choose α = 0 and β = 0. This means the output will definitively equal (0, 0, 0)."
      }
    ]
  },
  {
    "id": 47,
    "module": 5,
    "questionNumber": 2,
    "questionCode": "M5Q2",
    "quizNumber": 47,
    "title": "Architecting the Shadow Spaces",
    "emoji": "👥",
    "original_question": "Let S_3 be all those vectors perpendicular to S_1. S_4 be that of S_2.",
    "goal": "Construct the orthogonal complements S3 = S1^⊥ and S4 = S2^⊥ in ℝ³.",
    "core_concept": "Because dim(S1) = 2 in ℝ³, its orthogonal complement S3 is a 1-dimensional line (3 - 2 = 1).",
    "story": "If S1 is the floor, S3 is the flagpole shooting straight up. S3 and S4 are the shadow spaces of the Cartesian room.",
    "ggbType": "3d",
    "ggbHint": "For S1 (z = 0), normal vector is (0, 0, 1) -> S3 is the z-axis line.",
    "ggbSteps": [
      "For S1 (z = 0), normal vector is (0, 0, 1) -> S3 is the z-axis line.",
      "For S2 (x + y + z = 0), normal vector is (1, 1, 1) -> S4 is the line t*(1, 1, 1).",
      "Plot both 1D lines in 3D view.",
      "Confirm each line is perpendicular to its respective plane."
    ],
    "quiz": [
      {
        "question": "The prompt defines S₃ as the set of all vectors perpendicular to S₁. Knowing that S₁ is a flat 2-dimensional plane living inside a 3-dimensional universe (ℝ³), what is the exact physical reality of S₃?",
        "options": [
          "It naturally forms a secondary 2-dimensional plane that mirrors the original foundation across the primary central origin to safely establish determinant equilibrium.",
          "It aggressively inflates into a 3-dimensional spherical volume bounded strictly by the orthogonal cross product of the input variables to rigorously prevent geometric overflow.",
          "It is immediately crushed into a single 0-dimensional point because the matrix projection engine fundamentally destroys perpendicular trajectories to avoid algebraic overlapping.",
          "It must perfectly consume the single remaining degree of spatial freedom, physically manifesting as a single infinite 1-dimensional line."
        ],
        "correct_option": "It must perfectly consume the single remaining degree of spatial freedom, physically manifesting as a single infinite 1-dimensional line.",
        "explanation": "This is the geometry of the dimensions splitting! If the universe is 3D, and the floor (S₁) takes up exactly 2 dimensions of freedom, you only have 3 - 2 = 1 dimension of freedom left. Therefore, the complete set of all vectors perpendicular to that 2D floor must form a strictly 1-dimensional line."
      },
      {
        "question": "If you plotted the 2-dimensional plane S₁ and the 1-dimensional line S₃ on the exact same 3D Cartesian grid, how would they visually interact?",
        "options": [
          "The line S₃ completely wraps around the outer perimeter of S₁ to create a protective, parabolic geometric boundary layer that strictly isolates the active variables.",
          "It is the exact vertical flagpole shooting straight out of the flat geometric floor.",
          "The mathematical system forces the line to run perfectly parallel to the plane, hovering exactly one constant unit away across the z-axis to avoid an undefined intersection.",
          "They perfectly overlap each other inside the first positive Cartesian octant to securely lock the matrix determinant at a stable positive integer."
        ],
        "correct_option": "It is the exact vertical flagpole shooting straight out of the flat geometric floor.",
        "explanation": "Because S₃ is defined as being completely perpendicular to S₁, it must shoot directly away from the plane at a flawless 90-degree angle. If S₁ is the ground you are standing on, S₃ is the vertical flagpole."
      },
      {
        "question": "In the highest levels of formal Linear Algebra, we state that S₁ and S₃ are 'Orthogonal Complements.' Beyond just being a vocabulary word, what profound physical reality does this phrase guarantee?",
        "options": [
          "It strictly establishes that the internal determinant scaling factor applied to the Cartesian grid during an overdetermined linear operation evaluates to zero.",
          "It rigorously guarantees that any completely random coordinate in the entire 3D universe can be successfully reached by walking a specific calculated distance along the flat floor of S₁, and then turning exactly 90 degrees to walk up or down the vertical flagpole of S₃.",
          "The spatial constraints organically force them to permanently avoid intersecting at the absolute origin to safely maintain structural bounds during orthogonal projection calculations.",
          "The Collinear Projection Boundary limits the variables from escaping the primary quadrant."
        ],
        "correct_option": "It rigorously guarantees that any completely random coordinate in the entire 3D universe can be successfully reached by walking a specific calculated distance along the flat floor of S₁, and then turning exactly 90 degrees to walk up or down the vertical flagpole of S₃.",
        "explanation": "'Complements' means they complete the universe together. Because they are perpendicular and their dimensions add up to exactly 3 (2D + 1D = 3D), they act as a flawless master coordinate system. You can reach any speck of dust in the 3D room by using only the floor and the flagpole."
      },
      {
        "question": "Both S₁ and S₃ are legitimate subspaces, meaning they stretch infinitely through the universe. Where exactly do these two infinite geometric objects physically touch each other?",
        "options": [
          "They collide exclusively at the absolute central origin coordinate.",
          "They intersect along an infinite 1-dimensional mathematical crease that flawlessly bisects the standard Cartesian axes.",
          "Because they actively align their independent dependent variables, they remain perfectly asymptotic and never physically touch.",
          "They perfectly share an entire 2-dimensional geometric boundary layer spanning the positive coordinate plane."
        ],
        "correct_option": "They collide exclusively at the absolute central origin coordinate.",
        "explanation": "A line strictly perpendicular to a flat plane can only pierce through that plane at exactly one single point. Because every legitimate subspace must be anchored to (0, 0, 0), that single point of intersection must be the origin."
      },
      {
        "question": "We are preparing to build a matrix. If we eventually decide that the 2-dimensional plane S₁ is going to act as the internal Row Space for our new matrix engine, what geometric role is S₃ guaranteed to play?",
        "options": [
          "S₃ represents the continuously expanding Column Space that safely prevents the matrix output from experiencing catastrophic dimensional collapse.",
          "S₃ acts as the dominant Eigen-Space, ensuring the fundamental basis vectors remain entirely immune to being rotated by the transformation engine.",
          "S₃ acts as the fundamental Left Null Space, mathematically confirming the matrix output room possesses a fully reversible spatial architecture.",
          "The fundamental rules of the universe will automatically force S₃ to act as the exact geometric manifestation of the Null Space."
        ],
        "correct_option": "The fundamental rules of the universe will automatically force S₃ to act as the exact geometric manifestation of the Null Space.",
        "explanation": "The Row Space and the Null Space are Orthogonal Complements. If we intentionally force our Row Space to be the 2D plane S₁, the universe dictates that the Null Space must be the perpendicular 1D line S₃."
      }
    ]
  },
  {
    "id": 48,
    "module": 5,
    "questionNumber": 3,
    "questionCode": "M5Q3",
    "quizNumber": 48,
    "title": "Reverse-Engineering the Matrix Engine",
    "emoji": "🛠️",
    "original_question": "Find a matrix M whose Null-Space is S_3, column space is S_2.",
    "goal": "Construct a 3×3 matrix M from scratch given its Null Space S3 and Column Space S2.",
    "core_concept": "Map basis vectors of S1 (Row Space) bijectively to S2 (Column Space), and map the basis vector of S3 to 0.",
    "story": "You are the matrix architect. Program the matrix instructions to map the floor S1 to the output plane S2 while annihilating the flagpole S3.",
    "ggbType": "3d",
    "ggbHint": "Choose basis v1, v2 for S1 and normal n for S3.",
    "ggbSteps": [
      "Choose basis v1, v2 for S1 and normal n for S3.",
      "Set M * v1 = w1 (in S2), M * v2 = w2 (in S2), M * n = 0.",
      "Assemble columns of M by computing M * I.",
      "Verify M * n = 0 and rank(M) = 2."
    ],
    "quiz": [
      {
        "question": "The prompt demands the Null Space of your custom matrix must strictly be the 1-dimensional line S₃. Because you are locking in this specific geometric blind spot, what shape does the universe automatically force the Row Space to be?",
        "options": [
          "It naturally generates a parallel 1-dimensional trajectory offset exactly by the primary spatial eigenvector to rigorously prevent intersecting the defined Null Space boundary.",
          "It actively inflates into a complete 3-dimensional volumetric solid bounded by the orthogonal cross products of the remaining variables to safely secure the dependent matrix projections.",
          "The fundamental laws of the universe automatically lock the internal Row Space into being the exact 2-dimensional plane S₁.",
          "It is mathematically forced to adopt the geometry of the overarching Left Null Space, reflecting the column vectors directly across the origin."
        ],
        "correct_option": "The fundamental laws of the universe automatically lock the internal Row Space into being the exact 2-dimensional plane S₁.",
        "explanation": "R(M) and N(M) are Orthogonal Complements. We already defined S₁ as the exact set of vectors perpendicular to S₃. Therefore, if you intentionally force the machine's Null Space to be S₃, its Row Space is permanently locked in as S₁."
      },
      {
        "question": "The prompt demands the Column Space is the 2-dimensional plane S₂, while the Null Space is the 1-dimensional line S₃. Why is this specific architectural blueprint mathematically valid and physically possible to build inside a 3 × 3 machine?",
        "options": [
          "Because the strictly defined orthogonal parameters successfully overlap the spatial boundaries inside the Cartesian octant to prevent a system crash.",
          "Because the physical 2-dimensional output footprint of the Column Space flawlessly complements the 1-dimensional collapse of the Null Space, safely accounting for all 3 dimensions of the foundational input room without causing a mathematical dimensional contradiction.",
          "It isolates the independent variables to securely align with the primary Eigen-space vector trajectory across the complex plane.",
          "Because the continuous positive scalar inputs inherently cancel out the underlying Cartesian dimensions to establish zero sum trajectories."
        ],
        "correct_option": "Because the physical 2-dimensional output footprint of the Column Space flawlessly complements the 1-dimensional collapse of the Null Space, safely accounting for all 3 dimensions of the foundational input room without causing a mathematical dimensional contradiction.",
        "explanation": "The Rank-Nullity Theorem dictates that the dimensions of the Column Space (Rank) plus the dimensions of the Null Space (Nullity) must exactly equal the dimensions of the input room. Since 2 (for S₂) + 1 (for S₃) = 3, the blueprint flawlessly accounts for the ℝ³ universe."
      },
      {
        "question": "You are the architect. To physically construct this matrix M from scratch, how must you intentionally program the internal vectors to behave?",
        "options": [
          "You mathematically project the entire coordinate system directly onto the principal components of the diagonal trace, guaranteeing the resulting scalar outputs continuously maintain a strictly positive integer determinant for all parallel trajectories.",
          "You symmetrically align the spatial cross products of both given spaces to continuously generate a complex boundary reflection that rigorously isolates the dependent variables inside the upper Cartesian octant.",
          "You strictly calculate the exact algebraic inverse of the subspace S₃ and geometrically multiply it directly by the coordinates of S₂.",
          "You map the foundation vectors of S₁ directly to the foundation vectors of S₂, and aggressively crush the basis vector of S₃ to absolute zero."
        ],
        "correct_option": "You map the foundation vectors of S₁ directly to the foundation vectors of S₂, and aggressively crush the basis vector of S₃ to absolute zero.",
        "explanation": "A matrix is just a set of instructions. To build it, you pick your building blocks. You tell the building blocks of S₁ to stretch and rotate until they become the building blocks of S₂. Then, you tell the building block of S₃ to immediately become (0, 0, 0)."
      },
      {
        "question": "When you turn this custom-built machine on and feed it the entire ℝ³ universe, how does it physically process the geometry of the massive input room?",
        "options": [
          "It acts as a dimensional sorting engine that perfectly stretches and rotates the S₁ plane into the S₂ plane while simultaneously annihilating any input coordinate that lives along the perpendicular S₃ trajectory.",
          "It permanently traps all spatial vectors within an unbroken 3-dimensional spherical shell to securely prevent an overarching determinant collapse error.",
          "It completely zeroes out the foundational axes, converting the entire Cartesian input domain into a localized vector reflection that safely mirrors the geometric coordinates across the negative quadrants.",
          "It structurally redirects all active spatial parameters to calculate the absolute determinant equilibrium of the column space to rigorously avoid geometric inversion."
        ],
        "correct_option": "It acts as a dimensional sorting engine that perfectly stretches and rotates the S₁ plane into the S₂ plane while simultaneously annihilating any input coordinate that lives along the perpendicular S₃ trajectory.",
        "explanation": "Because every single coordinate in the 3D universe is just a combination of a point on the floor (S₁) and a point on the flagpole (S₃), the machine knows exactly what to do with every vector. It maps the floor to the output floor (S₂) and obliterates the flagpole."
      }
    ]
  },
  {
    "id": 49,
    "module": 5,
    "questionNumber": 4,
    "questionCode": "M5Q4",
    "quizNumber": 49,
    "title": "The Complete Structural Blueprint",
    "emoji": "📐",
    "original_question": "What does S_1 and S_4 represent?",
    "goal": "Identify S1 as the Row Space and S4 as the Left Null Space of the constructed matrix M.",
    "core_concept": "S1 = S3^⊥ is the Row Space; S4 = S2^⊥ is the Left Null Space N(M^T), representing unreachable output destinations.",
    "story": "S1 is the part of the input domain that survives transformation; S4 is the blind spot of the output universe where M can never reach.",
    "ggbType": "3d",
    "ggbHint": "Observe S1 is the orthogonal complement of the Null Space S3 => S1 = Row Space ℛ(M).",
    "ggbSteps": [
      "Observe S1 is the orthogonal complement of the Null Space S3 => S1 = Row Space ℛ(M).",
      "Observe S4 is the orthogonal complement of the Column Space S2 => S4 = Left Null Space N(M^T).",
      "Verify all 4 fundamental subspaces are completely accounted for!"
    ],
    "quiz": [
      {
        "question": "Based on your construction of the matrix M, what specific physical role does the 2-dimensional plane S₁ definitively play in this mathematical system?",
        "options": [
          "It fundamentally serves as the continuous Column Space projection boundary, safely preventing the matrix output from experiencing catastrophic dimensional expansion across the Cartesian octants.",
          "It serves as the physical map of the internal machine wiring, representing the exact foundational input space that successfully escapes the crushing effect of the Null Space.",
          "The overarching spatial determinant universally assigns it as the primary Eigen-Space, ensuring the foundational basis vectors remain entirely immune to being rotated by the transformation engine.",
          "It mathematically mirrors the output coordinates directly across the complex spatial boundary layer to guarantee an absolute zero sum mapping."
        ],
        "correct_option": "It serves as the physical map of the internal machine wiring, representing the exact foundational input space that successfully escapes the crushing effect of the Null Space.",
        "explanation": "S₁ is the Row Space! Because S₃ is the Null Space (the part of the input room that gets destroyed), its orthogonal complement S₁ is the exact part of the input room that actually survives and gets mapped to the output room."
      },
      {
        "question": "Now look at the output room. If the Column Space was explicitly engineered to be the 2-dimensional plane S₂, what geometric role is definitively assigned to the perpendicular 1-dimensional line S₄?",
        "options": [
          "It mathematically represents the continuous volumetric scaling factor applied to the Cartesian grid during an overdetermined linear operation.",
          "It mathematically zeroes out the foundational axes, converting the entire Cartesian input domain into a localized vector reflection that safely mirrors the geometric coordinates across the negative quadrants to strictly prevent spatial overlapping.",
          "The precise 1-dimensional trajectory of perfectly unreachable destinations.",
          "It actively inflates into a complete 3-dimensional volumetric solid bounded by the orthogonal cross products of the remaining variables to safely secure the dependent matrix projections across the complex plane."
        ],
        "correct_option": "The precise 1-dimensional trajectory of perfectly unreachable destinations.",
        "explanation": "S₄ acts as the Left Null Space. If the machine's absolute maximum reach is the flat 2D floor S₂, then anything floating straight above that floor (the line S₄) is perfectly 90 degrees orthogonal to the reachable space, making it physically impossible for the matrix engine to ever map a coordinate there."
      },
      {
        "question": "When evaluating the absolute geometric perfection of this custom matrix M, what breathtaking relationship is physically established between the input floor and the output floor?",
        "options": [
          "The matrix permanently traps all spatial vectors within an unbroken spherical shell to securely prevent an overarching determinant collapse error from destroying the shared orthogonal boundaries.",
          "The mathematical system strictly demands it fully expand into an unrestricted volume to safely prevent the internal parameters from experiencing an algebraic dimensional overlap.",
          "It structurally redirects all active spatial parameters to calculate the absolute determinant equilibrium of the column space to rigorously avoid geometric inversion.",
          "Every single unique coordinate located on the 2D input plane S₁ maps to one perfectly unique, distinct coordinate on the 2D output plane S₂, establishing a completely reversible mathematical bridge across the two specific geometries."
        ],
        "correct_option": "Every single unique coordinate located on the 2D input plane S₁ maps to one perfectly unique, distinct coordinate on the 2D output plane S₂, establishing a completely reversible mathematical bridge across the two specific geometries.",
        "explanation": "While the matrix as a whole is singular and destroys data, the specific connection between the Row Space (S₁) and the Column Space (S₂) is absolutely flawless. It maps the 2D plane S₁ seamlessly onto the 2D plane S₂ without losing a single drop of information."
      },
      {
        "question": "The 1D line S₄ acts as the Left Null Space. Using the physical metaphor of a shadow, what does this line mathematically represent in the output universe?",
        "options": [
          "It is the exact set of output vectors that cast absolutely zero physical shadow onto the Column Space floor.",
          "It isolates the independent variables to securely align with the primary Eigen-space vector trajectory across the foundational Cartesian grid to establish determinant equilibrium.",
          "A rigidly defined trajectory that flawlessly reflects the primary output coordinates directly across the complex spatial boundary layer to guarantee an absolute zero sum mapping.",
          "It is the continuous scalar projection of the internal determinant mapping spanning the positive axis."
        ],
        "correct_option": "It is the exact set of output vectors that cast absolutely zero physical shadow onto the Column Space floor.",
        "explanation": "If you shine a light straight down, a vector that is perfectly 90 degrees orthogonal to the floor will cast absolutely no shadow. Because S₄ is perpendicular to the Column Space S₂, every vector inside S₄ casts zero shadow onto the reachable space."
      }
    ]
  },
  {
    "id": 50,
    "module": 5,
    "questionNumber": 5,
    "questionCode": "M5Q5",
    "quizNumber": 50,
    "title": "The Hidden Bijection and the Pseudo-Inverse",
    "emoji": "🔮",
    "original_question": "Do you observe there is a bijection from S_1 -> S_2?",
    "goal": "Discover the bijective bridge between Row Space and Column Space and introduce the Moore-Penrose Pseudo-Inverse M⁺.",
    "core_concept": "Restricted to S1, M is 1-to-1 and onto S2. The Pseudo-Inverse M⁺ inverts this restricted bridge and sends S4 to 0.",
    "story": "Even when a matrix is singular, a flawless 1-to-1 bijection lives between its Row Space and Column Space. The Pseudo-Inverse walks backward across this bridge!",
    "ggbType": "3d",
    "ggbHint": "Plot S1 (input floor) and S2 (output floor) in 3D view.",
    "ggbSteps": [
      "Plot S1 (input floor) and S2 (output floor) in 3D view.",
      "Map vectors from S1 to S2 under M: no information is lost.",
      "Construct the Pseudo-Inverse M⁺ mapping S2 back to S1.",
      "Celebrate graduation from Matrix Mystics!"
    ],
    "quiz": [
      {
        "question": "The prompt asks if you observe a 'bijection' from S₁ → S₂. In the formal language of advanced mathematics, what exactly does a bijection guarantee about the mapping between two spaces?",
        "options": [
          "It mathematically dictates that the internal vectors must automatically balance their spatial cross products across the overarching Cartesian octants to successfully prevent determinant collapse.",
          "It guarantees the mathematical system will strictly expand into an unrestricted volume to safely prevent the internal parameters from experiencing an algebraic dimensional overlap.",
          "It physically zeroes out the foundational axes, converting the entire Cartesian input domain into a localized vector reflection that safely mirrors the geometry to strictly prevent spatial overlapping.",
          "It rigorously guarantees a flawless, 1-to-1 relationship where no two inputs crash into the same output, and no target coordinates are left unmapped."
        ],
        "correct_option": "It rigorously guarantees a flawless, 1-to-1 relationship where no two inputs crash into the same output, and no target coordinates are left unmapped.",
        "explanation": "A bijection is the gold standard of mathematics. It means perfect, 100% reversible translation. No two inputs ever crash into the same output (it is 'injective' or 1-to-1), and the outputs perfectly cover the entire target space without leaving any blank spots (it is 'surjective' or onto)."
      },
      {
        "question": "We know that the matrix M as a whole crushes the 3-dimensional universe (ℝ³) into a flat 2-dimensional plane (S₂). Because infinite 3D inputs are crashing into 2D outputs, the overall matrix is officially singular. How can a perfect bijection possibly exist inside a singular machine?",
        "options": [
          "The bijection only exists momentarily during the initial calculation phase before the underlying determinant aggressively isolates the spatial variables into parallel trajectories.",
          "The perfect geometric translation only exists if you completely sever and ignore the destructive crushing effect of the Null Space, restricting your view strictly to the exact mathematical bridge connecting the Row Space directly to the Column Space.",
          "Because the orthogonal boundaries organically force the primary parameters to perfectly overlap each other inside the first positive Cartesian octant to securely lock the geometry.",
          "It is an artificial mathematical construct that strictly requires the active isolation of dependent variables inside the primary coordinate system to safely ensure the geometric dimensions inherently cancel each other out."
        ],
        "correct_option": "The perfect geometric translation only exists if you completely sever and ignore the destructive crushing effect of the Null Space, restricting your view strictly to the exact mathematical bridge connecting the Row Space directly to the Column Space.",
        "explanation": "This is the greatest secret in linear algebra! Yes, the matrix is singular because the Null Space crushes infinite vectors to zero. But, if you slice the Null Space off and throw it in the trash, and only look at what the matrix does to the Row Space (S₁), the math is perfect."
      },
      {
        "question": "Because a flawless bijection exists specifically between the Row Space (S₁) and the Column Space (S₂), what powerful mathematical tool can you now theoretically construct?",
        "options": [
          "The Orthogonal Eigenvector Engine, formally guaranteeing that perfectly square matrices securely map independent variables onto a completely self-contained trajectory.",
          "A mathematical machine that flawlessly runs backwards across that specific restricted bridge.",
          "A continuous 3-dimensional volumetric scaling factor applied to the Cartesian grid during an overdetermined linear operation.",
          "A rigidly defined boundary trajectory that flawlessly reflects the primary output coordinates directly across the complex spatial boundary layer to guarantee an absolute zero sum mapping."
        ],
        "correct_option": "A mathematical machine that flawlessly runs backwards across that specific restricted bridge.",
        "explanation": "You cannot invert the whole matrix because the data inside the Null Space was permanently destroyed. But because the specific bridge between S₁ and S₂ is a perfect bijection, you can build a machine that walks backward across that specific bridge! This is called the Pseudo-Inverse matrix (M⁺)."
      },
      {
        "question": "If you construct this Pseudo-Inverse matrix (M⁺) to walk backward from S₂ to S₁, what must the reverse machine mathematically do to the line S₄?",
        "options": [
          "It must strictly be defined as the primary Eigen-Space, ensuring the foundational basis vectors remain entirely immune to being rotated by the transformation engine.",
          "It mathematically isolates the dependent variables to securely align with the primary vector trajectory across the foundational Cartesian grid to establish determinant equilibrium.",
          "Because the reverse machine treats the old output room as its brand new input domain, any coordinate living on the originally unreachable 1-dimensional line S₄ has nowhere to go on the bridge, forcing the reverse machine to crush it down to absolute zero.",
          "It forces the variables to continuously rotate into a parallel scalar alignment that permanently neutralizes the underlying structural bounds of the projection engine."
        ],
        "correct_option": "Because the reverse machine treats the old output room as its brand new input domain, any coordinate living on the originally unreachable 1-dimensional line S₄ has nowhere to go on the bridge, forcing the reverse machine to crush it down to absolute zero.",
        "explanation": "The Pseudo-Inverse is a brand new matrix, meaning it needs its own Four Fundamental Subspaces! If it maps S₂ backwards to S₁, then its input room is the old output room! Any coordinate living on the line S₄ (the old Left Null Space) has nowhere to go on the reverse bridge, so the Pseudo-Inverse simply makes S₄ its brand new Null Space."
      },
      {
        "question": "Stepping back and looking at the entire Matrix Mystics curriculum, what is the ultimate geometric truth you have discovered about how matrices process the universe?",
        "options": [
          "Every mathematical matrix naturally seeks a stable 2-dimensional steady-state distribution regardless of the initial starting coordinates or internal spatial parameters.",
          "Matrices inherently require symmetrically scaled inputs to successfully process and balance the underlying dimensional math, safely preventing the coordinate grid from collapsing.",
          "Matrices simply represent an abstract ledger system designed solely to isolate independent variables in overdetermined linear equations, permanently ensuring that spatial geometry remains entirely separate from algebraic calculation.",
          "A matrix physically rips the universe into orthogonal halves, flawlessly passing one half across a bijective bridge while simultaneously annihilating the other."
        ],
        "correct_option": "A matrix physically rips the universe into orthogonal halves, flawlessly passing one half across a bijective bridge while simultaneously annihilating the other.",
        "explanation": "You have achieved total mastery. You no longer just calculate numbers; you see the architecture. You understand the physical collapse of dimensions, the perfection of orthogonal complements, and the beautiful, hidden bijection that allows us to reverse-engineer singular systems. You have officially graduated from Matrix Mystics."
      }
    ]
  },
  {
    "id": 51,
    "module": 6,
    "questionNumber": 1,
    "questionCode": "M6Q1",
    "quizNumber": 51,
    "title": "Recommender Systems & Collaborative Matrix Factorization",
    "emoji": "🎬",
    "original_question": "Recommender System\nExplore how streaming platforms predict user ratings by factorizing massive, sparse user-item rating matrices into low-rank user and item latent feature vectors.",
    "goal": "Model user-movie rating matrices and understand low-rank matrix approximation R ≈ U · V^T.",
    "core_concept": "High-dimensional sparse matrices can be approximated by factoring into low-rank latent taste spaces using Singular Value Decomposition.",
    "story": "Netflix has millions of users and thousands of movies, but most ratings are missing. Matrix factorization uncovers hidden taste profiles.",
    "ggbType": "graphing",
    "ggbHint": "Plot sample user taste vectors in 2D latent space: Action vs Comedy.",
    "ggbSteps": [
      "Plot sample user taste vectors in 2D latent space: Action vs Comedy.",
      "Plot movie profile vectors in the same space.",
      "Calculate dot product: high dot product predicts a 5-star rating!",
      "Observe how low-rank matrices cluster similar users together."
    ],
    "quiz": [
      {
        "id": "M6Q1E1",
        "question": "What does a recommender system do?",
        "options": [
          "Suggests items to users",
          "Compresses image files",
          "Sorts database records",
          "Generates random passwords"
        ],
        "correct_option": "Suggests items to users",
        "explanation": "A recommender system predicts and suggests items (movies, products, songs) that a user might like."
      },
      {
        "id": "M6Q1M1",
        "question": "Let R be the m×n user-item matrix. What do m and n represent?",
        "options": [
          "Number of users and items",
          "Number of features and labels",
          "Rows of zeros and ones",
          "Matrix rank and trace"
        ],
        "correct_option": "Number of users and items",
        "explanation": "R has m rows (one per user) and n columns (one per item)."
      },
      {
        "id": "M6Q1H1",
        "question": "If R ≈ U·Vᵀ with k factors, what is the rank of the approximation?",
        "options": [
          "k",
          "m",
          "n",
          "m plus n"
        ],
        "correct_option": "k",
        "explanation": "The product of an m×k and a k×n matrix has rank at most k."
      },
      {
        "id": "M6Q1R1",
        "question": "Which company famously used matrix factorisation in a prize competition?",
        "options": [
          "Netflix",
          "Amazon",
          "Spotify",
          "YouTube"
        ],
        "correct_option": "Netflix",
        "explanation": "Netflix's 2006 Netflix Prize challenged teams to improve movie rating predictions using matrix factorisation on a user-movie ratings matrix."
      },
      {
        "id": "M6Q1M2",
        "question": "In R ≈ U·Vᵀ with U m×k and V n×k, the key assumption is:",
        "options": [
          "k is far smaller than m n",
          "k equals the rank of R",
          "k must equal m plus n",
          "k is always equal to one"
        ],
        "correct_option": "k is far smaller than m n",
        "explanation": "The key idea of low-rank approximation is k << min(m, n)."
      }
    ]
  },
  {
    "id": 52,
    "module": 6,
    "questionNumber": 2,
    "questionCode": "M6Q2",
    "quizNumber": 52,
    "title": "Google PageRank: The Stationary Eigenvector of the Web",
    "emoji": "🌐",
    "original_question": "Page Ranking\nInvestigate how Google ranks web pages by modeling the internet as a directed graph and computing the dominant stationary eigenvector of its stochastic hyperlink matrix.",
    "goal": "Model the web as a hyperlink transition graph and compute its dominant eigenvector with eigenvalue λ = 1.",
    "core_concept": "PageRank simulates a random surfer on a column-stochastic hyperlink matrix with damping factor d = 0.85; stationary distribution = dominant eigenvector.",
    "story": "A link from Page A to Page B is a vote of confidence. Solving for web authority is solving for the largest eigenvector in history.",
    "ggbType": "geometry",
    "ggbHint": "Draw a directed graph connecting 4 web pages.",
    "ggbSteps": [
      "Draw a directed graph connecting 4 web pages.",
      "Formulate the 4×4 column-stochastic transition matrix M.",
      "Apply power iteration: x_{k+1} = M * x_k.",
      "Watch the vector converge to the permanent PageRank importance scores!"
    ],
    "quiz": [
      {
        "id": "M6Q2E1",
        "question": "What does PageRank measure?",
        "options": [
          "Importance of web pages",
          "Page loading speed",
          "Number of images on page",
          "Website hosting cost"
        ],
        "correct_option": "Importance of web pages",
        "explanation": "PageRank assigns an importance score to each web page based on link structure."
      },
      {
        "id": "M6Q2M1",
        "question": "In the PageRank formula, A typically represents:",
        "options": [
          "The web's transition matrix",
          "The identity matrix",
          "The inverse covariance matrix",
          "The diagonal of eigenvalues"
        ],
        "correct_option": "The web's transition matrix",
        "explanation": "A encodes the link structure between web pages."
      },
      {
        "id": "M6Q2H1",
        "question": "Without teleportation, a Markov chain on the web may fail because:",
        "options": [
          "Some pages may be unreachable",
          "The matrix is always diagonal",
          "Eigenvalues become complex",
          "The damping factor equals zero"
        ],
        "correct_option": "Some pages may be unreachable",
        "explanation": "Dangling nodes and disconnected components make the chain reducible without teleportation."
      },
      {
        "id": "M6Q2R1",
        "question": "PageRank was originally developed at",
        "options": [
          "Stanford University",
          "Cornell University",
          "Brown University",
          "Oxford University"
        ],
        "correct_option": "Stanford University",
        "explanation": "Larry Page and Sergey Brin developed PageRank as Stanford PhD students in the late 1990s."
      },
      {
        "id": "M6Q2M2",
        "question": "The PageRank vector satisfies π = d·Aᵀ·π + (1−d)·(1/N)·1. What is N?",
        "options": [
          "Total number of web pages",
          "Number of edges in graph",
          "Dimension of eigenvalues",
          "Number of iterations needed"
        ],
        "correct_option": "Total number of web pages",
        "explanation": "N is the total count of pages; (1/N)·1 is the uniform teleportation distribution."
      }
    ]
  },
  {
    "id": 53,
    "module": 6,
    "questionNumber": 3,
    "questionCode": "M6Q3",
    "quizNumber": 53,
    "title": "Dimensionality Reduction: PCA & Singular Value Decomposition",
    "emoji": "📉",
    "original_question": "Dimensionality Reduction\nDiscover how Principal Component Analysis (PCA) and Singular Value Decomposition (SVD) compress high-dimensional data into essential principal axes with minimal information loss.",
    "goal": "Project 3D data clouds onto principal 2D orthogonal axes of maximum variance.",
    "core_concept": "PCA computes eigenvectors of the data covariance matrix; SVD decomposes A = UΣV^T to compress data along principal singular vectors.",
    "story": "Facial recognition and data science require compressing thousands of variables into a few key coordinates without losing vital patterns.",
    "ggbType": "3d",
    "ggbHint": "In 3D view, plot an elongated 3D data cloud.",
    "ggbSteps": [
      "In 3D view, plot an elongated 3D data cloud.",
      "Find the first principal component vector PC1 along the axis of maximum variance.",
      "Find the orthogonal second principal component PC2.",
      "Project the 3D data onto the 2D plane (PC1, PC2) with minimal distortion!"
    ],
    "quiz": [
      {
        "id": "M6Q3E1",
        "question": "Why is high-dimensional data challenging?",
        "options": [
          "Hard to visualise and process",
          "Too easy to analyse",
          "Requires less memory",
          "Always perfectly correlated"
        ],
        "correct_option": "Hard to visualise and process",
        "explanation": "High-dimensional data is difficult to visualise and computationally expensive to process."
      },
      {
        "id": "M6Q3M1",
        "question": "Given data matrix X, the covariance matrix is computed as:",
        "options": [
          "C = (1/m)·Xᵀ·X",
          "C = X·Xᵀ·X",
          "C = X + Xᵀ",
          "C = X⁻¹"
        ],
        "correct_option": "C = (1/m)·Xᵀ·X",
        "explanation": "The covariance matrix captures pairwise feature relationships and is symmetric positive semi-definite."
      },
      {
        "id": "M6Q3H1",
        "question": "SVD and PCA are closely related because:",
        "options": [
          "SVD on centred data gives components",
          "They use completely different maths",
          "PCA requires supervised labels",
          "SVD only works on squares"
        ],
        "correct_option": "SVD on centred data gives components",
        "explanation": "Applying SVD to the centred data matrix produces the same result as PCA."
      },
      {
        "id": "M6Q3R1",
        "question": "Eigenfaces for face recognition is based on",
        "options": [
          "Principal Component Analysis",
          "Linear Discriminant Analysis",
          "Factor Analysis Method",
          "Random Projection Method"
        ],
        "correct_option": "Principal Component Analysis",
        "explanation": "Eigenfaces apply PCA to face images, keeping the top eigenvectors as basis faces that capture most variance."
      },
      {
        "id": "M6Q3M2",
        "question": "To perform PCA, one finds eigenvalues and eigenvectors of:",
        "options": [
          "The covariance matrix C",
          "The original data matrix X",
          "The identity matrix I",
          "The zero matrix O"
        ],
        "correct_option": "The covariance matrix C",
        "explanation": "Eigendecomposition of C yields the principal components and their variances."
      }
    ]
  }
];

// Alias for backward compatibility
export const MISSIONS = QUESTIONS;
