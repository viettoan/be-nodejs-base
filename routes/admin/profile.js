import express from 'express';
import {authMiddleware} from '../../app/Http/Middlewares/AuthMiddleware.js';
import ProfileController from '../../app/Http/Controllers/ProfileController.js';
import {updateProfileMiddleware} from '../../app/Http/Middlewares/UpdateProfileMiddleware.js';
import {validateProfileChangePassword, validateUpdateDetailUser} from '../../app/Http/Requests/ProfileRequest.js';

const profileAdminRouter = (app) => {
  const router = express.Router();
  router.use(authMiddleware);
  router.get('/', ProfileController.show);
  router.post('/', updateProfileMiddleware.single('avatar'), validateUpdateDetailUser, ProfileController.update);
  router.put('/change-password', validateProfileChangePassword, ProfileController.changePassword);

  app.use('/profile', router);
};

export default profileAdminRouter;
