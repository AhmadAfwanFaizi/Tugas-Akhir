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
    var data = "SELECT * from soal_ujian where bagian = 1"
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
    var data = "SELECT * from soal_ujian where bagian = 2"
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
    var data = "SELECT * from soal_ujian where bagian = 3"
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

router.post('/add1', (req, res) => {
    var benar = 0
    var salah = 0
    var kosong = 0
    var nilai = 0
    var jawaban = req.body.v_jawaban
    var id = req.body.v_id
    var baris = req.body.v_row
    var sess = req.body.v_sess

    for (var i = 0; i < baris; i++) {
        var jwb = jawaban[i]
        if (jwb == null) {
            kosong++;
        } else {
            // var no = id[i]
            // var sql = "select * from soal_ujian where idSoalUjian = '" + no + "' and jawaban = '" + jwb + "'"
            // conn.query(sql, (err, row) => {
            //     if (err) {
            //         throw err;
            //     } else {
            //         if (row.length == 1) {
            //             benar++;
            //             console.log("benar")
            //         } else {
            //             salah++;
            //             console.log("salah")
            //         }
            //     }
            // })
            if (jwb == 'A') {
                benar++;
            } else {
                salah++
            }
        }
    }

    nilai = benar / baris * 100;
    var sql = "select * from ujianh where idCmhs = ?"
    conn.query(sql, sess, (err, ress) => {
        if (err) {
            throw err;
        } else {
            if (ress.length) {
                var key
                ress.forEach(a => {
                    key = a.idUjianH
                });
                var data = {
                    jawabanBenar: benar,
                    jawabanSalah: salah,
                    jawabanKosong: kosong,
                    nilai: nilai
                }
                var sqll = "update ujiand set ? where idUjianH = '" + key + "' and soalBagian = 1"
                conn.query(sqll, data, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        res.json({
                            code: 200,
                            message: "Success mengupdate data!!"
                        });
                    }
                })
            } else {
                var day = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()
                var tgl = year + '-' + month + '-' + day
                var dataa = {
                    idCmhs: sess,
                    tanggal: tgl
                }
                var sqlll = "insert into ujianh set ?"
                conn.query(sqlll, dataa, (err, resss) => {
                    if (err) {
                        throw err;
                    } else {
                        var headId = resss.insertId
                        var dataaa = {
                            idUjianH: headId,
                            soalBagian: 1,
                            jawabanBenar: benar,
                            jawabanSalah: salah,
                            jawabanKosong: kosong,
                            nilai: nilai
                        }
                        var sqllll = "insert into ujiand set ?"
                        conn.query(sqllll, dataaa, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                res.json({
                                    code: 200,
                                    message: "Success menyimpan data!!"
                                });
                            }
                        })
                    }
                })
            }
        }
    })
})

router.post('/add2', (req, res) => {
    var benar = 0
    var salah = 0
    var kosong = 0
    var nilai = 0
    var jawaban = req.body.v_jawaban2
    var id = req.body.v_id2
    var baris = req.body.v_row2
    var sess = req.body.v_sess2

    for (var i = 0; i < baris; i++) {
        var jwb = jawaban[i]
        if (jwb == null) {
            kosong++;
        } else {
            // var no = id[i]
            // var sql = "select * from soal_ujian where idSoalUjian = '" + no + "' and jawaban = '" + jwb + "'"
            // conn.query(sql, (err, row) => {
            //     if (err) {
            //         throw err;
            //     } else {
            //         if (row.length == 1) {
            //             benar++;
            //             console.log("benar")
            //         } else {
            //             salah++;
            //             console.log("salah")
            //         }
            //     }
            // })
            if (jwb == 'B') {
                benar++;
            } else {
                salah++
            }
        }
    }

    nilai = benar / baris * 100;
    var sql = "select * from ujianh where idCmhs = ?"
    conn.query(sql, sess, (err, rees) => {
        if (err) {
            throw err;
        } else {
            var idHead
            rees.forEach(ae => {
                idHead = ae.idUjianH
            })
            var sqql = "select * from ujiand where idUjianH = ? and soalBagian = 2"
            conn.query(sqql, idHead, (err, reees) => {
                if (err) {
                    throw err;
                } else {
                    if (reees.length) {
                        var data = {
                            jawabanBenar: benar,
                            jawabanSalah: salah,
                            jawabanKosong: kosong,
                            nilai: nilai
                        }
                        var sqqql = "update ujiand set ? where idUjianH = '" + idHead + "' and soalBagian = 2"
                        conn.query(sqqql, data, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                res.json({
                                    code: 200,
                                    message: "Success mengupdate data!!"
                                });
                            }
                        })
                    } else {
                        var daata = {
                            idUjianH: idHead,
                            soalBagian: 2,
                            jawabanBenar: benar,
                            jawabanSalah: salah,
                            jawabanKosong: kosong,
                            nilai: nilai
                        }
                        var sqqqql = "insert into ujiand set ?"
                        conn.query(sqqqql, daata, (err) => {
                            if (err) {
                                throw err
                            } else {
                                res.json({
                                    code: 200,
                                    message: "Success menyimpan data!!"
                                });
                            }
                        })
                    }
                }
            })
        }
    })
})

