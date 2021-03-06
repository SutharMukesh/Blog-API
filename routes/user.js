/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const _ = require('lodash');
const app = require('express')();
const User = require('../models/user');

// create user
app.post('/signup', async (req, res) => {
  try {
    const user = new User(_.pick(req.body, ['name', 'email', 'password']));
    await user.save();
    const token = await user.generateAuthToken();
    logger.info(`User: user created for - ${JSON.stringify(req.body)}`);
    res.header('x-auth-header', token).status(200).send({ message: 'Signup successful.' });
  } catch (error) {
    logger.error(`User: Error while creating user: ${((error.stack) ? error.stack : error)}`);
    res.status(401).send({ message: `Error while creating user: ${error}` });
  }
});

// login user
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      logger.warn(`User/login: No User found for ${email}`);
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    logger.info(`User/login: login for email: ${email} successful`);
    return res.header('x-auth-header', token).status(200).send({ data: { name: user.name }, message: 'Login successful.' });
  } catch (error) {
    logger.error(`User/login: Error while login user ${req.body.email}: ${((error.stack) ? error.stack : error)}`);
    res.status(401).send({ message: `User/login: Error while login user ${req.body.email}: ${error}` });
  }
  return null;
});
module.exports = app;
