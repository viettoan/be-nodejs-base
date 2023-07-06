import express from "express";
import {authMiddleware} from "../../app/Http/Middlewares/AuthMiddleware.js";
import {validateIndexUser, validateStoreOrUpdateUser} from "../../app/Http/Requests/UserRequest.js";
import UserController from "../../app/Http/Controllers/UserController.js";
import {importUserMiddleware} from "../../app/Http/Middlewares/ImportUserMiddleware.js";

const usersAdminRouter = app => {
    const router = express.Router();
    router.use(authMiddleware)
    router.get("/", validateIndexUser, UserController.index);
    router.post('/', validateStoreOrUpdateUser, UserController.store);
    router.get("/:userId", UserController.show);
    router.put("/:userId", validateStoreOrUpdateUser, UserController.update);
    router.delete("/:userId", UserController.destroy);
    router.post("/import", importUserMiddleware.single('file'), UserController.import);
    router.get("/import/newest", UserController.showImportNewest);
    router.get("/import/history", UserController.getImportHistory);
    router.post("/export", validateIndexUser, UserController.export);

    app.use('/users', router);
};

export default usersAdminRouter;