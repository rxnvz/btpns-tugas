const express = require("express")
const app = express()
const bodyParser = require('body-parser')

const users = require("./src/routes/user")
const auth = require("./src/routes/auth")

//Ini kalo nganunya di body
app.use(bodyParser.json())
// const jsonParser = bodyParser.json()

//Ini kalo nganunya di params
app.use(bodyParser.urlencoded({ extended: true }))
// const urlencodeParser = bodyParser.urlencoded({ extended: true })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use("/users", users)
app.use("/auth", auth)

// error handler
app.use((req, res, next) => {
    const error = new Error("Error occured!!")
    next(error)
})
app.use((error, req, res, next) => {
    res.status(500).json({
        code: 500,
        message: error.message
    })
})

module.exports = app