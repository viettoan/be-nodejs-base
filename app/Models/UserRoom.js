import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import User from "./User.js";
import Room from "./Room.js";

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
export default mongoose.model('UserRoom', userRoomSchema, 'user_rooms');
