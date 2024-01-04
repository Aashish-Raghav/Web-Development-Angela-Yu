const express = require("express");
const app = express();

app.get("/",function(request,response){
    response.send("hello");
})
app.get("/contact",function(req,res){
    res.send("Contact me at : aashishraghav627@gmail.com");
})

app.get("/about",function(req,res){
    res.send("Myself Aashish Raghav, a coding lover and Enthusiast");
})

app.listen(3000,function(){
    console.log("local server started");
})