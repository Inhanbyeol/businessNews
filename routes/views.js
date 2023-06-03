const express = require('express');
const app = express.Router();
const { index } = require('../interface');
const { dbSQL } = require('../db/library');

app.get('/', (req, res) => {
  try {
    if (req.session.user) return res.redirect(`../page/${req.session.user.page}`);
    res.redirect('../login');
  } catch (err) {
    console.error(err);
  }
});

app.get('/page/:page', async (req, res) => {
  const [find] = await dbSQL(`SELECT * FROM pages WHERE pageid = '${req.params.page}'`);
  if (find.length === 0) return res.render('404');
  res.render('index', { info: find });
});

app.get('/create/user', (req, res) => {
  try {
    if (req.session.user) return res.render('createUser');
    res.redirect('../login');
  } catch (err) {
    console.error(err);
  }
});

app.get('/pagesetting', async (req, res) => {
  try {
    if (req.session.user) {
      const [find] = await dbSQL(`SELECT * FROM pages WHERE pageid = '${req.session.user.page}'`);
      res.render('pageSetting', { info: find });
    } else {
      res.redirect('../login');
    }
  } catch (err) {
    console.error(err);
  }
});

app.get('/login', (req, res) => {
  try {
    if (req.session.user) return res.redirect('../pagesetting');
    res.render('login');
  } catch (err) {
    console.error(err);
  }
});

module.exports = app;
