const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => { 
    console.log("connected to DB!")
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());


app.use('/',require('./routes/pages'));


app.listen(4000);