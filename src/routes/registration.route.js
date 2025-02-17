import express from "express";
import { Router } from "express";
import { Student } from "../models/student.model.js";
import dotenv from "dotenv";

import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const router = Router();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage });



//route
router.post("/studentdata", upload.fields([{name: 'profilePhoto'},{ name: 'resume'}]), async(req,res)=>{
    const { name, email, phone, college } = req.body;
    const  profilePhoto = req.files["profilePhoto"] ? req.files["profilePhoto"][0].path : null;
    const  resume = req.files["resume"] ? req.files["resume"][0].path : null;
   
    console.log("Received Files:", req.files);
    console.log("Received Data:", req.body);
    console.log("Received Data:", { name, email, phone, college, profilePhoto, resume });

    try {
        const existingStudent = await Student.findOne({email});
        if(existingStudent){
            return res.json({success: false, error: "student with this Email already registered, please use a different email" })
        }

        const newStudent = await Student.create({ name, email, phone, college,profilePhoto, resume});
          
        console.log("User created:", newStudent);
        res.status(201).json({ success: true, message: "Student registered successfully!", student: newStudent });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }

}
)


router.post("/test-upload", upload.single("file"), (req, res) => {
    console.log("Received file:", req.file);
    res.json({ file: req.file });
});


export default router