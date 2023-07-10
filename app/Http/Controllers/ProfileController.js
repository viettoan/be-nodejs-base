import BaseController from "./BaseController.js";
import {hashHmacString, responseErrors, responseSuccess} from "../../Common/helper.js";
import * as fs from 'fs';
import {STORAGE_PATHS} from "../../../config/constant.js";
import winston from "winston";
import UserService from "../../Services/UserService.js";

class ProfileController extends BaseController
{
  static userService = new UserService();
  show (req, res)
  {
    const user = res.locals.authUser;

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

    return responseSuccess(res, user);
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
          return responseSuccess(res, true);
        }
      )
      .catch(
        (e) => {
          return responseErrors(res, 400, e.message);
        }
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
          return responseSuccess(res, true);
        }
      )
      .catch(
        (e) => {
          return responseErrors(res, 500, e.message);
        }
      );
  }
}

export default ProfileController;