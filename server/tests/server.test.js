const request = require('supertest');
const app = require('../index.js');

describe('Server end points', () => {
  it('User not logged in', async () => {
    const res = await request(app)
      .get('/username')
      .send({
        cookies: { shortPass: 'shortPass' }
      })
    expect(res.body.email).toEqual('');
  })
})