const express = require("express");
const router = express.Router();
const stocksController = require("../controllers/stocksController");

//******Middlewares******
const uploadFile= require("../middlewares/productMulter");
//const validations = require("../middlewares/validateProducts");
const authMiddleware = require("../middlewares/auth"); 

//******Routes******

router.get("/adminStock", authMiddleware, stocksController.adminStock);
router.get("/income", authMiddleware, stocksController.income);

// ruta de creación de producto

router.post("/createIncome", authMiddleware, stocksController.incomeForm1);

module.exports = router;
