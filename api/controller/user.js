var express = require('express')
var router = express.Router();
var { createUser, loginUser, logout } = require('../concrete/userConcrete')

// <api>/users/login
router.post('/login', (req, res) => {
    try {
       
        loginUser(req.body).then((data)=>{
            if(!data){
                return res.status(409).send({message: 'Credential not valid'})
            }else{
                console.log(data)
                res.cookie(`token`,data.user.getIdTokenResult(),{path:'/',maxAge:'3600'})
                return res.status(200).json({message:"Created Successfully",data:data.user.email})
            }
        })
       
    }
    catch (e) { 
        res.status(500).json({message: 'Server error'});
        // throw e;
        console.log("error in login : ", e);
    }
});


// <api>/users/register
router.post('/register',async (req, res) => {
    let userData=await createUser(req.body);
    console.log(userData,"userId");
    if (!userData) {
        return res.status(401).send({ message: 'Email already exists.'})
    } else {
       
         res.cookie(`token`,userData.user.getIdTokenResult(),{path:'/',maxAge:'3600'})
         return res.status(201).json({message:"Created Successfully",data:userData.user.email})

    }

});

module.exports = router;

