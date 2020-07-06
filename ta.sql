-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2020 at 11:44 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ta`
--

-- --------------------------------------------------------

--
-- Table structure for table `c_mhs`
--

CREATE TABLE `c_mhs` (
  `id` int(11) NOT NULL,
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
  `status` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `c_mhs`
--

INSERT INTO `c_mhs` (`id`, `idMahasiswa`, `namaLengkap`, `jenisKelamin`, `agama`, `tempatLahir`, `tanggalLahir`, `alamat`, `telepon`, `email`, `pendidikanTerakhir`, `jurusan`, `namaSekolah`, `namaOrangTua`, `teleponOrangTua`, `pekerjaan`, `status`) VALUES
(1, 'MHS001', 'Barley Indra Malik akbar', 'Laki-Laki', 'Islam', 'Baturaja', '1996-10-06', 'Jl. arwana 3 blok S no. 10 baturaja permai, ogan komering ulu, sumatera selatan', '081315127362', 'barley.barley@gmail.com', 'SMA/SMK', 'TKJ', 'SMK YADIKA Baturaja', 'Juanah', '082135628760', 'Wiraswasta', 7),
(2, 'MHS002', 'Erwin Pradita', 'Laki-Laki', 'Islam', 'Tangerang', '1994-03-02', 'Alam Sutera', '082154686523', 'erwin@gmail.com', 'Sarjana', 'MI', 'Sekolah Alam Sutera', 'Pradita', '08265485321', 'IT', 1),
(3, 'MHS003', 'rafli fadilah', 'Laki-Laki', 'Islam', 'Curug', '1996-11-12', 'PLP Curug Tangerang Banten', '0987654321', 'rapli@email.com', 'SMA/SMK', 'TKJ', 'SMK 1 Tangerang', 'Om Boy', '1234567890', 'Wirausaha', 4),
(4, 'MHS004', 'M. Fajar Fadillah', 'Laki-Laki', 'Islam', 'Kota Bumi', '1998-06-16', 'Kota Bumi Pasar Kemis Tangerang', '1234567890', 'fadil@gmail.com', 'SMA/SMK', 'Multimedia', 'SMK 5 Tangerang', 'jarwo', '0987654321', 'pebisnis tangguh', 1),
(5, 'MHS005', 'adeline pujiarty', 'Perempuan', 'Islam', 'Baturaja', '1990-10-26', 'Gading Serpong tangerang selatan', '1234567890', 'adel@gmail.com', 'Diploma', 'AP', 'Politeknik LP3I Jakarta Kampus Cimone', 'juanah', '1234567890', 'wiraswasta', 3),
(6, 'MHS006', 'Nofi Cahyono', 'Laki-Laki', 'Islam', 'Tangerang', '2020-03-11', 'Cimone', '0987654321', 'cahyo@gmail.com', 'SMA/SMK', 'TKJ', 'SMK 1 Tangernag', 'gatau', '1234567890', 'PNS', 7),
(7, 'MHS007', 'Yusuf', 'Laki-Laki', 'Islam', 'Kartamulia', '1995-07-13', 'Plaju', '1234567890123', 'yusuf@gmail.com', 'SMA/SMK', 'IPS', 'SMA 1 PLG', 'Firman', '12345676543', 'PNS', 6),
(8, 'MHS008', 'Janet', 'Laki-Laki', 'Islam', 'Prabu', '1998-06-15', 'Plaju', '1234567890123', 'janet@gmail.com', 'SMA/SMK', 'APS', 'SMA 1 PRABU', 'juhai', '12345687654', 'PNS', 2),
(9, 'MHS009', 'Intang Citra Amanda', 'Perempuan', 'Islam', 'Tangerang', '1999-06-15', 'Jl. Gatot Subroto KM. 2.5 No. 1-2, Cimone, Karawaci, RT.002/RW.002, Kota Tangerang, Banten 15114', '0215648523', 'intang@gmail.com', 'SMA/SMK', 'IPA', 'Sma Keren Kali', 'Intang', '021564897', 'Mother of The home stairs', 6),
(10, 'MHS010', 'Dedi Umaedi', 'Laki-Laki', 'Islam', 'Tangerang', '1991-01-29', 'Pasir Bolang', '02135484984', 'umaedi@gmail.com', 'Sarjana', 'Ekonomi', 'Poltek Bekasi', 'Umaedi', '021564897', 'Kabid Akd', 1),
(12, 'MHS012', 'M. Sapei', 'Laki-Laki', 'Islam', 'Tangerang', '2000-01-31', 'Bugel', '0813455874562', 'pei@gmail.com', 'SMA/SMK', 'TKJ', 'SMK Bugel Indah', 'Asep', '081254685471', 'PNS', 1);

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `idJadwal` int(11) NOT NULL,
  `idMahasiswa` varchar(6) NOT NULL DEFAULT '',
  `idPenguji` int(11) NOT NULL DEFAULT '0',
  `tanggal` date NOT NULL,
  `jam` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`idJadwal`, `idMahasiswa`, `idPenguji`, `tanggal`, `jam`) VALUES
(6, 'MHS001', 1, '2020-03-06', '10:00:00'),
(7, 'MHS003', 3, '2020-03-06', '13:00:00'),
(8, 'MHS006', 1, '2020-03-11', '11:00:00'),
(9, 'MHS007', 2, '2020-04-04', '10:00:00'),
(10, 'MHS009', 2, '2020-06-25', '17:29:00');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `idLogin` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `level` varchar(1) NOT NULL,
  `idMahasiswa` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`idLogin`, `nama`, `email`, `password`, `level`, `idMahasiswa`) VALUES
(1, 'admin', 'admin@admin.com', 'admin', '1', NULL),
(7, 'Barley Indra Malik akbar', 'barley.barley@gmail.com', '19961006', '2', 'MHS001'),
(12, 'rafli fadilah', 'rapli@email.com', '19961112', '2', 'MHS003'),
(13, 'M. Fajar Fadillah', 'fadil@gmail.com', '19980616', '2', 'MHS004'),
(14, 'adeline pujiarty', 'adel@gmail.com', '19901025', '2', 'MHS005'),
(15, 'Nofi Cahyono', 'cahyo@gmail.com', '20200311', '2', 'MHS006'),
(16, 'Yusuf', 'yusuf@gmail.com', '19950713', '2', 'MHS007'),
(17, 'Janet', 'janet@gmail.com', '19980615', '2', 'MHS008'),
(18, 'Intang Citra Amanda', 'intang@gmail.com', '19990615', '2', 'MHS009'),
(20, 'Dedi Umaedi', 'umaedi@gmail.com', '19910129', '2', 'MHS011'),
(21, 'M. Sapei', 'pei@gmail.com', '20000131', '2', 'MHS012'),
(22, 'Erwin Pradita', 'erwin@gmail.com', '19940302', '2', 'MHS002');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `idPembayaran` int(11) NOT NULL,
  `idMahasiswa` varchar(6) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `bukti` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`idPembayaran`, `idMahasiswa`, `jumlah`, `bukti`) VALUES
(15, 'MHS001', 350000, 'MHS001buktiPembayaran.png'),
(16, 'MHS003', 350000, 'MHS003buktiPembayaran.png'),
(19, 'MHS005', 350000, 'MHS005buktiPembayaran.png'),
(21, 'MHS006', 350000, 'MHS006buktiPembayaran.png'),
(23, 'MHS007', 350000, 'MHS007buktiPembayaran.png'),
(29, 'MHS008', 350000, '2020-5-25-bendera.png'),
(31, 'MHS009', 350000, '2020-5-25-bendera.png');

-- --------------------------------------------------------

--
-- Table structure for table `penguji`
--

CREATE TABLE `penguji` (
  `idPenguji` int(11) NOT NULL,
  `namaPenguji` varchar(30) NOT NULL,
  `jabatan` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penguji`
