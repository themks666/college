import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    excerpt: {
        type: String,
        required: true,
    },
    hasAttachment: {
        type: Boolean,
        default: false,
    },
    attachmentLink: {
        type: String,
        default: '',
    },
    department: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

export default mongoose.model('Notice', noticeSchema);