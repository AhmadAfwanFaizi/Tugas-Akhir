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
    var key = {
        idMahasiswa: req.body.id
    }
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

router.post('/getSoal', (req, res) => {
    var data = "SELECT * from soal_tes"
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

router.post('/add', (req, res) => {
    var jawaban = req.body.v_jawaban
    var id = req.body.v_id
    var baris = req.body.v_row
    var sess = req.body.v_sess
    var pg1 = 0
    var pg2 = 0
    var pg3 = 0
    var pg4 = 0

    for (var i = 0, j = baris; i < j; i++) {
        var jwb = jawaban[i]
        if (jwb == 'A') {
            pg1++
        } else if (jwb == 'B') {
            pg2++
        } else if (jwb == 'C') {
            pg3++
        } else {
            pg6++
        }
    }
    console.log("JAWABAN 1 = " + pg1)
    console.log("JAWABAN 2 = " + pg2)
    console.log("JAWABAN 3 = " + pg3)
    console.log("JAWABAN 4 = " + pg4)
    console.log("JAWABAN 5 = " + pg5)
    console.log("JAWABAN 6 = " + pg6)
    res.json({
        code: 200,
        message: "Succes insert data!!"
    })
})

module.exports = router