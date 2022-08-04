const express = require('express');
const helmet = require('helmet').default;
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.options('*', cors());
server.use(cors());

server.use(bodyParser.json());
server.use(helmet());

const mockUser = {
  email: 'duck@duckmail.org',
  password: 'Password',
};

server.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    res.status(201).json({ message: 'OKAY?' });
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
});

server.listen(4200, () => {
  console.log('Server is listening at port 4200...');
});
