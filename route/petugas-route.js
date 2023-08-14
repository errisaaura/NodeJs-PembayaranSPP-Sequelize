const express = require("express")
const bodyParser = require('body-parser');
const app = express()
const md5 = require("md5")
const jwt = require("jsonwebtoken")

const SECRET_KEY = 'BayarSPP'

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const auth = require("../auth")


const model = require('../models/index')
const petugas = model.petugas

//endpoint untuk menampilkan semua data
app.get("/",  async(req,res) => {
    petugas.findAll()
    .then(result => {
        res.json({ 
            data:result,
            
        })
    })
    .catch(error => {
        message: error.message
    })
})

//menampilkan berdasarkan id_petugas
app.get("/:id_petugas", async(req,res) => {
    let param = {
        id_petugas : req.params.id_petugas
    }
    petugas.findOne({where: param})
    .then(result => {
        res.json({
            data:result
        })
    })
    .catch(error => {
        res.json ({
            message : error.message
        })
    })
})

//menambahkan data petugas
app.post("/", async(req,res) => {
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_petugas : req.body.nama_petugas,
        level : req.body.level
    }
    petugas.create(data)
    .then(result => {
        res.json({
            message : "Data berhasil ditambahkan",
            data: result
        })
    })
})

//mengedit data petugas
app.put("/:id_petugas", async(req,res)=> {
    let param = {
        id_petugas : req.params.id_petugas
    }
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_petugas : req.body.nama_petugas,
        level : req.body.level
    }
    petugas.update(data, {where: param})
    .then(result => {
        res.json({
            message : "data berhasil diupdate"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//menghapus data
app.delete("/:id_petugas", async(req,res) => {
    let param = {
        id_petugas : req.params.id_petugas
    }
    petugas.destroy({where:param})
    .then(result => {
        res.json({
            message : "data berhasil dihapus"
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

//login untuk admin
app.post("/admin", async (req,res) => {
    let param = {
        username : req.body.username,
        password : md5(req.body.password),
        level : 'admin'
    }

    let result = await petugas.findOne({where: param})
    if(result){
        let payload = JSON.stringify(result)

        //generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data:result,
            token: token
        })
    }else{
        res.json({
            logged:false,
            message: "Invalid username or password"
        })
    }
})

//login untuk petugas
app.post("/petugas", async (req,res) => {
    let param = {
        username : req.body.username,
        password : md5(req.body.password),
        level : 'petugas'
    }

    let result = await petugas.findOne({where: param})
    if(result){
        let payload = JSON.stringify(result)

        //generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data:result,
            token:token
        })
    }else{
        res.json({
            logged:false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app