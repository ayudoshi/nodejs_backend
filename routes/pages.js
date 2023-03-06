const express =  require('express');
const router = express.Router();
const auth = require('../controllers/auth');


router.get('/',(req,res)=>{
    res.json({"status":"success"});
});

router.get('/profile',auth.loggedIn,(req,res)=>{
    if(res.name){
        res.json({success:`welcome to profile ${res.name}`});
        
    }else{
        res.json({err:"please login first"});
    }
})

router.post('/login',auth.login);

router.post('/register',auth.register);


module.exports=router;