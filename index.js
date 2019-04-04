const express = require('express');
const mongoose = require('mongoose');
const bodyParser    = require('body-parser');
const _           = require('lodash');
const index   = express();
const authRoute = require("./routes/main");
const likeRoute = require("./routes/likes");
const blockRoute = require("./routes/block");
const auth      =require("./middleware/auth");
const User      =require("./models/user");

// Middleware

index.use(bodyParser.json());


mongoose.connect("mongodb://localhost/quillhash",{ useNewUrlParser: true })
    .then(()=>{
      console.log("Connected to the database");
    })
    .catch((err)=>{
      console.log(err);
    })

// All Routes
index.use("/user",authRoute);
index.use("/user",likeRoute);
index.use("/user",blockRoute);


index.get("/",auth,async (req,res)=>{
  const allUser = await User.find({});
  console.log(allUser);
  res.send(allUser);
});

const port = process.env.PORT || 4000;


index.listen(port,(err)=>{
  if(err){
    console.log(err);
  }
  console.log(`Server is Runing on Port ${port}`);
})
