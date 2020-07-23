const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const {
    setupMaster
} = require('cluster');
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
    var data = "SELECT * from soal_tes where bagian = 'Fisik-Kinesteti'"
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

router.post('/getSoal2', (req, res) => {
    var data = "SELECT * from soal_tes where bagian = 'Interpersonal'"
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

router.post('/getSoal3', (req, res) => {
    var data = "SELECT * from soal_tes where bagian = 'Intrapersonal'"
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

router.post('/getSoal4', (req, res) => {
    var data = "SELECT * from soal_tes where bagian = 'Linguistik'"
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

router.post('/getSoal5', (req, res) => {
    var data = "SELECT * from soal_tes where bagian = 'Logis-Matematis'"
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

router.post('/getSoal6', (req, res) => {
    var data = "SELECT * from soal_tes where bagian = 'Musikal'"
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

router.post('/getSoal7', (req, res) => {
    var data = "SELECT * from soal_tes where bagian = 'Spasial-Visual'"
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
            pg4++
        }
    }
    var gp1 = pg1 * 1
    var gp2 = pg2 * 2
    var gp3 = pg3 * 3
    var gp4 = pg4 * 4
    var hasil = gp1 + gp2 + gp3 + gp4
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, sess, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length) {
                var sqll = "update tes set Fisik_Kinesteti = '"+ hasil +"' where idCmhs = ?"
                conn.query(sqll, sess, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed update data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Succes insert data!!"
                        })
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var data = {
                    idCmhs: sess,
                    tanggal: tgl,
                    Fisik_Kinesteti: hasil
                } 
                var sqqll = "insert into tes set ?"
                conn.query(sqqll, data, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed insert data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Success insert data!!"
                        })
                    }
                })
            }
        }
    })
})

router.post('/add2', (req, res) => {
    var jawaban = req.body.v_jawaban2
    var id = req.body.v_id2
    var baris = req.body.v_row2
    var sess = req.body.v_sess2
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
            pg4++
        }
    }
    var gp1 = pg1 * 1
    var gp2 = pg2 * 2
    var gp3 = pg3 * 3
    var gp4 = pg4 * 4
    var hasil = gp1 + gp2 + gp3 + gp4
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, sess, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length) {
                var sqll = "update tes set Interpersonal = '"+ hasil +"' where idCmhs = ?"
                conn.query(sqll, sess, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed update data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Succes insert data!!"
                        })
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var data = {
                    idCmhs: sess,
                    tanggal: tgl,
                    Interpersonal: hasil
                } 
                var sqqll = "insert into tes set ?"
                conn.query(sqqll, data, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed insert data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Success insert data!!"
                        })
                    }
                })
            }
        }
    })
})

router.post('/add3', (req, res) => {
    var jawaban = req.body.v_jawaban3
    var id = req.body.v_id3
    var baris = req.body.v_row3
    var sess = req.body.v_sess3
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
            pg4++
        }
    }
    var gp1 = pg1 * 1
    var gp2 = pg2 * 2
    var gp3 = pg3 * 3
    var gp4 = pg4 * 4
    var hasil = gp1 + gp2 + gp3 + gp4
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, sess, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length) {
                var sqll = "update tes set Intrapersonal = '"+ hasil +"' where idCmhs = ?"
                conn.query(sqll, sess, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed update data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Succes insert data!!"
                        })
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var data = {
                    idCmhs: sess,
                    tanggal: tgl,
                    Intrapersonal: hasil
                } 
                var sqqll = "insert into tes set ?"
                conn.query(sqqll, data, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed insert data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Success insert data!!"
                        })
                    }
                })
            }
        }
    })
})

router.post('/add4', (req, res) => {
    var jawaban = req.body.v_jawaban4
    var id = req.body.v_id4
    var baris = req.body.v_row4
    var sess = req.body.v_sess4
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
            pg4++
        }
    }
    var gp1 = pg1 * 1
    var gp2 = pg2 * 2
    var gp3 = pg3 * 3
    var gp4 = pg4 * 4
    var hasil = gp1 + gp2 + gp3 + gp4
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, sess, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length) {
                var sqll = "update tes set Linguistik = '"+ hasil +"' where idCmhs = ?"
                conn.query(sqll, sess, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed update data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Succes insert data!!"
                        })
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var data = {
                    idCmhs: sess,
                    tanggal: tgl,
                    Linguistik: hasil
                } 
                var sqqll = "insert into tes set ?"
                conn.query(sqqll, data, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed insert data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Success insert data!!"
                        })
                    }
                })
            }
        }
    })
})

