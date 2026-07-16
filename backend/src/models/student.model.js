import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: [true, "Batch is required"],
    },
    currentSemester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      validate: {
        validator: async function (semesterId) {
          if (!semesterId) return true;
          const Batch = this.model("Batch");
          const batch = await Batch.findById(this.batch);
          return (
            batch &&
            batch.currentSemester &&
            batch.currentSemester.equals(semesterId)
          );
        },
        message: "Current semester must match the batch's assigned semester.",
      },
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      uppercase: true,
      trim: true,
      validate: {
        validator: async function (sectionValue) {
          const Batch = this.model("Batch");
          const batch = await Batch.findById(this.batch);
          return batch && batch.sections.includes(sectionValue);
        },
        message: (props) =>
          `Section '${props.value}' is not valid for the selected batch.`,
      },
      default: "1",
    },

    address: {
      street: { type: String, trim: true, maxlength: 100 },
      city: { type: String, trim: true, maxlength: 50 },
      state: { type: String, trim: true, maxlength: 50 },
      postalCode: {
        type: String,
        trim: true,
        match: [/^\d{5}$/, "Postal code must be 5 digits"],
      },
      country: {
        type: String,
        default: "Nepal",
        trim: true,
      },
    },
    contact: {
        type: String,
        match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
        trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other", "Prefer not to say"],
        message: "Gender must be Male, Female, Other, or Prefer not to say",
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      max: [new Date(), "Date of birth cannot be in the future"],
      min: [new Date("1900-01-01"), "Date of birth must be after 1900"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isSuspended: {
      type: Boolean,
      default: false
        },
  },
  {
    timestamps: true,
  },
);


export const StudentModel = mongoose.model("Student",studentSchema)