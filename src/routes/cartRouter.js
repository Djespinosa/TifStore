const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

//******Middlewares******
const uploadFile= require("../middlewares/productMulter");
const validations = require("../middlewares/validateProducts");
const authMiddleware = require("../middlewares/auth"); 

//******Rutas******

router.get("/", authMiddleware, cartController.cart);
router.post("/", authMiddleware, cartController.createSale);

//******Rutas dashboard******

router.get("/dashboard", cartController.dashboard);

module.exports = router;