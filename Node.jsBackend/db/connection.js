const mongoose=require('mongoose');require('dotenv').config();
mongoose.connect(process.env.url2).then((data)=>{console.log("database successfully connect")}).catch((err)=>{console.log("database conncegtion fail")});

//mongoose.connect(process.env.url).then((data)=>{console.log("database successfully connect")}).catch((err)=>{console.log("database conncegtion fail")});

