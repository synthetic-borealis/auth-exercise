const express = require('express');
const helmet = require('helmet').default;
const cors = require('cors');
const bodyParser = require('body-parser');

const mockUsers = require('./mock-users');

const server = express();

server.options('*', cors());
server.use(cors());

server.use(bodyParser.json());
server.use(helmet());

server.post('/', (req, res) => {
  const { email, password } = req.body;

  if (mockUsers.find((user) => user.email === email && user.password === password)) {
    res.status(200).json({ message: 'OKAY?' });
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
});

server.listen(4200, () => {
  console.log('Server is listening at port 4200...');
});
