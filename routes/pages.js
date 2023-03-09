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

router.get('/getData',auth.getData);

router.post('/login',auth.login);

router.post('/register',auth.register);

router.put('/update',auth.update);

router.patch('/updateName',auth.updateName);

router.delete('/delete',auth.delete);


module.exports=router;