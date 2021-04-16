require('dotenv').config();
require('./config/passport');

const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const routes = require('./routes');

const server = express();

server.use(cors());
server.enable('trust proxy');

server.use(express.json());

server.use(express.urlencoded({
  extended: true,
}));

server.use(fileupload());

server.use(express.static(__dirname + '/../public'));

server.use('/api', routes);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});