const mongoose = require('mongoose');
const User=require('../models/User.js')
const TaskList=require('../models/TaskList.js')

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true,'This field is required'],
        minlength: [1,'Task is too short'],
        trim: true,
        
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    list:{
        type: mongoose.Types.ObjectId,
        ref:'TaskList',
        required: true
    },
    completed:{
        type:Boolean,
        default:false
    }
  });

module.exports = mongoose.model('Task', TaskSchema);