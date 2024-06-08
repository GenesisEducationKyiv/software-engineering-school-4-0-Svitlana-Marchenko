const request = require('supertest');
const assert = require('assert');
const app = require('../src/server');
const { test} = require('node:test');

test('GET /api/rate returns 200 code and number type', async () => {
    const response = await request(app).get('/api/rate');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(typeof response.body, 'number');
});

test('POST /api/subscribe with invalid email returns 400', async () => {
    const response = await request(app)
        .post('/api/subscribe')
        .send({ email: 'notemail' });
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.message, 'Invalid email address');
});