const express = require("express");
const router = express.Router();

const userControllers = require("../../account/controllers/user");

router.post("/login", userControllers.userLogin);
router.get("/get-tasks/:UserId",userControllers.getUserAssignedTask)
router.put("/update-task-status/:taskId",userControllers.updateTaskStatus)

module.exports = router;
