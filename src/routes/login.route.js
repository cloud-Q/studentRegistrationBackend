import express from "express";
import jwt from "jsonwebtoken";
import { Student } from "../models/student.model.js";


const router = express.Router();


router.post('/login', async (req, res)=>{
    console.log(req.body);
    const {email} = req.body;

    try{
        console.log("Request Body:", req.body); // ✅ Debugging log

    if (!req.body || !req.body.email) {
        return res.status(400).json({ success: false, error: "Email is required" });
    }

    const { email } = req.body;
        const existingStudent = await Student.findOne({ email });
        if (!existingStudent) {
            return res.json({ success: false, error: 'Invalid email' });
        }

        const token = jwt.sign({ email }, 'secret-key', { expiresIn: '10h' });


          res.json({ success: true,message:"Thanks for login", data: token});
          console.log(token);
          } catch (error) {
           console.error('Error during login:', error);
          }});
    


export default router;
