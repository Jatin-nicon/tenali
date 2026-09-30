const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const router = require('../routes/matrixmystics');

test('Matrix Mystics API Route Test Suite', async (t) => {
  const app = express();
  app.use(express.json());
  app.use('/matrixmystics-api', router);

  let server;
  let baseUrl;

  await t.test('Start express test server', async () => {
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}/matrixmystics-api`;
        resolve();
      });
    });
  });

  await t.test('GET /missions returns all 56 missions', async () => {
    const res = await fetch(`${baseUrl}/missions`);
    assert.equal(res.status, 200);
    const missions = await res.json();
    assert.equal(Array.isArray(missions), true);
    assert.equal(missions.length, 56);
    assert.equal(missions[0].missionId, 1);
    assert.equal(missions[0].module, 1);
    assert.equal(missions[0].title, 'Piggy Bank Detectives');
  });

  await t.test('GET /mission/:id returns full mission details', async () => {
    const res = await fetch(`${baseUrl}/mission/1`);
    assert.equal(res.status, 200);
    const m1 = await res.json();
    assert.equal(m1.missionId, 1);
    assert.equal(m1.title, 'Piggy Bank Detectives');
    assert.ok(m1.mcqs);
    assert.ok(Array.isArray(m1.mcqs.easy));
    assert.ok(m1.mcqs.easy.length > 0);
    assert.ok(Array.isArray(m1.real_life_application));
  });

  await t.test('POST /verify-proof verifies valid hash format', async () => {
    const res = await fetch(`${baseUrl}/verify-proof`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        missionId: 1,
        proofHash: 'MM-M1Q1-ABCDEF',
        score: { correct: 3, total: 3 },
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.valid, true);
    assert.equal(data.missionId, 1);
    assert.equal(data.module, 1);
    assert.equal(data.status, 'VERIFIED_COMPETENCY');
  });

  await t.test('POST /verify-proof rejects invalid prefix hash', async () => {
    const res = await fetch(`${baseUrl}/verify-proof`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        missionId: 1,
        proofHash: 'INVALID-HASH',
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.valid, false);
    assert.equal(data.status, 'INVALID_HASH');
  });

  await t.test('GET /question backwards-compatible MCQ test', async () => {
    const res = await fetch(`${baseUrl}/question?difficulty=easy`);
    assert.equal(res.status, 200);
    const q = await res.json();
    assert.ok(q.prompt);
    assert.ok(Array.isArray(q.options));
    assert.equal(q.options.length, 4);
    assert.ok(q.correctOption);
  });

  await t.test('Stop test server', () => {
    server.close();
  });
});
