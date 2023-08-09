import Joi from "joi";
import {ROOMS, USER_ROOMS} from "../../../config/constant.js";
import {responseJoiError, responseJsonByStatus} from "../../Common/helper.js";

export const addRoomValidator = (req, res, next) => {
  const {body} = req;
  const schema = Joi.object({
    users: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().required(),
          role: Joi.number().integer().valid(USER_ROOMS.role.admin, USER_ROOMS.role.member)
        })
      )
      .required(),
  })
  const result = schema.validate(body);

  if (result.error) {
    return responseJsonByStatus(
      res,
      responseJoiError(422, result.error),
      422
    )
  }
  next();
}