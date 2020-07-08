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
    var data = "SELECT * from soal_tes"
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
        pertanyaan: req.body.v_pertanyaan,
        bagian: req.body.v_bagian
    }
    var sql = "insert into soal_tes set ?"
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
    var data = {idSoalTes: req.body.id};
    var sql = "SELECT * FROM soal_tes WHERE ?";
    conn.query(sql, data, (err, result) => {
        if (err) {
            res.json({code: 500, data: null});
        } else {
            res.json({code: 200, data: result});
        }
    })
})

router.post('/update', (req, res) => {
    var key = {idSoalTes: req.body.ve_id};
    var data = {
        pertanyaan: req.body.ve_pertanyaan,
        bagian: req.body.ve_bagian
    }
    var sql = "UPDATE soal_tes set ? where ?";
    conn.query(sql, [data, key], (err) => {
        if (err) {
            res.json({code: 500, message: "Gagal mengubah data!!"});
        } else {
            res.json({code: 200, message: "Berhasil mengubah data!!"});
        }
    })
})

router.post('/delete', (req, res) => {
    var data = {idSoalTes: req.body.id}
    var sql = "delete from soal_tes where ?";
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({ code: 500, message: "Gagal menghapus data!!" })
        } else {
            res.json({ code: 200, message: "Berhasil menghapus data!!" })
        }
    })
});

module.exports = router