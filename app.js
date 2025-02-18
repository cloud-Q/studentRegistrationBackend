import express from "express";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images from 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
// app.use(cors())
app.use(cors({
    origin: ["http://localhost:3000", "https://student-registration-frontend.vercel.app"], // Change this!
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

import registrationRoutes from "./src/routes/registration.route.js";
import loginRoutes from './src/routes/login.route.js';
import studentDetailsRouter from './src/routes/studentdetails.route.js'
// import imageApi from './src/utils/images.js'
import chatingRoute from './src/routes/chatbot.route.js'

app.use('/', registrationRoutes);
app.use('/', loginRoutes);
app.use('/', studentDetailsRouter);
// app.use('/', imageApi);
app.use('/',chatingRoute);



export {app}