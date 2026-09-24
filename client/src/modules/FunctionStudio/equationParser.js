/**
 * Equation Parser & Evaluator for Function Studio
 * Parses flexible linear equation inputs (y = ax + b, ax + b, f(x) = ax + b)
 * and generates clean coordinate inquiry points for the isometric 2D grid.
 */

/**
 * Parses user input string into a structured line representation:
 * { success: true, m, c, equationDisplay, ggbCmd, inquiries: [{x, y}, ...] }
 */
export function parseLineEquation(rawInput) {
  if (!rawInput || typeof rawInput !== 'string' || !rawInput.trim()) {
    return {
      success: false,
      error: 'Please enter the equation of a line, for example: y = 2x + 3.'
    };
  }

  const trimmed = rawInput.trim();

  // If user inputs a function like f(x) = ...
  if (/^f\s*\(\s*x\s*\)/i.test(trimmed)) {
    return {
      success: false,
      error: 'That is a function definition f(x). Please enter the equation of a line starting with y = (e.g. y = 2x + 3).'
    };
  }

  // Must strictly start with y = or y= (case-insensitive)
  if (!/^y\s*=/i.test(trimmed)) {
    return {
      success: false,
      error: `An equation of a line must start with y = (for example: y = ${trimmed.startsWith('+') ? trimmed.slice(1) : trimmed || '2x + 3'}).`
    };
  }

  // Extract the right-hand side of y = ...
  let rhs = trimmed.replace(/^y\s*=\s*/i, '').trim().toLowerCase();

  if (!rhs) {
    return {
      success: false,
      error: 'Please complete the equation after y = (for example: y = 2x + 3).'
    };
  }

  // Remove whitespace
  const s = rhs.replace(/\s+/g, '');

  let m = null;
  let c = null;

  // Pattern 1: mx + c or mx - c or mx (e.g. "2x+1", "-x+3", "3x-2", "2x", "-x", "x")
  const stdMatch = s.match(/^([+-]?(?:\d+(?:\.\d+)?)?)\*?x(?:([+-]\d+(?:\.\d+)?))?$/);
  if (stdMatch) {
    const mStr = stdMatch[1];
    const cStr = stdMatch[2];

    if (mStr === '' || mStr === '+') m = 1;
    else if (mStr === '-') m = -1;
    else m = Number(mStr);

    c = cStr !== undefined ? Number(cStr) : 0;
  } else {
    // Pattern 2: Constant first: c + mx or c - mx (e.g. "1+2x", "3-x")
    const constFirstMatch = s.match(/^([+-]?\d+(?:\.\d+)?)([+-](?:\d+(?:\.\d+)?)?)\*?x$/);
    if (constFirstMatch) {
      c = Number(constFirstMatch[1]);
      const mStr = constFirstMatch[2];
      if (mStr === '+') m = 1;
      else if (mStr === '-') m = -1;
      else m = Number(mStr);
    } else {
      // Pattern 3: Horizontal line y = c (e.g. "4", "-2")
      const horizMatch = s.match(/^([+-]?\d+(?:\.\d+)?)$/);
      if (horizMatch) {
        m = 0;
        c = Number(horizMatch[1]);
      }
    }
  }

  if (m === null || isNaN(m) || c === null || isNaN(c)) {
    return {
      success: false,
      error: 'Format not recognized. Please enter a linear equation like y = 2x + 3 or y = -x + 1.'
    };
  }

  // Bound check for comfortable viewing on the centered [-7, 7] x [-7, 9] grid
  if (Math.abs(m) > 5) {
    return {
      success: false,
      error: `Slope (${m}) is too steep for this view. Please pick a slope between -5 and 5.`
    };
  }

  if (Math.abs(c) > 6) {
    return {
      success: false,
      error: `y-intercept (${c}) is outside the grid. Please pick an intercept between -6 and 6.`
    };
  }

  // Format clean equation string
  let mPart = '';
  if (m === 1) mPart = 'x';
  else if (m === -1) mPart = '-x';
  else if (m === 0) mPart = '';
  else mPart = `${m}x`;

  let cPart = '';
  if (c > 0) {
    cPart = mPart ? ` + ${c}` : `${c}`;
  } else if (c < 0) {
    cPart = mPart ? ` - ${Math.abs(c)}` : `-${Math.abs(c)}`;
  } else if (c === 0) {
    cPart = mPart ? '' : '0';
  }

  const equationDisplay = `y = ${mPart}${cPart}`;
  const ggbCmd = m === 0 ? `${c}` : (c === 0 ? `${m}*x` : `${m}*x + (${c})`);
  const lineId = `user_line_${Math.abs(m)}_${m < 0 ? 'neg' : 'pos'}_${Math.abs(c)}_${c < 0 ? 'neg' : 'pos'}`;

  // Find 3 distinct integer inquiry test values of x where y is within [-6, 8]
  const candidateXs = [1, -2, 2, 0, -1, 3, -3, 4, -4];
  const inquiries = [];

  for (const testX of candidateXs) {
    const testY = m * testX + c;
    if (testY >= -6 && testY <= 8 && Number.isInteger(testY)) {
      inquiries.push({ x: testX, y: testY });
      if (inquiries.length === 3) break;
    }
  }

  // Fallback if 3 weren't found in initial candidates
  if (inquiries.length < 3) {
    for (let testX = -5; testX <= 5; testX++) {
      if (!inquiries.some((inq) => inq.x === testX)) {
        const testY = m * testX + c;
        if (testY >= -7 && testY <= 9) {
          inquiries.push({ x: testX, y: testY });
          if (inquiries.length === 3) break;
        }
      }
    }
  }

  return {
    success: true,
    id: lineId,
    m,
    c,
    equationDisplay,
    ggbCmd,
    inquiries
  };
}
