const express = require("express");
 const session = require("express-session");
 const nocache = require("nocache");
const path = require("path");

const app = express();

app.use( nocache() );

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");


app.use(
    session({
        secret: "secret-key",
        resave: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        saveUninitialized: true
    })
);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static( path.join( __dirname, "./public")));
app.use(express.urlencoded({extended: true}));


app.use("/", userRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 7001;
app.listen(PORT, (error) => {

    if(error) {
        console.log(`server failed to run on port ${PORT}`);
    }
    else {
        console.log(`server successfully running on port ${PORT}`);
    }
});



