const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const router = express.Router()
const conn = require("../config").pool;
// const uuid = require('uuid')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.post('/', (req, res) => {
    var data = "SELECT a.*, b.namaLengkap, c.namaPenguji from jadwal as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa join penguji as c on a.idPenguji=c.idPenguji order by b.status asc"
    conn.query(data, (err, result) => {
        if (err) {
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

router.post('/getCl', (req, res) => {
    var key = req.body.id
    var data = "SELECT * from jadwal as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa join penguji as c on a.idPenguji=c.idPenguji where b.idMahasiswa = ?"
    conn.query(data, key, (err, result) => {
        if (err) {
            throw err
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

router.post('/getMhs', (req, res) => {
    var data = "SELECT * from c_mhs where status = 3"
    conn.query(data, (err, result) => {
        if (err) {
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

router.post('/getPnj', (req, res) => {
    var data = "SELECT * from penguji"
    conn.query(data, (err, result) => {
        if (err) {
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

router.post('/save', (req, res) => {
    var dataUp = {
        status: 4
    }
    var params = {
        idMahasiswa: req.body.v_mahasiswa
    }
    var data = {
        idMahasiswa: req.body.v_mahasiswa,
        idPenguji: req.body.v_penguji,
        tanggal: req.body.v_tanggal,
        jam: req.body.v_jam
    }
    var sqlUp = "UPDATE c_mhs set ? where ?"
    var sql = "INSERT into jadwal set ?"
    conn.query(sqlUp, [dataUp, params], () => {})
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Berhasil menambahkan data!!"
            })
        } else {
            res.json({
                code: 200,
                message: "Berhasil menambahkan data!!"
            })
        }
    })
})

router.post('/selesai', (req, res) => {
    var key = {
        idMahasiswa: req.body.id
    }
    var data = {
        status: 5
    }
    var sql = "UPDATE c_mhs set ? where ?"
    conn.query(sql, [data, key], (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal menyelesaikan jadwal!!"
            });
        } else {
            res.json({
                code: 200,
                message: "Berhasil menyelesaikan jadwal!!"
            });
        }
    })
})

router.post('/cekSts', (req, res) => {
    var key = {idMahasiswa: req.body.id}
    var data = "SELECT * from c_mhs where ?"
    conn.query(data, key, (err, result) => {
        if (err) {
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

module.exports = router