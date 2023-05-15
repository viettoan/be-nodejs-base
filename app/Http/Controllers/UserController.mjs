import BaseController from "./BaseController.mjs";
import { responseSuccess, responseErrors } from "../../Common/helper.mjs";
import UserRepository from "../../Repositories/UserRepository.mjs";
import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import UserService from "../../Services/UserService.mjs";
import { STORAGE_PATHS, USER_IMPORTS, USERS } from "../../../config/common.mjs";
import UserImportRepository from "../../Repositories/UserImportRepository.mjs";
import ImportUsers from "../Jobs/ImportUsers.mjs";
XLSX.set_fs(fs);

class UserController extends BaseController
{
    async index(req, res)
    {
        try {
            const users = await UserRepository.findBy(req.query)

            return responseSuccess(res, users);
        } catch (e) {

            return responseErrors(res, 400, e.message);
        }
    }

    async store(req, res)
    {
        try {
            const params = req.body;
            const userInsertedResponse = await UserService.storeUser(params);

            if (userInsertedResponse.isSuccess) {
                return responseSuccess(res, userInsertedResponse.user, 201);
            }

            return responseErrors(res, 400, userInsertedResponse.error.message);
        } catch (e) {
            return responseErrors(res, 400, e.message);
        }
    }

    async show(req, res)
    {
        try {
            const user = await UserRepository.findById(req.params.userId)

            return responseSuccess(res, user);
        } catch (e) {
            return responseErrors(res, 400, e.message);
        }
    }

    async update(req, res)
    {
        try {
            const userUpdated = await UserRepository.update(req.params.userId, req.body);

            return responseSuccess(res, userUpdated);
        } catch (e) {
            return responseErrors(res, 400, e.message);
        }
    }

    async destroy(req, res)
    {
        try {
            const userUpdated = await UserRepository.delete(req.params.userId);

            return responseSuccess(res, userUpdated);
        } catch (e) {
            return responseErrors(res, 400, e.message);
        }
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
            const storeUserImport = await UserImportRepository.store({
                path: STORAGE_PATHS.importUsers + req.file.filename,
            })
            ImportUsers.handle(users, storeUserImport);

            return responseSuccess(res, {}, 200);
        } catch (e) {
            return responseErrors(res, 400, e.message);
        }
    }

    async export(req, res)
    {
        try {
            let users = await UserRepository.findBy(req.query);
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
    }}

export default new UserController();