import { parserJWTToken } from "../../common/helper.js";
import UserRepository from "../../repositories/user.repository.js";
import { USERS } from "../../../config/constant.js";

export const authMiddleware = async (socket, next) => {
  const responseToken = parserJWTToken(socket.handshake.auth.token);

  if (!responseToken.success) {
    return next(new Error(responseToken.errors));
  }

  try {
    const userId = responseToken.payload.id;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(userId);

    if (!user) {
      return next(new Error('User không tồn tại.'))
    }

    if (user.is_confirm_account !== USERS.is_confirm_account.true) {
      return next(new Error('User chưa xác thực tài khoản.'))
    }
    socket.authUser = user;
    next();
  } catch (e) {
    return next(new Error(e.message));
  }
}