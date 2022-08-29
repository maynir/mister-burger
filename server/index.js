const express = require('express');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3001;
const fs = require('fs');
const sessions = {};

const ONE_DAY = 1000 * 60 * 60 * 24;
const USERS_FILE = './server/users.json';
const PRODUCTS_FILE = './server/products.json';
const CART_FILE = './server/cart.json';
const PURCHASES_FILE = './server/purchases.json';
const USER_ACTIVITY_FILE = './server/user_activity.json';
const LOTTERY_FILE = './server/lottery.json';

const ADMIN_URLS = ['/users-activities', '/add-product'];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${ __dirname }/../client/public/images`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replaceAll(' ', '_'))
  }
})
const upload = multer({ storage: storage });

app.use(cors());
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
    addUserActivity(email, req.url);
  } else {
    res.statusCode = 401;
  }
  res.end();
});

app.get('/products', (req, res) => {
  const rawProductsData = fs.readFileSync(PRODUCTS_FILE);
  const products = JSON.parse(rawProductsData);
  res.json({ products });
})

app.get('/flat-products', (req, res) => {
  const rawProductsData = fs.readFileSync(PRODUCTS_FILE);
  const products = JSON.parse(rawProductsData);
  const flatProducts = Object.entries(products).flatMap(([productType, productsTyped]) => {
    return Object.entries(productsTyped).flatMap(([productName, productInfo]) => {
      return { name: productName, type: productType, description: productInfo.description, img: productInfo.img, price: productInfo.price }
    })
  })
  res.json({ products: flatProducts });
})

app.use('/', (req, res, next) => {
  const shortPass = (req.cookies)?.shortPass;
  const email = sessions[shortPass];
  console.log(req.url);

  if ((ADMIN_URLS.includes(req.url) && email && email === 'admin') || (req.url !== 'users-activities' && email)) {
    console.log(`logged in email: ${ email }`);
    res.locals.email = email;
    next();
  } else {
    res.statusCode = 401;
    console.log("Not authorized to do this action.")
  }
})

app.post("/log-out", (req, res) => {
  const email = res.locals.email;
  const shortPass = (req.cookies)?.shortPass;

  if (sessions[shortPass]) {
    delete sessions[shortPass];
    res.clearCookie('shortPass');
    console.log("logged out")
    addUserActivity(email, req.url);
  } else {
    console.log("user wasnt logged in")
  }
  res.end();
});

app.put('/add-to-cart', (req, res) => {
  const email = res.locals.email;

  const productName = req.body.name;
  const rawCartsData = fs.readFileSync(CART_FILE);
  const cartData = JSON.parse(rawCartsData);
  const userCart = cartData[email] || {};
  userCart[productName] = true;
  cartData[email] = userCart;

  fs.writeFile(CART_FILE, JSON.stringify(cartData), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Cart JSON Object to File.");
      return console.log(err);
    }
    console.log(`${ productName } added to cart`)
  });

  addUserActivity(email, req.url, productName);
  res.end();
})

app.put('/remove-from-cart', (req, res) => {
  const email = res.locals.email;

  const productName = req.body.name;
  const rawCartsData = fs.readFileSync(CART_FILE);
  const cartData = JSON.parse(rawCartsData);
  const userCart = cartData[email] || {};
  delete userCart[productName];
  cartData[email] = userCart;

  fs.writeFile(CART_FILE, JSON.stringify(cartData), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Cart JSON Object to File.");
      return console.log(err);
    }
    console.log(`${ productName } removed from cart`)
  });

  addUserActivity(email, req.url, productName);

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
  const rawCartData = fs.readFileSync(CART_FILE);
  const cartData = JSON.parse(rawCartData);
  cartData[email] = {};

  fs.writeFile(CART_FILE, JSON.stringify(cartData), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Purchase JSON Object to File.");
      return console.log(err);
    }
  });

  res.end();
})

app.post('/purchase', (req, res) => {
  const email = res.locals.email;
  const newPurchase = req.body.purchase;
  const purchaseId = new Date().valueOf();
  const rawPurchases = fs.readFileSync(PURCHASES_FILE);
  const purchasesData = JSON.parse(rawPurchases);
  purchasesData[purchaseId] = newPurchase;

  fs.writeFile(PURCHASES_FILE, JSON.stringify(purchasesData), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Purchase JSON Object to File.");
      return console.log(err);
    }
    console.log('new purchase', JSON.stringify({ [purchaseId]: newPurchase }));
  });

  addUserActivity(email, req.url, null, newPurchase.price, newPurchase.items.map(({ name }) => name));

  res.end();
})

app.get('/users-activities', (req, res) => {
  const rawUsersActivity = fs.readFileSync(USER_ACTIVITY_FILE);
  const { activities } = JSON.parse(rawUsersActivity);
  res.json({ activities });
})

app.post('/add-product', upload.single('file'), (req, res) => {
  const img = req.file.originalname.replaceAll(' ', '_');
  const { title, productType, description, price } = req.body;

  const newProductJson = { [title]: { description, img, price } }
  const rawProducts = fs.readFileSync(PRODUCTS_FILE);
  const products = JSON.parse(rawProducts);
  const productsOfType = products[productType] || {};
  products[productType] = { ...productsOfType, ...newProductJson };

  fs.writeFile(PRODUCTS_FILE, JSON.stringify(products), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Purchase JSON Object to File.");
      return console.log(err);
    }
  });

  res.end();
})

app.put('/remove-product', (req, res) => {
  const productType = req.body.productType
  const productName = req.body.productName;

  const rawProducts = fs.readFileSync(PRODUCTS_FILE);
  const products = JSON.parse(rawProducts);
  const productsOfType = products[productType] || {};
  const filePath = productsOfType[productName].img;

  fs.unlink(`${ __dirname }/../client/public/images/${ filePath }`, (err => {
    if (err) console.log(err);
    else {
      console.log(`\nDeleted file: ${ filePath }`);
    }
  }));
  delete productsOfType[productName];
  products[productType] = productsOfType;

  fs.writeFile(PRODUCTS_FILE, JSON.stringify(products), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing Product JSON Object to File.");
      return console.log(err);
    }
  });

  res.end();
})

app.get('/lottry-status', (req, res) => {
  const email = res.locals.email;

  const rawLotteryStatuses = fs.readFileSync(LOTTERY_FILE);
  const lotteryStatuses = JSON.parse(rawLotteryStatuses);
  let userLotteryStatus = lotteryStatuses[email] || { status: 'not_participated' };

  if (userLotteryStatus.status === 'participated' && userLotteryStatus.lotteryDate) {
    const today = new Date();
    const lotteryDate = new Date(userLotteryStatus.lotteryDate)
    let differenceInTime = today.getTime() - lotteryDate.getTime();
    let differenceInDays = differenceInTime / ONE_DAY;

    if (differenceInDays > 30) {
      userLotteryStatus.status = 'not_participated';
      delete userLotteryStatus.lotteryDate;
      fs.writeFile(LOTTERY_FILE, JSON.stringify({ ...lotteryStatuses, [email]: userLotteryStatus }), 'utf8', function (err) {
        if (err) {
          console.log("An error occured while writing Purchase JSON Object to File.");
          return console.log(err);
        }
      });
    }
  }

  res.json({ ...userLotteryStatus });
})

app.post('/lottry', async (req, res) => {
  const email = res.locals.email;

  const rawLotteryStatuses = fs.readFileSync(LOTTERY_FILE);
  const lotteryStatuses = JSON.parse(rawLotteryStatuses);
  let userLotteryStatus = lotteryStatuses[email] || { status: 'not_participated' };


  if (userLotteryStatus.status !== 'not_participated') return res.end;
  userLotteryStatus.status = 'participated';
  userLotteryStatus.lotteryDate = new Date();

  let lotteryNumber = Math.floor(Math.random() * 10); // random number between 0 to 9
  userLotteryStatus.win = lotteryNumber == 1;
  if (userLotteryStatus.win) userLotteryStatus.coupon = `FREE-MEAL-${ new Date().valueOf() }`;

  fs.writeFile(LOTTERY_FILE, JSON.stringify({ ...lotteryStatuses, [email]: userLotteryStatus }), 'utf8', (err) => {
    if (!err) return;
    console.log("An error occured while writing Lottery JSON Object to File.");
    return console.log(err);
  });

  addUserActivity(email, req.url, null, null, null, userLotteryStatus.win, userLotteryStatus.coupon);

  await new Promise((resolve) => { setTimeout(resolve, 1000 * 3) });

  res.json({ ...userLotteryStatus });
})

function setCookieAndSession(email, password, rememberMe, res) {
  const experationTime = rememberMe ? ONE_DAY * 10 : 1000 * 60 * 30;
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

function addUserActivity(email, path, item = null, price = null, items = null, lotteryWin = null, lotteryCoupon) {
  const rawActivity = fs.readFileSync(USER_ACTIVITY_FILE);
  let { activities } = JSON.parse(rawActivity);
  let newActivity = { email, path, time: (new Date()).toLocaleString() }
  if (path === '/add-to-cart') newActivity.item = item;
  if (path === '/purchase') {
    newActivity.price = price;
    newActivity.items = items;
  }
  if (path === '/lottry') {
    newActivity.win = lotteryWin;
    newActivity.coupon = lotteryCoupon;
  }
  activities = [...activities, newActivity];

  fs.writeFile(USER_ACTIVITY_FILE, JSON.stringify({ activities }), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing user activity JSON Object to File.");
      return console.log(err);
    }
  });
}