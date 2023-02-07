const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const APIv1 = require('../routes/v1');

const app = express();

app.set('json spaces', 2);
app.use(express.json());

app.use('/api/v1', APIv1);

module.exports = app;
