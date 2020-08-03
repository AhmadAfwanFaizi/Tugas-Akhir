const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const conn = require("../../config").pool;
const {
  connect
} = require('http2');

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

function generateHeader(doc) {
  doc
    .image("assets/admin/dist/img/logo.jpg", 50, 45, {
      width: 50
    })
    .fillColor("#444444")
    .fontSize(20)
    .text("LP3I Cimone.", 110, 57)
    .fontSize(10)
    .text("Jl. Gatot Subroto KM.2,5 No.1-2 Cimone", 200, 65, {
      align: "right"
    })
    .text("Tangerang, Banten, 10025", 200, 80, {
      align: "right"
    })
    .moveDown();
}

function generateFooter(doc) {
  doc
    .text('Politeknik LP3I Jakarta Kampus Cimone', 20, doc.page.height - 50, {
      lineBreak: false
    });
}

router.get('/', async function (req, res) {
  var id = req.query.id
  conn.query("select b.namaLengkap, b.telepon, b.email, a.idPembayaran, a.jumlah from pembayaran as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa where a.idMahasiswa = '" + id + "'", function (err, result) {
    if (err)
      throw err;
    else
      //console.log(result[0].idPembayaran)
      var data = result[0]

    queryData(data)
  });

  function queryData(data) {
    const invoice = {
      shipping: {
        name: data.namaLengkap,
        phone: data.telepon,
        email: data.email
      },
      items: [{
        nama: data.namaLengkap,
        jumlah: data.jumlah,
        total: data.jumlah
      }],
      subtotal: data.jumlah,
      keterangan: "Lunas",
      kdPembayaran: data.idPembayaran
    };

    function generateCustomerInformation(doc, invoice) {
      doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Bukti Pembayaran", 50, 160);

      generateHr(doc, 185);

      const customerInformationTop = 200;

      doc
        .fontSize(10)
        .text("Kode Pembayaran:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.kdPembayaran, 150, customerInformationTop)
        .font("Helvetica")
        .text("Tanggal Pembayaran:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text("Jumlah Pembayaran:", 50, customerInformationTop + 30)
        .text("Rp. " + invoice.subtotal,
          150,
          customerInformationTop + 30
        )

        .font("Helvetica-Bold")
        .text(invoice.shipping.name, 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.shipping.phone, 300, customerInformationTop + 15)
        .text(
          invoice.shipping.email,
          300,
          customerInformationTop + 30
        )
        .moveDown();

      generateHr(doc, 252);
    }

    function generateInvoiceTable(doc, invoice) {
      let i;
      const invoiceTableTop = 330;

      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        invoiceTableTop,
        "Nama",
        "Jumlah",
        "Total"
      );
      generateHr(doc, invoiceTableTop + 20);
      doc.font("Helvetica");

      for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
          doc,
          position,
          item.nama,
          "Rp. " + item.jumlah,
          "Rp. " + item.total
        );

        generateHr(doc, position + 20);
      }

      const subtotalPosition = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        subtotalPosition,
        "",
        "Subtotal",
        "Rp. " + invoice.subtotal
      );

      const paidToDatePosition = subtotalPosition + 20;
      generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "Keterangan",
        invoice.keterangan
      );

      const duePosition = paidToDatePosition + 25;
      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        duePosition,
        "",
        "Total Yang Dibayarkan",
        "Rp. " + invoice.subtotal
      );
      doc.font("Helvetica");
    }

    function generateTableRow(doc, y, nama, jumlah, total) {
      doc
        .fontSize(10)
        .text(nama, 50, y)
        //   .text(description, 150, y)
        .text(jumlah, 280, y, {
          width: 90,
          align: "right"
        })
        //   .text(quantity, 370, y, { width: 90, align: "right" })
        .text(total, 0, y, {
          align: "right"
        });
    }

    var doc = new PDFDocument({
      size: "A4",
      margin: 50
    });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=Pembayaran.pdf',
        })
        .end(pdfData);
    });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
  }
});

