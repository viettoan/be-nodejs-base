import BaseController from "../BaseController.js";
import {hashHmacString, responseErrors, responseJsonByStatus, responseSuccess} from "../../../Common/helper.js";
import * as fs from 'fs';
import {STORAGE_PATHS} from "../../../../config/constant.js";
import winston from "winston";
import UserService from "../../../Services/UserService.js";

class ProfileController extends BaseController
{
  static userService = new UserService();
  show (req, res)
  {
    let user = res.locals.authUser;

    if (user.avatar) {
      try {
        user.avatar = JSON.stringify({
          mimeType: user.avatar.split('.').pop(),
          value: fs.readFileSync(user.avatar)
        });
      } catch (e) {
        winston.loggers.get('system').error('ERROR', e);
      }
    }

    return responseJsonByStatus(res, responseSuccess(user));
  }

  async update (req, res)
  {
    try {
      const params = {
        name:  req.body.name
      };

      if (req.file) {
        params.avatar = STORAGE_PATHS.uploadAvatarUser + req.file.filename;
      }
      const userUpdated = await ProfileController.userService.update(res.locals.authUser._id, params, res.locals.authUser);

      return responseJsonByStatus(res, responseSuccess(true));
    } catch (e) {

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