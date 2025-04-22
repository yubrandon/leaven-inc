const { Router } = require("express");
const apiController = require("../controllers/apiController");
const apiRouter = Router();

//apiRouter.post("/login");
apiRouter.post("/register", (req, res) => apiController.createUserPost(req, res));
apiRouter.get("/items", apiController.getItems);
apiRouter.post("/items", apiController.postItems);
apiRouter.post("/checkout", apiController.checkoutItems);
apiRouter.get("/user:id", apiController.getUser);
apiRouter.get("/user/:id/orders", apiController.getOrders);


module.exports = apiRouter;