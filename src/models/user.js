const conn = require("../config/database")

//select role_name FROM role JOIN user ON id_role=role WHERE username=? AND password=? ORDER BY user.username limit 1
//select * from user where username=? and password=? limit 1

const getUser = (username=null, password=null, cb=()=>{}) => {
    try { 
        conn.query("select * from user where username=? and password=? limit 1",
            [username, password],
            function (error, result, fields) {
                if (error){
                    console.log("ERROR - getUser: " + error);
                    return cb("Internal Server Error", null)
                }
                return cb(null, result)
            });
    } catch (err) {
        console.log("ERROR - catch: " + err);
        return cb("Internal Server Error", null)
    }
}

const dataUser = (cb=()=> {}) => {
    try {
        conn.query("SELECT employee.name name, jabatan.jabatan jabatan, user.username username, role.role_name role FROM employee INNER JOIN jabatan ON employee.jabatan=jabatan.id_jabatan INNER JOIN user ON employee.id_employee=user.id_user INNER JOIN role ON user.role=role.id_role",
            function (error, result, fields) {
                if (error){
                    console.log("ERROR - dataUser: " + error);
                    return cb("Internal Server Error", null)
                }
                return cb(null, result)
            })
    } catch (err) {
        console.log("ERROR - catch: " + err);
        return cb("Internal Server Error", null)
    }
}

const deleteUser = (username=null, cb=()=>{}) => {
    try {
        conn.query("DELETE user, employee FROM user INNER JOIN employee ON employee.id_employee=user.id_user WHERE username=?",
            [username],
            function (error, result, fields) {
                if (error){
                    console.log("ERROR - deleteUser: " + error);
                    return cb("Internal Server Error", null)
                }
                return cb(null, result)
            })
    } catch (err) {
        console.log("ERROR - catch: " + err);
        return cb("Internal Server Error", null)
    }
}

const newUser = (name=null, jenis_kelamin=null, alamat=null, email=null, username=null, password=null, cb=()=>{}) => {
    const qEmp = "INSERT INTO employee VALUE (?, ?, ?, ?, ?)"
    const qUsr = "INSERT INTO user VALUE (?, ?, ?, ?, ?)"
    const iEmp = [null, name, jenis_kelamin, alamat, 3]
    const iUsr = [null, email, username, password, 2]
    try {
        conn.query(qEmp, iEmp, //masukin data ke tabel employee
            function (error, result, fields) {
                if (error){ //kalo gagal
                    console.log("ERROR - : " + error);
                    // return cb("Internal Server Error", null)
                } else { //kalo bener
                    conn.query(qUsr, iUsr, //masuk data ke tabel user
                        function (error, result, fields) {
                            if (error){
                                console.log("ERROR - newUser: " + error);
                                return cb("Internal Server Error", null)
                            }
                            // return cb(null, result)
                        }
                    )
                    return cb(null, result)
                }
            }
        ) 
    } catch (err) {
        console.log("ERROR - catch: " + err);
        return cb("Internal Server Error", null)
    }
}

const updateUser = (username=null, alamat=null, jabatan=null, password=null, cb=()=>{}) => {
    try {
        conn.query("UPDATE employee INNER JOIN user ON employee.id_employee = user.id_user SET employee.alamat=?, employee.jabatan=?, user.password=? WHERE username=?",
            [alamat, jabatan, password, username],
            function (error, result, fields) {
                if (error){
                    console.log("ERROR - updateUser: " + error);
                    return cb("Internal Server Error", null)
                }
                return cb(null, result)
            })
    } catch (err) {
        console.log("ERROR - catch: " + err);
        return cb("Internal Server Error", null)
    }
}

module.exports = { getUser, dataUser, deleteUser, newUser, updateUser }