import {body} from "express-validator";
import {baseRequest} from "./BaseRequest.js";

const validationUpdateDetailUser =[
        body('name').custom( async  nameValue => {
            if (typeof nameValue !== 'string') {
                throw new Error('Họ tên phải là kiểu chuỗi');
            }
            if (nameValue.length > 50) {
                throw new Error('Họ tên không được lớn hơn 50 ký tự');
            }
        }),
];

const validationChangePassword = [
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

export const validateUpdateDetailUser = baseRequest(validationUpdateDetailUser);
export const validateProfileChangePassword = baseRequest(validationChangePassword);
