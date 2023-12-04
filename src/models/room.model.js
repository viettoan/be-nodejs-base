import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import {ROOMS} from "../../config/constant.js";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 255,
    },
    type: {
      type: Number,
      required: true,
      enum: {
        values: Object.values(ROOMS.type),
      },
      default: ROOMS.type.oneToOne,
    },
    avatar: {
      type: String,
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
roomSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'room_id',
})
roomSchema.virtual('userRooms', {
  ref: 'UserRoom',
  localField: '_id',
  foreignField: 'room_id',
})
export default mongoose.model('Room', roomSchema, 'rooms');
