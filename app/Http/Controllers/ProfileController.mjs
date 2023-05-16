import BaseController from "./BaseController.mjs";
import {hashHmacString, parserJWTToken, responseErrors, responseSuccess} from "../../Common/helper.mjs";
import UserRepository from "../../Repositories/UserRepository.mjs";
import * as fs from 'fs';
import {USERS} from "../../../config/common.mjs";
import user from "../../Models/User.mjs";

class ProfileController extends BaseController
{
    show (req, res)
    {
        const user = res.locals.authUser;

        if (user.avatar) {
            user.avatar = JSON.stringify({
                mimeType: user.avatar.split('.').pop(),
                value: fs.readFileSync(user.avatar)
            });
        }

        return responseSuccess(res, user);
    }

    async update (req, res)
    {
        try {
            const data = {
                name:  req.body.name
            }

            if (req.file) {
                data.avatar = req.file.path;
            }
            const userUpdated = await UserRepository.update(res.locals.authUser._id, data);

            return responseSuccess(res, userUpdated);
        } catch (e) {
            return responseErrors(res, 400, e.message);
        }
    }

    async changePassword (req, res)
    {
        try {
            const userUpdated = await UserRepository.update(res.locals.authUser._id, {
                password: hashHmacString(req.body.password)
            });

            return responseSuccess(res, userUpdated);
        } catch (e) {
            return responseErrors(res, 500, e.message);
        }
    }
}

export default new ProfileController();