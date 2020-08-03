const express    = require('express')
const bodyParser = require('body-parser')
const router     = express.Router()
const conn       = require("../config").pool;
// const uuid = require('uuid')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

router.post('/getAutoNumber', (req, res) => {
    var data = "SELECT idMahasiswa from c_mhs";
    conn.query(data, (err, result) => {
        if (err) {
            throw err
        } else {
            res.json({
                data: result
            })
        }
    })
});

router.post('/', (req, res) => {
    var month = new Date().getMonth() + 1
    var data = {
        idMahasiswa: req.body.v_kode,
        namaLengkap: req.body.v_nama,
        jenisKelamin: req.body.v_JK,
        agama: req.body.v_agama,
        tempatLahir: req.body.v_tempatlahir,
        tanggalLahir: req.body.v_tgllahir,
        alamat: req.body.v_alamat,
        telepon: req.body.v_telepon,
        email: req.body.v_email,
        pendidikanTerakhir: req.body.v_pendidikan,
        jurusan: req.body.v_jurusan,
        namaSekolah: req.body.v_namasekolah,
        namaOrangTua: req.body.v_namaortu,
        teleponOrangTua: req.body.v_teleponorangtua,
        pekerjaan: req.body.v_pekerjaan,
        tanggal: new Date().getFullYear() + '-' + month + '-' + new Date().getDate(),
        status: 1
    }
    var pas = req.body.v_tgllahir
    var pass = pas.replace('-', ''); 
    var password = pass.replace('-', '');
    var dataLogin = {nama: req.body.v_nama, email: req.body.v_email, password: password, level: 2, idMahasiswa: req.body.v_kode}
    var sql = "insert into c_mhs set ?"
    var sqlLogin = "insert into login set ?"
    conn.query(sqlLogin, dataLogin, () => {})
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal menambahkan data!!"
            })
        } else {
            res.json({
                code: 200,
                message: "Silahkan Login Menggunakan Email = Email Kamu dan Password = Tanggal Kelahiran Kamu Dengan Format (YYYY-MM-DD)!!"
            })
        }
    })
});

module.exports = router