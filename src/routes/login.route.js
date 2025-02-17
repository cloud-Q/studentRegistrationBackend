import express from "express";
import jwt from "jsonwebtoken";
import { Student } from "../models/student.model.js";
import cors from "cors";


const router = express.Router();

const app = express();
app.use(cors());

router.post('/login', async (req, res)=>{
    console.log(req.body);

    try{
        console.log("Request Body:", req.body); // ✅ Debugging log

 

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
