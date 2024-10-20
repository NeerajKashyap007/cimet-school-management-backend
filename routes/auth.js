import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { compare, hash } from 'bcrypt';
const router = Router();


router.post('/create-admin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ status: false, message: 'Admin already exists' });
        }

        const hashedPassword = hash(password, 10);

        const newAdmin = new Admin({
            email: email,
            password: hashedPassword,

        });

        await newAdmin.save();

        res.status(201).json({ status: true, message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ status: false, message: 'Invalid email ' });
        }
        const validPassword = await compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ status: false, message: 'Invalid  password' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: true, token,userData:{role: 'admin' },  message: 'Admin Login SuccessFully' });
    } catch (error) {
          console.log("error", error)
        res.status(500).json({ status: false, message: 'Server Key error', error: error });
    }
});

export default router;
