const express = require("express")
const app = express()
const moment = require("moment")

const model = require('../models/index')
const petugas = model.petugas

// const model = require('../models/index')
const siswa = model.siswa

// const model = require('../models/index')
const pembayaran = model.pembayaran

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//menampilkan data
app.get("/", async(req,res) => {
    pembayaran.findAll({
        include: ["siswa", "petugas"]
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

//menampilkan berdasarkan id petugas
app.get("/:id_petugas", async(req,res) => {
    let param = {
        id_petugas : req.params.id_petugas
    }
    pembayaran.findAll({
        include : ["siswa", "petugas"],
        where:param
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

//menampilkan berdasarkan nisn
app.get("/siswa/:nisn", async(req,res) => {
    let param = {
        nisn : req.params.nisn
    }
    pembayaran.findAll({
        include: ["siswa", "petugas"],
        where: param
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

//menambahkan data pembayaran
app.post("/", async(req,res) => {
    let data = {
        id_petugas : req.body.id_petugas,
        nisn : req.body.nisn,
        tgl_bayar : moment().format("YYYY-MM-DD"),
        bulan_dibayar : req.body.bulan_dibayar,
        tahun_dibayar : req.body.tahun_dibayar,
        id_spp : req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.create(data)
    .then(result => {
        res.json({
            message: "data berhasil ditambahkan",
            data: result
        })
    })
    .catch(error => {
        res.json({
            messsage : error.message
        })
    })
})

app.put("/:id_pembayaran", async(req,res) => {
    let param = {
        id_pembayaran : req.params.id_pembayaran
    }
    let day = new Date()
    let data = {
        id_petugas : req.body.id_petugas,
        nisn : req.body.nisn,
        tgl_bayar : moment().format("YYYY-MM-DD"),
        bulan_dibayar : req.body.bulan_dibayar,
        tahun_dibayar : req.body.tahun_dibayar,
        id_spp : req.body.id_spp,
        jumlah_bayar : req.body.jumlah_bayar
    }
    pembayaran.update(data, {where:param})
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
app.delete("/:id_pembayaran", async(req,res) => {
    let param = {
        id_pembayaran : req.params.id_pembayaran
    }
    pembayaran.destroy({where : param})
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