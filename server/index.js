const express = require('express');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const app = express();
const port = 3001;
const fs = require('fs');
const sessions = {};
const USERS_FILE = './server/users.json';
const PRODUCTS_FILE = './server/products.json';
const CART_FILE = './server/cart.json';
const PURCHASES_FILE = './server/purchases.json';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/'));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Listening on port: ${ port }`);
})

app.get('/username', (req, res) => {
  console.log('username', sessions[(req.cookies)?.shortPass]);
  res.json({ email: sessions[(req.cookies)?.shortPass] || "" });
})

app.post("/sign-in", (req, res) => {
  const userData = {};
  const email = req.body.email;

  let rawUsersData = fs.readFileSync(USERS_FILE);
  let usersData = JSON.parse(rawUsersData);
  if (usersData[email]) {
    res.statusCode = 303;
    res.end();
  }

  const password = req.body.password;
  userData[email] = password;

  fs.writeFile(USERS_FILE, JSON.stringify(userData), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Users JSON Object to File.");
      return console.log(err);
    }
    console.log(`Created new user with email: ${ email }`);
  });
  res.end();
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const rememberMe = req.body.rememberMe;

  if (verifyUser(email, password)) {
    setCookieAndSession(email, password, rememberMe, res);
    res.statusCode = 201;
  } else {
    res.statusCode = 401;
  }
  res.end();
});

app.post("/log-out", (req, res) => {
  console.log(req.cookies)
  const shortPass = (req.cookies)?.shortPass;

  if (sessions[shortPass]) {
    delete sessions[shortPass];
    res.clearCookie('shortPass');
    console.log("logged out")
  } else {
    console.log("user wasnt logged in")
  }
  res.end();
});

app.get('/products', (req, res) => {
  const rawProductsData = fs.readFileSync(PRODUCTS_FILE);
  const products = JSON.parse(rawProductsData);
  res.json({ products });
})

app.use('/', (req, res, next) => {
  const shortPass = (req.cookies)?.shortPass;
  const email = sessions[shortPass];
  console.log(req.url);

  if (email) {
    console.log(`logged in email: ${ email }`);
    res.locals.email = email;
    next();
  } else {
    res.statusCode = 401;
    console.log("Not authorized to do this action.")
  }
})

app.put('/add-to-cart', (req, res) => {
  const email = res.locals.email;
  console.log(res.locals);

  const productName = req.body.name;
  const rawCartsData = fs.readFileSync(CART_FILE);
  const cartData = JSON.parse(rawCartsData);
  const currentUserCart = cartData[email] || {};
  const newUserCart = { ...currentUserCart, [productName]: true }

  fs.writeFile(CART_FILE, JSON.stringify({ [email]: newUserCart }), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Cart JSON Object to File.");
      return console.log(err);
    }
    console.log(`${ productName } added to cart`)
  });


  res.end();
})

app.put('/remove-from-cart', (req, res) => {
  const email = res.locals.email;

  const productName = req.body.name;
  const rawCartsData = fs.readFileSync(CART_FILE);
  const cartData = JSON.parse(rawCartsData);
  const currentUserCart = cartData[email] || {};
  delete currentUserCart[productName];

  fs.writeFile(CART_FILE, JSON.stringify({ [email]: currentUserCart }), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Cart JSON Object to File.");
      return console.log(err);
    }
    console.log(`${ productName } removed from cart`)
  });

  res.end();
})

app.get('/cart', (req, res) => {
  const email = res.locals.email;

  const rawCartData = fs.readFileSync(CART_FILE);
  const cartData = JSON.parse(rawCartData);
  res.json({ cart: cartData[email] })
})

app.delete('/cart', (req, res) => {
  const email = res.locals.email;

  fs.writeFile(CART_FILE, JSON.stringify({ [email]: {} }), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Purchase JSON Object to File.");
      return console.log(err);
    }
  });

  res.end();
})

app.post('/purchase', (req, res) => {
  const newPurchase = req.body.purchase;
  const purchaseId = new Date().valueOf();
  fs.writeFile(PURCHASES_FILE, JSON.stringify({ [purchaseId]: newPurchase }), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Purchase JSON Object to File.");
      return console.log(err);
    }
    console.log('new purchase', JSON.stringify({ [purchaseId]: newPurchase }));
  });

  res.end();
})

function setCookieAndSession(email, password, rememberMe, res) {
  const experationTime = rememberMe ? 1000 * 60 * 60 * 24 * 10 : 1000 * 60 * 30;
  const shortPass = generateShortPass(password);
  res.cookie('shortPass', shortPass);
  sessions[shortPass] = email;
  setTimeout(() => {
    delete sessions[shortPass];
  }, experationTime);
}

function verifyUser(email, password) {
  let rawUsersData = fs.readFileSync(USERS_FILE);
  let usersData = JSON.parse(rawUsersData);
  return usersData[email] && usersData[email] === password;
}

function generateShortPass(password) {
  return md5(password);
}