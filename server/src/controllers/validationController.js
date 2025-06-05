const User = require("../db/queries/users");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

//Form field validation
const nameLengthErr = "Username must be between 4 and 12 characters long.";
const passwordLengthErr = "Password must be between 8 and 20 characters long.";
const validate = [
    body("username").trim()
        .isLength({min:4, max:12}).withMessage(nameLengthErr),
    body("password").trim()
        .isLength({min:8, max:20}).withMessage(passwordLengthErr),
];

const validateUserPost = [
    validate,
    (req, res) => {
        const errors = validationResult(req);
        //If error array is not empty, display errors
        if(!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        } else {
            //Check uniqueness is valid
            checkUniqueName(req, res);
        }
    }
]

async function checkUniqueName(req, res) {
    //If username already exists in db, display error
    const users = await User.usernameGet(req.body.username);
    const matchingNames = Object.values(users).length;
    if(matchingNames) {
        res.status(400).send([{msg: "Username is already taken."}]);        
    } else {
        //Create user if valid
        createUser(req, res);
    }
}


async function createUser(req, res) {
    //Add user to db
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    await User.userPost(user);
    res.status(200).send({message:"ok"});
}

module.exports = { validateUserPost }