const User = require('../models/User');
const TaskList = require('../models/TaskList');
const Task=require('../models/Task')

exports.createTask=async(req,res)=>{
    listId=req.params.id;
    try{
        task=new Task({
            task:req.body.task,
            owner:req.user._id,
            list:listId
        })
        await task.save()
        res.status(200).json({
            success:true,
            data:task
        })
    }catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        })
    }
}
exports.getTasks=async(req,res)=>{
    listId=req.params.id;
    try{
        tasks=await Task.find({list:listId})
        res.status(200).json({
            success:true,
            data:tasks,
            size:tasks.length
        })
    }catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        })
    }
}
exports.updateTask=async(req,res)=>{
    taskId=req.params.id;
    try{
        task=await Task.findByIdAndUpdate({_id:taskId},req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            success:true,
            data:task,
            
        })
    }catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        })
    }
}
exports.deleteTask=async(req,res)=>{
    taskId=req.params.id;
    try{
        task=await Task.findByIdAndDelete({_id:taskId})
        res.status(200).json({
            success:true,
            data:" Task deleted succesfully",
            
        })
    }catch(e){
        res.status(400).json({
            success:false,
            data:e.message
        })
    }
}