router.get('/kelulusan', (req, res) => {
  var id = req.query.id

  conn.query("Select a.namaLengkap, a.jurusan, (case when (b.status = 3) then 'Gagal' else 'LULUS' end) as keterangan from c_mhs as a join ujianh as b on a.idMahasiswa=b.idCmhs where a.idMahasiswa = '" + id + "'", function (err, result) {
    if (err)
      throw err;
    else
      //console.log(result[0].idPembayaran)
      var data = result[0]

    queryData(data)
  });

  function queryData(data) {
    const invoice = {
      nama: data.namaLengkap,
      jurusan: data.jurusan,
      keterangan: data.keterangan
    };
  
    function generateCustomerInformation(doc, invoice) {
      doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Hasil Ujian Seleksi", 50, 160);
  
      generateHr(doc, 185);
  
      const customerInformationTop = 200;
  
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Tanggal:", 50, customerInformationTop)
        .text("Kepada Yth:", 50, customerInformationTop + 15)
        .text("Perihal:", 50, customerInformationTop + 30)
  
        .font("Helvetica-Bold")
        .text(formatDate(new Date()), 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.nama, 300, customerInformationTop + 15)
        .text("Pengumuman Hasil Ujian Seleksi", 300, customerInformationTop + 30)
        .moveDown();
  
      generateHr(doc, 252);
    }

    function generateText(doc, invoice) {
      const textTop = 270

      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Dengan Hormat", 50, textTop + 15)

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Salam sejahtera kami sampaikan, semoga keselamatan dan kesuksesan selalu menyertai Adik beserta keluarga Aamiin.", 50, textTop + 60, {align: "justify"})

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Sehubungan dengan pelaksanaan tes seleksi masuk Politeknik LP3I Jakarta di Kampus Cimone yang telah berlangsung, maka dengan ini Panita PMB 2020/2021 menyatakan bahwa:", 50, textTop + 100, {align: "justify"})

      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Nama", 130, textTop + 150)
        .text("Prodi", 130, textTop + 170)
        .text("Dinyatakan", 130, textTop + 190)

      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(": " + invoice.nama, 300, textTop + 150)
        .text(": " + invoice.jurusan, 300, textTop + 170)
        .text(": " + invoice.keterangan, 300, textTop + 190)

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Kami ucapkan SELAMAT bergabung di Kampus yang mendidik Generasi Muda untuk berani mandiri sejak dini. Selanjutnya untuk penentuan kelas, kami harapkan agar segera melakukan registrasi ulang Pembayaran Uang Pangkal yang bisa dilakukan dengan pembayaran langsung di Kampus LP3I Cimone atau melalui transfer ke No Rekening Kampus LP3I Cimone. Pembayaran ditunggu paling lambat Satu minggu setelah pengumuman.", 50, textTop + 220, {align: "justify"})

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Demikian informasi ini kami sampaikan. Mohon segera melengkapi dan mengembalikan formulir pendaftaran yang telah diisi. Atas perhatian dan kepercayaannya kami ucapkan terima kasih.", 50, textTop + 315, {align: "justify"})

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Hormat Kami,", 50, textTop + 370, {align: "justify"})

      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Siti Hamidah, SE", 50, textTop + 450, {align: "justify"})

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Kabid, Pemasaran,", 50, textTop + 470, {align: "justify"})
        
    }
  
    var doc = new PDFDocument({
      size: "A4",
      margin: 50
    });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=Surat Kelulusan.pdf',
        })
        .end(pdfData);
    });
  
    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateText(doc, invoice);
    generateFooter(doc);
  
    doc.end();
  }
})

