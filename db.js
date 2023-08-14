const mysql = require("mysql2")

//koneksi
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "framework_spp"
})

module.exports  = db