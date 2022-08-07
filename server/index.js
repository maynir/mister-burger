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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/'));
app.use(cookieParser());

app.get("/api", (req, res) => {
  console.log('api');
  res.json({ message: "Hello from server!" });
});

app.get('/username', (req, res, next) => {
  console.log(sessions[(req.cookies)?.shortPass]);
  res.json({ email: sessions[(req.cookies)?.shortPass] || "" });
  next();
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

app.listen(port, () => {
  console.log(`Listening on port: ${ port }`);
})

app.get('/products', (req, res) => {
  const rawProductsData = fs.readFileSync(PRODUCTS_FILE);
  const products = JSON.parse(rawProductsData);
  res.json({ products });
})

app.put('/add-to-cart', (req, res) => {
  console.log('/add-to-cart');
  const shortPass = (req.cookies)?.shortPass;
  const email = sessions[shortPass];

  if (email) {
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
  } else {
    res.statusCode = 401;
    console.log("user wasnt logged in")
  }

  res.end();
})

app.get('/cart', (req, res) => {
  const shortPass = (req.cookies)?.shortPass;
  const email = sessions[shortPass];

  if (email) {
    const rawCartData = fs.readFileSync(CART_FILE);
    const cartData = JSON.parse(rawCartData);
    res.json({ cart: cartData[email] })
  } else {
    res.json({ cart: null })
  }
})

app.use('/', (req, res, next) => {
  console.log('test');
  next();
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