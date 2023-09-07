import Joi from "joi";
export default {
  limit: Joi.number().integer().optional(),
  page: Joi.number().optional(),
}
