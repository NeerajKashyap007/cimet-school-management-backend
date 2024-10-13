// models/School.js
const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    moto: { type: String, required: true },
   
}, { timestamps: true });

const School = mongoose.model('School', schoolSchema);
module.exports = School;
