/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const product = require('./routes/product');
const blog = require('./routes/blog');
const user = require('./routes/user');
const logger = require('./logger');
require('dotenv').config();

const app = express();
global.logger = logger;

// Set up mongodb connection
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// register middlewares
app.use(bodyParser.json());
// app.use('/category', category);
app.use('/', blog);
app.use('/user', user);

app.listen(process.env.PORT, () => logger.info(`Server: Blog API app listening on port ${3000}!`));
