import { Router } from "express";
import Class from "../models/Class.js";

const router = Router();

router.post('/add-class/:school_id', async(req, res)=>{
    try{
        
        const { schoolId, className, section, subjects, students, teachers } = req.body;

        if (!schoolId || !className || !section) {
            return res.status(400).json({status:false, message: 'schoolId, className, and section are required' });
        }
        const newClass = new Class({
            schoolId,
            className,
            section,
            subjects,
            students,
            teachers
        })
        await newClass.save();

        
        res.status(201).json({status:true, message: 'Class created successfully', class: newClass });

    }catch(error){
        console.log("Error", error)
        res.status(500).json({ message: 'Error creating class', error });
    }

})

// get all class by school id

router.get('/:schoolId', async (req, res) => {
    try {
        const { schoolId } = req.params;
        const classes = await Class.find({ schoolId }).populate('subjects students teachers');
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching classes', error });
    }
});

// get single class by id
router.get('/getSingleClass/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const classData = await Class.findById(id).populate('subjects students teachers')
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class', error });
    }
});

// edit class
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({status:true, message: 'Class updated successfully', class: updatedClass });
    } catch (error) {
        res.status(500).json({status:false, message: 'Error updating class', error });
    }
});

// DELETE a Class by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClass = await Class.findByIdAndDelete(id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ status:true, message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({status:false, message: 'Error deleting class', error });
    }
});

export default router