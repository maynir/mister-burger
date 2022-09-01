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

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  })

  it('User not logged in in', async () => {
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
    const res = await request(app).post('/login').send({ email: 'user_email', password: 'user_password' });
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

  it('If user not logged in cant access /log-out', async () => {
    const res = await request(app).post('/log-out').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /add-to-cart', async () => {
    const res = await request(app).put('/add-to-cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /remove-from-cart', async () => {
    const res = await request(app).put('/remove-from-cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /cart', async () => {
    const res = await request(app).get('/cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /cart', async () => {
    const res = await request(app).delete('/cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /purchase', async () => {
    const res = await request(app).post('/purchase').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /users-activities', async () => {
    const res = await request(app).get('/users-activities').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /remove-product', async () => {
    const res = await request(app).put('/remove-product').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /lottry-status', async () => {
    const res = await request(app).get('/lottry-status').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('If user not logged in cant access /lottry', async () => {
    const res = await request(app).post('/lottry').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('Get emptyt cart', async () => {
    // log in before
    await request(app).post('/login').send({ email: 'user_email', password: 'user_password' })

    const res = await request(app).get('/cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.body.cart).toEqual(undefined);
  })

  it('Add item to cart', async () => {
    const addRes = await request(app).put('/add-to-cart').send({ name: 'main_product' }).set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(addRes.statusCode).toEqual(200);
    const res = await request(app).get('/cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.body.cart).toEqual({ main_product: true });
  })

  it('Remove item from cart', async () => {
    const addRes = await request(app).put('/remove-from-cart').send({ name: 'main_product' }).set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(addRes.statusCode).toEqual(200);
    const res = await request(app).get('/cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.body.cart).toEqual({});
  })

  it('Delete full cart', async () => {
    await request(app).put('/remove-from-cart').send({ name: 'main_product' }).set('Cookie', `shortPass=${ md5('user_password') }`);
    await request(app).put('/remove-from-cart').send({ name: 'side_product' }).set('Cookie', `shortPass=${ md5('user_password') }`);
    const res = await request(app).get('/cart').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.body.cart).toEqual({});
  })

  it('Make a purchase', async () => {
    const purchase = {
      items: [{
        name: "main_product",
        description: "main_product_desc",
        img: "main_product.png",
        price: 20,
        isSelected: true
      }],
      price: 20
    }
    const res = await request(app).post('/purchase').send({ purchase }).set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(200);
  })

  it('Not an admin user cant access /users-activities', async () => {
    const res = await request(app).get('/users-activities').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('Not an admin user cant access /add-product', async () => {
    const res = await request(app).post('/add-product').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('Not an admin user cant access /remove-product', async () => {
    const res = await request(app).put('/remove-product').set('Cookie', `shortPass=${ md5('user_password') }`);
    expect(res.statusCode).toEqual(401);
  })

  it('Admin user', async () => {
    // log out from normal user
    await request(app).post('/log-out').set('Cookie', `shortPass=${ md5('user_password') }`);

    const res = await request(app).post('/login').send({ email: 'admin', password: 'admin' });
    expect(res.statusCode).toEqual(201);
  })

  it('Users activities', async () => {
    const res = await request(app).get('/users-activities').set('Cookie', `shortPass=${ md5('admin') }`);
    expect(res.body.activities).toEqual([{ "email": "user_email", "path": "/login", "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "path": "/log-out", "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "path": "/login", "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "item": "main_product", "path": "/add-to-cart", "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "path": "/remove-from-cart", "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "path": "/remove-from-cart", "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "path": "/remove-from-cart", "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "items": ["main_product"], "path": "/purchase", "price": 20, "time": "1/1/2020, 2:00:00 AM" }, { "email": "user_email", "path": "/log-out", "time": "1/1/2020, 2:00:00 AM" }, { "email": "admin", "path": "/login", "time": "1/1/2020, 2:00:00 AM" }]);
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