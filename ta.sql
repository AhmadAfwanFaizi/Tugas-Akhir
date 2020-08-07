# Host: localhost  (Version 5.5.5-10.4.11-MariaDB)
# Date: 2020-08-07 14:47:07
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "c_mhs"
#

DROP TABLE IF EXISTS `c_mhs`;
CREATE TABLE `c_mhs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMahasiswa` varchar(6) NOT NULL,
  `namaLengkap` varchar(30) NOT NULL,
  `jenisKelamin` varchar(10) NOT NULL,
  `agama` varchar(10) NOT NULL,
  `tempatLahir` varchar(30) NOT NULL,
  `tanggalLahir` date NOT NULL,
  `alamat` text NOT NULL,
  `telepon` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pendidikanTerakhir` varchar(15) NOT NULL,
  `jurusan` varchar(50) NOT NULL,
  `namaSekolah` varchar(50) NOT NULL,
  `namaOrangTua` varchar(30) NOT NULL,
  `teleponOrangTua` varchar(15) NOT NULL,
  `pekerjaan` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `prodi` varchar(3) DEFAULT NULL,
  `kelas` varchar(10) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

#
# Data for table "c_mhs"
#

INSERT INTO `c_mhs` VALUES (15,'MHS001','Muhammad Sapei','Laki-Laki','Islam','Tangerang','1999-10-08','Bugel, Karawachi, Tangerang-Banten','081276903582','sapei@gmail.com','SMK','TKJ','SMA 01 Tangerang','Dedi','081276903582','PNS','2020-08-06','IK','pagi',1),(16,'MHS002','Muhammad Rapli Fadillah','Laki-Laki','Islam','Tangerang','1996-07-16','Legok, Tangerang-Banten','082176095278','rapli@gmail.com','SMK','TKJ','SMK 13 Legok','Endang','081965438752','Wiraswasta','2020-08-06','IK','pagi',2),(17,'MHS003','Muhammad Hanif Nurcholis','Laki-Laki','Islam','Batu Ceper','1999-07-09','Batu Ceper Tangerang-Banten','081387437829','hanif@gmail.com','SMA','IPA','SMA 02 Tangerang','Yono','081276539076','Karyawan Swasta','2020-08-06','IK','pagi',3),(18,'MHS004','Muhammad Yazid Muchsin','Laki-Laki','Islam','Tangerang','2000-11-08','Rajeg, Tangerang-Banten','081278364738','yasir@gmail.com','SMA','IPS','SMA 13 Jogja','Wicak','081278364738','Pegawai Swasta','2020-08-06','KA','pagi',4),(19,'MHS005','Andi Ali Asworo','Laki-Laki','Islam','Klaten','1999-03-09','Bumi indah, Pasar Kemis, Tangerang-Banten','081936273648','andi@gmail.com','SMK','Otomotif','SMK 08 Klaten','Nurdin','081936273648','Karyawan Swasta','2020-08-06','ABI','malam',5),(20,'MHS006','Muhammad Ali Mustofa','Laki-Laki','Islam','Tangerang','1999-05-08','Pasar Kemis, Tangerang-Banten','081267396528','ali@gmail.com','SMA','IPA','SMA 09 Lampung','Ibrahim','081267396528','Karyawan Swasta','2020-08-06','AP','pagi',6),(21,'MHS007','Habinata','Laki-Laki','Islam','Tangerang','1999-07-09','Jatiuwung, Tangerang-Banten','082176538975','habi@gmail.com','SMA','IPA','SMA 09 Tangerang','Siti','082176538975','Karyawan Swasta','2020-08-06','IK','pagi',6),(22,'MHS008','Muchlis Rifai','Laki-Laki','Islam','Tangerang','1999-11-09','CItra Raya, Tangerang-Banten','081265398725','muchlis@gmail.com','SMK','TKJ','SMK 27 Curug','Ahmad','081265398725','Karyawan Swasta','2020-08-06','IK','pagi',7),(23,'MHS009','Muhammad Maulana Iqbal','Laki-Laki','Islam','Padang','1999-05-09','Cimone, Tangerang-Banten','081254986532','iqbal@gmail.com','SMA','IPA','SMK 01 padang','Andri','081254986532','Karyawan Swasta','2020-08-07','IK','pagi',8);

#
# Structure for table "jadwal"
#

DROP TABLE IF EXISTS `jadwal`;
CREATE TABLE `jadwal` (
  `idJadwal` int(11) NOT NULL AUTO_INCREMENT,
  `idMahasiswa` varchar(6) NOT NULL DEFAULT '',
  `idPenguji` int(11) NOT NULL DEFAULT 0,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  PRIMARY KEY (`idJadwal`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

#
# Data for table "jadwal"
#

INSERT INTO `jadwal` VALUES (12,'MHS004',1,'2020-09-07','01:00:00'),(13,'MHS005',2,'2020-08-10','10:00:00'),(14,'MHS006',3,'2020-08-12','10:00:00'),(15,'MHS007',4,'2020-08-16','10:00:00'),(16,'MHS008',1,'2020-08-25','01:00:00'),(17,'MHS009',2,'2020-08-10','01:00:00');

#
# Structure for table "login"
#

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `idLogin` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `level` varchar(1) NOT NULL,
  `idMahasiswa` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`idLogin`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

#
# Data for table "login"
#

INSERT INTO `login` VALUES (1,'admin','admin@admin.com','admin','1',NULL),(25,'Muhammad Sapei','sapei@gmail.com','19991008','2','MHS001'),(26,'Muhammad Rapli Fadillah','rapli@gmail.com','19960716','2','MHS002'),(27,'Muhammad Hanif Nurcholis','hanif@gmail.com','19990709','2','MHS003'),(28,'Muhammad Yazid Muchsin','yasir@gmail.com','20001108','2','MHS004'),(29,'Andi Ali Asworo','andi@gmail.com','19990309','2','MHS005'),(30,'Muhammad Ali Mustofa','ali@gmail.com','19990508','2','MHS006'),(31,'Habinata','habi@gmail.com','19990709','2','MHS007'),(32,'Muchlis Rifai','muchlis@gmail.com','19991109','2','MHS008'),(33,'Muhammad Maulana Iqbal','iqbal@gmail.com','19990509','2','MHS009');

#
# Structure for table "pembayaran"
#

DROP TABLE IF EXISTS `pembayaran`;
CREATE TABLE `pembayaran` (
  `idPembayaran` int(11) NOT NULL AUTO_INCREMENT,
  `idMahasiswa` varchar(6) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `bukti` varchar(255) DEFAULT NULL,
  `tanggal` date NOT NULL,
  PRIMARY KEY (`idPembayaran`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

#
# Data for table "pembayaran"
#

INSERT INTO `pembayaran` VALUES (38,'MHS002',350000,'2020-8-6-test.png','2020-08-06'),(39,'MHS003',350000,'2020-8-6-test.png','2020-08-06'),(40,'MHS004',350000,'2020-8-6-test.png','2020-08-06'),(41,'MHS005',350000,'2020-8-6-test.png','2020-08-06'),(42,'MHS006',350000,'2020-8-6-test.png','2020-08-06'),(43,'MHS007',350000,'2020-8-6-test.png','2020-08-06'),(44,'MHS008',350000,'2020-8-6-test.png','2020-08-06'),(45,'MHS009',350000,'2020-8-7-test.png','2020-08-07');

#
# Structure for table "penguji"
#

DROP TABLE IF EXISTS `penguji`;
CREATE TABLE `penguji` (
  `idPenguji` int(11) NOT NULL AUTO_INCREMENT,
  `namaPenguji` varchar(30) NOT NULL,
  `jabatan` varchar(30) NOT NULL,
  PRIMARY KEY (`idPenguji`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

#
# Data for table "penguji"
#

INSERT INTO `penguji` VALUES (1,'Dedi Umaedi','Kabid Akademik'),(2,'Siti Hamidah','Kabid Marketing'),(3,'Titim Nurlia','Kabid C&P'),(4,'Dwi Okty','Kabid Keuangan');

#
# Structure for table "soal_tes"
#

DROP TABLE IF EXISTS `soal_tes`;
CREATE TABLE `soal_tes` (
  `idSoalTes` int(11) NOT NULL AUTO_INCREMENT,
  `pertanyaan` text DEFAULT NULL,
  `bagian` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idSoalTes`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

