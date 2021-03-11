const express = require('express');
const router = express.Router();
const {
  AdController,
  AuthController,
  CategoryController,
  StateController,
  UserController,
} = require('../app/controllers');

router.get('/ping', (req, res) => {
  res.json({
    pong: true,
  });
});

router.get('/states', StateController.getStates);

router.post('/user/signin', AuthController.signIn);
router.post('/user/signup', AuthController.signUp);

router.get('/user/me', UserController.info);
router.put('/user/me', UserController.editAction);

router.get('/categories', CategoryController.getCategories);

router.get('/ad/item', AdController.getItem);
router.get('/ad/list', AdController.getList);
router.post('/ad/add', AdController.addAction);
router.post('/ad/:public_id', AdController.editAction);

module.exports = router;