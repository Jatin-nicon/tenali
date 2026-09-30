#!/usr/bin/env python3
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_FILE = os.path.join(BASE_DIR, "client", "src", "matrixmystics", "matrixMysticsData.js")

# Load Module 1 metadata from module1_meta.py
from module1_meta import QUESTIONS_META as M1_META

# Load parsed PDF quizzes
with open(os.path.join(BASE_DIR, 'scripts', 'pdf_quizzes_module2.json'), 'r', encoding='utf-8') as f:
    pdf_m2 = json.load(f)
with open(os.path.join(BASE_DIR, 'scripts', 'pdf_quizzes_module3.json'), 'r', encoding='utf-8') as f:
    pdf_m3 = json.load(f)
with open(os.path.join(BASE_DIR, 'scripts', 'pdf_quizzes_module4.json'), 'r', encoding='utf-8') as f:
    pdf_m4 = json.load(f)
with open(os.path.join(BASE_DIR, 'scripts', 'pdf_quizzes_module5.json'), 'r', encoding='utf-8') as f:
    pdf_m5 = json.load(f)

# Load m1.json and m6.json for MCQs
with open(os.path.join(BASE_DIR, 'linearalgebra', 'matrixmystics', 'm1.json'), 'r', encoding='utf-8') as f:
    m1_json = json.load(f)
with open(os.path.join(BASE_DIR, 'linearalgebra', 'matrixmystics', 'm6.json'), 'r', encoding='utf-8') as f:
    m6_json = json.load(f)

def extract_mcqs(topic, max_q=5):
    mcqs_dict = topic.get('mcqs', {})
    res = []
    easy = mcqs_dict.get('easy', [])
    med = mcqs_dict.get('medium', [])
    hard = mcqs_dict.get('hard', [])
    realapp = topic.get('real_life_application', []) or mcqs_dict.get('real_life_application', [])
    
    if easy: res.append(easy[0])
    if med: res.append(med[0])
    if hard: res.append(hard[0])
    if realapp: res.append(realapp[0])
    if len(res) < max_q and len(med) > 1: res.append(med[1])
    elif len(res) < max_q and len(hard) > 1: res.append(hard[1])
    elif len(res) < max_q and len(easy) > 1: res.append(easy[1])
    
    cleaned = []
    for i, q in enumerate(res[:max_q]):
        opts = q.get('options', [])
        correct = q.get('correct_option', '')
        if isinstance(opts, list) and not correct and q.get('correct') is not None:
            idx = q['correct']
            correct = opts[idx] if idx < len(opts) else opts[0]
        cleaned.append({
            "id": q.get('id', f"Q{i+1}"),
            "question": q.get('question', ''),
            "options": opts if isinstance(opts, list) else ['True', 'False'],
            "correct_option": correct,
            "explanation": q.get('explanation', 'Core principle application.')
        })
    return cleaned

MODULES = [
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
]

ALL_QUESTIONS = []

# --- Process Module 1 ---
for idx, qm in enumerate(M1_META):
    topic = m1_json['topics'][idx] if idx < len(m1_json['topics']) else {}
    q_copy = dict(qm)
    q_copy['quiz'] = extract_mcqs(topic)
    ALL_QUESTIONS.append(q_copy)

# --- Define metadata for Module 2 ---
M2_META = [
    {
        "id": 17, "module": 2, "questionNumber": 1, "questionCode": "M2Q1", "quizNumber": 17,
        "title": "Cryptography and the Matrix Machine", "emoji": "🔐",
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
        ]
    },
    {
        "id": 18, "module": 2, "questionNumber": 2, "questionCode": "M2Q2", "quizNumber": 18,
        "title": "Real-World Constraints and the Geometric Intersection", "emoji": "☕",
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
        ]
    },
    {
        "id": 19, "module": 2, "questionNumber": 3, "questionCode": "M2Q3", "quizNumber": 19,
        "title": "Overdetermined Systems and the Messy Real World", "emoji": "📐",
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
        ]
    },
    {
        "id": 20, "module": 2, "questionNumber": 4, "questionCode": "M2Q4", "quizNumber": 20,
        "title": "The Anatomy of an Overdetermined Matrix", "emoji": "🏛️",
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
        ]
    },
    {
        "id": 21, "module": 2, "questionNumber": 5, "questionCode": "M2Q5", "quizNumber": 21,
        "title": "The Geometry of Guessing and Error", "emoji": "🎯",
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
        ]
    },
    {
        "id": 22, "module": 2, "questionNumber": 6, "questionCode": "M2Q6", "quizNumber": 22,
        "title": "Markov Chains and the Geometry of Equilibrium", "emoji": "😊",
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
        ]
    },
    {
        "id": 23, "module": 2, "questionNumber": 7, "questionCode": "M2Q7", "quizNumber": 23,
        "title": "Scaling Dimensions and 3D Equilibrium", "emoji": "🏙️",
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
        ]
    }
]