#
# Data for table "soal_tes"
#

INSERT INTO `soal_tes` VALUES (2,'Saya senang belajar mengenal diri sendiri','Intrapersonal'),(3,'Saya bisa memainkan alat musik','Musikal'),(4,'Saya seringkali mendengar lagu atau musik dalam pikiran saya','Musikal'),(5,'Menurut saya, menganggarkan dan mengatur keuangan sendiri itu mudah','Logis-Matematis'),(6,'Saya paling mudah menyelesaikan masalah ketika melakukan sesuatu secara fisik','Fisik-Kinesteti'),(9,'Saya mudah membuat cerita','Linguistik'),(10,'Koordinasi fisik saya selalu bagus','Fisik-Kinesteti'),(11,'Ketika bicara dengan orang, saya cenderungmendengarkan kata-kata yang mereka pergunakan, bukan hanya pada apa yang mereka maksud','Linguistik'),(12,'Saya senang mengisi TTS dan bermain mencari kata atau permainan lain yang menggunakan kata','Linguistik'),(13,'Saya tidak suka hal-hal yang rancu , saya menyukai segala hal yang jelas','Logis-Matematis'),(14,'Saya menyukai teka-teki seperti \'Sudoku\'','Logis-Matematis'),(15,'Saya senang bermeditasi','Intrapersonal'),(16,'Musik sangat penting bagiku','Musikal'),(17,'Saya jago berbohong','Linguistik'),(18,'Saya senang berolahraga atau menari','Fisik-Kinesteti'),(19,'Saya sangat tertarik dengan psikometri (uji kepribadian) dan tes IQ','Intrapersonal'),(20,'Orang yang bertindak irasional mengesalkan saya','Logis-Matematis'),(21,'Saya menyadari bahwa musik yang saya sukai seringkali memiliki basis yang sesuai dengan emosi saya','Musikal'),(22,'Saya orang yang sangat ramah dan saya senangberkumpul dengan orang lain','Interpersonal'),(23,'Saya senang bersikap sistematis dan teliti','Logis-Matematis'),(24,'Saya menganggap grafik dan tabel mudah dimengerti','Spasial-Visual'),(25,'Saya jago melempar dart, batu kerikil di atas air, frisbeem dsb','Fisik-Kinesteti'),(26,'Saya mudah mengingat kutipan kalimat','Linguistik'),(27,'Saya sangat menyukai olahraga adrenalin dan wahana yang menakutkan','Fisik-Kinesteti'),(28,'Jika mau, saya dapat memanipulasi orang','Interpersonal'),(29,'Saya perduli perasaan orang-orang di sekitar saya','Interpersonal'),(30,'Saya mudah mengetahui apakah sesorang menyukai saya atau tidak','Interpersonal'),(31,'Saya mudah bicara dengan orang baru','Interpersonal'),(32,'Saya dapat meramalkan dengan cukup akurat perasaan dan prilaku saya dalam berbagai situasi','Intrapersonal'),(33,'Saya paling menyukai olahraga individual','Intrapersonal'),(34,'Saya menikmati berbagai jenis musik','Musikal'),(35,'Saya selalu mengenali tempat-tempat yang pernah saya datangi, bahkan tempat yang sudah lama tidak saya datangi atau yang saya datangi ketika saya masih kecil.','Spasial-Visual'),(36,'Ketika sedang berkonsentrasi, saya cenderung mencorat-coret/menggambar','Spasial-Visual'),(37,'Rumah saya penuh foto dan lukisan.','Spasial-Visual'),(38,'Saya dapat dengan mudah membayangkan bagaimana terlihatnya suatu objek dari\r\nperspektif lain.','Spasial-Visual');