router.post('/add3', (req, res) => {
    var benar = 0
    var salah = 0
    var kosong = 0
    var nilai = 0
    var jawaban = req.body.v_jawaban3
    var id = req.body.v_id3
    var baris = req.body.v_row3
    var sess = req.body.v_sess3

    for (var i = 0; i < baris; i++) {
        var jwb = jawaban[i]
        if (jwb == null) {
            kosong++;
        } else {
            // var no = id[i]
            // var sql = "select * from soal_ujian where idSoalUjian = '" + no + "' and jawaban = '" + jwb + "'"
            // conn.query(sql, (err, row) => {
            //     if (err) {
            //         throw err;
            //     } else {
            //         if (row.length == 1) {
            //             benar++;
            //             console.log("benar")
            //         } else {
            //             salah++;
            //             console.log("salah")
            //         }
            //     }
            // })
            if (jwb == 'C') {
                benar++;
            } else {
                salah++
            }
        }
    }

    nilai = benar / baris * 100;
    var sql = "select * from ujianh where idCmhs = ?"
    conn.query(sql, sess, (err, rees) => {
        if (err) {
            throw err;
        } else {
            var idHead
            rees.forEach(ae => {
                idHead = ae.idUjianH
            })
            var sqql = "select * from ujiand where idUjianH = ? and soalBagian = 3"
            conn.query(sqql, idHead, (err, reees) => {
                if (err) {
                    throw err;
                } else {
                    if (reees.length) {
                        var data = {
                            jawabanBenar: benar,
                            jawabanSalah: salah,
                            jawabanKosong: kosong,
                            nilai: nilai
                        }
                        var sqqql = "update ujiand set ? where idUjianH = '" + idHead + "' and soalBagian = 3"
                        conn.query(sqqql, data, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                res.json({
                                    code: 200,
                                    message: "Success mengupdate data!!"
                                });
                            }
                        })
                    } else {
                        var daata = {
                            idUjianH: idHead,
                            soalBagian: 3,
                            jawabanBenar: benar,
                            jawabanSalah: salah,
                            jawabanKosong: kosong,
                            nilai: nilai
                        }
                        var sqqqql = "insert into ujiand set ?"
                        conn.query(sqqqql, daata, (err) => {
                            if (err) {
                                throw err
                            } else {
                                res.json({
                                    code: 200,
                                    message: "Success menyimpan data!!"
                                });
                            }
                        })
                    }
                }
            })
        }
    })
})

router.post('/done', (req, res) => {
    var key = {
        idMahasiswa: req.body.id
    }
    var data = {
        status: 6
    }
    var sql = "update c_mhs set ? where ?"
    conn.query(sql, [data, key], (err, result) => {
        if (err) {
            res.json({
                code: 500,
                message: "Internal system error!!"
            });
        } else {
            res.json({
                code: 200,
                message: "Data saved!!"
            });
        }
    })
})

module.exports = router