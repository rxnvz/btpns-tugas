const express = require("express")
const jwt = require("jsonwebtoken")
const userData = require("../models/user")
const authController = require("../controllers/auth")
// require("dotenv").config()

const router = express.Router()
const key = process.env.JWT_KEY

router.post("/login", authController.login)

router.post("/register", authController.register)

module.exports = router