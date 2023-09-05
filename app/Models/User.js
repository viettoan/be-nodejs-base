import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import {USERS} from '../../config/constant.js';
import {getUrlAvatar} from "../Common/helper.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Họ tên không được để trống'],
      maxLength: [50, 'Họ tên không được lớn hơn {MAXLENGTH} ký tự'],
    },
    email: {
      type: String,
      required: [true, 'Email không được để trống'],
      unique: true,
      maxLength: [50, 'Email không được lớn hơn {MAXLENGTH} ký tự'],
    },
    phone: {
      type: String,
      required: [true, 'Số điện thoại không được để trống'],
      unique: true,
      maxLength: [11, 'Số điện thoại không được lớn hơn {MAXLENGTH} ký tự'],
      minLength: [10, 'Số điện thoại không được ít hơn {MINLENGTH} ký tự'],
    },
    avatar: {
      type: String,
      get: getUrlAvatar,
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
        message: 'Giá trị đã chọn trong trường phân quyền không hợp lệ.',
      },
      default: USERS.level.user,
    },
    is_confirm_account: {
      type: Number,
      required: true,
      enum: {
        values: Object.values(USERS.is_confirm_account),
      },
      default: USERS.is_confirm_account.false,
    },
    created_by: {
      type: ObjectId,
      required: false,
    },
    updated_by: {
      type: ObjectId,
      required: false,
    },
    created_at: {
      type: Date,
      required: false,
      timestamps: true,
    },
    updated_at: {
      type: Date,
      required: false,
      timestamps: true,
    },
    deleted_at: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { getters: true },
    id: false,
  }
);
userSchema.virtual('notifications', {
  ref: 'Notification',
  localField: '_id',
  foreignField: 'user_id',
})
export default mongoose.model('User', userSchema, 'users');
