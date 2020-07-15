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
    var email = {
        email: req.body.v_email
    }
    var password = {
        password: req.body.v_password
    }
    var sql = "SELECT * from login where ? and ?"
    conn.query(sql, [email, password], (err, row) => {
        if (err) {
            res.json({
                code: 500,
                message: "Maaf Server Error!"
            });
        } else {
            if (row.length > 0) {
                req.session.user  = 1;
                req.session.email = req.body.v_email;
                req.session.nama  = row[0].nama;
                req.session.idMhs = row[0].idMahasiswa;
                req.session.level = row[0].level;
                req.session.cookie.expires = false;
                req.session.cookie.maxAge = 5 * 60 * 1000;
                res.json({
                    code: 200,
                    message: "Selamat anda berhasil Masuk!",
                    redirect: "/home"
                });
            } else {
                res.json({
                    code: 500,
                    message: "Maaf Username / Password Yang Anda Masukan Salah!"
                });
            }
        }
        res.end();
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.json({
        code: 200,
        message: "Terimkasih, anda telah berhasil keluar...",
        redirect: "/login"
    })
})


// router.post('/editData', (req, res) => {
//     var data = {id: req.body.id}
//     var sql = "SELECT * from nodejs where ?";
//     conn.query(sql, data, (err, result) => {
//         if (err) {
//             res.json({ code: 500, data: null })
//         } else {
//             res.json({ code: 200, data: result })
//         }
//     })
// });

// router.post('/updateData', (req, res) => {
//     var key = {id: req.body.edit_id}
//     var data = {nama: req.body.edit_nama, umur: req.body.edit_umur}
//     var sql = "UPDATE nodejs set ? where ?";
//     conn.query(sql, [data, key], (err, result) => {
//         if (err) {
//             res.json({ code: 500, message: "Gagal mengubah data!!", data: null })
//         } else {
//             res.json({ code: 200, message: "Berhasil mengubah data!!", data: result })
//         }
//     })
// });

// router.post('/deleteData', (req, res) => {
//     var data = {id: req.body.id}
//     var sql = "delete from nodejs where ?";
//     conn.query(sql, data, (err) => {
//         if (err) {
//             res.json({ code: 500, message: "Gagal menghapus data!!" })
//         } else {
//             res.json({ code: 200, message: "Berhasil menghapus data!!" })
//         }
//     })
// });

module.exports = router