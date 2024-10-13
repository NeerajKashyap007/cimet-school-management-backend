const express = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");
const Admin = require('../models/Admin.js');
const router = express.Router();


router.post('/create-admin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({status:false, message: 'Admin already exists' });
        }

        // Hash the password before saving
        const hashedPassword = bcryptjs.hashSync(password,10);

        // Create and save the new admin
        const newAdmin = new Admin({
            email: email,
            password: hashedPassword,

        });

        await newAdmin.save();

        res.status(201).json({ status:true,message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({status:false, message: 'Server error', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
     try {
        // Check if the admin exists in the database
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ status: false, message: 'Invalid email ' });
        }

        // Check if the password matches 
        const validPassword =bcryptjs.compareSync(password,admin.password);
        if (!validPassword) {
            return res.status(401).json({ status: false, message: 'Invalid  password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.json({ status: true, token, message:'Admin Login SuccessFully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Key error' });
    }
});

module.exports = router;
