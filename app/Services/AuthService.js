import UserRepository from "../Repositories/UserRepository.js";
import {generateJWTToken, hashHmacString, parserJWTToken, responseErrors, responseSuccess} from "../Common/helper.js";
import HttpError from "../Exceptions/HttpError.js";
import {USERS} from "../../config/constant.js";
class AuthService
{
  constructor() {
    this.userRepository = new UserRepository();
  }
  async login(phone, password)
  {
    try {
      const user = await this.userRepository.findUserConfirmedAccountByPhone(phone)

      if (!user) {
        return Promise.reject(
          {
            errors: [
              {
                path: 'phone',
                msg: 'Số điện thoại không hợp lệ',
                value: phone
              }
            ]
          }
        );
      }

      if (user.password !== hashHmacString(password)) {
        return Promise.reject(
          {
            errors: [
              {
                path: 'password',
                msg: 'Mật khẩu không chính xác',
                value: password
              }
            ]
          }
        );
      }

      return Promise.resolve(generateJWTToken(user.id))
    } catch (e) {
      throw new HttpError(e.message, 500)
    }
  }

  async confirmAccount(token)
  {
    const responseToken = parserJWTToken(token, false);

    if (!responseToken.success) {
      return Promise.reject(
        new HttpError(responseToken.errors, 401)
      );
    }
    const userId = responseToken.payload.id;
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return Promise.reject(
        new HttpError('User không tồn tại.', 401)
      );
    }

    if (user.is_confirm_account === USERS.is_confirm_account.true) {
      return Promise.reject(
        new HttpError('User đã xác thực tài khoản.', 401)
      );
    }

    const userUpdated = await this.userRepository.update(
      userId,
      {
        is_confirm_account: USERS.is_confirm_account.true
      },
      user
    );

    return Promise.resolve(userUpdated);
  }

  async changePassword(token, password)
  {
    const responseToken = parserJWTToken(token, false);

    if (!responseToken.success) {
      return Promise.reject(
        new HttpError(responseToken.errors, 401)
      );
    }
    const userId = responseToken.payload.id;
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return Promise.reject(
        new HttpError('User không tồn tại.', 401)
      );
    }

    if (user.is_confirm_account !== USERS.is_confirm_account.true) {
      return Promise.reject(
        new HttpError('User chưa xác thực tài khoản.', 401)
      );
    }

    const userUpdated = await this.userRepository.update(userId, {
      password: hashHmacString(password)
    });

    return Promise.resolve(userUpdated);
  }
}

export default AuthService;