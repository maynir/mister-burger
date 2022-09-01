const request = require('supertest');
const app = require('../index.js');
const fs = require('fs');
const databaseFiles = ['cart', 'lottery', 'products', 'purchases', 'user_activity'];

describe('Server end points', () => {
  it('User not logged in', async () => {
    const res = await request(app)
      .get('/username')
      .send({
        cookies: { shortPass: 'shortPass' }
      })
    expect(res.body.email).toEqual('');
  })

  // it('User sign in', async () => {
  //   const res = await request(app)
  //     .get('/username')
  //     .send({
  //       cookies: { shortPass: 'shortPass' }
  //     })
  //   expect(res.body.email).toEqual('');
  // })

  // delete all data from files
  afterAll(() => {
    databaseFiles.forEach((fileName) => {
      fs.writeFile(`./server/test/database_files/${ fileName }.json`, JSON.stringify({}), 'utf8', () => {});
    })
    fs.writeFile('./server/test/database_files/users.json', JSON.stringify({ admin: 'admin' }), 'utf8', () => {});
  });
})