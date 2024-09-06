const collection = require("../models/mongodb");


exports.login = (req, res) => {

    if(req.session.admin) {
        res.redirect("/admin/dashboard");
    }else {
       
            const errMessage = req.session.err || " ";
            req.session.err = " ";
            res.render("admin/login", {errMessage});
           
       
    }
}

exports.loginpost = (req, res) => {

    const adminData = {
        email : "admin@gmail.com",
        password : "zxcv@1234"
    }
    console.log(adminData);

    if( adminData.email === req.body.email && adminData.password === req.body.password ) {

        req.session.admin = req.body.email;
        adminsession = req.session.admin;

        res.redirect("/admin/dashboard");
        console.log("success");
    }else {
        req.session.err = "Invalid email address or password";
        res.redirect("/admin/login");
        console.log("not success");
    }
}

exports.dashboard = async (req, res) => {

    if(req.session.admin) {

       
        try {
            const searchQuery = req.query.search || " ";
            
           
            const users = await collection.find({ name : { $regex : searchQuery, $options : "i"}});
            
            

            res.render("admin/dashboard", {users, searchQuery});
            
             console.log("done dashboard");
        }catch (error) {
            console.error(error);
        }

    }else {
        res.redirect("/admin/login");
    }
}

exports.delete = async (req, res) => {

    try {
        const del = req.params.id;
        await collection.findByIdAndDelete(del);
        res.redirect("/admin/dashboard");
    }catch (error) {
        console.log(error);
    }
}


exports.update = async (req, res) => {

    try {
        const userid = req.params.id;
        function isStringWhiteSpace(str) {
            return /^\s*$/.test(str);
        }

        const user = await collection.findById(userid);
        if( !isStringWhiteSpace(req.body.name) ) {
            user.name = req.body.name;
        }
        user.email = req.body.email;
        user.save();
        res.redirect("/admin/dashboard");
    }catch (error) {
        console.log(error);
    }
}

exports.edit = async (req, res) => {
    try {
        const editId = req.params.id;
        const user = await collection.findById(editId);
        res.render("admin/edit", {user});
    }catch (error) {
        console.log(error);
    }
}


exports.create = (req, res) => {

    if(req.session.admin) {
        res.render("admin/create");
    }else {
        res.render("admin/login");
    }
}

exports.register = async (req, res) => {
    console.log("done");
    try {
        if(req.session.admin) {
            const data = {
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            }
            console.log(data);

            const newvalue = await collection.findOne({ email:req.body.email });
            
            if(!newvalue) {
                await collection.create(data);
                console.log("User registered successfully!");
                res.redirect("/admin/dashboard");
            }else{
                console.log("erorr");
                res.status(404).json({mes:"User already exists"});
 
            }
        }else {
            res.status(404).send("Invalid session. Access denied.");
        }
    }catch (erorr){
        res.status(500).send("Internal Server Error");
    }
}

exports.logout = (req, res) => {
    
    req.session.admin = false;
    res.redirect("/admin/login");
} 