router.get('/pembayaran', (req, res) => {
  var awal = req.query.tglAwal
  var akhir = req.query.tglAkhir
  var sql = "";
  if (awal == 0 && akhir == 0) {
    sql = "select b.namaLengkap, a.tanggal, a.jumlah from pembayaran as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa where b.status >= 3"
  } else {
    if (awal && akhir == 0) {
      sql = "select b.namaLengkap, a.tanggal, a.jumlah from pembayaran as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa where tanggal >= '"+ awal +"' and b.status >= 3"
    } else {
      if (akhir && awal == 0) {
        sql = "select b.namaLengkap, a.tanggal, a.jumlah from pembayaran as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa where tanggal <= '"+ akhir +"' and b.status >= 3"
      } else {
        sql = "select b.namaLengkap, a.tanggal, a.jumlah from pembayaran as a join c_mhs as b on a.idMahasiswa=b.idMahasiswa where a.tanggal between '"+ awal +"' and '"+ akhir +"' and b.status >= 3"
      }
    }
  }
  conn.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      var results = result
      generateData(results)
    }
  })

  function generateData(results) {
    var arr = []
    results.forEach(abc => {
      var obj = {
        "nama": abc.namaLengkap,
        "tanggal": abc.tanggal,
        "status": "Lunas",
        "jumlah": abc.jumlah
      }
      arr.push(obj)
    })
    var data = {
      row: results.length,
      loop: arr
    }

    function generateUserInformation(doc, data) {
      doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Laporan Pembayaran", 50, 160);
  
      generateHr(doc, 185);
  
      const customerInformationTop = 200;
  
      doc
        .fontSize(10)
        .text("Tanggal:", 50, customerInformationTop)
        .text(formatDate(new Date()), 150, customerInformationTop)
        .text("Jumlah Data:", 50, customerInformationTop + 15)
        .text(data.row, 150, customerInformationTop + 15)
        .moveDown();
  
      generateHr(doc, 237);
    }

    function generatePembayaranTable(doc, data) {
      let i;
      const invoiceTableTop = 280;

      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        invoiceTableTop,
        "Nama",
        "Tanggal",
        "Status",
        "Jumlah"
      );
      generateHr(doc, invoiceTableTop + 20);
      doc.font("Helvetica");

      for (i = 0; i < data.loop.length; i++) {
        const loop = data.loop[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
          doc,
          position,
          loop.nama,
          formatDate(loop.tanggal),
          loop.status,
          "Rp. " + loop.jumlah
        );

        generateHr(doc, position + 20);
      }

      const subtotalPosition = invoiceTableTop + (i + 1) * 30;
      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        "Rp. " + data.loop.length * 350000
      );
    }

    function generateTableRow(doc, y, nama, tanggal, status, jumlah) {
      doc
        .fontSize(10)
        .text(nama, 50, y)
        //   .text(description, 150, y)
        .text(tanggal, 280, y, {
          width: 90,
          align: "right"
        })
        .text(status, 370, y, { width: 90, align: "right" })
        .text(jumlah, 0, y, {
          align: "right"
        });
    }
  
    var doc = new PDFDocument({
      size: "A4",
      margin: 50
    });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=Laporan Pembayaran.pdf',
        })
        .end(pdfData);
    });
  
    generateHeader(doc);
    generateUserInformation(doc, data);
    generatePembayaranTable(doc, data);
    generateFooter(doc);
  
    doc.end();
  }
})

