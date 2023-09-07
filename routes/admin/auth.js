import express from 'express';
import {validateChangePassword, validateConfirmAccount, validateUserLogin} from '../../app/Http/Validations/AuthValidation.js';
import AuthController from '../../app/Http/Controllers/AuthController.js';

const authAdminRouter = (app) => {
  const router = express.Router();
  const authController = new AuthController()
  router.post('/login', validateUserLogin, authController.login);
  router.post('/confirm-account', validateConfirmAccount, authController.confirmAccount);
  router.post('/confirm-account/change-password', validateChangePassword, authController.changePassword);
  app.use('/auth', router);
};

export default authAdminRouter;
