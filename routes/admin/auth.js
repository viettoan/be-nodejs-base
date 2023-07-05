import express from "express";
import {validateChangePassword, validateConfirmAccount, validateUserLogin} from "../../app/Http/Requests/AuthRequest.js";
import AuthController from "../../app/Http/Controllers/AuthController.js";

const authAdminRouter = app => {
    const router = express.Router();
    router.post('/login', validateUserLogin, AuthController.login);
    router.post('/confirm-account', validateConfirmAccount, AuthController.confirmAccount);
    router.post('/confirm-account/change-password', validateChangePassword, AuthController.changePassword);
    app.use('/auth', router);
}

export default authAdminRouter;