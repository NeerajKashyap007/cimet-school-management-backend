import { Router } from 'express';
import Student from '../models/Student.js';
import { hash } from 'bcrypt';
const router = Router();
import jwt from 'jsonwebtoken';

router.post('/add-student', async (req, res) => {
    try {
        const { schoolId, firstname, lastname, gender, email, phone, class: classArray, role, password, } = req.body;


        const existingStud = await Student.findOne({ email });

        if (existingStud) {
            return res.status(400).json({ error: "Student with this email already exists" })
        }

        const hashedPassword = await hash(password, 10)


        const newStd = new Student({
            schoolId, firstname, lastname, gender, email, phone, class: classArray, role, password: hashedPassword
        })

        await newStd.save()

        res.status(201).json({ status: true, message: "Student Created SuccessFully" })

    } catch (err) {

        console.log(err)
        res.status(500).json({
            status: false,
            error: 'Server Error'
        })

    }
})


router.get('/get-students', async (req, res) => {

    try {
        const { schoolId } = req.query;
        // Validate input
        if (!schoolId) {
            return res.status(400).json({ error: 'schoolId  required' });
        }

        // Find users by schoolId and role
        const students = await Student.find({ schoolId });

        // Check if any students are found
        if (students.length === 0) {
            return res.status(200).json({ status: true, data: [], message: 'No Student data found' });
        }
        // Send found users
        res.status(200).json({ status: true, data: students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});


router.put('/update-student/:id', async (req, res) => {
    try {
        const { id } = req.params; // user id 
        const { schoolId, firstname, lastname, gender, email, phone, class: classArray, role } = req.body;

        // Find the user by ID
        let student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        // Update fields if provided in request body 
        student.schoolId = schoolId || student.schoolId;
        student.firstname = firstname || student.firstname;
        student.lastname = lastname || student.lastname;
        student.gender = gender || student.gender;
        student.email = email || student.email;
        student.phone = phone || student.phone;
        student.class = classArray || student.class;
        student.role = role || student.role;

        // Save the updated user 
        await student.save();

        res.status(200).json({ status: true, message: 'Student updated successfully', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });

    }

})

export default router;