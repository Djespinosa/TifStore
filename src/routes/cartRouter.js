const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const logoutMiddleware = require('../middlewares/logout');

//******Middlewares******
const uploadFile= require("../middlewares/productMulter");
const validations = require("../middlewares/validateProducts");
const authMiddleware = require("../middlewares/auth");
const clientAuthMiddleware = require("../middlewares/clientAuth"); 

//******Rutas******

router.get("/", clientAuthMiddleware, logoutMiddleware, cartController.cart);
router.post("/", clientAuthMiddleware, logoutMiddleware, cartController.createSale);

//******Rutas dashboard******

router.get("/dashboard", authMiddleware, logoutMiddleware, cartController.dashboard);

module.exports = router;