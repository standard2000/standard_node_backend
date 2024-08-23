const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    faculty: {
        type: String
    },
    major:{
        type: String
    },
    grade: {
        type: String,
    },
    hometown: {
        type: String
    },
    skills: {
        type: String
    },
    education: [
        {
            school: {
                type: String,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);