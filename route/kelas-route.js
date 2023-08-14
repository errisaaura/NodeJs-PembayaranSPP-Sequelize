const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())


const model = require('../models/index')
const kelas = model.kelas

//endpoint untuk menampilkan semua data
app.get("/", async(req,res) => {
    kelas.findAll()
    .then(result => {
        res.json({ 
            data:result,
            
        })
    })
    .catch(error => {
        message: error.message
    })
})

//menampilkan berdasarkan id_kelas
app.get("/:id_kelas", async(req,res) => {
    let param = {
        id_kelas : req.params.id_kelas
    }
    kelas.findOne({where: param})
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

//menambahkan data kelas
app.post("/", async(req,res) => {
    let data = {
        nama_kelas : req.body.nama_kelas,
        kompetensi_keahlian : req.body.kompetensi_keahlian
    }
    kelas.create(data)
    .then(result => {
        res.json({
            message : "Data berhasil ditambahkan",
            data: result
        })
    })
})

//mengedit data kelas
app.put("/:id_kelas", async(req,res)=> {
    let param = {
        id_kelas : req.params.id_kelas
    }
    let data = {
        nama_kelas : req.body.nama_kelas,
        kompetensi_keahlian : req.body.kompetensi_keahlian
    }
    kelas.update(data, {where: param})
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
app.delete("/:id_kelas", async(req,res) => {
    let param = {
        id_kelas : req.params.id_kelas
    }
    kelas.destroy({where:param})
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

module.exports = app