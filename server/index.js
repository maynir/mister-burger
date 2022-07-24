const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
const bp = require('body-parser')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', express.static(__dirname + '/'));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/sign-in", (req, res) => {
  console.log(req.body);
  const userData = {};
  userData[req.body.email] = req.body.password;
  // const userData = { email: req.body.email, password: req.body.password };
  fs.writeFile('./users.json', JSON.stringify(userData), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
  res.json({ message: "Hello from server!" });
});

app.get('/', (req, res) => {
  res.send('MisteR Burger');
})

app.listen(port, () => {
  console.log(`Listening on port: ${ port }`);
})