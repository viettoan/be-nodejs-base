import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import "./loadEnvironment.mjs";
import "express-async-errors";
import api from "./routes/api.mjs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('Connected!'));
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load routes
app.use("/", api);

app.set('view engine', 'ejs');
var viewsPath = path.join(__dirname, 'views');

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send(err)
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