for idx, qm in enumerate(M2_META):
    quiz_data = pdf_m2[idx].get('questions', []) if idx < len(pdf_m2) else []
    q_copy = dict(qm)
    q_copy['quiz'] = quiz_data
    ALL_QUESTIONS.append(q_copy)

# --- Define metadata for Module 3 (15 questions) ---
M3_RAW_META = [
    {
        "num": 1, "code": "M3Q1", "quizNum": 24, "emoji": "📐",
        "title": "Orthogonality and the Geometry of the Dot Product",
        "prompt": "Use Geogebra:\nDraw the vector [[1], [1]]. Find out all those vectors which are perpendicular to this vector.",
        "goal": "Discover all vectors perpendicular to [1, 1]^T geometrically and verify their dot product equals zero.",
        "concept": "Two vectors in ℝ² are orthogonal if and only if their dot product vanishes: 1x + 1y = 0 => y = -x.",
        "story": "Given the diagonal vector [1, 1]^T pointing into Quadrant I, sweep out every perpendicular vector in the plane.",
        "ggbType": "graphing",
        "steps": ["Type: u = Vector((1, 1))", "Type: x + y = 0", "Observe the perpendicular line passes through (0,0) with slope -1."]
    },
    {
        "num": 2, "code": "M3Q2", "quizNum": 25, "emoji": "⚙️",
        "title": "The Architecture of the Dot Product",
        "prompt": "Do you observe that we are asking for vectors [[x], [y]] such that, [[1, 1]] [[x], [y]] = 0",
        "goal": "Recognize matrix row multiplication as a dot product defining the geometric Null Space.",
        "concept": "A 1×2 matrix equation [1 1][x, y]^T = 0 literally defines the Null Space as the orthogonal complement of the row.",
        "story": "Writing perpendicularity as a matrix equation [1 1]v = 0 reveals the mechanical bridge between algebra and geometry.",
        "ggbType": "graphing",
        "steps": ["Type: [1, 1] * (x, y) = 0", "Observe that this yields the line y = -x.", "Notice the matrix crushes this entire line to the scalar 0."]
    },
    {
        "num": 3, "code": "M3Q3", "quizNum": 26, "emoji": "🎛️",
        "title": "Parameterization and Dynamic Orthogonality",
        "prompt": "Use Geogebra and solve the above question with [[1], [1]] replaced by [[a], [b]]. Use (a,b) as parameters and check what happens to (x,y).",
        "goal": "Use sliders for (a,b) to observe how the orthogonal null line rotates synchronously at 90 degrees.",
        "concept": "For any non-zero row vector [a, b], its null space is the line ax + by = 0, always perpendicular with slope -a/b.",
        "story": "Rotate the primary vector [a, b] like the hand of a clock and watch the solution line spin bolted at a rigid 90-degree angle.",
        "ggbType": "graphing",
        "steps": ["Create sliders a = 1 and b = 1.", "Type: u = Vector((a, b))", "Type: a*x + b*y = 0", "Drag sliders and observe the persistent 90° angle!"]
    },
    {
        "num": 4, "code": "M3Q4", "quizNum": 27, "emoji": "📦",
        "title": "Scaling Orthogonality into Three Dimensions",
        "prompt": "What is (x,y,z) satisfying the following equation? (Use Geogebra)\n[[1, 2, 3]] [[x], [y], [z]] = 0",
        "goal": "Elevate orthogonality into ℝ³: a single row constraint creates a 2D plane perpendicular to [1, 2, 3]^T.",
        "concept": "In ℝ³, 1 linear constraint removes 1 degree of freedom (3 - 1 = 2), creating a 2D plane of solutions passing through (0,0,0).",
        "story": "The vector [1, 2, 3] acts as a flagpole (normal vector) sticking straight out of a flat 2D ground plane.",
        "ggbType": "3d",
        "steps": ["Switch to 3D Graphics view.", "Type: u = Vector((1, 2, 3))", "Type: 1*x + 2*y + 3*z = 0", "Observe the plane is perpendicular to vector u!"]
    },
    {
        "num": 5, "code": "M3Q5", "quizNum": 28, "emoji": "📏",
        "title": "Parametric Lines and the Anatomy of Scaling",
        "prompt": "Use Geogebra and plot all the points in the set below.\nT = { alpha(1,2,1) | alpha in ℝ }",
        "goal": "Visualize how varying a single parameter alpha sweeps out a 1-dimensional line in 3D space.",
        "concept": "A single vector scaled by a parameter forms a 1-dimensional subspace (line through origin) with 1 degree of freedom.",
        "story": "The scalar alpha acts as a gas pedal, driving forward and backward along the direction vector (1, 2, 1).",
        "ggbType": "3d",
        "steps": ["In 3D view, create slider alpha.", "Type: P = alpha * (1, 2, 1)", "Enable trace or draw Line((0,0,0), (1,2,1)).", "Observe the 1D trajectory through the origin."]
    },
    {
        "num": 6, "code": "M3Q6", "quizNum": 29, "emoji": "🌐",
        "title": "Expanding the Spatial Web",
        "prompt": "Use Geogebra and plot all the points in the set below.\nS = { beta(2,7,3) | beta in ℝ }",
        "goal": "Plot a second independent 1D parametric line in ℝ³ and observe its interaction with line T.",
        "concept": "Two independent direction vectors through the origin form distinct lines that intersect uniquely at (0, 0, 0).",
        "story": "Fire a second laser beam along vector (2, 7, 3). Both beams pierce the 3D room, meeting only at the absolute center.",
        "ggbType": "3d",
        "steps": ["In 3D view, type: Line((0,0,0), (2,7,3))", "Compare with Line((0,0,0), (1,2,1)) from the previous question.", "Confirm both lines intersect exclusively at (0,0,0)."]
    },
    {
        "num": 7, "code": "M3Q7", "quizNum": 30, "emoji": "📜",
        "title": "Linear Combinations and the Architecture of the Span",
        "prompt": "Use Geogebra and plot all the points in the set below.\nW = { alpha(1,2,1) + beta(2,7,3) | alpha, beta in ℝ }",
        "goal": "Construct the 2D plane spanned by two independent 3D vectors via linear combinations.",
        "concept": "Combining two independent vectors with two parameters (alpha, beta) sweeps out a 2D plane (Span) in ℝ³.",
        "story": "Walk alpha steps along the first vector, then beta steps parallel to the second. Together, they sweep out a flat 2D sheet.",
        "ggbType": "3d",
        "steps": ["Type: u = Vector((1, 2, 1))", "Type: v = Vector((2, 7, 3))", "Type: Plane((0,0,0), u, v)", "Observe the flat 2D plane suspended inside the 3D room."]
    },
    {
        "num": 8, "code": "M3Q8", "quizNum": 31, "emoji": "🚩",
        "title": "Orthogonal Complements and the Normal Vector",
        "prompt": "In the set W of previous question, find out all the points (x,y,z) satisfying the following: (Use Geogebra)\n[[w1, w2, w3]] [[x], [y], [z]] = 0\nwhere (w1,w2,w3) in W. Note that wi's are real numbers.",
        "goal": "Find the orthogonal complement of the 2D plane W, proving it is a 1-dimensional normal line.",
        "concept": "Because W has dimension 2 in ℝ³, the space of vectors perpendicular to ALL vectors in W has dimension 3 - 2 = 1.",
        "story": "Find the single flagpole that stands at a perfect 90-degree angle to every possible blade of grass on the 2D plane W.",
        "ggbType": "3d",
        "steps": ["Type: eq1: 1*x + 2*y + 1*z = 0", "Type: eq2: 2*x + 7*y + 3*z = 0", "Type: Intersect(eq1, eq2)", "Observe the intersection of the two planes is a single 1D straight line!"]
    },
    {
        "num": 9, "code": "M3Q9", "quizNum": 32, "emoji": "👁️",
        "title": "The Illusion of the Third Dimension",
        "prompt": "Given the matrix A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]], find out all the possible (x,y,z) such that:\n[[1, 2, 3], [4, 5, 6], [7, 8, 9]] [[x], [y], [z]] = 0\nObserve carefully, what has this question got to do with previous five questions in this module",
        "goal": "Discover linear dependence in a 3×3 matrix: row 3 = 2(row 2) - row 1, collapsing rank to 2.",
        "concept": "Even though A has 3 rows, row 3 is redundant. The Row Space is 2D, so the Null Space is a 1D line (3 - 2 = 1).",
        "story": "A terrifying 3×3 matrix is an illusion! The third equation brings zero new information, leaving an intact 1D line of solutions.",
        "ggbType": "3d",
        "steps": ["Type: eq1: x + 2*y + 3*z = 0", "Type: eq2: 4*x + 5*y + 6*z = 0", "Type: eq3: 7*x + 8*y + 9*z = 0", "Observe all 3 planes intersect along the exact same 1D line: Line passing through (1, -2, 1)!"]
    },
    {
        "num": 10, "code": "M3Q10", "quizNum": 33, "emoji": "🏛️",
        "title": "The Fundamental Subspaces of the Matrix",
        "prompt": "Given the matrix A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] what does the following three sets represent?\n(i) ℛ = { alpha(1,2,3) + beta(4,5,6) + gamma(7,8,9) | alpha, beta, gamma in ℝ }\n(ii) C = { alpha(1,4,7) + beta(2,5,8) + gamma(3,6,9) | alpha, beta, gamma in ℝ }\n(iii) N = { (x,y,z) | x(1,4,7) + y(2,5,8) + z(3,6,9) = 0 }\nUse only Geogebra :)",
        "goal": "Identify and plot the Row Space ℛ, Column Space C, and Null Space N for matrix A.",
        "concept": "ℛ is the 2D plane spanned by rows; C is the 2D plane spanned by columns; N is the 1D line perpendicular to ℛ.",
        "story": "Deconstruct matrix A into its constituent organs: its internal wiring (Row Space), its reachable map (Column Space), and its black hole (Null Space).",
        "ggbType": "3d",
        "steps": ["In 3D view, plot the plane spanned by (1,2,3) and (4,5,6) -> Row Space.", "Plot the plane spanned by (1,4,7) and (2,5,8) -> Column Space.", "Plot the normal line (1, -2, 1) -> Null Space.", "Observe how these geometric objects define the matrix."]
    },
    {
        "num": 11, "code": "M3Q11", "quizNum": 34, "emoji": "⚡",
        "title": "Orthogonal Complements and the Universal Split",
        "prompt": "Did you observe that every vector of ℛ is perpendicular to every vector of N?",
        "goal": "Verify geometrically and algebraically that the Row Space and Null Space are orthogonal complements.",
        "concept": "By definition of Ax = 0, every row vector dots to zero against every null space vector, making ℛ ⊥ N throughout ℝ³.",
        "story": "Close your eyes, pick ANY arrow on the 2D Row Space floor and ANY arrow along the 1D Null Space line: they form a flawless 90-degree angle!",
        "ggbType": "3d",
        "steps": ["Take vector r = (1, 2, 3) from ℛ.", "Take vector n = (1, -2, 1) from N.", "Compute dot product: 1(1) + 2(-2) + 3(1) = 1 - 4 + 3 = 0.", "Conclude: every vector in ℛ is universally perpendicular to every vector in N."]
    },
    {
        "num": 12, "code": "M3Q12", "quizNum": 35, "emoji": "📉",
        "title": "The Anatomy of a Dimensional Collapse",
        "prompt": "Consider the matrix B = [[1, 2], [2, 4]]. Draw the line 2y+x=4. Seeing the matrix B as a function B: ℝ² -> ℝ², where does B take the line 2y+x=4?\nWhere does it take:\ni) 2y+x=10\nii) 2y+x=62\niii) 2y+x=1800",
        "goal": "Watch a singular matrix crush entire 1D lines of input data into isolated single output points.",
        "concept": "Because lines x+2y=k run parallel to the Null Space x+2y=0, B maps the entire infinite line to the single point (k, 2k).",
        "story": "Feed an entire infinite line of coordinates into matrix B. Out pops a single, isolated dot! A whole dimension of history is destroyed.",
        "ggbType": "graphing",
        "steps": ["Type: x + 2*y = 4 and press Enter.", "Compute B * [x, y]^T = [x+2y, 2(x+2y)]^T = [4, 8].", "Type: (4, 8) and press Enter.", "Notice line 2y+x=4 collapses to (4, 8), line =10 to (10, 20), etc."]
    },
    {
        "num": 13, "code": "M3Q13", "quizNum": 36, "emoji": "🔤",
        "title": "The Generalized Collapse and the Parameter k",
        "prompt": "In general B = [[1, 2], [2, 4]] : ℝ² -> ℝ², where does this function take 2y+x=k? (where k is a constant)",
        "goal": "Generalize the dimensional collapse algebraically: B maps the line x + 2y = k to the coordinate (k, 2k).",
        "concept": "For any constant k, all points on x+2y=k evaluate to [k, 2k]^T. Reversing this mapping is impossible since data is lost.",
        "story": "As slider k sweeps from -∞ to +∞, each parallel line of the 2D input plane is squashed into a single dot on the line y = 2x.",
        "ggbType": "graphing",
        "steps": ["Create slider k.", "Type: x + 2*y = k", "Type: P = (k, 2*k)", "Drag slider k to watch every parallel line crush into its own unique dot on y = 2x."]
    },
    {
        "num": 14, "code": "M3Q14", "quizNum": 37, "emoji": "🎯",
        "title": "The Range and the Column Space",
        "prompt": "Given B = [[1, 2], [2, 4]] : ℝ² -> ℝ². What is the range of this function?",
        "goal": "Determine that the Range of matrix B is the 1-dimensional line y = 2x, exactly its Column Space.",
        "concept": "The Range is the span of the columns [1, 2]^T and [2, 4]^T. Because column 2 is 2*(column 1), the Range is strictly 1D.",
        "story": "Even though matrix B outputs into a 2D room (Codomain ℝ²), its actual footprint (Range) is trapped on a single 1D rail.",
        "ggbType": "graphing",
        "steps": ["Type: u = Vector((1, 2))", "Type: v = Vector((2, 4))", "Type: y = 2*x", "Observe that all outputs of B must lie on the line y = 2x!"]
    },
    {
        "num": 15, "code": "M3Q15", "quizNum": 38, "emoji": "💡",
        "title": "The Grand Epiphany of Dimensional Collapse",
        "prompt": "You have achieved the required wisdom if you have realized that:\nB = [[1, 2], [2, 4]] : ℝ² -> ℝ².\n'B collapses a dimension'.",
        "goal": "Achieve the core insight of linear algebra: singular matrices destroy dimensions, eating them into the Null Space.",
        "concept": "Rank-Nullity Theorem: dim(Domain) = dim(Range) + dim(Null Space). 2 = 1 + 1. Determinant = 0 confirms area collapses to 0.",
        "story": "You now see matrices not as numbers, but as geometric machines that bend, stretch, and collapse the fabric of space.",
        "ggbType": "graphing",
        "steps": ["Draw a unit square in GeoGebra.", "Apply matrix B = {{1, 2}, {2, 4}} to the square.", "Watch the 2D square completely flatten into a 1D line segment with zero area!"]
    }
]

