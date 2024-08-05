const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// README
router.get('/readme',(req,res) => {
  var htmlPath = path.join(__dirname, '../README.html');

  fs.readFile(htmlPath, 'utf8', (err,data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat membaca file.');
      return;
    }
    res.send(data);
  })
})

// Protected route
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
});

// Home route
router.get('/home', (req, res) => {
  const htmlPath = path.join(__dirname, '../views/chat.html');
  
  fs.readFile(htmlPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan saat membaca file.');
      return;
    }
    
    res.send(data);
  });
});

module.exports = router;
