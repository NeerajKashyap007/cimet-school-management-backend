import { Schema, model } from "mongoose";

const teacherSchema = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    salary:{type: String, required: true },
    class: {
        type: [String],
        required: true
    },
    role: {
        type: String,
        default: 'teacher',
    },
    password: { type: String, required: true },
}, { timestamps: true });


const Teacher = model('Teacher', teacherSchema)

export default Teacher