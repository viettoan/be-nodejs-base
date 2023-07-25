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

  update (req, res)
  {
    const params = {
      name:  req.body.name
    };

    if (req.file) {
      params.avatar = STORAGE_PATHS.uploadAvatarUser + req.file.filename;
    }

    ProfileController.userService.update(res.locals.authUser._id, params, res.locals.authUser)
      .then(
        () => {
          return responseJsonByStatus(res, responseSuccess(true));
        }
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      )
  }

  async changePassword (req, res)
  {
    const params = {
      password: hashHmacString(req.body.password)
    }

    ProfileController.userService.update(res.locals.authUser._id, params, res.locals.authUser)
      .then(
        () => {
          return responseJsonByStatus(res, responseSuccess(true));
        }
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  getListNotifications(req, res)
  {
    const userId = res.locals.authUser;

    ProfileController.userService.getListNotifications(userId)
      .then(
        notifications => responseJsonByStatus(res, responseSuccess(notifications))
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }
}

export default ProfileController;