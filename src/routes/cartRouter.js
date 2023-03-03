const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

//******Middlewares******
const uploadFile= require("../middlewares/productMulter");
const validations = require("../middlewares/validateProducts");
const authMiddleware = require("../middlewares/auth");
const clientAuthMiddleware = require("../middlewares/clientAuth"); 

//******Rutas******

router.get("/", clientAuthMiddleware, cartController.cart);
router.post("/", clientAuthMiddleware, cartController.createSale);

//******Rutas dashboard******

router.get("/dashboard", authMiddleware, cartController.dashboard);

module.exports = router;