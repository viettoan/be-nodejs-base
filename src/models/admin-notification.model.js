import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

const adminNotificationSchema = new mongoose.Schema(
  {
    notification_id: {
      type: ObjectId,
      required: true,
    },
    user_id: {
      type: ObjectId,
      required: true,
    },
    icon: {
      type: String,
      max: 255,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    send_time_at: {
      type: Date,
      required: false,
    },
    redirect_url: {
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
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);
export default mongoose.model('AdminNotification', adminNotificationSchema, 'admin_notifications');
