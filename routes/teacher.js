import { Router } from "express";
import Teacher from "../models/Teacher.js";
import { hash } from "bcrypt";

const router = Router();

router.post('/add-teacher/:school_id', async(req, res)=>{

    try {
        const { school_id } = req.params;
        if(!school_id)  return res.status(400).json({ error: 'schoolId  required' });
        const { schoolId, firstname, lastname, gender, email, phone,salary, class: classArray, role, password, } = req.body;
        
        const existingTeacher = await Teacher.findOne({ email });
        
        if (existingTeacher) {
            return res.status(400).json({ error: "Teacher with this email already exists" })
        }
        
        const hashedPassword = await hash(password, 10)
        
        const newTeacher = new Teacher({
            schoolId, firstname, lastname, gender, email, phone, salary,class: classArray, role, password: hashedPassword
        })
        
        await newTeacher.save()

        res.status(201).json({ status: true, message: "Teacher Created SuccessFully" })

    }
    catch(error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: 'Server error' });  // Respond with a server error message
    }
})

router.get('/get-teacher/:schoolId', async (req, res) => {

    try {
        const { schoolId } = req.params;
        // Validate input
        if (!schoolId) {
            return res.status(400).json({ error: 'schoolId  required' });
        }

        // Find users by schoolId and role
        const teacher = await Teacher.find({ schoolId });

        // Check if any students are found
        if (teacher.length === 0) {
            return res.status(200).json({ status: true, data: [], message: 'No data found' });
        }
        // Send found users
        res.status(200).json({ status: true, data: teacher });
    } catch(error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: 'Server error' });  // Respond with a server error message
    }
});

router.put('/update-teacher/:id', async (req, res) => {
    try {
        const { id } = req.params; // user id 
        const { schoolId, firstname, lastname, gender, email, phone, class: classArray, role } = req.body;

        // Find the user by ID
        let teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }
        // Update fields if provided in request body 
        teacher.schoolId = schoolId || teacher.schoolId;
        teacher.firstname = firstname || teacher.firstname;
        teacher.lastname = lastname || teacher.lastname;
        teacher.gender = gender || teacher.gender;
        teacher.email = email || teacher.email;
        teacher.phone = phone || teacher.phone;
        teacher.class = classArray || teacher.class;
        teacher.role = role || teacher.role;
        teacher.salary = salary || teacher.salary;
        // Save the updated user 
        await teacher.save();

        res.status(200).json({ status: true, message: 'Student updated successfully', teacher });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }

})


router.delete('/delete-teacher/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Teacher.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json({ status: true, message: "Teacher's data deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Server error' });
    }
});

router.post('/teacher-login', async (req, res) => {
    const { schoolId, email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await Teacher.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid email ' });
        }

        // Check if the password matches 
        const validPassword = compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: false, message: 'Invalid  password' });
        }

        if (user.schoolId.toString() !== schoolId) {
            return res.status(401).json({ status: false, message: 'Teacher does not exist for this school' });
        }
        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Response with the token and user
        res.json({ status: true, token, user, message: "LogIn SuccessFully" });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error' });
    }
});


export default router