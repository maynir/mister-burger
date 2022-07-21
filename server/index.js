const express = require('express');
const app = express();
const port = 3001;
app.use('/', express.static(__dirname + '/'));
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})

app.get('/', (req, res) => {
  res.send('MisteR Burger');
})

// let value = 0;

// app.use('/value', (_req, res) => {
//   res.send({ value });
// })

// app.post('/calc/:operator/:num', (req, res) => {
//   const operator = req.params.operator;
//   const num = parseInt(req.params.num);

//   if (operator == 'multiply') {
//     value *= num;
//   } else if (operator == 'plus') {
//     value += num;
//   } else if (operator == 'minus') {
//     value -= num;
//   }
//   res.send({ value });
// })

// app.post('/clear', (_req, res) => {
//   value = 0;
//   res.send({ value });
// })