--

INSERT INTO `penguji` (`idPenguji`, `namaPenguji`, `jabatan`) VALUES
(1, 'Dedi Umaedi', 'Kabid Akademik'),
(2, 'Siti Hamidah', 'Kabid Marketing'),
(3, 'Titim Nurlia', 'Kabid C&P'),
(4, 'Dwi Okty', 'Kabid Keuangan');

-- --------------------------------------------------------

--
-- Table structure for table `soal_tes`
--

CREATE TABLE `soal_tes` (
  `idSoalTes` int(11) NOT NULL,
  `pertanyaan` text,
  `pg1` varchar(100) DEFAULT NULL,
  `pg2` varchar(100) DEFAULT NULL,
  `pg3` varchar(100) DEFAULT NULL,
  `pg4` varchar(100) DEFAULT NULL,
  `pg5` varchar(100) DEFAULT NULL,
  `pg6` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soal_tes`
--

INSERT INTO `soal_tes` (`idSoalTes`, `pertanyaan`, `pg1`, `pg2`, `pg3`, `pg4`, `pg5`, `pg6`) VALUES
(2, 'Apa yang akan kamu lakukan disaat bosan?', 'Membaca buku', 'Membaca komik', 'Membaca novel', 'Membaca berita', 'Membaca jurnal', 'Membaca pikiran orang'),
(3, 'Apa yang akan kamu lakukan disaat stress?', 'Merokok', 'Olahraga', 'Mandi', 'Makan', 'Jalan', 'Tidur'),
(4, 'Pilih olahraga kesukaan mu?', 'sepak bola', 'futsal', 'voli', 'tenis', 'bulu tangkis', 'renang'),
(5, 'Pilih game kesukaan mu?', 'Mobile legend', 'PUBG', 'FF', 'CODT', 'Candy Crush saga', '8 ball'),
(6, 'presiden terbaik menurut kamu?', 'Joko Widodo', 'Susilo Bambang Yudhoyono', 'Megawati', 'Abdurahman Wahid', 'Habibie', 'Soeharto');

-- --------------------------------------------------------

--
-- Table structure for table `soal_ujian`
--

CREATE TABLE `soal_ujian` (
  `idSoalUjian` int(11) NOT NULL,
  `bagian` int(11) DEFAULT NULL,
  `pertanyaan` text,
  `pgA` varchar(100) DEFAULT NULL,
  `pgB` varchar(100) DEFAULT NULL,
  `pgC` varchar(100) DEFAULT NULL,
  `pgD` varchar(100) DEFAULT NULL,
  `jawaban` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soal_ujian`
--

INSERT INTO `soal_ujian` (`idSoalUjian`, `bagian`, `pertanyaan`, `pgA`, `pgB`, `pgC`, `pgD`, `jawaban`) VALUES
(2, 1, 'Semua donor harus berbadan sehat. Sebagian donor memiliki golongan darah O, jadi……….', 'Sebagian orang yang bergolongan darah O dan menjadi donor darah berbadan sehat', 'Semua donor harus memiliki golongan darah O dan berbadan sehat.', 'Semua donor darah yang memiliki golongan darah O harus berbadan sehat', 'Yang berbadan sehat adalah yang memiliki golongan darah O dan menjadi donor.', 'A'),
(3, 1, 'Murid yang pandai dalam matematika lebih mudah belajar bahasa. Orang yang tinggal di Negara asing lebih lancar berbicara dalam bahasa yang dipakai di Negara tersebut. Tati lancar berbicara dalam bahasa inggris, Jadi :', 'Mungkin Tati bisu', 'Mungkin Tati tidak pernah tinggal di luar Negeri', 'Tidak mungkin Tati pernah tinggal di luar Negeri', 'Tidak mungkin Tati pandai dalam matematika.', 'A'),
(4, 1, 'Pengurus koperasi seharusnya berjiwa sosial. Sebagian ketua rukun tetangga pernah menjadi pengurus koperasi. Jadi :', 'Ketua rukun tetangga itu selalu berjiwa sosial.', 'Semua orang yang pernah menjadi ketua rukun tetangga itu pengurus koperasi.', 'Sebagian ketua rukun tetangga seluruhnya berjiwa sosial.', 'Semua pengurus koperasi berjiwa sosial.', 'A'),
(5, 1, 'Hanya jika berbakat dan bekerja keras, seorang atlet dapat sukses sebagai atlet profesional. Berikut adalah kesimpulan yang secara logis dapat ditarik dari pernyataan diatas:', 'Jika seorang atlet berbakat dan bekerja keras, maka ia akan sukses sebagai atlet profesional.', 'Jika seorang atlet tidak sukses sebagai atlet profesioanl, maka ia tidak berbakat', 'Jika seorang atlet tidak sukses sebagai atlet profesional, maka ia bukan pekerja keras.', 'Jika seorang atlet tidak berbakat dan tidak bekerja keras, maka ia tidak akan sukses sebagai atlet p', 'A'),
(6, 1, 'Sarjana yang lulus dengan predikat cumlaude harus memiliki indeks prestasi di atas 3,5. Beberapa mahasiswa yang menjadi sarjana lulus dengan indeks prestasi di bawah 3.5. Kesimpulan pernyataan di atas adalah :', 'Semua mahasiswa tidak lulus dengan predikat cumlaude', 'Semua mahasiswa yang menjadi sarjana lulus dengan predikat cumlaude.', 'Semua mahasiswa yang menjadi sarja memiliki indeks prestasi di atas 3,5', 'Beberapa mahasiswa yang menjadi sarjana lulus dengan predikat cumlaude.', 'A'),
(7, 2, '1,3,5,7,…', '8', '9', '10', '11', 'B'),
(8, 2, 'A,C,E,G,…', 'I', 'J', 'K', 'L', 'B'),
(9, 2, '3,5,8,12,…', '15', '16', '17', '19', 'B'),
(10, 2, 'A,D,H,M,…', 'S', 'T', 'O', 'U', 'B'),
(11, 2, 'B,G,K,N,…', 'S', 'R', 'Q', 'P', 'B'),
(14, 3, 'what?', 'no', 'yes', 'if', 'else', 'C'),
(15, 3, 'when', 'no', 'yes', 'if', 'else', 'C'),
(16, 3, 'who?', 'no', 'yes', 'if', 'else', 'C');

-- --------------------------------------------------------

--
-- Table structure for table `ujiand`
--

CREATE TABLE `ujiand` (
  `idUjianD` int(11) NOT NULL,
  `idUjianH` char(6) DEFAULT NULL,
  `soalBagian` int(11) DEFAULT NULL,
  `jawabanBenar` int(11) DEFAULT NULL,
  `jawabanSalah` int(11) DEFAULT NULL,
  `jawabanKosong` int(11) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ujiand`
--

INSERT INTO `ujiand` (`idUjianD`, `idUjianH`, `soalBagian`, `jawabanBenar`, `jawabanSalah`, `jawabanKosong`, `nilai`) VALUES
(1, '3', 1, 3, 1, 1, 60),
(3, '3', 2, 2, 3, 0, 40),
(4, '3', 3, 2, 1, 0, 67),
(5, '4', 1, 1, 3, 1, 20),
(6, '4', 2, 1, 3, 1, 20),
(7, '4', 3, 1, 1, 1, 33),
(8, '5', 1, 5, 0, 0, 100),
(9, '5', 2, 5, 0, 0, 100),
(10, '5', 3, 3, 0, 0, 100),
(23, '12', 1, 3, 0, 2, 60),
(24, '12', 2, 3, 0, 2, 60),
(25, '12', 3, 0, 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ujianh`
--

CREATE TABLE `ujianh` (
  `idUjianH` int(11) NOT NULL,
  `idCmhs` varchar(6) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ujianh`
--

INSERT INTO `ujianh` (`idUjianH`, `idCmhs`, `tanggal`, `nilai`, `status`) VALUES
(3, 'MHS001', '2020-07-02', 56, 2),
(4, 'MHS009', '2020-07-03', 24, 3),
(5, 'MHS006', '2020-07-03', 100, 1),
(12, 'MHS007', '2020-07-06', 40, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `c_mhs`
--
ALTER TABLE `c_mhs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`idJadwal`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`idLogin`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`idPembayaran`);

--
-- Indexes for table `penguji`
--
ALTER TABLE `penguji`
  ADD PRIMARY KEY (`idPenguji`);

--
-- Indexes for table `soal_tes`
--
ALTER TABLE `soal_tes`
  ADD PRIMARY KEY (`idSoalTes`);

--
-- Indexes for table `soal_ujian`
--
ALTER TABLE `soal_ujian`
  ADD PRIMARY KEY (`idSoalUjian`);

--
-- Indexes for table `ujiand`
--
ALTER TABLE `ujiand`
  ADD PRIMARY KEY (`idUjianD`);

--
-- Indexes for table `ujianh`
--
ALTER TABLE `ujianh`
  ADD PRIMARY KEY (`idUjianH`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `c_mhs`
--
ALTER TABLE `c_mhs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `idJadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `idLogin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `idPembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `penguji`
--
ALTER TABLE `penguji`
  MODIFY `idPenguji` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `soal_tes`
--
ALTER TABLE `soal_tes`
  MODIFY `idSoalTes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `soal_ujian`
--
ALTER TABLE `soal_ujian`
  MODIFY `idSoalUjian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `ujiand`
--
ALTER TABLE `ujiand`
  MODIFY `idUjianD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `ujianh`
--
ALTER TABLE `ujianh`
  MODIFY `idUjianH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
