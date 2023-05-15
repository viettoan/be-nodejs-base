import multer from "multer"
import path from "path";
import { STORAGE_PATHS } from "../../../config/common.mjs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(STORAGE_PATHS.importUsers))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});
export const importUserMiddleware = multer({ storage : storage });