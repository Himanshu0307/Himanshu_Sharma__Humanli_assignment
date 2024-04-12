var express=require('express')
var router=express.Router();
var {createUser,getUserList,verifyUser}=require('../concrete/userConcrete')

router.post('login',(req,res)=>{
    var userModel=req.body;
    if(verifyUser(userModel)){
        // release token

        //send userinformation
    }
})

router.post('register',(req,res)=>{
    var user=req.body;
    
})