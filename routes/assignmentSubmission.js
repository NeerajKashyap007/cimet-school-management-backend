import { Router } from "express";
import AssignmentSubmission from "../models/AssignmentSubmission.js";


const router = Router()


router.post('/add-sumission', async(req, res)=>{
    try{
        const {task, checked, assignmentId, studentId, teacherId, classId, subjectId, schoolId } = req.body;

        if(!schoolId || !classId || !subjectId || !studentId){
            res.status(404).json({status: false, message: 'SchoolId, studentId, subjectId, classId required ' })
        }

        const newSubmission = new AssignmentSubmission ({
            task, checked, assignmentId, studentId, teacherId, classId, subjectId, schoolId 
        })

        await newSubmission.save();
        res.status(201).json({status: true, message: "Assignment Submitted Successfully"})

    }catch(error){

        console.log(error)
        res.status(500).json({
            status: false,
            error: 'Server Error'
        })
    }
})

// get by class Id

router.get('/class/:classId', async(req,res)=>{
    try{

        const {classId} = req.params;
        // console.log('CLASS', classId)

        const assignments = await AssignmentSubmission.find({classId}).populate('schoolId subjectId studentId classId assignmentId');
        res.status(200).json(assignments)
    }catch(error){
        res.status(500).json({ message: 'Error fetching Assignment', error });
    }

})

// get by subject Id

router.get('/subject/:subjectId', async(req,res)=>{
    try{

        const {subjectId} = req.params;
        // console.log('CLASS', classId)

        const assignments = await AssignmentSubmission.find({subjectId}).populate('schoolId subjectId studentId classId assignmentId');
        res.status(200).json(assignments)
    }catch(error){
        res.status(500).json({ message: 'Error fetching Assignment', error });
    }

})

// get by Assignment Id

router.get('/assignment/:assignmentId', async(req,res)=>{
    try{

        const {assignmentId} = req.params;
        
        const assignments = await AssignmentSubmission.find({assignmentId}).populate('schoolId subjectId classId studentId assignmentId');
        res.status(200).json(assignments)
    }catch(error){
        console.log("Error",error)
        res.status(500).json({ message: 'Error fetching Assignment', error });
    }

})


router.get('/assignment/student/:studentId/:assignmentId', async (req, res) => {
    try {
        const { studentId, assignmentId } = req.params;

        // Find assignments based on studentId and assignmentId
        const assignments = await AssignmentSubmission.find({
            studentId,
            assignmentId
        }).populate('schoolId classId teacherId AssignmentId');
        res.status(200).json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching assignments', error });
    }
});

// for filter

router.get('/assignments', async (req, res) => {
    try {
        const { schoolId, classId, subjectId, assignmentId } = req.query;

        const query = {};
        if (schoolId) query.schoolId = schoolId;
        if (classId) query.classId = classId;
        if (subjectId) query.subjectId = subjectId;
        if (assignmentId) query.assignmentId = assignmentId;

        const assignments = await AssignmentSubmission.find(query).populate('schoolId classId teacherId StudentId');
        res.status(200).json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching assignments', error });
    }
});

router.put('/update-assignment/:id', async(req, res)=>{
    try{
       
        const {id} = req.params;
        const updates = req.body;

        const updateSubmission = await AssignmentSubmission.findByIdAndUpdate(id, updates, {new:true})
         
        if(!updateSubmission){
            return res.status(404).json({ status:false,message:'Submission not Available'})
        }

        res.status(200).json({status:true, message:"Submission updated Successfully"})

    }catch(error){

    }
})




export default router;