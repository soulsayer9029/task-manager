
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//get user
exports.getUser =async (req, res, next) => {
    const user = await User.findById(req.params.id);
    try{
        if(user){
            return res.status(200).json({
                    success: true,
                    data: user
                });
        }else{
            return res.status(400).json({
                success:false,
                data:"Could not get data"
            })
        }
    }catch(e){
        return res.status(400).json({
            success:false,
            data:"Could not get data"
        })
    }
    
  };
  exports.createUser =  async(req, res, next) => {
    //hashing the password 
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    
    
  //saving 
  try{
    const user=new User({
        email:req.body.email,
        password:hashedPassword,
      });
    await user.save();
    res.status(200).json({
        sucess: true,
        data: user
      });
  }catch(e){
    res.status(400).json({
        sucess:false,
        data: e.message
      });
  }
    
   
  };

  //login
  exports.login=async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
      if(!user){
          return res.status(400).send("Invalid credentials + User not found");
      }
      // console.log(user)
      const validPassword = await bcrypt.compare(req.body.password ,user.password)
      
      if(!validPassword){
          return res.status(400).send("Invalid Credentials")
      }
      try{
        const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
        res.status(200).header('auth-token',token).json({
          sucess: true,
          data: user,
          token: token
        });
      }catch(e){
        return res.status(400).send("Login failed")
      }
}