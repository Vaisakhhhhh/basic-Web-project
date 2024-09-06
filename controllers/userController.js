const collection = require("../models/mongodb");
const isAuthenticated = require('../middleware/authmildware');

exports.signup = (req, res) => {

     if( req.session.user ) {
         res.redirect("/home");
     }else {
        res.render("user/signup");
    }
}

exports.signuppost = async (req, res) => {
    console.log(req.body, "signup details");

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await collection.findOne({email: userData.email});
    console.log(existingUser);

    if( existingUser ) {
        res.render("user/signup");
        console.log("user all ready exists");
    }else {
        await collection.insertMany( userData );
        res.redirect("/login");
    }
}

exports.login = (req, res) => {

    const errorMessage = req.session.err || " ";
    console.log(errorMessage);
    req.session.err = " ";
    if(req.session.user) {
        res.redirect("/home");
    }else{
        res.render("user/login", {errorMessage});
    }
}

exports.loginpost = async (req, res) => {

    try {
     
        const check = await collection.findOne({ email: req.body.email });
        console.log(check);

        if( check.password === req.body.password) { 

            console.log("Auth done");
            req.session.user = req.body.email;
            req.session.name = req.body.name;
            res.redirect("/home");
        }else {
            req.session.err = "Invalid email address or password";
            res.redirect("/login");
        }
    }
    catch (error) {
        console.error("Error while login");
        req.session.err = "Invalid email address or password";
        res.redirect("/login");
    }
}

exports.home = [isAuthenticated, async (req, res) => {
    try {
        console.log("before check");
        const user = await collection.findOne({ email: req.session.user });

        if(user) {
            const userName = user.name ;
            const userEmail = req.session.user;
            res.render("user/home", {userName, userEmail});
        }
        else if(req.session.user) {
            req.session.user = false;
            res.redirect("/login");
        }
        else {
            res.redirect("/login");
        }
    }
    catch (error) {
        console.log("error in the home", error.message );
    }
}];

exports.logout = (req, res) => {
    console.log(req.session.user);

    req.session.user = false; 
    res.redirect("/login");
}