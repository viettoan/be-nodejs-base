import BaseController from "./BaseController.mjs";
import { DEFAULT_PASWORD } from "../../../config/common.mjs";
import { hashHmacString, renderJson } from "../../Common/helper.mjs";
import UserRepository from "../../Repositories/UserRepository.mjs";

class UserController extends BaseController
{
    async index(req, res)
    {
        try {
            const users = await UserRepository.findBy(req.query)

            return renderJson(res, users, 200);
        } catch (e) {
            return renderJson(res, [], 400, e);
        }
    }

    async store(req, res)
    {
        try {
            const params = req.body;
            params.password = hashHmacString(DEFAULT_PASWORD);
            const insertedUser = await UserRepository.store(params);

            return renderJson(res, insertedUser, 201);
        } catch (e) {
            return renderJson(res, [], 400, e);
        }
    }

    async show(req, res)
    {
        try {
            const users = await UserRepository.findById(req.params.userId)

            return renderJson(res, users, 200);
        } catch (e) {
            return renderJson(res, [], 400, e);
        }
    }

    async update(req, res)
    {
        try {
            const userUpdated = await UserRepository.update(req.params.userId, req.body);

            return renderJson(res, userUpdated, 200);
        } catch (e) {
            return renderJson(res, [], 400, e);
        }
    }

    async destroy(req, res)
    {
        try {
            const userUpdated = await UserRepository.delete(req.params.userId);

            return renderJson(res, userUpdated, 200);
        } catch (e) {
            return renderJson(res, [], 400, e);
        }
    }
}

export default new UserController();