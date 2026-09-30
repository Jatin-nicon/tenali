'use strict';
const path = require('path');
const fs = require('fs');
const router = require('express').Router();

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(correctText, distractors) {
  const seen = new Set([String(correctText)]);
  const cleaned = [];
  for (const d of distractors) {
    const s = String(d);
    if (!seen.has(s)) { seen.add(s); cleaned.push(s); }
    if (cleaned.length >= 3) break;
  }
  let pad = 1;
  while (cleaned.length < 3) {
    const filler = `${correctText}_${pad++}`;
    if (!seen.has(filler)) { seen.add(filler); cleaned.push(filler); }
  }
  const all = shuffleArray([{ text: String(correctText), correct: true }, ...cleaned.slice(0, 3).map(t => ({ text: t, correct: false }))]);
  const labels = ['A', 'B', 'C', 'D'];
  const options = all.map((o, i) => ({ option: labels[i], text: o.text }));
  const correctOption = labels[all.findIndex(o => o.correct)];
  return { options, correctOption, correctDisplay: String(correctText) };
}

function mcCheck(req, res) {
  const b = req.body || {};
  const correct = !!b.selectedOption && b.selectedOption === b.correctOption;
  res.json({
    correct,
    correctOption: b.correctOption,
    correctDisplay: b.correctDisplay,
    message: correct ? 'Correct!' : 'Incorrect',
  });
}

const crypto = require('crypto');

// Flat bank: topicKey -> { module, topicId, title, mcqs, real_life_application }
const mmQuestionBank = {};
// Module index: moduleNumber -> [topicKey]
const mmModules = {};
// Mission index: missionId -> full mission object
const mmMissions = {};

function loadMatrixMysticsBank() {
  const dir = path.join(__dirname, '..', '..', 'linearalgebra', 'matrixmystics');
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    let totalTopics = 0;
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
        const mod = data.module || 0;
        if (!mmModules[mod]) mmModules[mod] = [];
        // Each file has { module, topics: [{ topicId, title, mcqs, real_life_application, ... }] }
        const topics = Array.isArray(data.topics) ? data.topics : [];
        for (const topic of topics) {
          if (!topic.topicId) continue;
          const topicKey = `${file.replace('.json', '')}_${topic.topicId}`;
          mmQuestionBank[topicKey] = {
            module: mod,
            topicId: topic.topicId,
            title: topic.title || '',
            mcqs: topic.mcqs || {},
            real_life_application: topic.real_life_application || [],
          };
          mmModules[mod].push(topicKey);
          totalTopics++;
        }
      } catch (e) {
        console.error(`[matrixmystics] Failed to load ${file}:`, e.message);
      }
    }
    console.log(`[matrixmystics] Loaded ${Object.keys(mmQuestionBank).length} topics across ${Object.keys(mmModules).length} modules (${totalTopics} topic entries)`);
  } catch (e) {
    console.error('[matrixmystics] Failed to read matrixmystics directory:', e.message);
  }

  // Load the 56 questions from linearalgebra/questions
  const qDir = path.join(__dirname, '..', '..', 'linearalgebra', 'questions');
  try {
    const qFiles = fs.readdirSync(qDir).filter(f => f.endsWith('.json'));
    for (const file of qFiles) {
      try {
        const qData = JSON.parse(fs.readFileSync(path.join(qDir, file), 'utf8'));
        const mid = qData.missionId || qData.mission_id;
        if (mid) {
          mmMissions[mid] = {
            ...qData,
            file,
          };
        }
      } catch (e) {
        console.error(`[matrixmystics] Failed to load question ${file}:`, e.message);
      }
    }
    console.log(`[matrixmystics] Loaded ${Object.keys(mmMissions).length} mission questions from linearalgebra/questions`);
  } catch (e) {
    console.error('[matrixmystics] Failed to read questions directory:', e.message);
  }
}

loadMatrixMysticsBank();

