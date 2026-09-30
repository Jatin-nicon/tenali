# Data definitions for the 53 questions
QUESTIONS_META = [
    # MODULE 1 (1..16)
    {
        "id": 1, "module": 1, "questionNumber": 1, "questionCode": "M1Q1", "quizNumber": 1,
        "title": "Direct Proportionality: The Piggy Bank Ray", "emoji": "💰",
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
        ]
    },
    {
        "id": 2, "module": 1, "questionNumber": 2, "questionCode": "M1Q2", "quizNumber": 2,
        "title": "Grid Walking & The Collinear Footpath", "emoji": "🗺️",
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
        ]
    },
    {
        "id": 3, "module": 1, "questionNumber": 3, "questionCode": "M1Q3", "quizNumber": 3,
        "title": "Family of Slopes: Pivoting Around the Center", "emoji": "🎯",
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
        ]
    },
    {
        "id": 4, "module": 1, "questionNumber": 4, "questionCode": "M1Q4", "quizNumber": 4,
        "title": "The Origin Anchor: The Geometry of (0,0)", "emoji": "⚓",
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
        ]
    },
    {
        "id": 5, "module": 1, "questionNumber": 5, "questionCode": "M1Q5", "quizNumber": 5,
        "title": "Affine Shifts: Breaking the Origin Anchor", "emoji": "🧱",
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
        ]
    },
    {
        "id": 6, "module": 1, "questionNumber": 6, "questionCode": "M1Q6", "quizNumber": 6,
        "title": "Dynamic Sliders: Decoupling Slope & Intercept", "emoji": "🎛️",
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
        ]
    },
    {
        "id": 7, "module": 1, "questionNumber": 7, "questionCode": "M1Q7", "quizNumber": 7,
        "title": "Simultaneous Systems & The 2×2 Matrix", "emoji": "⚔️",
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
        ]
    },
    {
        "id": 8, "module": 1, "questionNumber": 8, "questionCode": "M1Q8", "quizNumber": 8,
        "title": "Linear Invertibility: Reversible 1D Engines", "emoji": "🔄",
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
        ]
    },
    {
        "id": 9, "module": 1, "questionNumber": 9, "questionCode": "M1Q9", "quizNumber": 9,
        "title": "Evaluating Nonlinear Functions: The Forward Path", "emoji": "🎢",
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
        ]
    },
    {
        "id": 10, "module": 1, "questionNumber": 10, "questionCode": "M1Q10", "quizNumber": 10,
        "title": "Branching Preimages: Non-Unique Quadratic Inverses", "emoji": "🔀",
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
        ]
    },
    {
        "id": 11, "module": 1, "questionNumber": 11, "questionCode": "M1Q11", "quizNumber": 11,
        "title": "Cubic Curves: Higher-Order Preimages", "emoji": "〰️",
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
        ]
    },
    {
        "id": 12, "module": 1, "questionNumber": 12, "questionCode": "M1Q12", "quizNumber": 12,
        "title": "Dimensional Arenas: The Geometries of ℝ, ℝ², and ℝ³", "emoji": "🌌",
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
        ]
    },
    {
        "id": 13, "module": 1, "questionNumber": 13, "questionCode": "M1Q13", "quizNumber": 13,
        "title": "2D Vector Transformations: The Mapping Function φ", "emoji": "🌀",
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
        ]
    },
    {
        "id": 14, "module": 1, "questionNumber": 14, "questionCode": "M1Q14", "quizNumber": 14,
        "title": "Matrix Inversion: The Reversible 2D Machine", "emoji": "🔓",
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
        ]
    },
    {
        "id": 15, "module": 1, "questionNumber": 15, "questionCode": "M1Q15", "quizNumber": 15,
        "title": "Matrices as Geometric Transformation Engines", "emoji": "🏭",
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
        ]
    },
    {
        "id": 16, "module": 1, "questionNumber": 16, "questionCode": "M1Q16", "quizNumber": 16,
        "title": "Singular Collapse: Unveiling the Kernel / Null Space", "emoji": "🕳️",
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
        ]
    }
]
print(f"Defined {len(QUESTIONS_META)} questions in metadata.")
