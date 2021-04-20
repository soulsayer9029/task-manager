const express=require('express')

const app=express()
const cors=require('cors')
const mongoose  =require('mongoose')

require('dotenv/config')
app.use(cors())
const bodyParser=require('body-parser')
app.use(bodyParser.json())

const port=process.env.PORT || 3000
const users=require('./routes/user')
const tasklists=require('./routes/tasklist')
const tasks=require('./routes/task')




app.get('/',(req,res)=>{
    res.send('<h1>Noice</h1>')
})
app.use('/api/v1/users/', users);
app.use('/api/v1/tasklists/', tasklists);
app.use('/api/v1/tasks/', tasks);

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(port,()=>console.log("DB Connected")))
    .catch((e)=>console.log(e.message))

mongoose.set('useFindAndModify',false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);