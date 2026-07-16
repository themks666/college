import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const institutionAdminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ // Valid email pattern
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
        validate: {
            validator: function(v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(v);
            },
            message: 'Password must contain uppercase, lowercase, number, and special character'
        }
    },
    phone: {
        type: String,
        default: '',
        match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
    },
    role: {
        type: String,
        enum: ['institutionMainAdmin'],
        default: 'institutionMainAdmin'
    },
    profilePicture: {
        type: String,
        default: '',
        match: /^(https?:\/\/).+\.(jpg|jpeg|png|gif)$/i // Valid image URL
    },
    isActive: {
        type: Boolean,
        default: true
    },
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: true,
        immutable: true
    },
    lastLogin: {
        type: Date
    },
}, {
    timestamps: true,
});

const InstitutionAdmin = mongoose.model('InstitutionAdmin', institutionAdminSchema);

export default InstitutionAdmin;