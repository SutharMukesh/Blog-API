/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

const blog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  image: String,
  body: {
    type: String,
    required: true
  },
  datepublished: String,
  datemodified: String,
});

module.exports = mongoose.model("blog", blog);
