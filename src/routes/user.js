const express = require("express")
const router = express.Router()
const userData = require("../models/user")
const jwtAuth = require("../middleware/jwtAuth")
const userController = require("../controllers/user")

// R
router.get("/all", jwtAuth, userController.getData)

// U
router.put("/edit/:username", jwtAuth, userController.editUser)

// D
router.delete("/del/:username", jwtAuth, userController.delUser)

module.exports = router