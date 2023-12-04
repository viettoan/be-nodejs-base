import UserRepository from "../repositories/user.repository.js";
import {generateJWTToken, hashHmacString, parserJWTToken} from "../common/helper.js";
import HttpErrorException from "../exceptions/http-error.exception.js";
import HttpErrorWithMessageObjectException from "../exceptions/http-error-with-message-object.exception.js";
import {USERS} from "../../config/constant.js";
class AuthService
{
  constructor() {
    this.userRepository = new UserRepository();
  }
  async login(phone, password)
  {
    const user = await this.userRepository.findUserConfirmedAccountByPhone(phone)

    if (!user) {
      throw new HttpErrorWithMessageObjectException(
        {
          errors: [
            {
              path: 'phone',
              msg: 'Số điện thoại không hợp lệ',
              value: phone
            }
          ]
        },
        401
      );
    }

    if (user.password !== hashHmacString(password)) {
      throw new HttpErrorWithMessageObjectException(
        {
          errors: [
            {
              path: 'password',
              msg: 'Mật khẩu không chính xác',
              value: password
            }
          ]
        },
        401
      );
    }

    return generateJWTToken(user._id)
  }

  async confirmAccount(token)
  {
    const responseToken = parserJWTToken(token, false);

    if (!responseToken.success) {
      throw new HttpErrorException(responseToken.errors, 401);
    }
    const userId = responseToken.payload.id;
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpErrorException('User không tồn tại.', 401);
    }

    if (user.is_confirm_account === USERS.is_confirm_account.true) {
      throw new HttpErrorException('User đã xác thực tài khoản.', 401);
    }

    const userUpdated = await this.userRepository.update(
      userId,
      {
        is_confirm_account: USERS.is_confirm_account.true
      },
      user
    );

    return true;
  }

  async changePassword(token, password)
  {
    const responseToken = parserJWTToken(token, false);

    if (!responseToken.success) {
      throw new HttpErrorException(responseToken.errors, 401);
    }
    const userId = responseToken.payload.id;
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new HttpErrorException('User không tồn tại.', 401);
    }

    if (user.is_confirm_account !== USERS.is_confirm_account.true) {
      throw new HttpErrorException('User đã xác thực tài khoản.', 401);
    }

    const userUpdated = await this.userRepository.update(userId, {
      password: hashHmacString(password)
    });

    return true;
  }
}

export default AuthService;