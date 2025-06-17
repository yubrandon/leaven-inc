const { Router } = require("express");
const apiController = require("../controllers/apiController");
const validationController = require("../controllers/validationController");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;
const apiRouter = Router();
const passport = require("passport");

apiRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/api/login-success",
    failureRedirect: "/api/login-failure"
}));
apiRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        res.redirect("/api/logout-success");
    });
});
apiRouter.post("/register", validationController.validateUserPost);
apiRouter.get("/user/:id", isAuth, apiController.getUser);
apiRouter.get("/items", apiController.getItems);
apiRouter.get("/items/:name", isAuth, isAdmin, apiController.getItem);
apiRouter.post("/items", isAuth, isAdmin, apiController.createItem);
apiRouter.post("/items/:id", isAuth, isAdmin, apiController.editItem);
apiRouter.post("/items/:id/hide", isAuth, isAdmin, apiController.toggleItem);
//apiRouter.post("/items/:id/delete", isAuth, isAdmin, apiController.deleteItem);
apiRouter.get("/orders", isAuth, isAdmin, apiController.getOrders);
apiRouter.post("/orders", isAuth, apiController.createOrder);
apiRouter.get("/orders/:id", isAuth, apiController.getUserOrders);
apiRouter.post("/orders/:id", isAuth, isAdmin, apiController.updateOrder);

apiRouter.get("/login-success", (req, res) => {
    if(!req.user) {
        return res.status(401).json({msg: "Not authenticated."});
    }
    console.log('successful login');
    res.status(200).json({
        msg: "Authentication Successful!", 
        userId: req.user.id, 
        userName: req.user.username, 
        admin: req.user.admin});
})
apiRouter.get("/login-failure", (req, res) => {
    console.log('failed login');
    res.status(400).json({msg: "Login failed! Check your username or password!"});
})
apiRouter.get("/logout-success", (req, res) => {
    res.status(200).json({msg: "Logout Successful!"});
})

apiRouter.get("/protected", isAuth, (req, res) => {
    res.status(200).json({msg: "protected route reached", userId: req.user.id, userName: req.user.username});
})

module.exports = apiRouter;