router.get('/mahasiswa', (req, res) => {
  var awal = req.query.tglAwal
  var akhir = req.query.tglAkhir
  var sql = "";
  if (awal == 0 && akhir == 0) {
    sql = "select namaLengkap, jenisKelamin, telepon, namaSekolah, jurusan, status from c_mhs"
  } else {
    if (awal && akhir == 0) {
      sql = "select namaLengkap, jenisKelamin, telepon, namaSekolah, jurusan, status from c_mhs where tanggal >= '"+ awal +"'"
    } else {
      if (akhir && awal == 0) {
        sql = "select namaLengkap, jenisKelamin, telepon, namaSekolah, jurusan, status from c_mhs where tanggal <= '"+ akhir +"'"
      } else {
        sql = "select namaLengkap, jenisKelamin, telepon, namaSekolah, jurusan, status from c_mhs where tanggal between '"+ awal +"' and '"+ akhir +"'"
      }
    }
  }

  conn.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      var results = result
      generateData(results)
    }
  })

  function generateData(results){
    var arr = []
    results.forEach(asd => {
      var obj = {
        "nama": asd.namaLengkap,
        "jk": asd.jenisKelamin,
        "telepon": asd.telepon,
        "sekolah": asd.namaSekolah,
        "jurusan": asd.jurusan,
        "status": asd.status
      }
      arr.push(obj)
    })

    var data = {
      row: results.length,
      loop: arr
    }

    function generateUserInformation(doc, data) {
      doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Laporan Calon Mahasiswa", 50, 160);
  
      generateHr(doc, 185);
  
      const customerInformationTop = 200;
  
      doc
        .fontSize(10)
        .text("Tanggal:", 50, customerInformationTop)
        .text(formatDate(new Date()), 150, customerInformationTop)
        .text("Jumlah Data:", 50, customerInformationTop + 15)
        .text(data.row, 150, customerInformationTop + 15)
        .moveDown();
  
      generateHr(doc, 237);
    }

    function generateMahasiswaTable(doc, data) {
      let i;
      const invoiceTableTop = 280;

      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        invoiceTableTop,
        "Nama",
        "Jenis Kelamin",
        "telepon",
        "sekolah",
        "jurusan"
      );
      generateHr(doc, invoiceTableTop + 20);
      doc.font("Helvetica");

      for (i = 0; i < data.loop.length; i++) {
        const loop = data.loop[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
          doc,
          position,
          loop.nama,
          loop.jk,
          loop.telepon,
          loop.sekolah,
          loop.jurusan
        );

        generateHr(doc, position + 20);
      }
    }

    function generateTableRow(doc, y, nama, jk, telepon, sekolah, jurusan) {
      doc
        .fontSize(10)
        .text(nama, 50, y)
        .text(jk, 150, y, {width: 90, align: "center"})
        .text(telepon, 250, y, { width: 90, align: "center" })
        .text(sekolah, 260, y, {align: "center"})
        .text(jurusan, 480, y, {align: "center"})
    }

    var doc = new PDFDocument({
      size: "A4",
      margin: 50
    });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=Laporan Mahasiswa.pdf',
        })
        .end(pdfData);
    });
  
    generateHeader(doc);
    generateUserInformation(doc, data);
    generateMahasiswaTable(doc, data);
    generateFooter(doc);
  
    doc.end();
  }
})

