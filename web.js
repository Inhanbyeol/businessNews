require('dotenv').config();

const { PORT, HOST, SESSION_SECRET_KEY } = process.env;

const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/views/static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 1000 * 60 * 300 }),
    cookie: {
      maxAge: 1000 * 60 * 300,
    },
  })
);

app.use('/', require('./routes/index'));

app.get('/', (req, res) => {
  res.render('index', { page: { title: 'Business News' } });
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`http://${HOST}:${PORT}`);
});
