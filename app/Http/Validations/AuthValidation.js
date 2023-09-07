import {baseJoiValidator} from "./BaseValidation.js";
import Joi from "joi";

export const validateUserLogin = baseJoiValidator(
  Joi.object({
    phone: Joi.string().max(11).min(10).required(),
    password: Joi.string().max(20).min(6).required(),
  })
);
export const validateConfirmAccount = baseJoiValidator(
  Joi.object({
    token: Joi.string().required(),
  })
);
export const validateChangePassword = baseJoiValidator(
  Joi.object({
    token: Joi.string().required(),
    password: Joi.string().max(20).min(6).required(),
  })
);