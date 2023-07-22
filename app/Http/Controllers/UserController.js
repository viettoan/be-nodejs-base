import BaseController from "./BaseController.js";
import { responseSuccess, responseErrors } from "../../Common/helper.js";
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
        (users) => {
            return responseSuccess(res, users);
        }
      )
      .catch(
        (e) => {
            return responseErrors(res, 400, e.message);
        }
      );
  }

  all(req, res)
  {
    req = super.handleFieldSearchLike(req, ['name']);
    UserController.userService
      .all(req.query)
      .then(
        (users) => {
          return responseSuccess(res, users);
        }
      )
      .catch(
        (e) => {
          return responseErrors(res, 400, e.message);
        }
      );
  }

  store(req, res)
  {
    const params = req.body;

    UserController.userService.storeUser(params, res.locals.authUser)
      .then(
        (user) => {
          return responseSuccess(res, user, 201);
        }
      )
      .catch(
        (e) => {
          return responseErrors(res, 400, e.message);
        }
      );
  }

  show(req, res)
  {
    UserController.userService.show(req.params.userId)
      .then(
        (user) => {
          return responseSuccess(res, user);
        }
      )
      .catch(
        (e) => {
          return responseErrors(res, 400, e.message);
        }
      );
  }

  update(req, res)
  {
      UserController.userService.update(req.params.userId, req.body, res.locals.authUser)
          .then(
              () => {
                  return responseSuccess(res, true);
              }
          ).catch(
              (e) => {
                  return responseErrors(res, 400, e.message);
              }
          );
  }

  destroy(req, res)
  {
      UserController.userService.destroy(req.params.userId)
          .then(
              () => {
                  return responseSuccess(res, true);
              }
          ).catch(
              (e) => {
                  return responseErrors(res, 400, e.message);
              }
          );
  }

  async import(req, res)
  {
      try {
          UserController.userService.import(req, res.locals.authUser);

          return responseSuccess(res, {}, 200);
      } catch (e) {
          return responseErrors(res, e.statusCode, e.message);
      }
  }

  showImportNewest(req, res)
  {
    UserController.userService.showImportNewest()
      .then(
        (userImport) => {
            return responseSuccess(res, userImport, 200);
        }
      )
      .catch(
        (e) => {
            return responseErrors(res, 400, e.message);
        }
      );
  }

  getImportHistory(req, res)
  {
    UserController.userService.getImportHistory()
      .then(
        userImports => {
          return responseSuccess(res, userImports, 200)
        }
      )
      .catch(
        e => responseErrors(res, 400, e.message)
      )
  }

  async export(req, res)
  {
    try {
      return responseSuccess(res, await UserController.userService.export(req.body));
    } catch (e) {
      return responseErrors(res, 400, e.message);
    }
  }
}

export default UserController;