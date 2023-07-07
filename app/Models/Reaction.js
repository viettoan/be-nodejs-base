import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';

const reactionSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  article_id: {
    type: ObjectId,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    enum: [1, 2],
    default: 1,
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
});
export default mongoose.model('reactions', reactionSchema);
