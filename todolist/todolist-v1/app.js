const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const items = [];
const work = [];
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    const day = date.getDate();
    res.render("list",{listTitle : day,listItems : items});
})

app.get("/work",function(req,res){
    res.render("list",{listTitle : "Work",listItems : work});
})
app.post("/",function(req,res){
    const item = req.body.newItem;
    if (req.body.button === "Work"){
        work.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/about",function(req,res){
    res.render("about");
});

app.listen(3000,function(){
    console.log("Server is running at 3000");
})