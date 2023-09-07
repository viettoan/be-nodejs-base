import Joi from "joi";
import {MESSAGES} from "../../../../config/constant.js";
import {baseJoiValidator} from "../BaseValidation.js";

export const storeMessage = baseJoiValidator(
  Joi.object({
    room_id: Joi.string().required(),
    content: Joi.string().required(),
    type: Joi.number().integer().valid(MESSAGES.type.text, MESSAGES.type.call, MESSAGES.type.sticker).required(),
  })
);