router.get('/ujian', (req, res) => {
  var awal = req.query.tglAwal
  var akhir = req.query.tglAkhir
  var sql = "";
  if (awal == 0 && akhir == 0) {
    sql = "select m1.namaLengkap, a1.tanggal, a1.nilai as total, t1.nilai as bag1, t2.nilai as bag2, t3.nilai as bag3, (case when a1.status = 1 then 'Lulus' when a1.status = 2 then 'Diluluskan' when a1.status = 3 then 'Gagal' end) as status from ujianh as a1 left join (select d1.idUjianH, d1.nilai from ujiand as d1 where d1.soalBagian = 1) t1 on t1.idUjianH=a1.idUjianH left join (select d2.idUjianH, d2.nilai from ujiand as d2 where d2.soalBagian = 2) t2 on t2.idUjianH=a1.idUjianH left join (select d3.idUjianH, d3.nilai from ujiand as d3 where d3.soalBagian = 3) t3 on t3.idUjianH=a1.idUjianH join c_mhs as m1 on m1.idMahasiswa=a1.idCmhs where a1.status > 0"
  } else {
    if (awal && akhir == 0) {
      sql = "select m1.namaLengkap, a1.tanggal, a1.nilai as total, t1.nilai as bag1, t2.nilai as bag2, t3.nilai as bag3, (case when a1.status = 1 then 'Lulus' when a1.status = 2 then 'Diluluskan' when a1.status = 3 then 'Gagal' end) as status from ujianh as a1 left join (select d1.idUjianH, d1.nilai from ujiand as d1 where d1.soalBagian = 1) t1 on t1.idUjianH=a1.idUjianH left join (select d2.idUjianH, d2.nilai from ujiand as d2 where d2.soalBagian = 2) t2 on t2.idUjianH=a1.idUjianH left join (select d3.idUjianH, d3.nilai from ujiand as d3 where d3.soalBagian = 3) t3 on t3.idUjianH=a1.idUjianH join c_mhs as m1 on m1.idMahasiswa=a1.idCmhs where a1.tanggal >= '"+ awal +"' and a1.status > 0"
    } else {
      if (akhir && awal == 0) {
        sql = "select m1.namaLengkap, a1.tanggal, a1.nilai as total, t1.nilai as bag1, t2.nilai as bag2, t3.nilai as bag3, (case when a1.status = 1 then 'Lulus' when a1.status = 2 then 'Diluluskan' when a1.status = 3 then 'Gagal' end) as status from ujianh as a1 left join (select d1.idUjianH, d1.nilai from ujiand as d1 where d1.soalBagian = 1) t1 on t1.idUjianH=a1.idUjianH left join (select d2.idUjianH, d2.nilai from ujiand as d2 where d2.soalBagian = 2) t2 on t2.idUjianH=a1.idUjianH left join (select d3.idUjianH, d3.nilai from ujiand as d3 where d3.soalBagian = 3) t3 on t3.idUjianH=a1.idUjianH join c_mhs as m1 on m1.idMahasiswa=a1.idCmhs where a1.tanggal <= '"+ akhir +"' and a1.status > 0"
      } else {
        sql = "select m1.namaLengkap, a1.tanggal, a1.nilai as total, t1.nilai as bag1, t2.nilai as bag2, t3.nilai as bag3, (case when a1.status = 1 then 'Lulus' when a1.status = 2 then 'Diluluskan' when a1.status = 3 then 'Gagal' end) as status from ujianh as a1 left join (select d1.idUjianH, d1.nilai from ujiand as d1 where d1.soalBagian = 1) t1 on t1.idUjianH=a1.idUjianH left join (select d2.idUjianH, d2.nilai from ujiand as d2 where d2.soalBagian = 2) t2 on t2.idUjianH=a1.idUjianH left join (select d3.idUjianH, d3.nilai from ujiand as d3 where d3.soalBagian = 3) t3 on t3.idUjianH=a1.idUjianH join c_mhs as m1 on m1.idMahasiswa=a1.idCmhs where a1.tanggal between '"+ awal +"' and '"+ akhir +"' and a1.status > 0"
      }
    }
  }

  conn.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      var results = result
      dataGenerate(results)
    }
  })

  function dataGenerate(results) {
    var arr = []
    results.forEach(abc => {
      var obj = {
        "nama": abc.namaLengkap,
        "tanggal": abc.tanggal,
        "nilai": abc.total,
        "bag1": abc.bag1,
        "bag2": abc.bag2,
        "bag3": abc.bag3,
        "status": abc.status, 
      }
      arr.push(obj)
    })
    var data = {
      row: results.length,
      loop: arr
    }

    function generateUserInformation(doc, data) {
      doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Laporan Hasil Ujian", 50, 160);
  
      generateHr(doc, 185);
  
      const customerInformationTop = 200;
  
      doc
        .fontSize(10)
        .text("Tanggal:", 50, customerInformationTop)
        .text(formatDate(new Date()), 150, customerInformationTop)
        .text("Jumlah Data:", 50, customerInformationTop + 15)
        .text(data.row, 150, customerInformationTop + 15)
        .moveDown();
  
      generateHr(doc, 237);
    }

    function generateUjianTable(doc, data) {
      let i;
      const invoiceTableTop = 280;

      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        invoiceTableTop,
        "Nama",
        "Tanggal",
        "Nilai",
        "Bagian 1",
        "Bagian 2",
        "Bagian 3",
        "Keterangan"
      );
      generateHr(doc, invoiceTableTop + 20);
      doc.font("Helvetica");

      for (i = 0; i < data.loop.length; i++) {
        const loop = data.loop[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
          doc,
          position,
          loop.nama,
          formatDate(loop.tanggal),
          loop.nilai,
          loop.bag1,
          loop.bag2,
          loop.bag3,
          loop.status,
        );

        generateHr(doc, position + 20);
      }
    }

    function generateTableRow(doc, y, nama, tanggal, nilai, bag1, bag2, bag3, status) {
      doc
        .fontSize(10)
        .text(nama, 50, y)
        .text(tanggal, 150, y, {width: 90, align: "center"})
        .text(nilai, 205, y, { width: 90, align: "center" })
        .text(bag1, 70, y, {align: "center"})
        .text(bag2, 200, y, {align: "center"})
        .text(bag3, 320, y, {align: "center"})
        .text(status, 480, y, {align: "left"})
    }

    var doc = new PDFDocument({
      size: "A4",
      margin: 50
    });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=Laporan Ujian.pdf',
        })
        .end(pdfData);
    });
  
    generateHeader(doc);
    generateUserInformation(doc, data);
    generateUjianTable(doc, data);
    generateFooter(doc);
  
    doc.end();
  }
})

