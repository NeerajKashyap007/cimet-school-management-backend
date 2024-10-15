import { Schema, model } from "mongoose";

const classSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    className: { type: String, required: true },
    section: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
}, { timestamps: true });

const Class = model('Class', classSchema)

export default Class