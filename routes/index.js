import authAdminRouter from './admin/auth.js';
import usersAdminRouter from './admin/users.js';
import profileAdminRouter from './admin/profile.js';
import chatRouter from "./admin/chat.js";

const router = (app) => {
  authAdminRouter(app);
  usersAdminRouter(app);
  profileAdminRouter(app);
  chatRouter(app);
};
export default router;
