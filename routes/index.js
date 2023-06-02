const express = require('express');
const app = express.Router();
const { index } = require('../interface');

app.get('/', (req, res) => {
  res.render('index', { page: new index() });
});

module.exports = app;
