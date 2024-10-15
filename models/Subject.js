import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true  // Link to the school this subject belongs to
    },
    subjectName: { type: String, required: true },
    teacher: { 
        type: Schema.Types.ObjectId, 
        ref: 'Teacher' },
     // Teacher assigned to the subject
    classes: [{ 
        type: Schema.Types.ObjectId,
         ref: 'Class' }] 
}, { timestamps: true });

const Subject = model('Subject', subjectSchema)

export default Subject