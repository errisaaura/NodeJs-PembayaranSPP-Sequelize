const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const SECRET_KEY = 'BayarSPP'
const md5 = require("md5")
const auth = require("../auth")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const model = require('../models/index')
const siswa = model.siswa
// const kelas = model.kelas
const spp = model.spp

// const model = require('../models/index')
const pembayaran = model.pembayaran

//menampilkan semua data 
app.get("/", async(req,res) => {
    siswa.findAll({
        include: [ "spp"],
        // include : ["kelas"]
    })
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//menampilkan data berdasarkan id
app.get("/:nisn", async(req,res) => {
    let param = {
        nisn : req.params.nisn
    }
    siswa.findOne({
        include: ["spp"],
        // include : ["kelas"]
        where: param
    })
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

//menambahkan data
app.post("/", async(req,res) => {
    let data = {
        nisn : req.body.nisn,
        nis : req.body.nis,
        nama: req.body.nama,
        id_kelas : req.body.id_kelas,
        alamat : req.body.alamat,
        no_telp : req.body.no_telp,
        id_spp : req.body.id_spp,
        password : md5(req.body.password)
    }
    siswa.create(data)
    .then(result => {
        res.json({
            message : "data berhasil ditambahkan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

//mengedit data 
app.put("/:nisn", async(req,res) => {
    let param = {
        nisn : req.params.nisn
    }
    let data = {
        nis : req.body.nis,
        nama : req.body.nama,
        id_kelas : req.body.id_kelas,
        alamat : req.body.alamat,
        no_telp : req.body.no_telp,
        id_spp : req.body.id_spp,
        password : md5(req.body.password)
    }

    siswa.update(data, {where: param})
    .then(result => {
        res.json({
            message : "data berhasil diupdate"
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

//menghapus data 
app.delete("/:nisn", async(req,res) => {
    let param = {
        nisn : req.params.nisn 
    }

    siswa.destroy({where : param})
    .then(result => {
        pembayaran.destroy({where: param})
    })
    .then(result => {
        res.json({
            message : "data berhasil dihapus"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//login untuk siswa
app.post("/auth", async (req,res) => {
    let param = {
        nisn : req.body.nisn,
        password : md5(req.body.password)
    }

    let result = await siswa.findOne({where : param})
    if(result){
        let payload = JSON.stringify(result)

        //generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data : result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message : "Invalid nisn or password"
        })
    }
})

module.exports = app