for idx, qm in enumerate(M3_RAW_META):
    quiz_data = pdf_m3[idx].get('questions', []) if idx < len(pdf_m3) else []
    q_dict = {
        "id": 24 + idx,
        "module": 3,
        "questionNumber": qm["num"],
        "questionCode": qm["code"],
        "quizNumber": qm["quizNum"],
        "title": qm["title"],
        "emoji": qm["emoji"],
        "original_question": qm["prompt"],
        "goal": qm["goal"],
        "core_concept": qm["concept"],
        "story": qm["story"],
        "ggbType": qm["ggbType"],
        "ggbHint": qm["steps"][0],
        "ggbSteps": qm["steps"],
        "quiz": quiz_data
    }
    ALL_QUESTIONS.append(q_dict)

# --- Define metadata for Module 4 (7 questions) ---
M4_RAW_META = [
    {
        "num": 1, "code": "M4Q1", "quizNum": 39, "emoji": "🗺️",
        "title": "Visualizing the Subspaces",
        "prompt": "Given the matrix M = [[1, 3], [2, 6]]. Use Geogebra to plot ℛ, C & N. what do you observe?\n(i) ℛ = { alpha(1,3) + beta(2,6) | alpha, beta in ℝ }\n(ii) C = { alpha(1,2) + beta(3,6) | alpha, beta in ℝ }\n(iii) N = { (x,y) | x(1,2) + y(3,6) = 0, for all x,y in ℝ }",
        "goal": "Plot the Row Space, Column Space, and Null Space of M on Geogebra and observe their 1D geometry.",
        "concept": "Because row 2 is 2*(row 1) and col 2 is 3*(col 1), ℛ is the line y = 3x, C is the line y = 2x, and N is the line x + 3y = 0.",
        "story": "Two sliders controlling two dependent vectors sweep out only a single line. The matrix flattens 2D space onto a 1D track.",
        "ggbType": "graphing",
        "steps": ["Type: y = 3*x (Row Space ℛ)", "Type: y = 2*x (Column Space C)", "Type: x + 3*y = 0 (Null Space N)", "Observe ℛ and N are perpendicular!"]
    },
    {
        "num": 2, "code": "M4Q2", "quizNum": 40, "emoji": "⚖️",
        "title": "The Law of Orthogonal Complements",
        "prompt": "Note that ℛ and N are orthogonal.",
        "goal": "Prove mechanically why matrix multiplication Mx = 0 forces ℛ ⊥ N.",
        "concept": "The dot product of [1, 3] with any vector [-3t, t]^T in N equals 1(-3t) + 3(t) = 0, proving perpendicularity.",
        "story": "The equation Mx = 0 is a physical orthogonality test. Every row of M is perpendicular to every vector in the Null Space.",
        "ggbType": "graphing",
        "steps": ["Plot vector r = Vector((1, 3))", "Plot vector n = Vector((-3, 1))", "Compute Angle(r, n)", "Notice the angle is exactly 90 degrees!"]
    },
    {
        "num": 3, "code": "M4Q3", "quizNum": 41, "emoji": "🔄",
        "title": "Transposing Space and the Left Null Space",
        "prompt": "What is the null-space of M = [[1, 3], [2, 6]] & the null-space of M^T?",
        "goal": "Compute the Null Space of M and the Left Null Space N(M^T).",
        "concept": "N(M) is the line x + 3y = 0. Transposing swaps rows and columns, so N(M^T) is the line x + 2y = 0.",
        "story": "Transposing a matrix is a space-swapper: the old columns become new rows, and its null space becomes the Left Null Space.",
        "ggbType": "graphing",
        "steps": ["Type: x + 3*y = 0 (Null Space of M)", "Type: M_T = {{1, 2}, {3, 6}}", "Type: x + 2*y = 0 (Null Space of M^T)", "Observe they form two distinct 1D lines through the origin."]
    },
    {
        "num": 4, "code": "M4Q4", "quizNum": 42, "emoji": "🏛️",
        "title": "The Fundamental Theorem of Linear Algebra",
        "prompt": "Do you observe that C(M) ⊥ N(M^T) and ℛ(M) ⊥ N(M)?",
        "goal": "Confirm the Fundamental Theorem of Linear Algebra: both input and output rooms are split into orthogonal halves.",
        "concept": "In ℝ²: Domain splits into ℛ(M) ⊕ N(M); Codomain splits into C(M) ⊕ N(M^T).",
        "story": "The crowning achievement of linear algebra: the matrix perfectly partitions both its input room and its output room into orthogonal complements.",
        "ggbType": "graphing",
        "steps": ["Plot C(M): y = 2*x", "Plot N(M^T): x + 2*y = 0", "Check Angle: slope 2 and slope -1/2 are negative reciprocals (90°).", "Verify both pairs of subspaces are universally orthogonal!"]
    },
    {
        "num": 5, "code": "M4Q5", "quizNum": 43, "emoji": "🔬",
        "title": "Mapping the Architecture of a Singular Engine",
        "prompt": "Consider A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. What is N(A), C(A), ℛ(A), N(A^T).",
        "goal": "Calculate all Four Fundamental Subspaces for the classic 3×3 singular matrix A.",
        "concept": "Rank = 2. ℛ(A) is a 2D plane; N(A) is the 1D line (1, -2, 1); C(A) is a 2D plane; N(A^T) is the 1D line (1, -2, 1).",
        "story": "Analyze the four chambers of this 3×3 engine. Because A is symmetric in its spacing, its input blind spot matches its output blind spot!",
        "ggbType": "3d",
        "steps": ["In 3D view, plot plane ℛ(A): x - 2y + z = 0", "Plot normal line N(A): t*(1, -2, 1)", "Plot plane C(A) and normal line N(A^T)", "Notice the input room and output room each split into a 2D floor and 1D flagpole!"]
    },
    {
        "num": 6, "code": "M4Q6", "quizNum": 44, "emoji": "🌌",
        "title": "Engineering Dimensional Collapse in Hyperspace",
        "prompt": "Consider a 4x4 matrix M: ℝ⁴ -> ℝ⁴ whose range is\na) 4-Dimension\nb) 3-Dimension\nc) 2-Dimension\nd) 1-Dimension\ne) 0-Dimension\nGive an example each for all the above 5 cases.",
        "goal": "Construct 4×4 matrices with ranges of dimensions 4, 3, 2, 1, and 0 using rank control.",
        "concept": "Rank can be dialed from 4 (Identity matrix) down to 0 (Zero matrix) by selectively zeroing diagonal entries or repeating columns.",
        "story": "You are the matrix engineer. Build machines that preserve all 4 dimensions, collapse 1, 2, or 3 dimensions, or obliterate the entire universe to a single dot.",
        "ggbType": "graphing",
        "steps": ["Rank 4: Identity matrix diag(1, 1, 1, 1)", "Rank 3: diag(1, 1, 1, 0)", "Rank 2: diag(1, 1, 0, 0)", "Rank 1: diag(1, 0, 0, 0)", "Rank 0: Zero matrix (all zeros)."]
    },
    {
        "num": 7, "code": "M4Q7", "quizNum": 45, "emoji": "🕸️",
        "title": "The Inescapable Grid",
        "prompt": "Consider A : ℝ³ -> ℝ³\na) Show that if the range contains a point (a,b,c), then it should contain the entire set S, defined by: S = { alpha(a, b, c) | alpha in ℝ }.\nb) Show that if the range contains the points (a,b,c) and (d,e,f), then the range contains the entire set T defined by: T = { alpha(a,b,c) + beta(d,e,f) | alpha, beta in ℝ }.\nc) Note: S is of dimension 1, but T needn't be of dimension 2. Think!",
        "goal": "Prove that the Range of a linear map is closed under scalar multiplication and addition, defining a true Subspace.",
        "concept": "By linearity A(alpha*u + beta*v) = alpha*A(u) + beta*A(v). Hence the Range is an inescapable linear subspace.",
        "story": "Once you enter the Range of a matrix, no linear combination can ever escape. You are trapped inside an inescapable mathematical grid.",
        "ggbType": "3d",
        "steps": ["In 3D view, plot vector u = (1, 2, 3)", "Plot line S = alpha * u (closed under scaling)", "Plot vector v = (2, 4, 6) and notice T remains 1D because v is collinear with u!", "Plot independent v to see T expand into a full 2D plane."]
    }
]

