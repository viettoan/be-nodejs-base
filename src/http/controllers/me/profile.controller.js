import BaseController from "../base.controller.js";
import {
  hashHmacString,
  responseErrors,
  responseJsonByStatus,
  responseSuccess
} from "../../../common/helper.js";
import UserService from "../../../services/user.service.js";

class ProfileController extends BaseController
{
  static userService = new UserService();
  show (req, res)
  {
    let user = res.locals.authUser;

    return responseJsonByStatus(res, responseSuccess(user));
  }

  async update (req, res)
  {
    try {
      const params = {
        name:  req.body.name
      };

      if (req.file) {
        params.avatar = req.file.filename;
      }
      const userUpdated = await ProfileController.userService.update(res.locals.authUser._id, params, res.locals.authUser);

      return responseJsonByStatus(res, responseSuccess(true));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e.message), 500);
    }
  }

  async changePassword (req, res)
  {
    try {
      const params = {
        password: hashHmacString(req.body.password)
      }
      const userUpdated = await ProfileController.userService.update(res.locals.authUser._id, params, res.locals.authUser);

      return responseJsonByStatus(res, responseSuccess(true));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e.message), 500);
    }
  }

  async getListNotifications(req, res)
  {
    try {
      const userId = res.locals.authUser._id;
      const notifications = await ProfileController.userService.getListNotifications(userId);

      return responseJsonByStatus(res, responseSuccess(notifications));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e.message), 500);
    }
  }
}

export default ProfileController;