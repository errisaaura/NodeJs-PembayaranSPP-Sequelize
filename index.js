'use strict'
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

// //menghubungkan ke database
const db = require ('./db')
db.connect(error => {
    if(error){
        console.log(error.message)
    }else{
        console.log("Mysql Connected")
    }
})

//spp
const spp = require('./route/spp-route')
app.use("/spp", spp)

//kelas
const kelas = require('./route/kelas-route')
app.use("/kelas", kelas)

//petugas
const petugas = require('./route/petugas-route')
app.use("/petugas", petugas)

//siswa
const siswa = require('./route/siswa-route')
app.use("/siswa", siswa)

//pembayaran
const pembayaran = require('./route/pembayaran-route')
app.use("/pembayaran", pembayaran)





const port = 8000
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
