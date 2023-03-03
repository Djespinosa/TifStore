const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

//******Middlewares******
const uploadFile = require("../middlewares/userMulter");
const validations = require("../middlewares/validateRegister");
const guestMiddleware = require("../middlewares/guest"); 
const authMiddleware = require("../middlewares/auth");
const clientAuthMiddleware = require("../middlewares/clientAuth"); 

//******Routes******
//addEditUser
// router.get("/login", guestMiddleware, usersController.login);

//login form
router.get("/login", guestMiddleware, usersController.login);

//Edit user
router.get("/addEditUser", authMiddleware, usersController.addEditUser);
router.get("/editUser/:id", authMiddleware, usersController.editUser);
router.put("/editUser/:id", authMiddleware,uploadFile.single("image"), validations, usersController.update);

//Delete User

router.delete("/delete/:id", authMiddleware, usersController.delete);

//login process
router.post("/login", usersController.loginProcess);

//register form
router.get("/register", authMiddleware, usersController.register);
router.get("/clientRegister", usersController.clientRegister);

//register process
router.post("/register", authMiddleware, uploadFile.single("image"), validations, usersController.registerProcess);
router.post("/clientRegister", uploadFile.single("image"), validations, usersController.clientRegisterProcess); 

//profile page
router.get("/profile", clientAuthMiddleware, usersController.profile); 

//logout
router.get("/logout", usersController.logout); 

module.exports = router;

