const http = require("http")
const url = require("url")
const fs = require("fs")
const app = require("./app")

const hostname = "127.0.0.1"
const port = 3001

const server = http.createServer(app)

// const server = http.createServer((req, res) => {
//     switch (req.url) {
//         case "/admin":
//             res.statusCode = 200
//             res.setHeader("Content-Type", "text/plain")
//             res.end("Hello Admin!!")
//             break;
        
//         case "/file":
//             fs.readFile("./test", (err, data) => {
//                 if (err) {
//                     res.statusCode = 500
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Halaman tidak ditemukan.")
//                 } else {
//                     console.log("data: ", data);
//                     res.statusCode = 200
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end(data)
//                 }
//             })
//             break;
        
//         case "/gambar":
//             fs.readFile("./imgs/Littleprince.JPG", (err, data) => {
//                 if (err) {
//                     res.statusCode = 500
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Halaman tidak ditemukan.")
//                 } else {
//                     console.log("data: ", data);
//                     res.statusCode = 200
//                     res.setHeader("Content-Type", "image/jpeg")
//                     res.end(data)
//                 }
//             })
//             break;
//
//         default:
//             break;
//     }
// })

server.listen(port, hostname, () => console.log("Server listening on port " + port))