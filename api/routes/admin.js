const express = require("express");
const router = express.Router();
const admincontroller = require("../controllers/admin");
const roleController = require("../controllers/role");
const statusController = require("../controllers/status");

router.post("/register", admincontroller.registerNewAdmin);
router.post("/login", admincontroller.adminLogin);
router.get("/list-admins", admincontroller.getAllAdmins);
router.post("/register-user", admincontroller.registerNewUser);
router.get("/list-users", admincontroller.listAllUsers);
router.get("/user/:userId", admincontroller.getUserById);

//roles routes
router.post("/create-role", roleController.createNewRole);
router.get("/list-roles", roleController.listAllRoles);
router.delete("/remove-role/:roleId", roleController.deleteRole);

// status routes
router.post("/create-status", statusController.addStatus);
router.get("/list-status", statusController.getAllStatus);
router.delete("/remove-status/:statusId", statusController.deleteStatus);

module.exports = router;
