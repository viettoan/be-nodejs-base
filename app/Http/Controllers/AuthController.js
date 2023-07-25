import BaseController from "./BaseController.js";
import {
  responseErrors, responseJsonByStatus,
  responseSuccess
} from "../../Common/helper.js";
import AuthService from "../../Services/AuthService.js";

class AuthController extends BaseController
{
  static authService = new AuthService();
  async login(req, res) {
    const phone = req.body.phone;
    const password = req.body.password;
    AuthController.authService.login(phone, password)
      .then(
        userToken => responseJsonByStatus(
          res,
          responseSuccess({
            user_token: userToken
          })
        )
      )
      .catch(
        e => {
            if (e.errors) {
              return responseJsonByStatus(res, responseErrors(401, e));
            }

            return responseJsonByStatus(res, responseErrors(e.statusCode, e.message), e.statusCode);
        }
      )
  }

  async confirmAccount(req, res){
    AuthController.authService.confirmAccount(req.body.token)
      .then(
        userUpdated => responseJsonByStatus(
          res,
          responseSuccess(userUpdated)
        )
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(e.statusCode, e.message), e.statusCode)
      )
  }

  async changePassword(req, res) {
    AuthController.authService.changePassword(req.body.token, req.body.password)
      .then(
        userUpdated => responseJsonByStatus(
          res,
          responseSuccess(userUpdated)
        )
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(e.statusCode, e.message), e.statusCode)
      )
  }
}

export default AuthController;