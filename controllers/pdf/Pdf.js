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
        .text("Pembayaran", 50, 160);

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

// router.get('/pembayaran', (req, res) => {
//   var doc = new PDFDocument({
//     size: "A4",
//     margin: 50
//   });
//   let buffers = [];
//   doc.on('data', buffers.push.bind(buffers));
//   doc.on('end', () => {
//     let pdfData = Buffer.concat(buffers);
//     res.writeHead(200, {
//         'Content-Length': Buffer.byteLength(pdfData),
//         'Content-Type': 'application/pdf',
//         'Content-disposition': 'attachment;filename=Pembayaran.pdf',
//       })
//       .end(pdfData);
//   });

//   generateHeader(doc);
//   generateCustomerInformation(doc, invoice);
//   generateInvoiceTable(doc, invoice);
//   generateFooter(doc);

//   doc.end();
// })

module.exports = router;