#
# Structure for table "soal_ujian"
#

DROP TABLE IF EXISTS `soal_ujian`;
CREATE TABLE `soal_ujian` (
  `idSoalUjian` int(11) NOT NULL AUTO_INCREMENT,
  `bagian` int(11) DEFAULT NULL,
  `pertanyaan` text DEFAULT NULL,
  `pgA` varchar(100) DEFAULT NULL,
  `pgB` varchar(100) DEFAULT NULL,
  `pgC` varchar(100) DEFAULT NULL,
  `pgD` varchar(100) DEFAULT NULL,
  `jawaban` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`idSoalUjian`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

#
# Data for table "soal_ujian"
#

INSERT INTO `soal_ujian` VALUES (2,1,'Semua donor harus berbadan sehat. Sebagian donor memiliki golongan darah O, jadi……….','Sebagian orang yang bergolongan darah O dan menjadi donor darah berbadan sehat','Semua donor harus memiliki golongan darah O dan berbadan sehat.','Semua donor darah yang memiliki golongan darah O harus berbadan sehat','Yang berbadan sehat adalah yang memiliki golongan darah O dan menjadi donor.','A'),(3,1,'Murid yang pandai dalam matematika lebih mudah belajar bahasa. Orang yang tinggal di Negara asing lebih lancar berbicara dalam bahasa yang dipakai di Negara tersebut. Tati lancar berbicara dalam bahasa inggris, Jadi :','Mungkin Tati bisu','Mungkin Tati tidak pernah tinggal di luar Negeri','Tidak mungkin Tati pernah tinggal di luar Negeri','Tidak mungkin Tati pandai dalam matematika.','A'),(4,1,'Pengurus koperasi seharusnya berjiwa sosial. Sebagian ketua rukun tetangga pernah menjadi pengurus koperasi. Jadi :','Ketua rukun tetangga itu selalu berjiwa sosial.','Semua orang yang pernah menjadi ketua rukun tetangga itu pengurus koperasi.','Sebagian ketua rukun tetangga seluruhnya berjiwa sosial.','Semua pengurus koperasi berjiwa sosial.','A'),(5,1,'Hanya jika berbakat dan bekerja keras, seorang atlet dapat sukses sebagai atlet profesional. Berikut adalah kesimpulan yang secara logis dapat ditarik dari pernyataan diatas:','Jika seorang atlet berbakat dan bekerja keras, maka ia akan sukses sebagai atlet profesional.','Jika seorang atlet tidak sukses sebagai atlet profesioanl, maka ia tidak berbakat','Jika seorang atlet tidak sukses sebagai atlet profesional, maka ia bukan pekerja keras.','Jika seorang atlet tidak berbakat dan tidak bekerja keras, maka ia tidak akan sukses sebagai atlet p','A'),(6,1,'Sarjana yang lulus dengan predikat cumlaude harus memiliki indeks prestasi di atas 3,5. Beberapa mahasiswa yang menjadi sarjana lulus dengan indeks prestasi di bawah 3.5. Kesimpulan pernyataan di atas adalah :','Semua mahasiswa tidak lulus dengan predikat cumlaude','Semua mahasiswa yang menjadi sarjana lulus dengan predikat cumlaude.','Semua mahasiswa yang menjadi sarja memiliki indeks prestasi di atas 3,5','Beberapa mahasiswa yang menjadi sarjana lulus dengan predikat cumlaude.','A'),(7,2,'1,3,5,7,…','8','9','10','11','B'),(8,2,'A,C,E,G,…','I','J','K','L','B'),(9,2,'3,5,8,12,…','15','16','17','19','B'),(10,2,'A,D,H,M,…','S','T','O','U','B'),(11,2,'B,G,K,N,…','S','R','Q','P','B'),(14,3,'............... tennis every sunday morning.','playing','play','am playing','am play','C'),(15,3,'They wrote everything he said, ..................... they ?','aren\'t','do','did','didn\'t','C'),(16,3,'Alta Mart would offer them a 5% discount if they ............. members of it.','had been','were','are','been','C'),(17,3,'The english think tank team ............ discuss the new concepts.','is','will be','is going to','do','C'),(18,3,'The unemployement rate ............. in recent years.','fell','felt','has fallen','has felt','C');

#
# Structure for table "tb_bagian"
#

DROP TABLE IF EXISTS `tb_bagian`;
CREATE TABLE `tb_bagian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bagian` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

#
# Data for table "tb_bagian"
#

INSERT INTO `tb_bagian` VALUES (1,'Fisik_Kinesteti'),(2,'Interpersonal'),(3,'Intrapersonal'),(4,'Linguistik'),(5,'Logis_Matematis'),(6,'Musikal'),(7,'Spasial_Visual');

#
# Structure for table "tb_nilai"
#

DROP TABLE IF EXISTS `tb_nilai`;
CREATE TABLE `tb_nilai` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_mhs` varchar(10) DEFAULT NULL,
  `id_bg` int(11) DEFAULT NULL,
  `hasil` int(11) DEFAULT NULL COMMENT '									',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

#
# Data for table "tb_nilai"
#


#
# Structure for table "tes"
#

DROP TABLE IF EXISTS `tes`;
CREATE TABLE `tes` (
  `idTes` int(11) NOT NULL AUTO_INCREMENT,
  `idCmhs` varchar(6) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `Fisik_Kinesteti` int(11) DEFAULT NULL,
  `Interpersonal` int(11) DEFAULT NULL,
  `Intrapersonal` int(11) DEFAULT NULL,
  `Linguistik` int(11) DEFAULT NULL,
  `Logis_Matematis` int(11) DEFAULT NULL,
  `Musikal` int(11) DEFAULT NULL,
  `Spasial_Visual` int(11) DEFAULT NULL,
  `hasil` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`idTes`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

#
# Data for table "tes"
#

INSERT INTO `tes` VALUES (4,'MHS009','2020-08-07',11,16,11,14,16,10,10,'Umum');

#
# Structure for table "ujiand"
#

DROP TABLE IF EXISTS `ujiand`;
CREATE TABLE `ujiand` (
  `idUjianD` int(11) NOT NULL AUTO_INCREMENT,
  `idUjianH` char(6) DEFAULT NULL,
  `soalBagian` int(11) DEFAULT NULL,
  `jawabanBenar` int(11) DEFAULT NULL,
  `jawabanSalah` int(11) DEFAULT NULL,
  `jawabanKosong` int(11) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUjianD`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4;

#
# Data for table "ujiand"
#

INSERT INTO `ujiand` VALUES (56,'28',2,3,1,1,60),(57,'28',3,3,1,1,60),(58,'28',1,3,1,1,60),(59,'29',1,4,1,0,80),(60,'29',2,4,1,0,80),(61,'29',3,4,1,0,80),(62,'30',1,5,0,0,100),(63,'30',2,5,0,0,100),(64,'30',3,5,0,0,100),(65,'31',1,4,0,1,80),(66,'31',2,5,0,0,100),(67,'31',3,3,1,1,60);

#
# Structure for table "ujianh"
#

DROP TABLE IF EXISTS `ujianh`;
CREATE TABLE `ujianh` (
  `idUjianH` int(11) NOT NULL AUTO_INCREMENT,
  `idCmhs` varchar(6) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`idUjianH`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

#
# Data for table "ujianh"
#

INSERT INTO `ujianh` VALUES (28,'MHS006','2020-08-06',60,0),(29,'MHS007','2020-08-06',80,3),(30,'MHS008','2020-08-06',100,2),(31,'MHS009','2020-08-07',80,2);
