import BaseController from "./BaseController.js";
import {
  responseErrors,
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
        userToken => responseSuccess(res, {
          user_token: userToken
        })
      )
      .catch(
        e => {
            if (e.errors) {
              return responseErrors(res, 401, e)
            }

            return responseErrors(res, e.statusCode, e.message)
        }
      )
  }

  async confirmAccount(req, res){
    AuthController.authService.confirmAccount(req.body.token)
      .then(
        userUpdated => responseSuccess(res, userUpdated)
      )
      .catch(
        e => responseErrors(res, e.statusCode, e.message)
      )
  }

  async changePassword(req, res) {
    AuthController.authService.changePassword(req.body.token, req.body.password)
      .then(
        userUpdated => responseSuccess(res, userUpdated)
      )
      .catch(
        e => responseErrors(res, e.statusCode, e.message)
      )
  }
}

export default AuthController;