router.post('/add5', (req, res) => {
    var jawaban = req.body.v_jawaban5
    var id = req.body.v_id5
    var baris = req.body.v_row5
    var sess = req.body.v_sess5
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
            pg4++
        }
    }
    var gp1 = pg1 * 1
    var gp2 = pg2 * 2
    var gp3 = pg3 * 3
    var gp4 = pg4 * 4
    var hasil = gp1 + gp2 + gp3 + gp4
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, sess, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length) {
                var sqll = "update tes set Logis_Matematis = '"+ hasil +"' where idCmhs = ?"
                conn.query(sqll, sess, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed update data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Succes insert data!!"
                        })
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var data = {
                    idCmhs: sess,
                    tanggal: tgl,
                    Logis_Matematis: hasil
                } 
                var sqqll = "insert into tes set ?"
                conn.query(sqqll, data, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed insert data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Success insert data!!"
                        })
                    }
                })
            }
        }
    })
})

router.post('/add6', (req, res) => {
    var jawaban = req.body.v_jawaban6
    var id = req.body.v_id6
    var baris = req.body.v_row6
    var sess = req.body.v_sess6
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
            pg4++
        }
    }
    var gp1 = pg1 * 1
    var gp2 = pg2 * 2
    var gp3 = pg3 * 3
    var gp4 = pg4 * 4
    var hasil = gp1 + gp2 + gp3 + gp4
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, sess, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length) {
                var sqll = "update tes set Musikal = '"+ hasil +"' where idCmhs = ?"
                conn.query(sqll, sess, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed update data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Succes insert data!!"
                        })
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var data = {
                    idCmhs: sess,
                    tanggal: tgl,
                    Musikal: hasil
                } 
                var sqqll = "insert into tes set ?"
                conn.query(sqqll, data, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed insert data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Success insert data!!"
                        })
                    }
                })
            }
        }
    })
})

router.post('/add7', (req, res) => {
    var jawaban = req.body.v_jawaban7
    var id = req.body.v_id7
    var baris = req.body.v_row7
    var sess = req.body.v_sess7
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
            pg4++
        }
    }
    var gp1 = pg1 * 1
    var gp2 = pg2 * 2
    var gp3 = pg3 * 3
    var gp4 = pg4 * 4
    var hasil = gp1 + gp2 + gp3 + gp4
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, sess, (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length) {
                var sqll = "update tes set Spasial_Visual = '"+ hasil +"' where idCmhs = ?"
                conn.query(sqll, sess, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed update data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Succes insert data!!"
                        })
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var data = {
                    idCmhs: sess,
                    tanggal: tgl,
                    Spasial_Visual: hasil
                } 
                var sqqll = "insert into tes set ?"
                conn.query(sqqll, data, (err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: "Failed insert data!!"
                        })
                    } else {
                        res.json({
                            code: 200,
                            message: "Success insert data!!"
                        })
                    }
                })
            }
        }
    })
})

