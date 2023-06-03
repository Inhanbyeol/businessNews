const express = require('express');
const app = express.Router();
const crypto = require('crypto');
const { index } = require('../interface');
const { SECRET_KEY } = process.env;
const { dbSQL } = require('../db/library');

app.post('/', async (req, res) => {
  try {
    const password = crypto.pbkdf2Sync(req.body.password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex');
    const find = await dbSQL(`SELECT * FROM users WHERE name = '${req.body.name}' and password = '${password}'`);

    if (find.length !== 0 && !req.session.user) {
      req.session.user = { name: find[0].name, page: find[0].page, authorized: true };
      res.json({ loginSuccess: true, name: find[0].name, page: find[0].page });
    } else {
      res.json({ loginSuccess: false });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
