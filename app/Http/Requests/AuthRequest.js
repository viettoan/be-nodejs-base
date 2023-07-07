import {baseRequest} from "./BaseRequest.js";
import {body} from "express-validator";

const validationsUserLogin = [
  body('phone').custom(async nameValue => {
    if (typeof nameValue !== 'string') {
      throw new Error('Số điện thoại phải là kiểu chuỗi');
    }

    if (nameValue.length > 11) {
      throw new Error('Số điện thoại không được lớn hơn 11 ký tự')
    }

    if (nameValue.length < 10) {
      throw new Error('Số điện thoại không được ít hơn 10 ký tự')
    }
  }),
  body('password').custom(async passwordValue => {
    if (typeof passwordValue !== 'string') {
      throw new Error('Mật khẩu phải là kiểu chuỗi');
    }

    if (passwordValue.length > 20) {
      throw new Error('Mật khẩu không được lớn hơn 20 ký tự')
    }

    if (passwordValue.length < 6) {
      throw new Error('Mật khẩu không được ít hơn 6 ký tự')
    }
  }),
];

const validationConfirmAccount = [
  body('token').custom(async tokenValue => {
    if (typeof tokenValue !== 'string') {
      throw new Error('Token phải là kiểu chuỗi');
    }
  }),
];

const validationChangePassword = [
  body('token').custom(async tokenValue => {
    if (typeof tokenValue !== 'string') {
      throw new Error('Token phải là kiểu chuỗi');
    }
  }),
  body('password').custom(async passwordValue => {
    if (typeof passwordValue !== 'string') {
      throw new Error('Mật khẩu phải là kiểu chuỗi');
    }

    if (passwordValue.length > 20) {
      throw new Error('Mật khẩu không được lớn hơn 20 ký tự')
    }

    if (passwordValue.length < 6) {
      throw new Error('Mật khẩu không được ít hơn 6 ký tự')
    }
  }),
];

export const validateUserLogin = baseRequest(validationsUserLogin);
export const validateConfirmAccount = baseRequest(validationConfirmAccount);
export const validateChangePassword = baseRequest(validationChangePassword);