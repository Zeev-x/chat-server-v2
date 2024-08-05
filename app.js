const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const config = require('./config/config.json');
const passport = require('./middleware/passport');

const server = express();
server.use(express.static(`${__dirname}/public`));

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(session({
  secret: 'Reyette-secreet',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    if (typeof body === 'string' && req.session.username) {
      // Replace all instances of [NAME] with the username
      body = body.replace(/\[NAME\]/g, req.session.username);
    }
    return originalSend.call(this, body);
  };

  next();
});

// Routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

server.use('/', authRoutes);
server.use('/', indexRoutes);

// Error handling
server.use((req,res) => {
  var html = fs.readFileSync(`${__dirname}/views/error/error.html`,'utf8');
  res.status(404).send(html);
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Terjadi kesalahan!');
});

module.exports = server;
