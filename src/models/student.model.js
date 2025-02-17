import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone:{
        type: Number,
        require: true,
    },
    college:{
        type: String,
        require: true,
    },
    profilePhoto: {
        type: String,
        path: String,
        size: Number,
        require: true,
    },
    resume: {
        type: String,
        path: String,
        size: Number,
        require: true,
    }

},{
    timestamps: true
})





export const Student = mongoose.model("Student", studentSchema)