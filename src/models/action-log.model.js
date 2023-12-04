import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import {ACTION_LOGS} from '../../config/constant.js';

const actionLogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
      default: ACTION_LOGS.name.none,
    },
    type: {
      type: Number,
      required: true,
      enum: {
        values: Object.values(ACTION_LOGS.type),
        message: 'Giá trị đã chọn trong trường phân loại không hợp lệ.',
      },
      default: ACTION_LOGS.type.none,
    },
    meta_data: {
      type: String,
      required: true,
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
    },
    updated_at: {
      type: Date,
      required: false,
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
  }
);
export default mongoose.model('ActionLog', actionLogSchema, 'action_logs');