for idx, qm in enumerate(M4_RAW_META):
    quiz_data = pdf_m4[idx].get('questions', []) if idx < len(pdf_m4) else []
    q_dict = {
        "id": 39 + idx,
        "module": 4,
        "questionNumber": qm["num"],
        "questionCode": qm["code"],
        "quizNumber": qm["quizNum"],
        "title": qm["title"],
        "emoji": qm["emoji"],
        "original_question": qm["prompt"],
        "goal": qm["goal"],
        "core_concept": qm["concept"],
        "story": qm["story"],
        "ggbType": qm["ggbType"],
        "ggbHint": qm["steps"][0],
        "ggbSteps": qm["steps"],
        "quiz": quiz_data
    }
    ALL_QUESTIONS.append(q_dict)

# --- Define metadata for Module 5 (5 questions) ---
M5_RAW_META = [
    {
        "num": 1, "code": "M5Q1", "quizNum": 46, "emoji": "🏗️",
        "title": "Architecting the Cartesian Universe",
        "prompt": "Give an example of two 2-dim subspaces in ℝ³. Let us call it S_1, S_2.",
        "goal": "Construct two distinct 2-dimensional planes in ℝ³ passing through (0,0,0) and observe their intersection line.",
        "concept": "Any two distinct 2D subspaces in ℝ³ must intersect in a 1D line passing through the origin.",
        "story": "Take two infinite sheets of paper inside a 3D room and force them both to touch the origin. They must slice through each other, creating a crease.",
        "ggbType": "3d",
        "steps": ["In 3D view, plot S1: z = 0 (the xy-plane)", "Plot S2: x + y + z = 0 (a slanted plane through origin)", "Type: Intersect(z = 0, x + y + z = 0)", "Observe the intersection crease is an infinite 1D line through (0,0,0)!"]
    },
    {
        "num": 2, "code": "M5Q2", "quizNum": 47, "emoji": "👥",
        "title": "Architecting the Shadow Spaces",
        "prompt": "Let S_3 be all those vectors perpendicular to S_1. S_4 be that of S_2.",
        "goal": "Construct the orthogonal complements S3 = S1^⊥ and S4 = S2^⊥ in ℝ³.",
        "concept": "Because dim(S1) = 2 in ℝ³, its orthogonal complement S3 is a 1-dimensional line (3 - 2 = 1).",
        "story": "If S1 is the floor, S3 is the flagpole shooting straight up. S3 and S4 are the shadow spaces of the Cartesian room.",
        "ggbType": "3d",
        "steps": ["For S1 (z = 0), normal vector is (0, 0, 1) -> S3 is the z-axis line.", "For S2 (x + y + z = 0), normal vector is (1, 1, 1) -> S4 is the line t*(1, 1, 1).", "Plot both 1D lines in 3D view.", "Confirm each line is perpendicular to its respective plane."]
    },
    {
        "num": 3, "code": "M5Q3", "quizNum": 48, "emoji": "🛠️",
        "title": "Reverse-Engineering the Matrix Engine",
        "prompt": "Find a matrix M whose Null-Space is S_3, column space is S_2.",
        "goal": "Construct a 3×3 matrix M from scratch given its Null Space S3 and Column Space S2.",
        "concept": "Map basis vectors of S1 (Row Space) bijectively to S2 (Column Space), and map the basis vector of S3 to 0.",
        "story": "You are the matrix architect. Program the matrix instructions to map the floor S1 to the output plane S2 while annihilating the flagpole S3.",
        "ggbType": "3d",
        "steps": ["Choose basis v1, v2 for S1 and normal n for S3.", "Set M * v1 = w1 (in S2), M * v2 = w2 (in S2), M * n = 0.", "Assemble columns of M by computing M * I.", "Verify M * n = 0 and rank(M) = 2."]
    },
    {
        "num": 4, "code": "M5Q4", "quizNum": 49, "emoji": "📐",
        "title": "The Complete Structural Blueprint",
        "prompt": "What does S_1 and S_4 represent?",
        "goal": "Identify S1 as the Row Space and S4 as the Left Null Space of the constructed matrix M.",
        "concept": "S1 = S3^⊥ is the Row Space; S4 = S2^⊥ is the Left Null Space N(M^T), representing unreachable output destinations.",
        "story": "S1 is the part of the input domain that survives transformation; S4 is the blind spot of the output universe where M can never reach.",
        "ggbType": "3d",
        "steps": ["Observe S1 is the orthogonal complement of the Null Space S3 => S1 = Row Space ℛ(M).", "Observe S4 is the orthogonal complement of the Column Space S2 => S4 = Left Null Space N(M^T).", "Verify all 4 fundamental subspaces are completely accounted for!"]
    },
    {
        "num": 5, "code": "M5Q5", "quizNum": 50, "emoji": "🔮",
        "title": "The Hidden Bijection and the Pseudo-Inverse",
        "prompt": "Do you observe there is a bijection from S_1 -> S_2?",
        "goal": "Discover the bijective bridge between Row Space and Column Space and introduce the Moore-Penrose Pseudo-Inverse M⁺.",
        "concept": "Restricted to S1, M is 1-to-1 and onto S2. The Pseudo-Inverse M⁺ inverts this restricted bridge and sends S4 to 0.",
        "story": "Even when a matrix is singular, a flawless 1-to-1 bijection lives between its Row Space and Column Space. The Pseudo-Inverse walks backward across this bridge!",
        "ggbType": "3d",
        "steps": ["Plot S1 (input floor) and S2 (output floor) in 3D view.", "Map vectors from S1 to S2 under M: no information is lost.", "Construct the Pseudo-Inverse M⁺ mapping S2 back to S1.", "Celebrate graduation from Matrix Mystics!"]
    }
]

