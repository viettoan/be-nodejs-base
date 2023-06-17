import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { USER_IMPORTS } from "../../config/constant.js";

const userImportSchema = new mongoose.Schema(
    {
        path: {
            type: String,
            required: [true, 'Path không được để trống '],
        },
        status: {
            type: Number,
            required: true,
            enum: {
                values: Object.values(USER_IMPORTS.status),
                message: 'Giá trị đã chọn trong trường status không hợp lệ.'
            },
            default: USER_IMPORTS.status.pending
        },
        has_errors: {
            type: Number,
            required: true,
            enum: {
                values: Object.values(USER_IMPORTS.has_errors),
                message: 'Giá trị đã chọn trong trường has_errors không hợp lệ.'
            },
            default: USER_IMPORTS.has_errors.false
        },
        log: {
            type: String,
            required: false
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
            required: false
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)
export default mongoose.model('user_imports', userImportSchema);