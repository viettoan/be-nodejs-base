import authAdminRouter from './admin/auth.route.js';
import usersAdminRouter from './admin/user.route.js';
import profileAdminRouter from './admin/profile.route.js';
import chatRoute from "./admin/chat.route.js";

const router = (app) => {
  authAdminRouter(app);
  usersAdminRouter(app);
  profileAdminRouter(app);
  chatRoute(app);
};
export default router;
