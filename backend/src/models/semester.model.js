import { Schema, model } from 'mongoose';

const semesterSchema = new Schema({
    program: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        required: [true, "Program reference is required"],
        validate: {
            validator: async function(programId) {
                const program = await model('Program').findById(programId);
                return program && program.isActive;
            },
            message: "Program must be active"
        }
    },
    semesterNumber: {
        type: Number,
        required: [true, "Semester number is required"],
        min: [1, "Semester number must be at least 1"],
        validate: {
            validator: async function(value) {
                const program = await model('Program').findById(this.program);
                return value <= program.totalSemesters;
            },
            message: "Semester number exceeds program's total semesters"
        },
        default:1
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v > this.startDate;
            },
            message: "End date must be after start date"
        }
    },



    isActive: {
        type: Boolean,
        default: true
    },
    minCredits: {
        type: Number,
        default: 12,
        min: [3, "Minimum credits cannot be less than 3"]
    },
    maxCredits: {
        type: Number,
        default: 21,
        max: [24, "Maximum credits cannot exceed 24"],
        validate: {
            validator: function(value) {
                return value >= this.minCredits;
            },
            message: "Maximum credits must be greater than or equal to minimum credits"
        }
    }
}, {
    timestamps: true,
});
