import {parserJWTToken, responseErrors, responseJsonByStatus} from "../../Common/helper.js";
import UserRepository from "../../Repositories/UserRepository.js";
import {USERS} from "../../../config/constant.js";

export const authMiddleware = async (req, res, next) => {
  const responseToken = parserJWTToken(req.headers.authorization);

  if (!responseToken.success) {
    return responseJsonByStatus(
      res,
      responseErrors(401, responseToken.errors ?? ''),
      401
    );
  }

  try {
    const userId = responseToken.payload.id;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(userId);

    if (!user) {
      return responseJsonByStatus(
        res,
        responseErrors(401, 'User không tồn tại.'),
        401
      );
    }

    if (user.is_confirm_account !== USERS.is_confirm_account.true) {
      return responseJsonByStatus(
        res,
        responseErrors(401, 'User chưa xác thực tài khoản.'),
        401
      );
    }
    res.locals.authUser = user;
    next()
  } catch (e) {
    return responseJsonByStatus(
      res,
      responseErrors(500, e.message),
      500
    );
  }
}