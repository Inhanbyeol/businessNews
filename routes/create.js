const express = require('express');
const app = express.Router();
const crypto = require('crypto');
const { dbSQL } = require('../db/library');
const { SECRET_KEY } = process.env;

//계정 생성
app.post('/user', async (req, res) => {
  try {
    if ((await dbSQL(`SELECT * FROM users WHERE name="${req.body.name}"`)).length == 0) {
      if ((await dbSQL(`SELECT * FROM users WHERE page="${req.body.page}"`)).length == 0) {
        return res.json(await dbSQL(`INSERT INTO users (name, password, page) VALUES ('${req.body.name}', '${crypto.pbkdf2Sync(req.body.password, SECRET_KEY.toString('hex'), 11524, 64, 'sha512').toString('hex')}','${req.body.page}'); INSERT INTO pages (pageid) VALUES ('${req.body.page}');`));
      } else {
        return res.json('이미 등록된 url 페이지 입니다.');
      }
    } else {
      return res.json('이미 등록된 사용자 입니다.');
    }
  } catch (err) {
    console.error(err);
    return res.json('오류가 발생하였습니다.');
  }
});

module.exports = app;
