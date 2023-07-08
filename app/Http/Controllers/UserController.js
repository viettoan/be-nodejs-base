import BaseController from "./BaseController.js";
import { responseSuccess, responseErrors } from "../../Common/helper.js";
import UserRepository from "../../Repositories/UserRepository.js";
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import UserService from "../../Services/UserService.js";
import {ACTION_LOGS, STORAGE_PATHS} from "../../../config/constant.js";
import UserImportRepository from "../../Repositories/UserImportRepository.js";
import ImportUsers from "../../Jobs/ImportUsers.js";
import ActionLogRepository from "../../Repositories/ActionLogRepository.js";
import AdminNamespace from "../../Socket/Namespaces/Admin/AdminNamespace.js";

XLSX.set_fs(fs);

class UserController extends BaseController
{
  static userRepository= new UserRepository();
  static actionLogRepository = new ActionLogRepository();
  static userImportRepository = new UserImportRepository();
  static userService= new UserService();
  static socketAdminNamespace = new AdminNamespace();
  static importUsers = new ImportUsers();

  constructor() {
    super();
  }

  index(req, res)
  {
    const { name } = req.query;

    if (name) {
      req.query.name = new RegExp(`${name}`);
    }
    UserController.userRepository.paginate(req.query, {
      page: +req.query?.pagination?.page,
      limit: +req.query?.pagination?.limit
    })
      .then(
          (users) => {
              return responseSuccess(res, users);
          }
      ).catch(
          (e) => {
              return responseErrors(res, 400, e.message);
          }
      );
  }

  store(req, res)
  {
      const params = super.handleParamsWithAuthUser(req.body, res.locals.authUser);

      UserController.userService.storeUser(params)
          .then(
              (response) => {
                  if (!response.isSuccess) {
                      return responseErrors(res, 400, response.error.message);
                  }
                  const newUser = response.user;
                  UserController.actionLogRepository.store(
                      super.handleParamsWithAuthUser(
                          {
                              name: ACTION_LOGS.name.admin_create_new_user,
                              type: ACTION_LOGS.type.admin_create_new_user,
                              meta_data: JSON.stringify(
                                  {
                                      new_user: newUser
                                  }
                              )
                          },
                          res.locals.authUser
                      )
                  )
                  UserController.socketAdminNamespace.emitCreateNewUser(newUser);

                  return responseSuccess(res, newUser, 201);
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
      UserController.userRepository.findById(req.params.userId)
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
      const params = super.handleParamsWithAuthUser(req.body, res.locals.authUser);
      UserController.userRepository.update(req.params.userId, params)
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
      UserController.userRepository.delete(req.params.userId)
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
          const wb = XLSX.readFile(req.file.path);
          const users = XLSX.utils.sheet_to_json(
              wb.Sheets[wb.SheetNames[0]],
              {
                  header:['name', 'phone', 'email'],
                  range:1
              }
          )

          if (!users.length) {
              return responseErrors(res, 422, 'Danh sách users trống');
          }
          const storeUserImport = await UserController.userImportRepository.store({
              path: STORAGE_PATHS.importUsers + req.file.filename,
          })
          UserController.importUsers.handle(users, storeUserImport);

          return responseSuccess(res, {}, 200);
      } catch (e) {
          return responseErrors(res, 400, e.message);
      }
  }

  showImportNewest(req, res)
  {
    UserController.userImportRepository.showNewest()
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
    UserController.userImportRepository.findBy({}, {
      created_at: -1
    })
      .then(
        (userImports) => {
          userImports = JSON.parse(JSON.stringify(userImports)).map(
            userImport => {
              try {
                const wb = XLSX.readFile(userImport.path);
                userImport.file = XLSX.write(wb, {
                    type: "buffer",
                    bookType: "xlsx"
                });
              } catch (e) {
                userImport.file = null;
              }

              return userImport;
            }
          );

          return responseSuccess(res, userImports, 200);
        }
      )
      .catch(
        (e) => {
          return responseErrors(res, 400, e.message);
        }
      );
  }

  async export(req, res)
  {
    try {
      let users = await UserController.userRepository.findBy(req.body);
      users = users.map(
          user => [user.name, user.email, user.phone]
      );
      const ws = XLSX.utils.aoa_to_sheet([['name', 'email', 'phone'], ...users]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      const buf = XLSX.write(wb, {
          type: "buffer",
          bookType: "xlsx"
      });

      return responseSuccess(res, buf);
    } catch (e) {
      return responseErrors(res, 400, e.message);
    }
  }
}

export default UserController;