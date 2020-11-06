const jwt = require("jsonwebtoken")
const userModel = require("../models/user")
const key = process.env.JWT_KEY

exports.login = (req, res) => {
    const { username, password } = req.body
    try {
        userModel.getUser(username, password, (error, userData) => {
            if (error) return res.status(500).send({error})
    
            if(userData.length) {
                const dataUser = {
                    username,
                    role: userData[0].role
                }
                const token = jwt.sign(dataUser, key)
                return response(res, 200, "Selamat datang", [{ username, role:userData[0].role, token }])
            }
            return res.status(401).send({error: "Invalid username or password"})
        })
    } catch (error) {
        console.log("ERROR: contLog.catch = ");
        return res.status(500).send({error: "Internal Server Error"})
    }
}

// done
exports.register = (req, res) => {
    const { name, jenis_kelamin, alamat, email, username, password } = req.body
    try {
        userModel.newUser(name, jenis_kelamin, alamat, email, username, password, (error, userData) => {
            if (error) return res.status(500).send({error})
            return response(res, 200, "Data berhasil ditambahkan", userData)
        })
    } catch (error) {
        console.log("ERROR: register.catch = ");
        return res.status(500).send({error: "Internal Server Error"})
    }
}

const response = (res, code, message, data) => {
    res.send({
        code,
        message,
        data
    })
}
