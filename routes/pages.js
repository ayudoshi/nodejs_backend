const express =  require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const check = require('../middleware/check');

router.get('/',(req,res)=>{
    res.json({"status":"success"});
});

router.get('/profile',async(req,res)=>{
    const header = req.headers['authorization'];
    let rep = await auth.loggedIn(header);
    res.json(rep);
})

router.get('/getData',auth.getData);

router.post('/login',auth.login);

router.post('/register',async(req,res)=>{
    let data=req.body;
    let values = await check.validator(data);
    console.log(values)
    res.json({values});
});

router.put('/update',auth.update);

router.patch('/updateName',auth.updateName);

router.delete('/delete',auth.delete);

router.post('/test',auth.test);


module.exports=router;