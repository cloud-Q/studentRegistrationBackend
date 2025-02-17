import express from "express";
import { Router } from "express";
import { Student } from "../models/student.model.js";
import jwt from "jsonwebtoken";


// import path from "path";
// import { fileURLToPath } from "url";


// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static images from 'uploads' folder
// app.use('/', express.static(path.join(__dirname, 'uploads')));


const router = Router();

router.get('/stdverification', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
        console.log("Received Token:", token);

        if (!token) {
            return res.status(401).json({ error: 'Token not provided' });
        }

        jwt.verify(token, 'secret-key', async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            console.log("Decoded Token Data:", decoded);

            const student = await Student.findOne({ email: decoded.email });

            if (!student) {
                console.log("User not found");
                return res.status(404).json({ error: 'User not found' });
            }


            const accountInfo = {
                name: student.name,
                email: student.email,
                phone: student.phone,
                college: student.college,
                imageUrl: student.profilePhoto ? `https://studentregistrationbackend.onrender.com/${student.profilePhoto}` : null
            };

            res.json({ accountInfo });
        });

    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
