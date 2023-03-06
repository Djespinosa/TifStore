const express = require("express");
const router = express.Router();
const stocksController = require("../controllers/stocksController");

//******Middlewares******
const uploadFile= require("../middlewares/productMulter");
//const validations = require("../middlewares/validateProducts");
const authMiddleware = require("../middlewares/auth"); 
const logoutMiddleware = require('../middlewares/logout');

//******Routes******

router.get("/adminStock", authMiddleware, logoutMiddleware, stocksController.adminStock);
router.get("/income", authMiddleware, logoutMiddleware, stocksController.income);

// ruta de creación de producto

router.post("/createIncome", authMiddleware, logoutMiddleware, stocksController.incomeForm1);

module.exports = router;
