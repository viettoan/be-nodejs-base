import mongoose from "mongoose";
import {ObjectId} from "mongodb";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        max: 100
    },
    phone: {
        type: String,
        required:true,
        unique: true,
        max: 11,
        min: 10
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20,
    },
    level: {
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
export default mongoose.model('users', userSchema);