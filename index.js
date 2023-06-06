import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import "./loadEnvironment.mjs";
import "express-async-errors";
import api from "./routes/api.mjs";
import bodyParser from "body-parser";
import {logging} from "./config/logging.mjs";
import winston from "winston";
logging();
mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('Connected!'));
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
// Load routes
app.use("/", api);

// Set view engine
app.set('view engine', 'ejs');
// Global error handling
app.use((err, _req, res, next) => {
  winston.loggers.get('system').error('ERROR', err);
  res.status(500).send(err);
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
