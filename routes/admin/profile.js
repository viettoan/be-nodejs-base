import express from 'express';
import {authMiddleware} from '../../app/Http/Middlewares/AuthMiddleware.js';
import ProfileController from '../../app/Http/Controllers/Me/ProfileController.js';
import {updateProfileMiddleware} from '../../app/Http/Middlewares/UpdateProfileMiddleware.js';
import {validateProfileChangePassword, validateUpdateDetailUser} from '../../app/Http/Validations/Me/ProfileValidation.js';
import UploadFileMiddleware from "../../app/Http/Middlewares/UploadFileMiddleware.js";
import s3 from "../../config/s3.js";
import firebase from "../../config/firebase.js";

const profileAdminRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();
  router.use(authMiddleware);
  router.get('/', profileController.show);
  router.post('/', updateProfileMiddleware.single('avatar'), validateUpdateDetailUser, profileController.update);
  router.put('/change-password', validateProfileChangePassword, profileController.changePassword);
  router.get('/notifications', profileController.getListNotifications);
  router.post('/upload-s3', UploadFileMiddleware.single('file'), (req, res) => {
    console.log(req);
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: 'test/' + req.file.originalname,
      Body: req.file.buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error uploading file');
      }
      console.log(data);
      res.send('File uploaded successfully');
    });
  });
  router.post('/upload-firebase', UploadFileMiddleware.single('file'), async (req, res) => {
    if(!req.file) {
      return res.status(400).send("Error: No files found")
    }

    const blob = firebase.bucket.file(req.file.originalname)

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    blobWriter.on('error', (err) => {
      console.log(err)
    })

    blobWriter.on('finish', async () => {
      const options = {
        version: 'v2',
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60
      };
      res.status(200).send(await blob.getSignedUrl(options))
    })

    blobWriter.end(req.file.buffer)
  });

  app.use('/profile', router);
};

export default profileAdminRouter;
