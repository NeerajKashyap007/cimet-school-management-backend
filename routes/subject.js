import { Router } from "express";
import Subject from "../models/Subject.js";

const router = Router();

router.post('/add-subject', async (req, res) => {
    try {

        const { schoolId, subjectName, teacher, classId } = req.body;
        console.log("Received data:", req.body);
        if (!subjectName || !schoolId) {
            return res.status(400).json({ message: 'name, and schoolId are required' });
        }

        const newSubject = new Subject({
            schoolId,
            subjectName,
            teacher,
            classId
        })

        await newSubject.save();
        res.status(201).json({status:true, message: 'Subject created successfully', subject: newSubject })

    } catch (error) {
        res.status(500).json({ message: 'Error creating subject', error });
    }

})

// get subject for that classId

router.get('/class/:classId', async (req, res) => {
    try {
        const { classId} = req.params;
        const subjects = await Subject.find({ classId });  // Find subjects by classId and schoolId
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
});

// get all subjects on that specific school Id

router.get('/school/:schoolId', async (req, res) => {
    try {
        const { schoolId} = req.params;
        const subjects = await Subject.find({ schoolId });  // Find subjects by classId and schoolId
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
});

// update subject by ID

router.put('/:subjectId', async (req, res) => {
    try {
        const { subjectId } = req.params;
        const updates = req.body;  // Get the update data from request body

        const updatedSubject = await Subject.findByIdAndUpdate(subjectId, updates, { new: true });
        
        if (!updatedSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.status(200).json({status:true, message: 'Subject updated successfully', subject: updatedSubject });
    } catch (error) {
        res.status(500).json({ message: 'Error updating subject', error });
    }
});


// delete subject by id

router.delete('/:subjectId', async (req, res) => {
    try {
        const { subjectId } = req.params;

        const deletedSubject = await Subject.findByIdAndDelete(subjectId);
        
        if (!deletedSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        res.status(200).json({status:true, message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({status:false, message: 'Error deleting subject', error });
    }
});


export default router