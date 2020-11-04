const express = require("express")
const router = express.Router()
const userData = require("../models/user")
const jwtAuth = require("../middleware/jwtAuth")

// C
router.post("/add", (req, res) => {
    const newUser = {
        name: req.body.name ,
        email: req.body.email ,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    }
    userData.push(newUser)
    return response(res, 200, "Data berhasil ditambahkan", userData)
})

// R
router.get("/all", jwtAuth, (dataLogin, req, res, next) =>{
    const dataList = [{
        name: userData.name,
        email: userData.email,
        username: userData.username,
        role: userData.role,
    }]

    if (dataLogin) {
        return response(res, 200, "Berhasil", userData)
    } else {
        return response(res, 401, "Unauthorized!!", [])
    }
})

// U
router.put("/edit/:username", jwtAuth, (dataLogin, req, res, next) => {
    const x = userData.find( user => { //nyari yang username-nya sesuai sama di data
        return user.username === req.params.username
    })

    if (dataLogin.role === "adm") {
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
        return response(res, 200, "Data berhasil diubah", userData)
    } else if (dataLogin.role === "user" || dataLogin.role === "" ) {
        if (dataLogin.username === req.params.username) {
            if (x) {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    username: x.username,
                    password: req.body.password,
                    role: req.body.role,
                }
                const theX = userData.indexOf(x) //buat nyari index data yang ketemu tadi
                userData.splice(theX, 1, newUser) //buat diganti datanyaaaa
            }
            return response(res, 200, "Data berhasil diubah", userData)
        }
    } else {
        return response(res, 401, "Anda tidak boleh merubah data ini!!", [])
    }

})

// D
router.delete("/del/:username", jwtAuth, (dataLogin, req, res, next) => {
    if (dataLogin === "adm") {
        const x = userData.find( user => { //nyari yang username-nya sesuai sama di data
            return user.username === req.params.username
        })
    
        if (x) {
            const theX = userData.indexOf(x) //buat nyari index data yang ketemu tadi
            userData.splice(theX, 1) //buat diganti datanyaaaa
        }
        return response(res, 200, "Data berhasil dihapus", userData)
    } else {
        return response(res, 401, "Kamu bukan admin!!", [])
    }

})

const response = (res, code, message, data) => {
    res.send({
        code,
        message,
        data
    })
}

module.exports = router