router.get('/question', (req, res) => {
  try {
    const difficulty = req.query.difficulty || 'easy';
    const module = req.query.module ? Number(req.query.module) : null;
    const topic = req.query.topic || null;
    const phase = req.query.phase || null; // 'realapp' to restrict to real_life_application tier
    const seenParam = req.query.seen ? new Set(String(req.query.seen).split(',').filter(Boolean)) : null;
    const diffKey = difficulty === 'extrahard' ? 'hard' : difficulty;

    // Collect questions matching the filter
    const candidates = [];
    const keysToSearch = module && mmModules[module] ? mmModules[module] : Object.keys(mmQuestionBank);

    const seenSet = seenParam;

    for (const key of keysToSearch) {
      const data = mmQuestionBank[key];
      if (!data) continue;
      if (topic && data.topicId !== topic) continue;
      if (phase === 'realapp') {
        // Real-life application pool only (used by Phase 2 of LA mission quiz)
        const pool = data.real_life_application || [];
        if (pool.length > 0) {
          for (const q of pool) {
            if (seenSet && seenSet.has(q.id)) continue;
            candidates.push({ ...q, _topic: data.topicId, _title: data.title, _module: data.module });
          }
        }
        continue;
      }
      const pool = data.mcqs && data.mcqs[diffKey];
      if (pool && pool.length > 0) {
        for (const q of pool) {
          if (seenSet && seenSet.has(q.id)) continue;
          candidates.push({ ...q, _topic: data.topicId, _title: data.title, _module: data.module });
        }
      }
      // Also include real_life_application at hard/extrahard tiers when not
      // explicitly requesting Phase 2 — keeps backward compatibility for any
      // existing matrixmystics-api callers.
      if (phase !== 'realapp' && (diffKey === 'hard') && data.real_life_application && data.real_life_application.length > 0) {
        for (const q of data.real_life_application) {
          candidates.push({ ...q, _topic: data.topicId, _title: data.title, _module: data.module });
        }
      }
    }

    if (candidates.length === 0) {
      return res.status(404).json({ error: 'No questions found for the given filters' });
    }

    const q = candidates[Math.floor(Math.random() * candidates.length)];

    // Build 4-option shuffled MCQ
    let options = Array.isArray(q.options) ? q.options : [];
    if (options.length >= 4) {
      const shuffled = shuffleArray(options.map((text, i) => ({ text, idx: i })));
      const labels = ['A', 'B', 'C', 'D'];
      options = shuffled.slice(0, 4).map((o, i) => ({ option: labels[i], text: String(o.text) }));
      const correctIdx = shuffled.findIndex(o => String(o.text) === String(q.correct_option));
      const correctOption = labels[correctIdx >= 0 ? correctIdx : 0];
      return res.json({
        id: q.id || `MM_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
        difficulty: diffKey,
        prompt: q.question,
        options,
        correctOption,
        correctDisplay: String(q.correct_option),
        explanation: q.explanation || '',
        topic: q._topic,
        topicTitle: q._title,
        module: q._module,
      });
    }

    // Fallback: build options from correct + remaining distractors
    if (q.correct_option) {
      const { options: opts, correctOption } = buildOptions(q.correct_option, options.filter(o => o !== q.correct_option));
      return res.json({
        id: q.id || `MM_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
        difficulty: diffKey,
        prompt: q.question,
        options: opts,
        correctOption,
        correctDisplay: String(q.correct_option),
        explanation: q.explanation || '',
        topic: q._topic,
        topicTitle: q._title,
        module: q._module,
      });
    }

    return res.status(500).json({ error: 'Question format error' });
  } catch (err) {
    console.error('[matrixmystics-api] error:', err);
    return res.status(500).json({ error: 'internal error' });
  }
});

router.post('/check', require('express').json(), (req, res) => {
  if (req.body && req.body.correctOption !== undefined) return mcCheck(req, res);
  return res.status(400).json({ error: 'Missing correctOption in payload' });
});

router.get('/stats', (req, res) => {
  const stats = { totalTopics: Object.keys(mmQuestionBank).length, modules: {} };
  for (const [mod, keys] of Object.entries(mmModules)) {
    let total = 0;
    for (const key of keys) {
      const data = mmQuestionBank[key];
      const m = data.mcqs || {};
      total += (m.easy || []).length;
      total += (m.medium || []).length;
      total += (m.hard || []).length;
      total += (data.real_life_application || []).length;
    }
    stats.modules[mod] = { topics: keys.length, questions: total };
  }
  res.json(stats);
});

router.get('/missions', (req, res) => {
  const list = Object.values(mmMissions)
    .sort((a, b) => (a.missionId || 0) - (b.missionId || 0))
    .map(m => ({
      missionId: m.missionId,
      module: m.module,
      title: m.title,
      core_concept: m.core_concept,
      original_question: m.original_question,
      quizCounts: {
        easy: m.mcqs?.easy?.length || 0,
        medium: m.mcqs?.medium?.length || 0,
        hard: m.mcqs?.hard?.length || 0,
        realapp: m.real_life_application?.length || 0,
      }
    }));
  res.json(list);
});

router.get('/mission/:id', (req, res) => {
  const mid = parseInt(req.params.id, 10);
  const mission = mmMissions[mid];
  if (!mission) return res.status(404).json({ error: 'Mission not found' });
  res.json(mission);
});

router.post('/verify-proof', require('express').json(), (req, res) => {
  const { missionId, proofHash, timestamp, score } = req.body || {};
  if (!missionId || !proofHash) {
    return res.status(400).json({ valid: false, error: 'Missing required proof fields' });
  }
  const mid = parseInt(missionId, 10);
  const mission = mmMissions[mid];
  if (!mission) {
    return res.status(404).json({ valid: false, error: 'Unknown mission ID' });
  }
  const expectedPrefix = `MM-M${mission.module}Q${mission.missionId}-`;
  const isValidFormat = typeof proofHash === 'string' && proofHash.startsWith(expectedPrefix);
  return res.json({
    valid: isValidFormat,
    missionId: mission.missionId,
    module: mission.module,
    title: mission.title,
    proofHash,
    verifiedAt: new Date().toISOString(),
    status: isValidFormat ? 'VERIFIED_COMPETENCY' : 'INVALID_HASH'
  });
});

module.exports = router;

