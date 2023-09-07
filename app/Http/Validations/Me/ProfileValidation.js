import {baseJoiValidator} from "../BaseValidation.js";
import Joi from "joi";

export const validateUpdateDetailUser = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(50).required(),
  })
);
export const validateProfileChangePassword = baseJoiValidator(
  Joi.object({
    password: Joi.string().min(6).max(20).required(),
  })
);
