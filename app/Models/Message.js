import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import {MESSAGES} from "../../config/constant.js";

const messageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    room_id: {
      type: ObjectId,
      required: true,
      ref: 'Room',
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
      enum: {
        values: Object.values(MESSAGES.type),
      },
      default: MESSAGES.type.text,
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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);
export default mongoose.model('Message', messageSchema, 'messages');
