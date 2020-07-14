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
    var data = "select a1.namaLengkap, a2.tanggal, a2.hasil from tes a2 join c_mhs a1 on a2.idCmhs=a1.idMahasiswa"
    conn.query(data, (err, result) => {
        if (err) {
            throw err
        } else {
            res.json({
                code: 200,
                data: result
            });
        }
    })
})

module.exports = router