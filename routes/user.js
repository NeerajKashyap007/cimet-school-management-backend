import { Router } from 'express';
import User from '../models/User.js';
// import { hashSync, compareSync } from "bcryptjs";
import { compare, hash } from "bcrypt"
const router = Router();
import jwt from 'jsonwebtoken';

// Create new User
router.post('/add-user', async (req, res) => {
    try {
        const { schoolId, firstname, lastname, gender, email, phone, class: classArray, role, password, } = req.body;

        // Check if email already exists
        const existingUser = await findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        const hashedPassword = hash(password, 10);

        // Create new User
        const newUser = new User({
            schoolId, firstname, lastname, gender, email, phone, class: classArray, role, password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ status: true, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});



// Get users by schoolId and role
router.get('/get-users', async (req, res) => {
    try {
        const { schoolId, role } = req.query;

        // Validate input
        if (!schoolId || !role) {
            return res.status(400).json({ error: 'schoolId and role are required' });
        }

        // Find users by schoolId and role
        const users = await find({ schoolId, role });

        // Check if any users are found
        if (users.length === 0) {
            return res.status(200).json({ status: true, users: [], message: 'No users found' });
        }
        // Send found users
        res.status(200).json({ status: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});


router.put('/update-user/:id', async (req, res) => {
    try {
        const { id } = req.params; // user id 
        const { schoolId, firstname, lastname, gender, email, phone, class: classArray, role } = req.body;

        // Find the user by ID
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        // Update fields if provided in request body 
        user.schoolId = schoolId || user.schoolId;
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.gender = gender || user.gender;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.class = classArray || user.class;
        user.role = role || user.role;

        // Save the updated user 
        await user.save();

        res.status(200).json({ status: true, message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});

//user delete from id
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json({ status: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});


//user login from school id , email and password
router.post('/user-login', async (req, res) => {
    const { schoolId, email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid email ' });
        }

        // Check if the password matches 
        const validPassword = compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: false, message: 'Invalid  password' });
        }

        if (user.schoolId.toString() !== schoolId) {
            return res.status(401).json({ status: false, message: 'User does not exist for this school' });
        }
        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Response with the token and user
        res.json({ status: true, token, user, message: "LogIn SuccessFully" });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error' });
    }
});




export default router;