// models/School.js
import { Schema, model } from 'mongoose';

const schoolSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    moto: { type: String, required: true },
   
}, { timestamps: true });

const School = model('School', schoolSchema);
export default School;
