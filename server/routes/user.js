const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../model/User')


router.post('/signin',async(req,res)=>{
  const {email,password}=req.body

   try {
       const existingUser= await User.findOne({email})

       if(!existingUser) return res.status(404).json({msg:'user does not exist'})

       const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)

       if(!isPasswordCorrect) return res.status(400).json({msg:'invalid credentials'})

       const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1h'})
     
       res.status(200).json({result:existingUser,token})

   } catch (error) {
       res.status(500).json({msg:'something went wrong'})
   }

})



router.post('/signup',async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName}=req.body
     

    try {
        const existingUser=await User.findOne({email})
        if(existingUser)return res.status(400).json({msg:'user already exists'})
        if(password!==confirmPassword) return res.status(400).json({msg:'password do not match'})
        const hashedPassword= await bcrypt.hash(password,12)

        const result=await User.create({email,password:hashedPassword,name:`${firstName}  ${lastName}`})

        const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1h'})

        res.status(200).json({result,token})

    } catch (error) {
        res.status(500).json({msg:'something went wrong'})
    }

})




module.exports=router