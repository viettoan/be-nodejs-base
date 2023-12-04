import express from 'express';
import cors from 'cors';
import winston from 'winston';
import router from './routes/index.route.js';
import multer from "multer";
import {responseErrors, responseJsonByStatus} from "./src/common/helper.js";
// setup express
const app = express();
// third-party middleware: config cors
app.use(cors());
// built-in middleware: parse request body application/json
app.use(express.json());
// built-in middleware: parse request body application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
// built-in middleware: setup static folder
app.use(express.static('storage/users/avatars'));
app.use(express.static('public'));
// Load routes
router(app);
// Set view engine
app.set('view engine', 'ejs');
// error handling middleware
app.use((err, _req, res, next) => {
  if (!(err instanceof multer.MulterError)) {
    winston.loggers.get('system').error('ERROR', err);
  }
  return responseJsonByStatus(
    res,
    responseErrors(err.statusCode, err.message),
    err.statusCode
  )
});

export default app;
