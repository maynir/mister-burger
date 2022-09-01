const request = require('supertest');
const app = require('../index.js');
const fs = require('fs');
const md5 = require('md5');
const databaseFiles = ['cart', 'lottery', 'purchases'];
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
      "price": 5
    }
  }
};

describe('Server end points', () => {
  it('User not logged in', async () => {
    const res = await request(app).get('/username').set('Cookie', `shortPass=${ md5('user_password') }`)
    expect(res.body.email).toEqual(undefined);
  })

  it('User sign in', async () => {
    const res = await request(app)
      .post('/sign-in')
      .send({
        email: 'user_email',
        password: 'user_password'
      })
    expect(res.statusCode).toEqual(200);
  })

  it('User sign in with the same email', async () => {
    const res = await request(app)
      .post('/sign-in')
      .send({
        email: 'user_email',
        password: 'user_password'
      })
    expect(res.statusCode).toEqual(303);
  })

  it('User login with wrong info', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'user_email_not_exist',
        password: 'user_password'
      })
    expect(res.statusCode).toEqual(401);
  })

  it('User login', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'user_email',
        password: 'user_password'
      })
    expect(res.statusCode).toEqual(201);
  })

  it('Products', async () => {
    const res = await request(app).get('/products');
    expect(res.body.products).toEqual(products);
  })

  it('Flat products', async () => {
    const res = await request(app).get('/flat-products');
    expect(res.body.products).toEqual([{ name: 'main_product', type: 'main', description: 'main_product_desc', img: 'main_product.png', price: 20 }, { name: 'side_product', type: 'side', description: 'side_product_desc', img: 'side_product.png', price: 10 }, { name: 'drink_product', type: 'drink', description: 'drink_product_desc', img: 'drink_product.png', price: 5 }]);
  })

  it('User is logged in', async () => {
    const res = await request(app).get('/username').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.body.email).toEqual('user_email');
  })

  it('Log out', async () => {
    const res = await request(app).post('/log-out').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(200);
    const usernameRes = await request(app).get('/username').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(usernameRes.body.email).toEqual(undefined);
  })

  // resete json files
  afterAll(() => {
    databaseFiles.forEach((fileName) => {
      fs.writeFile(`./server/tests/database_files/${ fileName }.json`, JSON.stringify({}), 'utf8', () => { });
    })
    fs.writeFile('./server/tests/database_files/users.json', JSON.stringify({ admin: 'admin' }), 'utf8', () => { });
    fs.writeFile('./server/tests/database_files/user_activity.json', JSON.stringify({ activities: [] }), 'utf8', () => { });
    fs.writeFile('./server/tests/database_files/products.json', JSON.stringify(products), 'utf8', () => { });
  });
})