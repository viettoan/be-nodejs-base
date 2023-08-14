import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import {USER_ROOMS} from "../../config/constant.js";

const userRoomSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    room_id: {
      type: ObjectId,
      required: true,
      ref: 'Room',
    },
    role: {
      type: Number,
      required: true,
      enum: {
        values: Object.values(USER_ROOMS.role),
      },
      default: USER_ROOMS.role.member,
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    id: false,
  }
);
userRoomSchema.virtual('room', {
    ref: 'Room',
    localField: 'room_id',
    foreignField: '_id',
})

userRoomSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
})
export default mongoose.model('UserRoom', userRoomSchema, 'user_rooms');
