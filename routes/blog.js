/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const express = require('express');
const Blog = require('../models/blog');
const auth = require('../middleware/auth');

const blogroute = express.Router();

// Get All Blogs for homepage
blogroute.get('/', async (req, res) => {
  try {
    logger.info(`Blog/: Get all blogs for home page`);
    let blogs = await Blog.find({});
    res.status(200).send(blogs);
  } catch (error) {
    logger.error(`Blog/: Error while finding blog: ${((error.stack) ? error.stack : error)}`);
    res.status(400).send({ message: `Error while finding blog: ${error}` });
  }
});

// Get specific blog
blogroute.get('/:id', async (req, res) => {
  try {
    logger.info(`Blog/: Get blog ${req.params.id}`);
    let blogs = await Blog.find({ _id: req.params.id });
    res.status(200).send(blogs);
  } catch (error) {
    logger.error(`Blog/: Error while finding blog ${req.params.id}: ${((error.stack) ? error.stack : error)}`);
    res.status(400).send({ message: `Error while finding blog ${req.params.id}: ${error}` });
  }
});

// Add new Blog
blogroute.post('/add', auth, async (req, res) => {
  try {
    logger.info(`Blog/add: Adding Blog ${JSON.stringify(req.body)}`);
    newblog = new Blog(req.body);
    result = await newblog.save();
    res.status(200).send({ message: 'Added Blog successfully' });

  } catch (error) {
    logger.error(`Blog/add: Error while inserting Blog: ${((error.stack) ? error.stack : error)}`);
    res.status(400).send({ message: `Error while inserting Blog: ${error}` });
  }
});

// Edit a blog
blogroute.post('/update/:id', auth, async (req, res) => {
  try {
    logger.info(`Blog/update: Updating Blog ${JSON.stringify(req.body)}`);
    await Blog.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
    res.status(200).send({ message: 'Blog details updated' });
  } catch (error) {
    logger.error(`Blog/update: Error while updating Blog: ${((error.stack) ? error.stack : error)}`);
    res.status(400).send({ message: `Error while updating blog: ${error}` });
  }
});

// Delete a blog
blogroute.delete('/:id', auth, async (req, res) => {
  // Only Supervisor can delete a product
  try {
    logger.info(`Blog/delete: Deleting Blog id: ${req.params.id}`);
    result = await Blog.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: `delete blog details: ${JSON.stringify(result)}` });
  } catch (error) {
    logger.error(`Blog/delete: Error while deleting blog: ${((error.stack) ? error.stack : error)}`);
    res.status(400).send({ message: `Error while deleting: ${error}` });
  }
});

module.exports = blogroute;
