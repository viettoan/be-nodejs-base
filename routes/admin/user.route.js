import express from 'express';
import {authMiddleware} from '../../src/http/middlewares/auth.middleware.js';
import {validateIndexUser, validateStoreOrUpdateUser} from '../../src/http/validations/user.validation.js';
import UserController from '../../src/http/controllers/user.controller.js';
import {importUserMiddleware} from '../../src/http/middlewares/import-user.middleware.js';

const usersAdminRouter = (app) => {
  const router = express.Router();
  const userController = new UserController();
  router.use(authMiddleware);
  router.get('/', validateIndexUser, userController.index);
  router.get('/all', validateIndexUser, userController.all)
  router.post('/', validateStoreOrUpdateUser, userController.store);
  router.get('/:userId', userController.show);
  router.put('/:userId', validateStoreOrUpdateUser, userController.update);
  router.delete('/:userId', userController.destroy);
  router.post('/import', importUserMiddleware.single('file'), userController.import);
  router.get('/import/newest', userController.showImportNewest);
  router.get('/import/history', userController.getImportHistory);
  router.post('/export', validateIndexUser, userController.export);

  app.use('/users', router);
};

export default usersAdminRouter;
