import BaseController from "./BaseController.js";
import UserRepository from "../../Repositories/UserRepository.js";
import {
  generateJWTToken,
  hashHmacString,
  parserJWTToken,
  responseErrors,
  responseSuccess
} from "../../Common/helper.js";
import {USERS} from "../../../config/constant.js";

class AuthController extends BaseController
{
  static userRepository = new UserRepository();

  async login(req, res) {
    try {
      const phone = req.body.phone;
      const password = req.body.password;
      const user = await AuthController.userRepository.findUserConfirmedAccountByPhone(phone)

      if (!user) {
        return responseErrors(res, 401, {
          errors: [
            {
              path: 'phone',
              msg: 'Số điện thoại không hợp lệ',
              value: phone
            }
          ]
        })
      }

      if (user.password !== hashHmacString(password)) {
        return responseErrors(res, 401, {
          errors: [
            {
              path: 'password',
              msg: 'Mật khẩu không chính xác',
              value: password
            }
          ]
        })
      }
      return responseSuccess(res, {
        user_token: generateJWTToken(user.id)
      });
    } catch (e) {
      return responseErrors(res, 500, e.message);
    }
  }

  async confirmAccount(req, res){
    try {
      const responseToken = parserJWTToken(req.body.token, false);

      if (!responseToken.success) {
        return responseErrors(res, 401, responseToken.errors);
      }
      const userId = responseToken.payload.id;
      const user = await AuthController.userRepository.findById(userId);

      if (!user) {
        return responseErrors(res, 401, 'User không tồn tại.');
      }

      if (user.is_confirm_account === USERS.is_confirm_account.true) {
        return responseErrors(res, 401, 'User đã xác thực tài khoản.');
      }

      const userUpdated = await AuthController.userRepository.update(userId, {
        is_confirm_account: USERS.is_confirm_account.true
      });

      return responseSuccess(res, userUpdated);
    } catch (e) {
      return responseErrors(res, 500, e.message);
    }
  }

  async changePassword(req, res) {
    try {
      const responseToken = parserJWTToken(req.body.token, false);

      if (!responseToken.success) {
        return responseErrors(res, 401, responseToken.errors);
      }
      const userId = responseToken.payload.id;
      const user = await AuthController.userRepository.findById(userId);

      if (!user) {
        return responseErrors(res, 401, 'User không tồn tại.');
      }

      if (user.is_confirm_account !== USERS.is_confirm_account.true) {
        return responseErrors(res, 401, 'User chưa xác thực tài khoản.');
      }

      const userUpdated = await AuthController.userRepository.update(userId, {
        password: hashHmacString(req.body.password)
      });

      return responseSuccess(res, userUpdated);
    } catch (e) {
      return responseErrors(res, 500, e.message);
    }
  }
}

export default AuthController;