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
    var data = "SELECT * from penguji"
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
        namaPenguji: req.body.v_nama,
        jabatan: req.body.v_jabatan
    }

    var sql = "insert into penguji set ?"
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal menambahkan data!!"
            })
        } else {
            res.json({
                code: 200,
                message: "Berhasil menambahkan data!!!"
            })
        }
    })
});

router.post('/edit', (req, res) => {
    var data = {idPenguji: req.body.id};
    var sql = "SELECT * from penguji where ?"
    conn.query(sql, data, (err, result) => {
        if (err) {
            res.json({code: 500, data: null});
        } else {
            res.json({code: 200, data:result});
        }
    })
})

router.post('/update', (req, res) => {
    var key = {idPenguji: req.body.ve_id};
    var data = {
        namaPenguji: req.body.ve_nama,
        jabatan: req.body.ve_jabatan
    }
    var sql = "UPDATE penguji set ? where ?";
    conn.query(sql, [data, key], (err) => {
        if (err) {
            res.json({code: 500, message: "Gagal mengubah data!!"});
        } else {
            res.json({code: 200, message: "Berhasil mengubah data!!"});
        }
    })
})

router.post('/delete', (req, res) => {
    var data = {idPenguji: req.body.id}
    var sql = "delete from penguji where ?";
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({ code: 500, message: "Gagal menghapus data!!" })
        } else {
            res.json({ code: 200, message: "Berhasil menghapus data!!" })
        }
    })
});

module.exports = router