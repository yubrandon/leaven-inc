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

}