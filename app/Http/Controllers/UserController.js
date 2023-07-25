import BaseController from "./BaseController.js";
import {responseSuccess, responseErrors, responseJsonByStatus} from "../../Common/helper.js";
import UserService from "../../Services/UserService.js";

class UserController extends BaseController
{
  static userService= new UserService();
  constructor() {
    super();
  }

  index(req, res)
  {
    UserController.userService
      .index(
        super.handleFieldSearchLike(req, ['name'])
      )
      .then(
        users => responseJsonByStatus(res, responseSuccess(users))
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  all(req, res)
  {
    req = super.handleFieldSearchLike(req, ['name']);
    UserController.userService
      .all(req.query)
      .then(
        users => responseJsonByStatus(res, responseSuccess(users))
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  store(req, res)
  {
    const params = req.body;

    UserController.userService.storeUser(params, res.locals.authUser)
      .then(
        user => responseJsonByStatus(res, responseSuccess(user))
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  show(req, res)
  {
    UserController.userService.show(req.params.userId)
      .then(
        user => responseJsonByStatus(res, responseSuccess(user))
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  update(req, res)
  {
    UserController.userService.update(req.params.userId, req.body, res.locals.authUser)
      .then(
        () => responseJsonByStatus(res, responseSuccess(true))
      ).catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  destroy(req, res)
  {
    UserController.userService.destroy(req.params.userId)
      .then(
        () => responseJsonByStatus(res, responseSuccess(true))
      ).catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  async import(req, res)
  {
      try {
        UserController.userService.import(req, res.locals.authUser);

        return responseJsonByStatus(res, responseSuccess({}));
      } catch (e) {
        return responseJsonByStatus(res, responseErrors(500, e.message), 500);
      }
  }

  showImportNewest(req, res)
  {
    UserController.userService.showImportNewest()
      .then(
        userImport => responseJsonByStatus(res, responseSuccess(userImport))
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
  }

  getImportHistory(req, res)
  {
    UserController.userService.getImportHistory()
      .then(
        userImports => responseJsonByStatus(res, responseSuccess(userImports))
      )
      .catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      )
  }

  async export(req, res)
  {
    try {
      return responseJsonByStatus(
        res,
        responseSuccess(await UserController.userService.export(req.body))
      );
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e.message), 500);
    }
  }
}

export default UserController;