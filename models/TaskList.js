const mongoose = require('mongoose');
const User=require('../models/User.js')

const TaskListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'This field is required'],
        minlength: [1,'Title is too short'],
        trim: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    }
  });

module.exports = mongoose.model('TaskList', TaskListSchema);