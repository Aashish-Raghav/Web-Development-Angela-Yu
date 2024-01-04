const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://aashishraghav627:admin123@cluster0.dydnhc0.mongodb.net/?retryWrites=true&w=majority/todolistDB");
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const day = date.getDate();
const todolistSchema = new mongoose.Schema({
    item : {
        type : String,
        required : [true,"Todolist item can't be empty"]
    }
});

const listSchema = new mongoose.Schema({
    name : String,
    items : [todolistSchema]
});

const todolistItem = new mongoose.model("todolistItem",todolistSchema);
const List = new mongoose.model("list",listSchema);

const item1 = new todolistItem({
    item : "Welcome to todolist"
})
const item2 = new todolistItem({
    item : "Hit + to add new item"
})
const item3 = new todolistItem({
    item : "<-- Hit to delete item"
})

const defaultItem = [item1,item2,item3]

app.get("/",function(req,res){
    todolistItem.find({}).then((data)=>{
        if (data == undefined){
            todolistItem.insertMany(defaultItem).then(()=>{
                console.log("successfully created collection todolistItem");
                res.redirect("/");
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else{
            res.render("list",{listTitle : day,listItems : data});
        }
    })
});

app.get("/:type",function(req,res){
    const heading = _.startCase(_.lowerCase(req.params.type));
    List.findOne({name : heading}).then((data)=>{
        if (data == undefined){
            const defaultList = new List({
                name : heading,
                items : defaultItem
            })
            List.insertMany([defaultList]).then(()=>{
                console.log("New List created, " + heading);
                res.redirect("/" + req.params.type);
            })
        }
        else{
            res.render("list",{listTitle : data.name, listItems : data.items});
        }
    })
    .catch(err=>{
        console.log(err);
    });
})

app.post("/",function(req,res){
    if (req.body.newItem == undefined || req.body.newItem.length === 0){
        if (req.body.button === day){
            res.redirect("/");
        }
        else{
            res.redirect("/" + req.body.button);
        }
    }
    else{
        const newItem = new todolistItem({
            item : req.body.newItem
        });
        if (req.body.button === day){
            console.log("Successfully inserted item in todolistitem");
            newItem.save();
            res.redirect("/");

            // OR
            // todolistItem.insertMany([newItem]).then(()=>{
            //     console.log("Successfully inserted in todolitsItem");
            //     res.redirect("/");
            // })
            // .catch(err => {
            //     console.log(err);
            // });
        }
        else{
            const heading = req.body.button;
            List.findOne({name : heading}).then((data)=>{
                data.items.push(newItem);
                data.save();
                console.log("Successfully inserted in collection " + heading);
                res.redirect("/" + heading);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
});

app.post("/delete",function(req,res){
    const checkedId = req.body.checkbox;
    const listName = req.body.ListName;
    if (listName === day){
        todolistItem.deleteOne({_id : req.body.checkbox}).then(()=>{
            console.log("Successfully deleted from todolistItem");
            res.redirect("/");
        })
        .catch(err=>{
            console.log(err);
        });
    }
    else{

        List.findOneAndUpdate({name : listName},{$pull : {items : {_id : checkedId}}}).then(()=>{
            console.log("Successfully Deleted from collection " + listName);
            res.redirect("/"+listName);
        })
        .catch(err=>{
            console.log(err);
        })
    }
})

app.get("/about",function(req,res){
    res.render("about");
});

app.listen(3000,function(){
    console.log("Server is running at 3000");
});