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
        name: "admin",
        email: "admin@admin.com",
        username: "admin",
        password: "123",
        role: "adm"
    },
    {
        name: "namu",
        email: "namu@gi.com",
        username: "namu",
        password: "namu",
        role: "user"
    },
    {
        name: "nyom",
        email: "nyom@gi.com",
        username: "nyom",
        password: "nyom",
        role: "user"
    },
    {
        name: "rne",
        email: "rne@nam.gi",
        username: "rne",
        password: "rne",
        role: "user"
    },
]

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//Data user
app.get("/data", (req, res) => {
    res.send(userData)
})

//Hapus user
app.delete("/user/:username", (req, res) => {
    userData = userData.filter(user => {
        return user.username !== req.params.username;
    })

    return res.json(userData)
})

//Regis user
app.post("/regis", (req, res) => {
    const newUser = {
        name: req.body.name ,
        email: req.body.email ,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    }

    userData.push(newUser)
    return res.json(userData)
    
})

//Edit User
app.put("/user/:username", (req, res) => {
    const x = userData.find( user => { //nyari yang username-nya sesuai sama di data
        return user.username === req.params.username
    })

    if (x) {
        const newUser = {
            name: req.body.name ,
            email: req.body.email ,
            username: x.username,
            password: req.body.password,
            role: req.body.role,
        }
        const theX = userData.indexOf(x) //buat nyari index data yang ketemu tadi
        userData.splice(theX, 1, newUser) //buat diganti datanyaaaa
    }

    return res.json(userData)
})

// app.post("/login", (req, res) => {
//     console.log("req: ", req.query)
//     res.send({
//         message: "Hello /!!"
//     })
// })

module.exports = app