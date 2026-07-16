import { Schema, model } from 'mongoose';

const programSchema = new Schema({
    name: {
        type: String,
        required: [true, "Program name is required"],
        trim: true,
        maxlength: [100, "Program name cannot exceed 100 characters"]
    },
    code: {
        type: String,
        required: [true, "Program code is required"],
        uppercase: true,
        trim: true,
        unique: true,
        match: [/^[A-Z0-9]{2,10}$/, "Code must be 2-10 uppercase alphanumeric characters"]
    },
    durationYears: {
        type: Number,
        required: [true, "Duration in years is required"],
        min: [1, "Minimum duration is 1 year"],
        max: [6, "Maximum duration is 6 years"]
    },
    totalSemesters: {
        type: Number,
        required: [true, "Total semesters is required"],
        validate: {
            validator: function(val) {
                return val === this.durationYears * 2;
            },
            message: "Total semesters must equal durationYears × 2"
        }
    },
    creditHours: {
        type: Number,
        required: [true, "Total credit hours are required"],
        min: [30, "Minimum credit hours is 30"]
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, "Department reference is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});

export default model('Program', programSchema);