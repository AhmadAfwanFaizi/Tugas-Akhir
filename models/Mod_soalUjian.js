const express    = require('express')
const session    = require('express-session')
const bodyParser = require('body-parser');
const router     = express.Router()
const conn       = require("../config").pool;
// const uuid = require('uuid')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.post('/', (req, res) => {
    var data = "SELECT * from soal_ujian"
    conn.query(data, (err, result) => {
        if (err) {
            res.json({code: 500, data: null});
        } else {
            res.json({code: 200, data:result});
        }
    })
})

router.post('/save', (req, res) => {
    var data = {
        bagian: req.body.v_bagian,
        pertanyaan: req.body.v_pertanyaan,
        pgA: req.body.v_pga,
        pgB: req.body.v_pgb,
        pgC: req.body.v_pgc,
        pgD: req.body.v_pgd,
        jawaban: req.body.v_jawaban
    }
    var sql = "insert into soal_ujian set ?"
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal menambahkan data!!"
            })
        } else {
            res.json({
                code: 200,
                message: "Berhasil menambahkan data!!"
            })
        }
    })
});

router.post('/edit', (req, res) => {
    var data = {idSoalUjian: req.body.id};
    var sql = "SELECT * FROM soal_ujian WHERE ?";
    conn.query(sql, data, (err, result) => {
        if (err) {
            res.json({code: 500, data: null});
        } else {
            res.json({code: 200, data: result});
        }
    })
})

router.post('/update', (req, res) => {
    var key = {idSoalUjian: req.body.ve_id};
    var data = {
        bagian: req.body.ve_bagian,
        pertanyaan: req.body.ve_pertanyaan,
        pgA: req.body.ve_pga,
        pgB: req.body.ve_pgb,
        pgC: req.body.ve_pgc,
        pgD: req.body.ve_pgd,
        jawaban: req.body.ve_jawaban
    }
    var sql = "UPDATE soal_ujian set ? where ?";
    conn.query(sql, [data, key], (err) => {
        if (err) {
            res.json({code: 500, message: "Gagal mengubah data!!"});
        } else {
            res.json({code: 200, message: "Berhasil mengubah data!!"});
        }
    })
})

router.post('/delete', (req, res) => {
    var data = {idSoalUjian: req.body.id}
    var sql = "delete from soal_ujian where ?";
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({ code: 500, message: "Gagal menghapus data!!" })
        } else {
            res.json({ code: 200, message: "Berhasil menghapus data!!" })
        }
    })
});

module.exports = router