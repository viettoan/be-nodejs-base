import express from "express";
// Controllers
import UserController from "../app/Http/Controllers/UserController.mjs";
import AuthController from "../app/Http/Controllers/AuthController.mjs";
// Requests
import { validateStoreOrUpdateUser, validateIndexUser} from "../app/Http/Requests/UserRequest.mjs";
import { validateUserLogin, validateConfirmAccount, validateChangePassword } from "../app/Http/Requests/AuthRequest.mjs";
// Middlewares
import { authMiddleware } from "../app/Http/Middlewares/AuthMiddleware.mjs";
import { importUserMiddleware } from "../app/Http/Middlewares/ImportUserMiddleware.mjs";

const router = express.Router();

// Auth
router.post('/auth/login', validateUserLogin, AuthController.login);
router.post('/auth/confirm-account', validateConfirmAccount, AuthController.confirmAccount);
router.post('/auth/confirm-account/change-password', validateChangePassword, AuthController.changePassword);

router.use(authMiddleware)
// Users
router.get("/users", validateIndexUser, UserController.index);
router.post('/users', validateStoreOrUpdateUser, UserController.store);
router.get("/users/:userId", UserController.show);
router.put("/users/:userId", validateStoreOrUpdateUser, UserController.update);
router.delete("/users/:userId", UserController.destroy);
router.post("/users/import", importUserMiddleware.single('file'), UserController.import);
router.post("/users/export", validateIndexUser, UserController.export);

export default router;
