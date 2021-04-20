const express=require('express');
const router=express.Router();
const{verifyToken}=require('../middleware/verifyToken')
const{getTaskLists,createTaskList,updateTaskList,deleteTaskList}=require('../controllers/tasklist')
//get task lists
router.get('/',verifyToken,getTaskLists)
//create TaskList
router.post('/createTaskList',verifyToken,createTaskList)
//Update TaskList
router.patch('/updateTaskList/:id',verifyToken,updateTaskList)
//Delete TaskList
router.delete('/deleteTaskList/:id',verifyToken,deleteTaskList)
module.exports=router;