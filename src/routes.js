const express = require('express');
const router = express.Router();

const {
  AdController,
  AuthController,
  CategoryController,
  StateController,
  UserController,
} = require('../app/controllers');

const {
  AuthMiddleware,
} = require('../app/middlewares');

const {
  AuthValidator,
  UserValidator,
} = require('../app/validators');

router.get('/ping', (req, res) => {
  res.json({
    pong: true,
  });
});

router.get('/states', StateController.getStates);

router.post('/user/signin',
  AuthValidator.signIn,
  AuthController.signIn
);

router.post('/user/signup',
  AuthValidator.signUp,
  AuthController.signUp
);

router.get('/user/me',
  AuthMiddleware.private,
  UserController.info,
);

router.put('/user/me',
  AuthMiddleware.private,
  UserValidator.editAction,
  UserController.editAction,
);

router.get('/categories', CategoryController.getCategories);

router.get('/ad/item', AdController.getItem);

router.get('/ad/list', AdController.getList);

router.post('/ad/add',
  AuthMiddleware.private,
  AdController.addAction,
);

router.post('/ad/:public_id',
  AuthMiddleware.private,
  AdController.editAction
);

module.exports = router;