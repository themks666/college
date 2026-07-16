import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SuperAdminSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    fullName: {
        type: String,
        required: [true, 'Please provide full name'],
        maxlength: 100
    },
    phoneNumber: {
        type: String,
        maxlength: 20
    },
    profilePicture: {
        type: String,
        default: 'default.jpg'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    },
    role: {
        type: String,
        default: 'superadmin',
        enum: ['superadmin']
    },
    permissions: {
        type: [String],
        default: [
            'create-admin',
            'read-admin',
            'update-admin',
            'delete-admin',
            'manage-system-settings',
            'manage-roles',
            'audit-logs'
        ]
    }
}, { timestamps: true });

export const SuperAdmin =  model('SuperAdmin', SuperAdminSchema);