import { Schema, model } from "mongoose";

const InstitutionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\+?[0-9\s\-()]{7,15}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: false,
    },

    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: { type: String, default: "US" },
    },
    logoUrl: String,
    establishedYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
    },
    website: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/.test(
                    v
                );
            },
            message: (props) => `${props.value} is not a valid URL!`,
        },
        required: false,
    },

    status: {
        type: String,
        enum: ["active", "suspended",],
        default: "active",
    },

},{timestamps: true});

export default model("Institution", InstitutionSchema);