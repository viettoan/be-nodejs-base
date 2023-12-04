import BaseController from "./base.controller.js";
import {responseSuccess, responseErrors, responseJsonByStatus} from "../../common/helper.js";
import UserService from "../../services/user.service.js";

class UserController extends BaseController
{
  static userService= new UserService();

  constructor() {
    super();
  }

  async index(req, res)
  {
    try {
      const {query} = req;
      const users = await UserController.userService.index({
        conditions: super.handleFieldSearchLike(query, ['name']),
        limit: query.limit,
        page: query.page
      });

      return responseJsonByStatus(res, responseSuccess(users));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async all(req, res)
  {
    try {
      const users = await UserController.userService.all(
        super.handleFieldSearchLike(req.query, ['name'])
      );

      return responseJsonByStatus(res, responseSuccess(users));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async store(req, res)
  {
    try {
      const params = req.body;
      const user = await UserController.userService.storeUser(params, res.locals.authUser);

      return responseJsonByStatus(res, responseSuccess(user));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async show(req, res)
  {
    try {
      const user = await UserController.userService.show(req.params.userId);

      return responseJsonByStatus(res, responseSuccess(user));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async update(req, res)
  {
    try {
      await UserController.userService.update(req.params.userId, req.body, res.locals.authUser);

      return responseJsonByStatus(res, responseSuccess(true));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async destroy(req, res)
  {
    try {
      await UserController.userService.destroy(req.params.userId);

      return responseJsonByStatus(res, responseSuccess(true));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async import(req, res)
  {
      try {
        UserController.userService.import(req, res.locals.authUser);

        return responseJsonByStatus(res, responseSuccess({}));
      } catch (e) {
        return responseJsonByStatus(res, responseErrors(500, e), 500);
      }
  }

  async showImportNewest(req, res)
  {
    try {
      const userImport = await UserController.userService.showImportNewest();

      return responseJsonByStatus(res, responseSuccess(userImport));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async getImportHistory(req, res)
  {
    try {
      const userImports = await UserController.userService.getImportHistory();

      return responseJsonByStatus(res, responseSuccess(userImports));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }

  async export(req, res)
  {
    try {
      return responseJsonByStatus(
        res,
        responseSuccess(await UserController.userService.export(req.body))
      );
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e), 500);
    }
  }
}

export default UserController;