const express = require("express")
const jwt = require("jsonwebtoken")
const userData = require("../models/user")
require("dotenv").config()

const router = express.Router()
const key = process.env.JWT_KEY

router.post("/login", (req, res) => {
    const { username, password} = req.body

    userData.filter(user => username === user.username && password === user.password).map(user => {
        const dataUser = {
            username: user.username,
            role: user.role
        }
        const token = jwt.sign(dataUser, key, { expiresIn: '1h' })
        return response(res, 200, "User exist!!", [{ username, token }])
    })
})

router.post("/register", (req, res) =>{
    const newUser = {
        name: req.body.name ,
        email: req.body.email ,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    }
    userData.push(newUser)
    return response(res, 200, "User berhasil ditambahkan", userData)
})

const response = (res, code, message, data) => {
    res.send({
        code,
        message,
        data
    })
}

module.exports = router