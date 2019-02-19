'use strict';
const express = require('express');
const app = express();
app.use(express.static('public'));


app.get('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send('bad request');
  }

  const c = a + b;
  res.send(`The sum of ${a} and ${b} is ${c}`);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  let shift = parseInt(req.query.shift);

  if (isNaN(shift) || !shift || !text) {
    return res.status(400).send('Please check your request query parameters.');
  }

  const string = text.replace(/[a-zA-Z]/g, char => {
    const code = char.charCodeAt(0);
    const shiftCode = parseInt(shift);
    const shiftedCode = code + shiftCode;
    const startCode = (code < 97) ? 64 : 96; //starts one lower so that it doesn't skip 'a A'.
    const endCode = (code < 97) ? 90 : 122;
    //if it shifts outside the letter codes, instead return the startCode plus how far it shifted over.
    const cipheredCode = (endCode < shiftedCode ? startCode + shiftedCode - endCode : shiftedCode);
    return String.fromCharCode(cipheredCode);
  });
  res.send(string);
});

app.listen(8000, () => {
  console.info('Server listening on port 8000');

}).on('error', err => {
  console.error(err);
});
