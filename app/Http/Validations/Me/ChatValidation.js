import Joi from "joi";
import {USER_ROOMS} from "../../../../config/constant.js";
import {baseJoiValidator} from "../BaseValidation.js";

export const addRoomValidator = baseJoiValidator(
  Joi.object({
    users: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().required(),
          role: Joi.number().integer().valid(USER_ROOMS.role.admin, USER_ROOMS.role.member)
        })
      )
      .required(),
  })
);