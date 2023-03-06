const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

//******Middlewares******
const uploadFile= require("../middlewares/productMulter");
const validations = require("../middlewares/validateProducts");
const authMiddleware = require("../middlewares/auth");
const logoutMiddleware = require('../middlewares/logout');


//******Rutas******

router.get("/detail", productsController.detail);
router.get("/adminProductUser", authMiddleware,  logoutMiddleware, productsController.adminProductUser);
router.get("/addeditProduct", authMiddleware, logoutMiddleware, productsController.addEditProduct);
// ruta de creación de producto
router.get("/addProduct", authMiddleware, logoutMiddleware, productsController.addProduct);
router.post("/createProduct", authMiddleware, logoutMiddleware, uploadFile.single("image"), validations, productsController.create);

// rutas de edición de productos
router.get("/editProduct/:id", authMiddleware, logoutMiddleware, productsController.editProduct);
router.put("/editProduct/:id", authMiddleware, logoutMiddleware, uploadFile.single("image"), validations, productsController.update);

//ruta para eliminar producto
router.delete("/delete/:id", authMiddleware, logoutMiddleware, productsController.delete);

router.get("/product", productsController.addEditProduct);
router.get("/products-list/:product", productsController.products);
router.get("/detail/:id", productsController.detail);

module.exports = router;
