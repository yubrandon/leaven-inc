module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('request authenticated');
        next();
    } else {
        console.log('user not authorized');
        res.status(401).json({msg: "Request not authorized"});
    }
}

module.exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin) {
        console.log('administrator authenticated');
        next();
    } else {
        console.log('user is not administrator');
        res.status(401).json({msg: "User lacks administrator privileges"})
    }
}