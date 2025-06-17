const express = require("express");
const session = require('express-session');
const cors = require('cors');
const passport = require("passport");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SECRET_KEY, 
    name: 'session',
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: true
    }
}));

//Passport
require("./src/config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

//Routes
const apiRouter = require("./src/routes/apiRouter");

app.use("/api", apiRouter);
//API fetch can append response.status to json object when fetching - json['status'] = response.status
app.get("/{*any}", (req, res) => res.status(404).json({msg : 'resource not found!'}));

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
