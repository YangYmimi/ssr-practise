const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send('<strong>Hello World.</strong>');
});

server.listen(9090, () => {
  console.log('Server running.');
});