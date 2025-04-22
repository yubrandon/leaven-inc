const { Router } = require("express");
const apiController = require("../controllers/apiController");
const validationController = require("../controllers/validationController");
const isAuth = require("./authMiddleware").isAuth;
const apiRouter = Router();
const passport = require("passport");

apiRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/api/success",
    failureRedirect: "/api/failure"
}));
apiRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
});
apiRouter.post("/register", validationController.validateUserPost);
apiRouter.get("/user:id", isAuth, apiController.getUser);
apiRouter.get("/items", apiController.getItems);
apiRouter.post("/items", (req, res) => apiController.createItem(req,res));
apiRouter.post("/checkout", (req, res) => apiController.createCheckout(req, res));
apiRouter.get("/user/:id/orders", isAuth, apiController.getOrders);

apiRouter.get("/success", (req, res) => {
    res.status(200).json({msg: "Authentication Successful!"});
})
apiRouter.get("/failure", (req, res) => {
    res.status(400).json({msg: "Authentication Failed"});
})

apiRouter.get("/protected", isAuth, (req, res) => {
    res.status(200).json({msg: "protected route reached", userId: req.user.id, userName: req.user.username});
})

module.exports = apiRouter;