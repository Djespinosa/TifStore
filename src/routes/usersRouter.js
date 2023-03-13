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

//login
router.get("/login", guestMiddleware, usersController.login);
router.get("/block", guestMiddleware, usersController.block);
router.get("/resetSent", guestMiddleware, usersController.resetSent);
router.get("/reset/:token", usersController.showResetPasswordForm);
router.get("/resetSuccess", usersController.resetSuccess);

//login process
router.post("/login", usersController.loginProcess);
router.post("/unlock", guestMiddleware, usersController.unlock);
router.post("/reset", usersController.resetPassword);

//Edit user
router.get("/addEditUser", authMiddleware, usersController.addEditUser);
router.get("/editUser/:id", authMiddleware, usersController.editUser);
router.put("/editUser/:id", authMiddleware, uploadFile.single("image"), validations, usersController.update);

//Delete User

router.delete("/delete/:id", authMiddleware, usersController.delete);


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

