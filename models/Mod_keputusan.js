const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const e = require('express');
const router = express.Router()
const conn = require("../config").pool;
// const uuid = require('uuid')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.post('/', (req, res) => {
    var data = "select namaLengkap, tanggal, nilai, a.status, idUjianH from ujianh as a join c_mhs as b on a.idCmhs=b.idMahasiswa order by a.status desc"
    conn.query(data, (err, result) => {
        if (err) {
            throw err;
            res.json({
                code: 500,
                data: null
            });
        } else {
            res.json({
                code: 200,
                data: result
            });
        }
    })
})

router.post('/getData', (req, res) => {
    var key = {idUjianH: req.body.id}
    var sql = "select a.idUjianH, a.idCmhs, b.namaLengkap, a.nilai from ujianh as a join c_mhs as b on a.idCmhs=b.idMahasiswa where ?"
    conn.query(sql, key, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json({
                code: 200,
                data: result
            });
        }
    })
})

router.post('/lulus', (req, res) => {
    var key = {idUjianH: req.body.v_id}
    var data = {nilai: req.body.v_nilai, status: 2}
    var sql = "update ujianh set ? where ?"
    conn.query(sql, [data,key], (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Failed update data ujian!!"
            });
        } else {
            var keys = {idMahasiswa: req.body.v_idMhs}
            var datas = {status: 7}
            var query = "update c_mhs set ? where ?"
            conn.query(query, [datas, keys], (err) => {
                if (err) {
                    res.json({
                        code: 500,
                        message: "Failed update data mahasiswa!!"
                    });
                } else {
                    res.json({
                        code: 200,
                        message: "Success update data!!"
                    });
                }
            })
        }
    })
})

router.post('/gagal', (req, res) => {
    var key = {idUjianH: req.body.id}
    var data = {status: 3}
    console.log(key)
    var sql = "update ujianh set ? where ?"
    conn.query(sql, [data, key], (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Failed update data ujian!!"
            });
        } else {
            res.json({
                code: 200,
                message: "Success update data!!"
            });
        }
    })
})

module.exports = router