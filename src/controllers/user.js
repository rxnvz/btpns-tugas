const jwt = require("jsonwebtoken")
const userModel = require("../models/user")
const key = process.env.JWT_KEY

// done
exports.getData = (dataLogin, req, res, next) => {
    try {
        userModel.dataUser((error, userData) => {
            if (error) return res.status(500).send({error})
            console.log(userData)
            return response(res, 200, "Berhasil", userData)
        })
    } catch (error) {
        console.log("ERROR: getData.catch = ");
        return res.status(500).send({error: "Internal Server Error"})
    }

}

// done
exports.editUser = (dataLogin, req, res, next) => {
    const { username } = req.params
    const { alamat, jabatan, password } = req.body

    console.log(alamat, jabatan, password, username);

    try {
        userModel.updateUser(username, alamat, jabatan, password, (error, userData) => {
            if (error) return res.status(500).send({error})
            return response(res, 200, "Data berhasil dirubah", userData)
        })
    } catch (err) {
        console.log("ERROR: editUser.catch = ");
        return res.status(500).send({error: "Internal Server Error"})
    }



    // const x = userData.find( user => { //nyari yang username-nya sesuai sama di data
    //     return user.username === req.params.username
    // })

    // if (dataLogin.role === "adm") {
    //     if (x) {
    //         const newUser = {
    //             name: req.body.name ,
    //             email: req.body.email ,
    //             username: x.username,
    //             password: req.body.password,
    //             role: req.body.role,
    //         }
    //         const theX = userData.indexOf(x) //buat nyari index data yang ketemu tadi
    //         userData.splice(theX, 1, newUser) //buat diganti datanyaaaa
    //     }
    //     return response(res, 200, "Data berhasil diubah", userData)
    // } else if (dataLogin.role === "user" || dataLogin.role === "" ) {
    //     if (dataLogin.username === req.params.username) {
    //         if (x) {
    //             const newUser = {
    //                 name: req.body.name,
    //                 email: req.body.email,
    //                 username: x.username,
    //                 password: req.body.password,
    //                 role: req.body.role,
    //             }
    //             const theX = userData.indexOf(x) //buat nyari index data yang ketemu tadi
    //             userData.splice(theX, 1, newUser) //buat diganti datanyaaaa
    //         }
    //         return response(res, 200, "Data berhasil diubah", userData)
    //     }
    // } else {
    //     return response(res, 401, "Anda tidak boleh merubah data ini!!", [])
    // }
}

//done
exports.delUser = (dataLogin, req, res, next) => {
    const { username } = req.params
    console.log(dataLogin);

    if (dataLogin.role === 1) {
        try {
            userModel.deleteUser(username, (error, userData) => {
                if (error) return res.status(500).send({error})
                return response(res, 200, "Data berhasil di hapus!", userData)
            })
        } catch (error) {
            console.log("ERROR: delUser.catch = ");
            return res.status(500).send({error: "Internal Server Error"})
        }
    } else {
        return response(res, 401, "Kamu bukan admin!!", [])
    }
}

const response = (res, code, message, data) => {
    res.send({
        code,
        message,
        data
    })
}