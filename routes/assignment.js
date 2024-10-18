import { Router } from "express";
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import Assignment from "../models/Assignment.js";

const router = Router()


router.post('/add-assignment', async(req,res)=>{
    try{

     const {  title, description,classId,schoolId, teacherId, subjectId } = req.body ;

    if(!classId || !subjectId ){
        return res.status(400).json({status: false, message:'Class  and Subject is required' })
    }
    const newAssignment = new Assignment ({
        title, description,classId,schoolId,teacherId, subjectId
    })

    await newAssignment.save();
    res.status(201).json({status: true, message: "Assignment Created SuccessFully"})

    }catch(error){
        console.log(error)
        res.status(500).json({
            status: false,
            error: 'Server Error'
        })
    }
})


router.get('/:classId', async(req,res)=>{
    try{

        const {classId} = req.params;
        // console.log('CLASS', classId)

        const assignments = await Assignment.find({classId}).populate('subjectId classId');
       console.log("DDD", assignments)
        res.status(200).json(assignments)
    }catch(error){
        res.status(500).json({ message: 'Error fetching Assignment', error });
    }

})

router.get('/:schoolId', async(req,res)=>{
    try{

        const {schoolId} = req.params;
        console.log('School',schoolId)
        const assignments = await Assignment.find({schoolId}).populate('subjectId classId');
       console.log("DDD", assignments)
        res.status(200).json(assignments)
    }catch(error){
        res.status(500).json({ message: 'Error fetching Assignment', error });
    }

})

export default router