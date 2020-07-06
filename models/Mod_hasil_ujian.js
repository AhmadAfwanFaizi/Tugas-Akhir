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
    var data = "select m1.namaLengkap, a1.tanggal, a1.nilai as total, t1.nilai as bag1, t2.nilai as bag2, t3.nilai as bag3, a1.status from ujianh as a1 left join (select d1.idUjianH, d1.nilai from ujiand as d1 where d1.soalBagian = 1) t1 on t1.idUjianH=a1.idUjianH left join (select d2.idUjianH, d2.nilai from ujiand as d2 where d2.soalBagian = 2) t2 on t2.idUjianH=a1.idUjianH left join (select d3.idUjianH, d3.nilai from ujiand as d3 where d3.soalBagian = 3) t3 on t3.idUjianH=a1.idUjianH join c_mhs as m1 on m1.idMahasiswa=a1.idCmhs"
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

module.exports = router