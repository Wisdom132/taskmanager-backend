const express = require("express");
const router = express.Router();

const userControllers = require("../../account/controllers/user");

router.post("/login", userControllers.userLogin);

module.exports = router;
