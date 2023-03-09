const express = require('express');
const register = require('../models/register');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {

    let values = [];

    try {
        values = await register.findOne({ "email": req.body.email });
    }
    catch (err) {
        res.json({ status: "error", error: "Some error occured" });
    }

    if (values != null) {
        res.json({ status: "error", error: "Email already registered" });
    }
    else {
        const Register = new register({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });

        await Register.save()
            .then(() => {
                res.json({ success: "email registered sucessfully" });
            })
            .catch(err => {
                res.json({ error: err });
                process.exit(1);
            });

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

exports.loggedIn = async (req, res, next) => {

    try {

        const header = req.headers['authorization'];


        if (typeof header !== undefined) {
            const token = header.split(" ")[1];
            const decoded = jwt.verify(token, "ayush1234");

            let values = [];
            values = await register.findOne({ _id: decoded.id });
            // console.log(values);

            if (values !== null) {
                res.name = values.name;
                return next();
            } else {
                res.err = "error in else";
                return next();
            }

        } else {
            return next();
        }

    } catch (error) {
        res.err = "catch error";
        next();
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