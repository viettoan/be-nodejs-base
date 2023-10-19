import multer from 'multer';

const uploadAvatarS3 = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});

export default uploadAvatarS3;