import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import {USERS} from "../../config/common.mjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Họ tên không được để trống'],
        maxLength: [50, 'Họ tên không được lớn hơn {MAXLENGTH} ký tự'],
    },
    phone: {
        type: String,
        required: [true, 'Số điện thoại không được để trống'],
        unique: [true, 'Số điện thoại đã tồn tại'],
        maxLength: [11, 'Số điện thoại không được lớn hơn {MAXLENGTH} ký tự'],
        minLength: [10, 'Số điện thoại không được ít hơn {MINLENGTH} ký tự'],
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu không được để trống'],
        maxLength: [255, 'Mật khẩu không được lớn hơn {MAXLENGTH} ký tự'],
        minLength: [6, 'Mật khẩu không được ít hơn {MINLENGTH} ký tự'],
    },
    level: {
        type: Number,
        required: true,
        enum: {
            values: Object.values(USERS.level),
            message: 'Giá trị đã chọn trong trường level không hợp lệ.'
        },
        default: USERS.level.user
    },
    created_by: {
        type: ObjectId,
        required: false
    },
    updated_by: {
        type: ObjectId,
        required: false
    },
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false
    },
    deleted_at: {
        type: Date,
        required: false
    },
})
export default mongoose.model('users', userSchema);