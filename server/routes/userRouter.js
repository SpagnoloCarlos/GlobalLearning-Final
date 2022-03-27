const express = require('express');
const usersController = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator();
const bodyValidator = require('../validations/bodyValidatorUser');
const idValidator = require('../validations/idValidator');

const routes = (User) => {
  const userRouter = express.Router();

  const { getUsers, postUser, putUser, deleteUser, login, refresh } =
    usersController(User);

  userRouter.route('/users').get(getUsers);

  userRouter
    .route('/users/signup')
    .post(validator.body(bodyValidator), postUser);

  userRouter.route('/users/login').post(login);

  userRouter.route('/users/refresh-token').post(refresh);

  userRouter
    .route('/users/:userId')
    .put(validator.params(idValidator), validator.body(bodyValidator), putUser)
    .delete(validator.params(idValidator), deleteUser);

  return userRouter;
};

module.exports = routes;
