import express from "express";
import UserController from "../app/Http/Controllers/UserController.mjs";
import { validateStoreOrUpdateUser, validateIndexUser} from "../app/Http/Requests/UserRequest.mjs";
const router = express.Router();

// Users
router.get("/users", validateIndexUser, UserController.index);
router.post('/users', validateStoreOrUpdateUser, UserController.store);
router.get("/users/:userId", UserController.show);
router.put("/users/:userId", validateStoreOrUpdateUser, UserController.update);
router.delete("/users/:userId", UserController.destroy);

export default router;