for idx, qm in enumerate(M5_RAW_META):
    quiz_data = pdf_m5[idx].get('questions', []) if idx < len(pdf_m5) else []
    q_dict = {
        "id": 46 + idx,
        "module": 5,
        "questionNumber": qm["num"],
        "questionCode": qm["code"],
        "quizNumber": qm["quizNum"],
        "title": qm["title"],
        "emoji": qm["emoji"],
        "original_question": qm["prompt"],
        "goal": qm["goal"],
        "core_concept": qm["concept"],
        "story": qm["story"],
        "ggbType": qm["ggbType"],
        "ggbHint": qm["steps"][0],
        "ggbSteps": qm["steps"],
        "quiz": quiz_data
    }
    ALL_QUESTIONS.append(q_dict)

# --- Define metadata for Module 6 (3 questions) ---
M6_RAW_META = [
    {
        "num": 1, "code": "M6Q1", "quizNum": 51, "emoji": "🎬",
        "title": "Recommender Systems & Collaborative Matrix Factorization",
        "prompt": "Recommender System\nExplore how streaming platforms predict user ratings by factorizing massive, sparse user-item rating matrices into low-rank user and item latent feature vectors.",
        "goal": "Model user-movie rating matrices and understand low-rank matrix approximation R ≈ U · V^T.",
        "concept": "High-dimensional sparse matrices can be approximated by factoring into low-rank latent taste spaces using Singular Value Decomposition.",
        "story": "Netflix has millions of users and thousands of movies, but most ratings are missing. Matrix factorization uncovers hidden taste profiles.",
        "ggbType": "graphing",
        "steps": [
            "Plot sample user taste vectors in 2D latent space: Action vs Comedy.",
            "Plot movie profile vectors in the same space.",
            "Calculate dot product: high dot product predicts a 5-star rating!",
            "Observe how low-rank matrices cluster similar users together."
        ]
    },
    {
        "num": 2, "code": "M6Q2", "quizNum": 52, "emoji": "🌐",
        "title": "Google PageRank: The Stationary Eigenvector of the Web",
        "prompt": "Page Ranking\nInvestigate how Google ranks web pages by modeling the internet as a directed graph and computing the dominant stationary eigenvector of its stochastic hyperlink matrix.",
        "goal": "Model the web as a hyperlink transition graph and compute its dominant eigenvector with eigenvalue λ = 1.",
        "concept": "PageRank simulates a random surfer on a column-stochastic hyperlink matrix with damping factor d = 0.85; stationary distribution = dominant eigenvector.",
        "story": "A link from Page A to Page B is a vote of confidence. Solving for web authority is solving for the largest eigenvector in history.",
        "ggbType": "geometry",
        "steps": [
            "Draw a directed graph connecting 4 web pages.",
            "Formulate the 4×4 column-stochastic transition matrix M.",
            "Apply power iteration: x_{k+1} = M * x_k.",
            "Watch the vector converge to the permanent PageRank importance scores!"
        ]
    },
    {
        "num": 3, "code": "M6Q3", "quizNum": 53, "emoji": "📉",
        "title": "Dimensionality Reduction: PCA & Singular Value Decomposition",
        "prompt": "Dimensionality Reduction\nDiscover how Principal Component Analysis (PCA) and Singular Value Decomposition (SVD) compress high-dimensional data into essential principal axes with minimal information loss.",
        "goal": "Project 3D data clouds onto principal 2D orthogonal axes of maximum variance.",
        "concept": "PCA computes eigenvectors of the data covariance matrix; SVD decomposes A = UΣV^T to compress data along principal singular vectors.",
        "story": "Facial recognition and data science require compressing thousands of variables into a few key coordinates without losing vital patterns.",
        "ggbType": "3d",
        "steps": [
            "In 3D view, plot an elongated 3D data cloud.",
            "Find the first principal component vector PC1 along the axis of maximum variance.",
            "Find the orthogonal second principal component PC2.",
            "Project the 3D data onto the 2D plane (PC1, PC2) with minimal distortion!"
        ]
    }
]

