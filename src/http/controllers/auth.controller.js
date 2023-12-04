import BaseController from "./base.controller.js";
import {
  responseErrors,
  responseJsonByStatus,
  responseSuccess,
} from "../../common/helper.js";
import AuthService from "../../services/auth.service.js";
import HttpErrorWithMessageObjectException from "../../exceptions/http-error-with-message-object.exception.js";

class AuthController extends BaseController
{
  static authService = new AuthService();
  async login(req, res) {
    try {
      const phone = req.body.phone;
      const password = req.body.password;
      const userToken = await AuthController.authService.login(phone, password);

      return responseJsonByStatus(
        res,
        responseSuccess({
          user_token: userToken
        })
      );
    } catch (e) {
      if (e instanceof HttpErrorWithMessageObjectException) {
        return responseJsonByStatus(res, responseErrors(e.statusCode, JSON.parse(e.message)), e.statusCode);
      }
      return responseJsonByStatus(res, responseErrors(e.statusCode, e.message), e.statusCode);
    }
  }

  async confirmAccount(req, res){
    try {
      const userUpdated = await AuthController.authService.confirmAccount(req.body.token);

      return responseJsonByStatus(
        res,
        responseSuccess(userUpdated)
      )
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(e.statusCode, e.message), e.statusCode)
    }
  }

  async changePassword(req, res) {
    try {
      const userUpdated = await AuthController.authService.changePassword(req.body.token, req.body.password);

      return responseJsonByStatus(
        res,
        responseSuccess(userUpdated)
      );
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(e.statusCode, e.message), e.statusCode);
    }
  }
}

export default AuthController;