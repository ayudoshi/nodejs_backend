const express = require('express');
const register = require('../models/register');
const jwt = require('jsonwebtoken');



exports.register = async (data) => {

    let values = [];

    try {
        values = await register.findOne({ "email": data.email });
    }
    catch (err) {
        return { status: "error", error: "Some error occured" };
    }

    if (values != null) {
        return{ status: "error", error: "Email already registered" };
    }
    else {
        const Register = new register({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password
        });

        let reponse = await Register.save()
        if(reponse){
            return{ status:"true",msg: "email registered sucessfully" };
        }
        else{
            return{ status:"false",error: err };
        }

    }

};

exports.login = async (req, res) => {
    let values = [];

    values = await register.findOne({ "email": req.body.email })
        .then()
        .catch(err => {
            res.json({ error: err });
            process.exit(1);
        })

    if (values == null || values.password != req.body.password) {
        res.json({ status: "error", error: "Please check your login credentials" });
    }
    else {
        const token = jwt.sign({ id: values.id }, "ayush1234", {
            expiresIn: 1000 * 60 * 60,
        })

        const cookieOptions = {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            httpOnly: true
        }

        res.cookie("userLoggedIn", token, cookieOptions);
        return res.json({ status: "success", success: "Logged In" });
    }

};

exports.loggedIn = async (header) => {

    try {

        if (typeof header !== undefined) {
            const token = header.split(" ")[1];
            const decoded = jwt.verify(token, "ayush1234");

            let values = [];
            values = await register.findOne({ _id: decoded.id });

            if (values !== null) {
                return { status: "success", success: "Welcome" };
            } else {
                return { status: "error", error: "Unauthorizedd access" };
            }

        } else {
            return { status: "false", success: "Unauthorized access" };
        }

    } catch (err) {
        return { status: "error", error: err };
    }
};

// let data = {
//         name: "Your name", lastName: "your name", age: 60, birthPlace: "lonand"
//     }
exports.getData=async(req,res)=>{
    try{
        let values=await register.findOne({email:req.body.email});
        res.json(values);
    }catch(err){
        res.json(err);
    }
}

exports.update = async(req, res) => {

    try {
        const updatedData = req.body;
        let values = await register.findOne({ _id: updatedData._id });
        delete updatedData._id;
        let resp=await register.updateOne(values,updatedData);
        res.json(resp);
    } catch (err) {
        res.json(err);
    }
};

exports.updateName = async(req, res) => {

    try {
        const updatedName = req.body;
        let values = await register.findOne({ _id: updatedName._id });
        delete updatedName._id;
        let resp=await register.updateOne(values,updatedName);
        res.json(resp);
    } catch (err) {
        res.json(err);
    }
};

exports.delete=async(req,res)=>{
    try{
        let resp=await register.findByIdAndDelete(req.body._id);
        res.json(resp);
    }catch(err){
        res.json({error:err});
    }
}

exports.test=(req,res)=>{
    try {
        console.log(req.body);
        register.updateOne({ name: req.body.name ,  where: req.body.email } ).then((resp)=>{
            res.json(resp);
        })
    } catch (e) {
        res.send('error');
    }
}