import BaseController from "./BaseController.mjs";
import UserRepository from "../../Repositories/UserRepository.mjs";
import {generateAccessToken, hashHmacString, responseErrors, responseSuccess} from "../../Common/helper.mjs";
class AuthController extends BaseController
{
    async login(req, res) {
        const phone = req.body.phone;
        const password = req.body.password;
        const user = await UserRepository.findByPhone(phone)

        if (!user) {
            responseErrors(res, 400, 'Số điện thoại không hợp lệ')
        }

        if (user.password !== hashHmacString(password)) {
            responseErrors(res, 400, 'Mật khẩu không chính xác')
        }
        responseSuccess(res, {
            access_token: generateAccessToken(user)
        });
    }
}

export default new AuthController();