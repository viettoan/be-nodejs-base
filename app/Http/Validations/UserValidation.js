import {baseJoiValidator} from "./BaseValidation.js";
import { USERS } from "../../../config/constant.js";
import Joi from "joi";
import PaginationValidation from "./PaginationValidation.js";

export const validateIndexUser = baseJoiValidator(
  Joi.object({
    ...PaginationValidation,
    name: Joi.string().max(50).optional(),
    phone: Joi.string().min(10).max(11).optional(),
    level: Joi.number().valid(USERS.level.super_admin, USERS.level.admin, USERS.level.user, null).optional(),
    email: Joi.string().email().max(50).optional(),
  }),
  'query'
);
export const validateStoreOrUpdateUser = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(50).required().messages({
        'string.base': 'Họ tên phải là kiểu chuỗi.',
        'string.max': 'Họ tên phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
        'any.required': 'Họ tên không được để trống.'
    }),
    phone: Joi.string().min(10).max(11).required().messages({
        'string.base': 'Số điện thoại phải là kiểu chuỗi.',
        'string.max': 'Số điện thoại phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
        'string.min': 'Số điện thoại phải lớn hơn hoặc bằng {{#limit}} ký tự.',
        'any.required': 'Số điện thoại không được để trống.'
    }),
    level: Joi.number()
      .valid(USERS.level.super_admin, USERS.level.admin, USERS.level.user)
      .default(USERS.level.user)
      .messages({
          'any.only': 'Giá trị level không hợp lệ.',
          'number.base': 'Level phải là kiểu số.'
      }),
    email: Joi.string().email().max(50).required().messages({
        'string.base': 'Email phải là kiểu chuỗi.',
        'string.email': 'Email không đúng định dạng.',
        'string.max': 'Email phải nhỏ hơn hoặc bằng {{#limit}} ký tự.',
        'any.required': 'Email không được để trống.'
    }),
  })
);