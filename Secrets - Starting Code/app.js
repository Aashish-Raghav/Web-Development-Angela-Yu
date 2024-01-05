require("dotenv").config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require("lodash");
//Level 2
// const encrypt = require("mongoose-encryption");
//Level 3
// const md5 = require("md5");
//Level 4
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
//Level 5
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//Level 6
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate")

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.use(session({
    secret : "Our little secret.",
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/AuthDB");
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    googleId : String,
    secret : String
});

//level 2.....
// userSchema.plugin(encrypt,{secret : process.env.SECRET,encryptedFields : ['password']});
//level 5.....
userSchema.plugin(passportLocalMongoose);
//level 6.....
userSchema.plugin(findOrCreate);
const User = new mongoose.model("user",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/",function(req,res){
    res.render("home",{});
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
    res.redirect("/secrets");
});

app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/secrets",(req,res)=>{
    User.find({secret : {$ne : null}}).then((foundUsers)=>{
        if (foundUsers){
            res.render("secrets",{secretArr : foundUsers});
        }
        else{
            res.render("secrets",{secretArr : []});
        }
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    })
})

app.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if (err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
})

app.get("/submit",(req,res)=>{
    if (req.isAuthenticated()){
        res.render("submit");
    }
    else{
        res.redirect("/login");
    }
});

app.post("/submit",(req,res)=>{
    const secret = req.body.secret;
    User.findById(req.user.id).then((foundUser)=>{
        foundUser.secret = req.body.secret;
        foundUser.save().then((savedDoc)=>{
            res.redirect("/secrets");
        })
        .catch(err=>{
            console.log(err);
            res.redirect("/submit");
        });
    })
    .catch(err=>{
        console.log(err);
        res.redirect("/submit");
    })
});

app.post("/register",(req,res)=>{
    // console.log(req.body);
    //level 5.......

    User.register({username : req.body.username},req.body.password,(err,user)=>{
        if (err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/secrets");
            });
        }
    });

    //level 4 .......
    // bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
    //     if (!err){
    //         const newUser = new User({
    //             username : req.body.username,
    //             password : hash
    //         });
    //         newUser.save().then((savedCredential)=>{
    //             if (savedCredential == newUser){
    //                 res.render("secrets");
    //             }
    //             else{
    //                 res.send("Some Error Occured");
    //             }
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //         })
    //     }
    //     else{
    //         console.log(err);
    //     }
    // });

    //level 3........
    // const newUser = new User({
    //     username : req.body.username,
    //     password : md5(req.body.password)
    // });

});

app.post("/login",(req,res)=>{
    //Level 5 ......
    const user = new User({
        username : req.body.username,
        password : req.body.password
    });
    passport.authenticate("local",{ failureRedirect: '/login' })(req,res,()=>{
        res.redirect("/secrets");
    });

    //Level 4 ......
    // User.findOne({username : req.body.username}).then((foundUser)=>{
    //     if(foundUser){
    //         bcrypt.compare(req.body.password,foundUser.password,(err,result)=>{
    //             if (result == true){
    //                 res.render("secrets");
    //             }
    //             else{
    //                 res.send("No user detected");
    //             }
    //         });
    //     }
    //     else{
    //         res.send("No user detected");
    //     }
    // })
    // .catch(err=>{
    //     console.log(err);
    // })
});

let port= 3000;
app.listen(port,function(){
    console.log('Server is running at port ' + port);
});