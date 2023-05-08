const valid = require('validator');
const auth = require('../controllers/auth');

exports.validator = async (data)=>{
    if(!valid.isAlpha(data.name)){
        return {status:'false',error:'Check your name.'};
    }
    else if(!valid.isEmail(data.email,['en-IN'])){
        return {status:'false',error:'Check your email.'};
    }
    else if(!valid.isMobilePhone(data.phone,['en-IN'])){
        return {status:'false',error:'Check your phone.'};
    }
    else if(!valid.isStrongPassword(data.password)){
        return {status:'false',error:'Your password must contain one Uppercase letter, one Symbol, one Lowercase letter, one Number and minimum length 8.'};
    }
    else{
            let val = await auth.register(data)
            console.log(val);
            return val;
    }

}