for idx, qm in enumerate(M6_RAW_META):
    topic = m6_json['topics'][idx] if idx < len(m6_json['topics']) else {}
    q_dict = {
        "id": 51 + idx,
        "module": 6,
        "questionNumber": qm["num"],
        "questionCode": qm["code"],
        "quizNumber": qm["quizNum"],
        "title": qm["title"],
        "emoji": qm["emoji"],
        "original_question": qm["prompt"],
        "goal": qm["goal"],
        "core_concept": qm["concept"],
        "story": qm["story"],
        "ggbType": qm["ggbType"],
        "ggbHint": qm["steps"][0],
        "ggbSteps": qm["steps"],
        "quiz": extract_mcqs(topic)
    }
    ALL_QUESTIONS.append(q_dict)

print(f"Total compiled questions: {len(ALL_QUESTIONS)}")

# Write to matrixMysticsData.js as ES module
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write("/**\n * Complete Matrix Mystics Curriculum Dataset\n * Generated automatically: 53 Questions across 6 Modules\n */\n\n")
    f.write("export const MODULES = ")
    f.write(json.dumps(MODULES, indent=2, ensure_ascii=False))
    f.write(";\n\n")
    f.write("export const QUESTIONS = ")
    f.write(json.dumps(ALL_QUESTIONS, indent=2, ensure_ascii=False))
    f.write(";\n\n")
    f.write("// Alias for backward compatibility\nexport const MISSIONS = QUESTIONS;\n")

print(f"Successfully generated {OUTPUT_FILE} with {len(ALL_QUESTIONS)} questions!")
