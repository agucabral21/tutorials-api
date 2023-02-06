const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const routes = require('../routes');

const app = express();

app.set('json spaces', 2);
app.use(express.json());

app.use('/', routes);

module.exports = app;
