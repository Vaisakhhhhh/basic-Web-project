const { text } = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Web-app-userdb").then(() => {

    console.log("Mongodb is successfully connected");
}).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name : {

         type : String,
         required : true 

        },

    password : { 

        type : String,
        required : true

        }, 

    email : {

         type : String,
         required : true
         
        }
});

const collection = mongoose.model("Web-App-UserCollection", userSchema);

module.exports = collection;