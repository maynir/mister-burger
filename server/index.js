const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
const fs = require('fs');
const sessions = {};
const USERS_FILE = './users.json';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/'));
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/sign-in", (req, res) => {
  const userData = {};
  const email = req.body.email;
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
  } else {
    res.statusCode = 404
  }
  res.end();
});

app.get('/', (req, res) => {
  res.send('MisteR Burger');
})

app.listen(port, () => {
  console.log(`Listening on port: ${ port }`);
})

function setCookieAndSession(email, password, rememberMe, res) {
  const experationTime = rememberMe ? 1000 * 60 * 60 * 24 * 10 : 1000 * 60 * 30;
  res.cookie('email', email);
  sessions[email] = password;
  setTimeout(() => {
    delete sessions[email];
  }, experationTime);
}

function verifyUser(email, password) {
  let rawUsersData = fs.readFileSync(USERS_FILE);
  let usersData = JSON.parse(rawUsersData);
  return usersData[email] && usersData[email] === password;
}