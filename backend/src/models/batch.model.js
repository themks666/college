import { Schema, model } from 'mongoose';

const batchSchema = new Schema({
    year: {
        type: Number,
        required: [true, "Batch year is required"],
        min: [2000, "Year must be 2000 or later"]
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        required: [true, "Program reference is required"]
    },
    currentSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Semester',
        required: false
    },
    sections: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


export default model('Batch', batchSchema);