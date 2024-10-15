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
    email: { type: String, required: true, unique: true, index: true },

    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // Example regex for a 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    
    salary:{
        type: String },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',  // Reference to the Class schema
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