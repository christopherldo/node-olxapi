const express = require('express');
const router = express.Router();
const {
  UserController
} = require('../app/controllers');

router.get('/ping', (req, res) => {
  res.json({
    pong: true,
  });
});

module.exports = router;