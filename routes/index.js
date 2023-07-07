import authAdminRouter from './admin/auth.js';
import usersAdminRouter from './admin/users.js';
import profileAdminRouter from './admin/profile.js';
const router = (app) => {
  authAdminRouter(app);
  usersAdminRouter(app);
  profileAdminRouter(app);
};
export default router;
