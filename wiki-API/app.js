const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require("lodash");
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
//todo

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title : String,
    content : String
};

const Article = mongoose.model("Article",articleSchema);

app.route("/articles")
.get((req,res)=>{
    Article.find({}).then((data)=>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err);
    });
})
.post((req,res)=>{
    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    });
    newArticle.save().then(savedDoc=>{
        if (savedDoc == newArticle){
            res.send("Successfully added a new article");
        }
        else{
            res.send("Some error occured");
        }
    }).catch(err=>{
        res.send(err);
    });
})
.delete((req,res)=>{
    Article.deleteMany({}).then(()=>{
        res.send("Successfully deleted");
    })
    .catch(err=>{
        res.send(err);
    })
})

app.route("/articles/:articleTitle")
.get((req,res)=>{
    console.log
    Article.findOne({title : req.params.articleTitle}).then((foundArticle)=>{
        if (foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("No article found with title " + articleTitle);
        }
    })
    .catch(err=>{
        res.send(err);
    })
})
.put((req,res)=>{
    console.log(req.body);
    Article.replaceOne({title : req.params.articleTitle},req.body,{strict : false})
    .then(()=>{
        res.send("Successfully updated with put request");
    })
    .catch(err=>{
        res.send(err);
    });
})
.patch((req,res)=>{
    console.log(req.body);
    //way1 ;
    // Article.updateOne({title : req.params.articleTitle},{$set : req.body}).then(()=>{
    //     res.send("Successfully updated with patch request");
    // })
    // .catch(err=>{
    //     res.send(err);
    // });

    //way2 ;
    Article.updateOne({title : req.params.articleTitle},req.body).then(()=>{
        res.send("Successfully updated with patch request");
    })
    .catch(err=>{
        res.send(err);
    })
})
.delete(function(req,res){
    Article.deleteOne({title : req.params.articleTitle}).then((result)=>{
        console.log(result);
        if (result.deletedCount >= 1){
            res.send("Successfully deleted article title " + req.params.articleTitle);
        }
        else{
            res.send("Couldn't find article with title "+ req.params.articleTitle);
        }
    })
    .catch(err=>{
        res.send(err);
    });
});

let port= 3000;
app.listen(port,function(){
    console.log('Server is running at port ' + port);
});