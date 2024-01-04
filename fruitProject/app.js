const mongoose = require("mongoose");
const assert = require("assert");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
    name : String,
    rating : {
        type : Number,
        min : [1,"rating range (1-10)"],
        max : [10,"rating range (1-10)"]
    },
    review : String
})

const Fruit = mongoose.model("Fruit",fruitSchema);

const pineapple = new Fruit({
    name : "Pineapple",
    rating : 10,
    review : "it is nice"
});
const kiwi = new Fruit({
    name : "kiwi",
    rating : 10,
    review : "The best fruit"
});
// Fruit.deleteOne({name : "Pineapple"}).then(()=>{});
// pineapple.save();
const peopleSchema = new mongoose.Schema({
    name : String,
    age : Number,
    favouriteFruit : fruitSchema
})

const Person = mongoose.model("people",peopleSchema);
const person = new Person({
    name : "Amy",
    age : 27,
    favouriteFruit : pineapple
});

// Person.deleteOne({_id : '6591711fe92315b5658c294c'}).then(()=>{});

// Person.updateOne({name : "John"},{favouriteFruit : kiwi}).then(()=>{});
// person.save();



// const orange = new Fruit({
//     name : "orange",
//     rating : 8,
//     review : "sour the sour"
// })

// const papaya = new Fruit({
//     name : "papaya",
//     rating : 7,
//     review : "Papaya the papaya"
// })
// const banana = new Fruit({
//     name : "banana",
//     rating : 3,
//     review : "sdkd"
// });

// const badFruit = new Fruit({
//     rating : 10,
//     review : "Wow love peach"
// });

// badFruit.save();
// Fruit.updateOne({_id : '65916c7a271a6405bb746633'},{name : "Peach"}).then(()=>{});
// Fruit.deleteOne({_id : '65916c7a271a6405bb746633'}).then(()=>{}).finally(()=>{mongoose.connection.close();});
// let error = badFruit.validate();
// console.log(error);
// assert.equal(error.errors["rating"].message,"rating range (1-10)");
// Fruit.insertMany([banana]).finally(()=>{
//     mongoose.connection.close();
// });

// Fruit.find({}).then((data) => {
//     data.forEach(function(element){
//         console.log(element.name);
//     })
// }).finally(()=>{
//     mongoose.connection.close(); 
// });

// fruit.save();
// const peopleSchema = new mongoose.Schema({
//     name : String,
//     age : Number
// });

// const Person = mongoose.model("People",peopleSchema);
// const person = new Person({
//     name : "John",
//     age : 27
// })

// person.save()