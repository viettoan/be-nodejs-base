import Joi from "joi";
import {MESSAGES} from "../../../../config/constant.js";
import {responseJoiError, responseJsonByStatus} from "../../../Common/helper.js";

export const storeMessage = (req, res, next) => {
  const {body} = req;
  const schema = Joi.object({
    room_id: Joi.string().required(),
    content: Joi.string().required(),
    type: Joi.number().integer().valid(MESSAGES.type.text, MESSAGES.type.call, MESSAGES.type.sticker).required(),
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