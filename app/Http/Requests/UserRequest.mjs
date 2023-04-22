import { baseRequest } from "./BaseRequest.mjs";
import { body, query } from 'express-validator';
import { USERS } from "../../../config/common.mjs";

const validationsStoreOrUpdateUser = [
    body('name').custom( async  nameValue => {
        if (typeof nameValue !== 'string') {
            throw new Error('Họ tên phải là kiểu chuỗi');
        }
        if (nameValue.length > 50) {
           throw new Error('Họ tên không được lớn hơn 50 ký tự');
        }
    }),
    body('phone').custom( async value => {
        if (typeof value !== 'string') {
            throw new Error('Số điện thoại phải là kiểu chuỗi')
        }

        if (value.length > 11 || value.length < 10) {
            throw new Error('Số điện thoại phải từ 10 - 11 ký tự')
        }
    }),
    body('level').isIn(Object.values(USERS.level)),
];

const validationsIndexUser = [
    query('name').custom( async  nameValue => {
        if (nameValue && nameValue.length > 50) {
            throw new Error('Họ tên không được lớn hơn 50 ký tự');
        }
    }),
    query('phone').custom( async value => {
        if (value && (value?.length > 11 || value?.length < 10)) {
            throw new Error('Số điện thoại phải từ 10 - 11 ký tự')
        }
    }),
    query('level').isIn([...Object.values(USERS.level), null]),
];
export const validateStoreOrUpdateUser = baseRequest(validationsStoreOrUpdateUser);
export const validateIndexUser = baseRequest(validationsIndexUser);