router.get('/test', (req, res) => {
  var awal = req.query.tglAwal
  var akhir = req.query.tglAkhir
  var sql = "";
  if (awal == 0 && akhir == 0) {
    sql = "select a1.namaLengkap, b1.tanggal, b1.hasil from tes as b1 join c_mhs as a1 on b1.idCmhs=a1.idMahasiswa"
  } else {
    if (awal && akhir == 0) {
      sql = "select a1.namaLengkap, b1.tanggal, b1.hasil from tes as b1 join c_mhs as a1 on b1.idCmhs=a1.idMahasiswa where b1.tanggal >= '"+ awal +"'"
    } else {
      if (akhir && awal == 0) {
        sql = "select a1.namaLengkap, b1.tanggal, b1.hasil from tes as b1 join c_mhs as a1 on b1.idCmhs=a1.idMahasiswa where b1.tanggal <= '"+ akhir +"'"
      } else {
        sql = "select a1.namaLengkap, b1.tanggal, b1.hasil from tes as b1 join c_mhs as a1 on b1.idCmhs=a1.idMahasiswa where b1.tanggal between '"+ awal +"' and '"+ akhir +"'"
      }
    }
  }

  conn.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      var results = result
      generate(results)
    }
  })

  function generate(results) {
    var arr = []
    results.forEach(abc => {
      var obj = {
        "nama": abc.namaLengkap,
        "tanggal": abc.tanggal,
        "hasil": abc.hasil
      }
      arr.push(obj)
    })

    var data = {
      row: results.length,
      loop: arr
    }
    function generateUserInformation(doc, data) {
      doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Laporan Hasil Tes", 50, 160);
  
      generateHr(doc, 185);
  
      const customerInformationTop = 200;
  
      doc
        .fontSize(10)
        .text("Tanggal:", 50, customerInformationTop)
        .text(formatDate(new Date()), 150, customerInformationTop)
        .text("Jumlah Data:", 50, customerInformationTop + 15)
        .text(data.row, 150, customerInformationTop + 15)
        .moveDown();
  
      generateHr(doc, 237);
    }

    function generateTestTable(doc, data) {
      let i;
      const invoiceTableTop = 280;

      doc.font("Helvetica-Bold");
      generateTableRow(
        doc,
        invoiceTableTop,
        "Nama",
        "Tanggal",
        "Hasil"
      );
      generateHr(doc, invoiceTableTop + 20);
      doc.font("Helvetica");

      for (i = 0; i < data.loop.length; i++) {
        const loop = data.loop[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
          doc,
          position,
          loop.nama,
          formatDate(loop.tanggal),
          loop.hasil
        );

        generateHr(doc, position + 20);
      }
    }

    function generateTableRow(doc, y, nama, tanggal, hasil) {
      doc
        .fontSize(10)
        .text(nama, 50, y)
        .text(tanggal, 300, y, {width: 90, align: "center"})
        .text(hasil, 500, y, {align: "left"})
    }

    var doc = new PDFDocument({
      size: "A4",
      margin: 50
    });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
          'Content-Length': Buffer.byteLength(pdfData),
          'Content-Type': 'application/pdf',
          'Content-disposition': 'attachment;filename=Laporan Test.pdf',
        })
        .end(pdfData);
    });
  
    generateHeader(doc);
    generateUserInformation(doc, data);
    generateTestTable(doc, data);
    generateFooter(doc);
  
    doc.end();
  }
})

module.exports = router;