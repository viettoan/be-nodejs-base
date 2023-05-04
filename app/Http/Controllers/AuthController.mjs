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
            responseErrors(res, 401, {
                errors: [
                    {
                        path: 'phone',
                        msg: 'Số điện thoại không hợp lệ',
                        value: phone
                    }
                ]
            })

            return;
        }

        if (user.password !== hashHmacString(password)) {
            responseErrors(res, 401, {
                errors: [
                    {
                        path: 'password',
                        msg: 'Mật khẩu không chính xác',
                        value: password
                    }
                ]
            })

            return;
        }
        responseSuccess(res, {
            user_token: generateAccessToken(user.id)
        });
    }
}

export default new AuthController();