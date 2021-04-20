const User = require('../models/User');
const TaskList = require('../models/TaskList');
const Task = require('../models/Task');

exports.getTaskLists=async(req,res)=>{
    const id=req.user._id;
    tasklist=await TaskList.find({owner:id})
    res.status(200).json({
        success:true,
        data:tasklist,
        length:tasklist.length
    })
}
exports.createTaskList=async(req,res)=>{
    try{
        const taskList= new TaskList({
            title:req.body.title,
            owner:req.user._id
        })
        await taskList.save();
        res.status(200).json({
            sucess: true,
            data: taskList
          });
    }catch(e){
        res.status(400).json({
            sucess: false,
            data: e.message
          });
    }

}
exports.updateTaskList=async(req,res)=>{
    const listId=req.params.id;
    try{

        const taskList= await TaskList.findByIdAndUpdate(listId,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            sucess: true,
            data: taskList
          });
    }catch(e){
        res.status(400).json({
            sucess: false,
            data: e.message
          });
    }

}
exports.deleteTaskList=async(req,res)=>{
    const listId=req.params.id

    try{
        await Task.deleteMany({list:listId})
        await TaskList.findByIdAndDelete(listId)
        res.status(200).json({
            sucess: true,
            data: "tasks and list deleted successfully"
          });
    }catch(e){
        res.status(400).json({
            sucess: false,
            data: e.message
          });
    }

}
