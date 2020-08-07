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
    var data = "SELECT * from c_mhs"
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

router.post('/save', (req, res) => {
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
        prodi: req.body.v_prodi,
        kelas: req.body.v_kls,
        status: 1
    }
    var pas = req.body.v_tgllahir
    var pass = pas.replace('-', '');
    var password = pass.replace('-', '');
    var dataLogin = {
        nama: req.body.v_nama,
        email: req.body.v_email,
        password: password,
        level: 2,
        idMahasiswa: req.body.v_kode
    }
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

router.post('/edit', (req, res) => {
    var data = {
        id: req.body.id
    };
    var sql = "SELECT * from c_mhs where ?"
    conn.query(sql, data, (err, result) => {
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

router.post('/update', (req, res) => {
    var key = {
        id: req.body.ve_id
    };
    var data = {
        idMahasiswa: req.body.ve_kode,
        namaLengkap: req.body.ve_nama,
        jenisKelamin: req.body.ve_JK,
        agama: req.body.ve_agama,
        tempatLahir: req.body.ve_tempatlahir,
        tanggalLahir: req.body.ve_tgllahir,
        alamat: req.body.ve_alamat,
        telepon: req.body.ve_telepon,
        email: req.body.ve_email,
        pendidikanTerakhir: req.body.ve_pendidikan,
        jurusan: req.body.ve_jurusan,
        namaSekolah: req.body.ve_namasekolah,
        namaOrangTua: req.body.ve_namaortu,
        teleponOrangTua: req.body.ve_teleponorangtua,
        pekerjaan: req.body.ve_pekerjaan,
        prodi: req.body.ve_prodi,
        kelas: req.body.ve_kls,
    }
    console.log(data);
    var sql = "UPDATE c_mhs set ? where ?";
    conn.query(sql, [data, key], (err) => {
        if (err) {
            throw err;
            res.json({
                code: 500,
                message: "Gagal mengubah data!!"
            });
        } else {
            res.json({
                code: 200,
                message: "Berhasil mengubah data!!"
            });
        }
    })
})

router.post('/delete', (req, res) => {
    var data = {
        id: req.body.id
    }
    var sql = "delete from c_mhs where ?";
    conn.query(sql, data, (err) => {
        if (err) {
            res.json({
                code: 500,
                message: "Gagal menghapus data!!"
            })
        } else {
            res.json({
                code: 200,
                message: "Berhasil menghapus data!!"
            })
        }
    })
});

module.exports = router