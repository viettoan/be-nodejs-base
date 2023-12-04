import mongoose from 'mongoose';

const notificationTemplateSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      max: 255,
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
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.model(
    'NotificationTemplate',
  notificationTemplateSchema,
  'notification_templates'
);
