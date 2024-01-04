const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const q = req.body.city;
    const apiKey = "228c6e618a188d6377981e641f7068d2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q="+q+"&units=" + unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            res.write("<h1> Weather Report At :" + q + "</h1>");
            res.write("<strong> Temperature : </strong>" + weatherData.main.temp +"<br>");
            res.write("<strong> Description : </strong>" + weatherData.weather[0].description + "<br>");
            const imgURL =  "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<img src=" + imgURL +">");
            res.send();
        })
    })
})
















// const url = "https://api.openweathermap.org/data/2.5/weather?appid=228c6e618a188d6377981e641f7068d2&q=Khurja&units=metric";
//     https.get(url,function(response){
//         response.on("data",function(data){
//             const weatherdata = JSON.parse(data);
//             const temp = weatherdata.main.temp;
//             const weatherDesc = weatherdata.weather[0].description;
//             const weatherIcon = weatherdata.weather[0].icon;
//             const iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
//             res.setHeader("Content-Type", "text/html");
//             res.write("<p> Weather Description of Khurja :" + weatherDesc + "</p>");
//             res.write("<img src = " + iconUrl+">");
//             res.write("<h1>the temperature in khurja is " + temp + " degreee Celcius</h1>");
//             res.send();
//         })
//     })
app.listen(3000,function(){
    console.log("local host: 3000 started");
})