router.post('/done', (req, res) => {
    var key = req.body.id
    var sql = "select * from tes where idCmhs = ?"
    conn.query(sql, key, (err, result) => {
        if (err) {
            throw err;
        } else {
            // var array = []
            var Fisik_Kinesteti = ''
            var Interpersonal = ''
            var Intrapersonal = ''
            var Linguistik = ''
            var Logis_Matematis = ''
            var Musikal = ''
            var Spasial_Visual = ''
            result.forEach(acde => {
                // array = [
                //     {
                //         'x': 'Fisik_Kinesteti', 
                //         'y': acde.Fisik_Kinesteti
                //     },
                //     {
                //         'x': 'Interpersonal', 
                //         'y': acde.Interpersonal
                //     },
                //     {
                //         'x': 'Intrapersonal', 
                //         'y': acde.Intrapersonal
                //     },
                //     {
                //         'x': 'Linguistik', 
                //         'y': acde.Linguistik
                //     },
                //     {
                //         'x': 'Logis_Matematis', 
                //         'y': acde.Logis_Matematis
                //     },
                //     {
                //         'x': 'Musikal', 
                //         'y': acde.Musikal
                //     },
                //     {
                //         'x': 'Spasial_Visual', 
                //         'y': acde.Spasial_Visual
                //     }
                // ]
                Fisik_Kinesteti = acde.Fisik_Kinesteti
                Interpersonal = acde.Interpersonal
                Intrapersonal = acde.Intrapersonal
                Linguistik = acde.Linguistik
                Logis_Matematis = acde.Logis_Matematis
                Musikal = acde.Musikal
                Spasial_Visual = acde.Spasial_Visual
            });
            var jadi = ''
            if (Fisik_Kinesteti > Interpersonal && Fisik_Kinesteti > Intrapersonal && Fisik_Kinesteti > Linguistik && Fisik_Kinesteti > Logis_Matematis && Fisik_Kinesteti > Musikal && Fisik_Kinesteti > Spasial_Visual) {
                jadi = "Fisik Kinesteti"
            } else if (Interpersonal > Fisik_Kinesteti && Interpersonal > Intrapersonal && Interpersonal > Linguistik && Interpersonal > Logis_Matematis && Interpersonal > Musikal && Interpersonal > Spasial_Visual) {
                jadi = "Interpersonal"
            } else if (Intrapersonal > Fisik_Kinesteti && Intrapersonal > Interpersonal && Intrapersonal > Linguistik && Intrapersonal > Logis_Matematis && Intrapersonal > Musikal && Intrapersonal > Spasial_Visual) {
                jadi = "Intrapersonal"
            } else if (Linguistik > Fisik_Kinesteti && Linguistik > Interpersonal && Linguistik > Intrapersonal && Linguistik > Logis_Matematis && Linguistik > Musikal && Linguistik > Spasial_Visual) {
                jadi = "Linguistik"
            } else if (Logis_Matematis > Fisik_Kinesteti && Logis_Matematis > Interpersonal && Logis_Matematis > Intrapersonal && Logis_Matematis > Linguistik && Logis_Matematis > Musikal && Logis_Matematis > Spasial_Visual) {
                jadi = "Logis Matematis"
            } else if (Musikal > Fisik_Kinesteti && Musikal > Interpersonal && Musikal > Intrapersonal && Musikal > Linguistik && Musikal > Logis_Matematis && Musikal > Spasial_Visual) {
                jadi = "Musikal"
            } else if (Spasial_Visual > Fisik_Kinesteti && Spasial_Visual > Interpersonal && Spasial_Visual > Intrapersonal && Spasial_Visual > Linguistik && Spasial_Visual > Logis_Matematis && Spasial_Visual > Musikal) {
                jadi = "Spasial Visual"
            } else {
                jadi = "Umum"
            }
            // var asdwe = Math.max.apply(Math, array.map(function(o) { return o.y; }))
            var sqll = "update tes set hasil = '"+ jadi +"' where idCmhs = ?"
            conn.query(sqll, key, (err) => {
                if (err) {
                    res.json({
                        code: 500,
                        message: "Failed insert data!!"
                    })
                } else {
                    var sqql = "update c_mhs set status = 8 where idMahasiswa = ?"
                    conn.query(sqql, key, (err) => {
                        if (err) {
                            res.json({
                                code: 500,
                                message: "Failed update data!!"
                            })
                        } else {
                            res.json({
                                code: 200,
                                message: "Success update data!!"
                            })
                        }
                    })
                }
            })
        }
    })
})

router.post('/getDataTest', (req, res) => {
    var key = req.body.id
    var sql = "select a.idTes, a.hasil, b.namaLengkap from tes as a join c_mhs as b on a.idCmhs=b.idMahasiswa where a.idCmhs = ?"
    conn.query(sql, key, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json({
                code: 200,
                data: result
            })
        }
    })
})

module.exports = router