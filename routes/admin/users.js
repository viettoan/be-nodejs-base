import express from 'express';
import {authMiddleware} from '../../app/Http/Middlewares/AuthMiddleware.js';
import {validateIndexUser, validateStoreOrUpdateUser} from '../../app/Http/Requests/UserRequest.js';
import UserController from '../../app/Http/Controllers/UserController.js';
import {importUserMiddleware} from '../../app/Http/Middlewares/ImportUserMiddleware.js';

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
