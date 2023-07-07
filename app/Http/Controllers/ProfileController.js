import BaseController from "./BaseController.js";
import {hashHmacString, responseErrors, responseSuccess} from "../../Common/helper.js";
import UserRepository from "../../Repositories/UserRepository.js";
import * as fs from 'fs';
import {STORAGE_PATHS} from "../../../config/constant.js";
import winston from "winston";

class ProfileController extends BaseController
{
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
    const params = super.handleParamsWithAuthUser(
      {
        name:  req.body.name
      },
      res.locals.authUser
    )

    if (req.file) {
      params.avatar = STORAGE_PATHS.uploadAvatarUser + req.file.filename;
    }

    UserRepository.update(res.locals.authUser._id, params)
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
    const params = super.handleParamsWithAuthUser(
      {
        password: hashHmacString(req.body.password)
      },
      res.locals.authUser
    )

    UserRepository.update(res.locals.authUser._id, params)
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

export default new ProfileController();