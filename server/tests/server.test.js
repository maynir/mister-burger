const request = require('supertest');
const app = require('../index.js');
const fs = require('fs');
const databaseFiles = ['cart', 'lottery', 'purchases'];

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

  it('User sign in with the same email', async () => {
    const signInRes = await request(app)
      .post('/sign-in')
      .send({
        email: 'user_email',
        password: 'user_password'
      })
    expect(signInRes.statusCode).toEqual(303);
  })

  it('User login with wrong infp', async () => {
    const signInRes = await request(app)
      .post('/login')
      .send({
        email: 'user_email_not_exist',
        password: 'user_password'
      })
    expect(signInRes.statusCode).toEqual(401);
  })

  it('User login', async () => {
    const signInRes = await request(app)
      .post('/login')
      .send({
        email: 'user_email',
        password: 'user_password'
      })
    expect(signInRes.statusCode).toEqual(201);
  })

  // resete json files
  afterAll(() => {
    const products = {
      "main": {
        "main_product": {
          "description": "main_product_desc",
          "img": "main_product.png",
          "price": 20
        }
      },
      "side": {
        "side_product": {
          "description": "side_product_desc",
          "img": "side_product.png",
          "price": 10
        }
      },
      "drink": {
        "drink_product": {
          "description": "drink_product_desc",
          "img": "drink_product.png",
          "price": 8
        }
      }
    };
    databaseFiles.forEach((fileName) => {
      fs.writeFile(`./server/tests/database_files/${ fileName }.json`, JSON.stringify({}), 'utf8', () => { });
    })
    fs.writeFile('./server/tests/database_files/users.json', JSON.stringify({ admin: 'admin' }), 'utf8', () => { });
    fs.writeFile('./server/tests/database_files/user_activity.json', JSON.stringify({ activities: [] }), 'utf8', () => { });
    fs.writeFile('./server/tests/database_files/products.json', JSON.stringify(products), 'utf8', () => { });
  });
})