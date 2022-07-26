const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;
const fs = require('fs');
const bp = require('body-parser')
const sessions = {};

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
  fs.writeFile('./users.json', JSON.stringify(userData), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log(`Created new user with email: ${ email }`);
  });
  setCookieAndSession(email, password, res);
  res.end();
});

app.get('/', (req, res) => {
  res.send('MisteR Burger');
})

app.listen(port, () => {
  console.log(`Listening on port: ${ port }`);
})

function setCookieAndSession(email, password, res) {
  res.cookie('email', email);
  sessions[email] = password;
  setTimeout(() => {
    delete sessions[email];
  }, 1000 * 60 * 30);
}