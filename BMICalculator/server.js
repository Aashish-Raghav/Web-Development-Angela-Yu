const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/bmicalculator",function(req,res){
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator",function(req,res){
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var bmi = weight/(height*height);
    res.send("Your BMI is " + bmi);
})

app.listen(3000,function(){
    console.log("Local server with port 3000 started");
})