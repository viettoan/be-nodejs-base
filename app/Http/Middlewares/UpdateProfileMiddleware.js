import multer from 'multer';
import path from 'path';
import {STORAGE_PATHS} from '../../../config/constant.js';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(STORAGE_PATHS.uploadAvatarUser));
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf']; // Add more allowed types as needed
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true); // Allow the upload
  } else {
    cb(new Error('Invalid file type')); // Reject the upload
  }
};
export const updateProfileMiddleware = multer({
  storage: storage,
  limits:{
    fileSize: 2000000
  },
  fileFilter: fileFilter,
});
