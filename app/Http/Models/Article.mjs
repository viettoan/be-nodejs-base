import mongoose from "mongoose";
import {ObjectId} from "mongodb";

const articleSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required:true,
        max: 255
    },
    content: {
        type: String,
        required:true,
    },
    status: {
        type: Number,
        required: true,
        enum: [1, 2],
        default: 1
    },
    created_by: {
        type: ObjectId,
        required: false
    },
    updated_by: {
        type: ObjectId,
        required: false
    },
    created_at: {
        type: Date,
        required: false
    },
    updated_at: {
        type: Date,
        required: false
    },
    deleted_at: {
        type: Date,
        required: false
    },
})
export default mongoose.model('articles', articleSchema);