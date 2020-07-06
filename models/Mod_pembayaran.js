const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const multer = require('multer')
const router = express.Router()
const conn = require("../config").pool;
const uuid = require('uuid')
const {
    time
} = require('console')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/admin/dist/img/uploads/buktipembayaran/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '-' + file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    var fileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (fileTypes.indexOf(file.mimetype) > -1) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //10mb max size
    },
    fileFilter: fileFilter
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.post('/', (req, res) => {
    var data = "SELECT * from pembayaran as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa where status not in (1) order by b.status asc"
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

router.post('/getMhs', (req, res) => {
    var data = "SELECT * from c_mhs where status = 1"
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

router.post('/getMhsCl', (req, res) => {
    var key = req.body.id
    var data = "SELECT * from pembayaran as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa where status not in (1) and b.idMahasiswa = ?"
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

router.post('/saveImg', upload.single("v_fileGbr"), (req, res) => {
    res.json({
        code: 200
    })
});

router.post('/save', (req, res) => {
    var data = {
        idMahasiswa: req.body.v_mahasiswa,
        jumlah: 350000,
        bukti: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() + '-' + req.body.v_namaGbr
    }
    var sql = "insert into pembayaran set ?"
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal menambahkan data!!"
            })
        } else {
            var dat = {status: 2}
            var key = {idMahasiswa: req.body.v_mahasiswa}
            var sqll = "UPDATE c_mhs set ? where ?"
            conn.query(sqll, [dat, key], (err) => {
                if (err) {
                    res.json({
                        code: 500,
                        message: "Gagal update status!!"
                    })
                } else {
                    res.json({
                        code: 200,
                        message: "Berhasil menambahkan data!!"
                    })
                }
            })
        }
    })
})

router.post('/confirm', (req, res) => {
    var key = {
        idMahasiswa: req.body.id
    }
    var data = {
        status: 3
    }
    var sql = "UPDATE c_mhs set ? where ?"
    conn.query(sql, [data, key], (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal mengkonfirmasi data!!"
            })
        } else {
            res.json({
                code: 200,
                message: "Berhasil mengkonfirmasi data!!"
            })
        }
    })
})

router.post('/decline', (req, res) => {
    var key = {
        idPembayaran: req.body.id
    }
    var param = {
        idMahasiswa: req.body.idMahasiswa
    }
    var data = {
        status: 1
    }
    var sql = "UPDATE c_mhs set ? where ?"
    var query = "DELETE from pembayaran where ?"
    conn.query(sql, [data, param], (err) => {})
    conn.query(query, key, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal menolak data!!"
            })
        } else {
            res.json({
                code: 200,
                message: "Berhasil menolak data!!"
            })
        }
    })

})

module.exports = router