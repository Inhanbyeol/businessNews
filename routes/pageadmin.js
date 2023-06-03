const express = require('express');
const app = express.Router();
const crypto = require('crypto');
const { dbSQL } = require('../db/library');
const { SECRET_KEY } = process.env;

//계정 생성
app.post('/save', async (req, res) => {
  try {
    const { team, leadername, leaderphone, leaderemail, subleadername, subleaderphone, subleaderemail, opentalkurl, opentalk, opentalkcode, about, regulation } = req.body;
    return res.json(await dbSQL(`UPDATE pages SET team = '${team}', leadername = '${leadername}', leaderphone = '${leaderphone}', leaderemail = '${leaderemail}', subleadername = '${subleadername}', subleaderphone = '${subleaderphone}', subleaderemail = '${subleaderemail}', opentalkurl = '${opentalkurl}', opentalk = '${opentalk}',  opentalkcode = '${opentalkcode}', about = '${about}', regulation = '${regulation}' WHERE pageid = '${req.session.user.page}';`));
  } catch (err) {
    console.error(err);
    return res.json('오류가 발생하였습니다.');
  }
});

app.get('/edt', async (req, res) => {
  try {
    const [find] = await dbSQL(`SELECT * FROM pages WHERE pageid = '${req.session.user.page}'`);
    res.json(find);
  } catch (err) {
    console.error(err);
    return res.json('오류가 발생하였습니다.');
  }
});

module.exports = app;
