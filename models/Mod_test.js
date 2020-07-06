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

module.exports = router