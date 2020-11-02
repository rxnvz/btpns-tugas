const express = require("express")
const app = express()
const bodyParser = require('body-parser')

//Ini kalo nganunya di body
app.use(bodyParser.json())
// const jsonParser = bodyParser.json()

//Ini kalo nganunya di params
app.use(bodyParser.urlencoded({ extended: false }))
// const urlencodeParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("public"))

let userData = [
    {
        name: "namu",
        email: "namu@gi.com",
        username: "namu",
        password: "namu",
        role: ""
    },
    {
        name: "nyom",
        email: "nyom@gi.com",
        username: "nyom",
        password: "nyom",
        role: ""
    },
]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/data", (req, res) => {
    res.send(userData)
})

// app.use((req, res, next) => {
//     // res.status(200).json({
//     //     message: "Halo :D"
//     // })
//     next()
// })

// app.get("/test", (req, res) => {
//     res.send({
//         message: "Hello /!!"
//     })
// })

// //Edit User
// app.put("/user/:username", (req, res) => {
//     // res.send({
//     //     message: `Hello ${req.params.username} :D`
//     // })

//     const edited = userData.filter()

// })

// // Hapus user
// app.delete("/user/:username", (req, res) => {
//     // res.send({
//     //     message: `Hello ${req.params.username} :D`
//     // })

//     userData = userData.filter(user => {
//         return user.name !== req.params.name;
//     })

//     return res.json(userData)
// })

// app.post("/login", (req, res) => {
//     console.log("req: ", req.query)
//     res.send({
//         message: "Hello /!!"
//     })
// })

// //Regis user
// app.post("/register", (req, res) => {
//     // console.log("req: ", req.body)
//     // res.send({
//     //     message: "Hello /!!"
//     // })

//     const newUser = {
//         name: req.body.name ,
//         email: req.body.email ,
//         username: req.body.username,
//         password: req.body.password,
//     }

//     userData.push(newUser)
//     return res.json(userData)
    
// })

module.exports = app