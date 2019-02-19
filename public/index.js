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

app.listen(8000, () => {
  console.info('Server listening on port 8000');

}).on('error', err => {
  console.error(err);
});
