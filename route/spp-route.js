const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// const spp = require("../models/index").spp
const model = require('../models/index')
const spp = model.spp

//endpoint untuk menampilkan semua data
app.get("/", async(req,res) => {
    spp.findAll()
    .then(result => {
        res.json({
            
            data:result,
            
        })
    })
    .catch(error => {
        message: error.message
    })
})

//menampilkan berdasarkan id_spp
app.get("/:id_spp", async(req,res) => {
    let param = {
        id_spp : req.params.id_spp
    }
    spp.findOne({where: param})
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

//menambahkan data spp
app.post("/", async(req,res) => {
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.create(data)
    .then(result => {
        res.json({
            message : "Data berhasil ditambahkan",
            data: result
        })
    })
})

//mengedit data spp
app.put("/:id_spp", async(req,res)=> {
    let param = {
        id_spp : req.params.id_spp
    }
    let data = {
        tahun : req.body.tahun,
        nominal : req.body.nominal
    }
    spp.update(data, {where: param})
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
app.delete("/:id_spp", async(req,res) => {
    let param = {
        id_spp : req.params.id_spp
    }
    spp.destroy({where:param})
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