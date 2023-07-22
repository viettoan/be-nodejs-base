import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 255,
    },
    type: {
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
export default mongoose.model('Room', roomSchema, 'rooms');
