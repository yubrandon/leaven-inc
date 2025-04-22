const { Router } = require("express");
const apiController = require("../controllers/apiController");
const validationController = require("../controllers/validationController");
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
apiRouter.get("/user:id", apiController.getUser);
apiRouter.get("/items", apiController.getItems);
apiRouter.post("/items", (req, res) => apiController.createItem(req,res));
apiRouter.post("/checkout", (req, res) => apiController.createCheckout(req, res));
apiRouter.get("/user/:id/orders", apiController.getOrders);

apiRouter.get("/success", (req, res) => {
    res.status(200).json({message: "Authentication Successful!"});
})
apiRouter.get("/failure", (req, res) => {
    res.status(400).json({message: "Authentication Failed"});
})

module.exports = apiRouter;