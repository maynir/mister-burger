const request = require('supertest');
const app = require('../index.js');
const fs = require('fs');
const databaseFiles = ['cart', 'lottery', 'purchases', 'user_activity'];

describe('Server end points', () => {
  it('User not logged in', async () => {
    const res = await request(app)
      .get('/username')
      .send({
        cookies: { shortPass: 'user_password' }
      })
    expect(res.body.email).toEqual('');
  })

  it('User sign in', async () => {
    const signInRes = await request(app)
      .post('/sign-in')
      .send({
        email: 'user_email',
        password: 'user_password'
      })
    expect(signInRes.statusCode).toEqual(200);
  })

  // delete all data from files
  afterAll(() => {
    databaseFiles.forEach((fileName) => {
      fs.writeFile(`./server/tests/database_files/${ fileName }.json`, JSON.stringify({}), 'utf8', () => { });
    })
    fs.writeFile('./server/tests/database_files/users.json', JSON.stringify({ admin: 'admin' }), 'utf8', () => { });
  });
})