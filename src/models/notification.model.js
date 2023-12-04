import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    icon: {
      type: String,
      max: 255,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    redirect_url: {
      type: String,
      required: true,
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
export default mongoose.model('Notification', notificationSchema, 'notifications');
