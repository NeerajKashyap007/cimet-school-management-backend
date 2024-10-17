import { Router } from 'express';
import Student from '../models/Student.js';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

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
        if (!schoolId) {
            return res.status(400).json({ error: 'schoolId  required' });
        }

        const students = await Student.find({ schoolId }).populate('class');

        if (students.length === 0) {
            return res.status(200).json({ status: true, data: [], message: 'No Student data found' });
        }
        res.status(200).json({ status: true, data: students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});


router.put('/update-student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID", id)
        const { schoolId, firstname, lastname, gender, email, phone, class: classArray, role } = req.body;

        let student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        student.schoolId = schoolId || student.schoolId;
        student.firstname = firstname || student.firstname;
        student.lastname = lastname || student.lastname;
        student.gender = gender || student.gender;
        student.email = email || student.email;
        student.phone = phone || student.phone;
        student.class = classArray || student.class;
        student.role = role || student.role;

        await student.save();

        res.status(200).json({ status: true, message: 'Student updated successfully',userData: student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });

    }

})


router.delete('/delete-student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Student.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json({ status: true, message: "Student's data deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});


router.post('/student-login', async (req, res) => {
    const { schoolId, email, password } = req.body;

    try {

        const user = await Student.findOne({ email }).populate('schoolId class');
        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid email ' });
        }
        const validPassword = await compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: false, message: 'Invalid  password' });
        }
        
        if (user.schoolId._id.toString() !== schoolId) {
            return res.status(401).json({ status: false, message: 'Student does not exist for this school' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ status: true, token, userData:user, message: "LogIn SuccessFully" });
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ status: false, message: 'Server error' });
    }
});

export default router;