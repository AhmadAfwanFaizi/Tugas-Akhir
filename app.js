const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path')
const port = 2020
const mysql = require("./config").pool;

// connect ke database
mysql.getConnection((err) => {
    if (err) throw err;
    console.log('Database Connected...')
})

// Set Cookies Session
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 100000
    },
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/", require("./controllers/Client"));
app.use("/client", require("./models/Mod_client"));

app.use("/login", require("./controllers/admin/Login"));
app.use("/Mlogin", require("./models/Mod_login"));

app.use("/home", require("./controllers/admin/Home"));

app.use("/mahasiswa", require("./controllers/admin/Mahasiswa"));
app.use("/Mmahasiswa", require("./models/Mod_mahasiswa"));

app.use("/penguji", require("./controllers/admin/Penguji"));
app.use("/Mpenguji", require("./models/Mod_penguji"));

app.use("/soalUjian", require("./controllers/admin/SoalUjian"));
app.use("/MsoalUjian", require("./models/Mod_soalUjian"));

app.use("/soalTes", require("./controllers/admin/SoalTes"));
app.use("/MsoalTes", require("./models/Mod_soalTes"));

app.use("/pembayaran", require("./controllers/admin/Pembayaran"));
app.use("/Mpembayaran", require("./models/Mod_pembayaran"));

app.use("/jadwal", require("./controllers/admin/Jadwal"));
app.use("/Mjadwal", require("./models/Mod_jadwal"));

app.use("/hasilUjian", require("./controllers/admin/HasilUjian"));
// app.use("/MhasilUjian", require("./models/Mod_hasil_ujian"));

app.use("/keputusan", require("./controllers/admin/Keputusan"));
// app.use("/Mkeputusan", require("./models/Mod_keputusan"));

// mhs side
app.use("/cpembayaran", require("./controllers/Pembayaran"));
app.use("/cjadwal", require("./controllers/Jadwal"));

app.use("/ujian", require("./controllers/Ujian"));
app.use("/Mujian", require("./models/Mod_ujian"));

app.listen(port, () => console.log(`System listening at http://localhost:${port}`))