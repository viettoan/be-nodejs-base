import express from 'express';
import {authMiddleware} from '../../app/Http/Middlewares/AuthMiddleware.js';
import ProfileController from '../../app/Http/Controllers/Me/ProfileController.js';
import {updateProfileMiddleware} from '../../app/Http/Middlewares/UpdateProfileMiddleware.js';
import {validateProfileChangePassword, validateUpdateDetailUser} from '../../app/Http/Requests/Me/ProfileRequest.js';

const profileAdminRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();
  router.use(authMiddleware);
  router.get('/', profileController.show);
  router.post('/', updateProfileMiddleware.single('avatar'), validateUpdateDetailUser, profileController.update);
  router.put('/change-password', validateProfileChangePassword, profileController.changePassword);
  router.get('/notifications', profileController.getListNotifications);

  app.use('/profile', router);
};

export default profileAdminRouter;
