import { Schema, model } from "mongoose";

const teacherSchema = new Schema({
    schoolId:{
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    firstname: { type: String, required: true },
    lastname: { type: String },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    
    salary:{
        type: String },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    
    role: {
        type: String,
        default: 'teacher',
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
            },
            message: props => `Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number`
        }
    }
}, { timestamps: true });


const Teacher = model('Teacher', teacherSchema)

export default Teacher