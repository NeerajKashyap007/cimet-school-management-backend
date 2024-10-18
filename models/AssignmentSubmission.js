import { Schema, model } from "mongoose";

const assignmentSubmissionSchema = new Schema ({
    schoolId:{
        type:Schema.Types.ObjectId,
        ref:'School',
        required: true
    },
    assignmentId:{
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    classId:{
        type: Schema.Types.ObjectId,
        ref:'Class',
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref:'Student',

    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref:'Subject',
    },
    teacherId:{
        type: Schema.Types.ObjectId,
        ref:'Teacher',
    },
    task:{
        type: String,
        required:true
    },
    checked:{
        type: Boolean
    }
})

const AssignmentSubmission = model('AssignmentSubmission', assignmentSubmissionSchema)

export default AssignmentSubmission