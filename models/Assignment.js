import { Schema, model } from "mongoose";

const assignmentSchema = new Schema({

    schoolId:{
        type:Schema.Types.ObjectId,
        ref:'School',
        required: true
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
})

const Assignment = model ('Assignment', assignmentSchema)

export default Assignment