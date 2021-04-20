const express=require('express');
const router=express.Router();

const{verifyToken}=require('../middleware/verifyToken')
const{createTask,getTasks,updateTask,deleteTask}=require('../controllers/task')
//createTask
router.post('/createTask/:id',verifyToken,createTask)
//get Tasks of a given list
router.get('/getTasks/:id',verifyToken,getTasks)
//update particular task
router.patch('/updateTask/:id',verifyToken,updateTask)
//delete particular task
router.delete('/deleteTask/:id',verifyToken,deleteTask)
module.exports=router;