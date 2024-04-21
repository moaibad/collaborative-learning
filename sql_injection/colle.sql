-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Apr 20, 2024 at 08:12 AM
-- Server version: 11.2.2-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `colle`
--

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `id_dosen` int(11) NOT NULL,
  `jurusan` varchar(32) DEFAULT NULL,
  `universitas` varchar(50) DEFAULT NULL,
  `pendidikan_terakhir` varchar(32) DEFAULT NULL,
  `user_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id_mhs` int(11) NOT NULL,
  `jurusan` varchar(32) DEFAULT NULL,
  `angkatan` varchar(10) DEFAULT NULL,
  `universitas` varchar(50) DEFAULT NULL,
  `user_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id_mhs`, `jurusan`, `angkatan`, `universitas`, `user_id_user`) VALUES
(1, 'Teknik Informatika', '2021', 'Politeknik Negeri Bandung', 2),
(5, 'Teknik Informatika', '2021', 'Politeknik Negeri Bandung', 4),
(7, 'Teknik Informatika', '2021', 'Politeknik Negeri Bandung', 3);

-- --------------------------------------------------------

--
-- Table structure for table `praktisi`
--

CREATE TABLE `praktisi` (
  `id_praktisi` int(11) NOT NULL,
  `asal_perusahaan` varchar(32) DEFAULT NULL,
  `pendidikan_terakhir` varchar(32) DEFAULT NULL,
  `user_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `location` varchar(32) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `profile_url` varchar(150) DEFAULT NULL,
  `role` varchar(32) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username_moodle` varchar(50) DEFAULT NULL,
  `password_moodle` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `username`, `email`, `password`, `tanggal_lahir`, `location`, `about`, `token`, `profile_url`, `role`, `firstname`, `lastname`, `username_moodle`, `password_moodle`) VALUES
(2, 'Naufal Al Ghani', 'Ghani', 'waw@gmail.com', '123', '2003-05-26', 'Bandung', 'LOREM IPSUM DOLOR SI AMET', NULL, NULL, 'mahasiswa', NULL, NULL, NULL, NULL),
(3, 'Alya Mikayla Putri', 'Alya', 'wew@gmail.com', '1234', '2010-05-13', 'Bandung', 'LOREM IPSUM DOLOR SI AMET SISISISI', NULL, NULL, 'mahasiswa', NULL, NULL, NULL, NULL),
(5, 'Test Hapus', 'hapus', 'hapus@gmail.com', '123', '2003-05-26', 'Bandung', 'LOREM IPSUM DOLOR SI HAPUS', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'Naufal AlGhani', 'Naufal AlGhani', 'alghani63@gmail.com', 'securepassword', '1990-01-01', 'City, Country', 'I am a student.', 'ya29.a0Ad52N38JZl2Ws6wx5_5D0qV37-B_-f2StCx58sk74E2LRDZSEvCSguhzwV0Fwj_LelVT9raKrXhXPbDlIep6clIcBhoEjaKG_L2V7MzSO0zJrQPS-H8ejJx0idN4Kw6oT4OKwD1MVro-xWEa56NWo4P64pNRoGyRu-LNaCgYKAaISARISFQHGX2MixUoGloYBCJF7PSSeT2FKJA0171', 'https://lh3.googleusercontent.com/a/ACg8ocJdfJ97d4YUjWca6k_ho6hehA5xRBgs2AEYpJMEkJm1omrlwNxp=s96-c', NULL, NULL, NULL, NULL, NULL),
(17, '3A_016_Naufal', '3A_016_Naufal', 'muhamad.naufal.tif421@polban.ac.id', 'securepassword', '1990-01-01', 'City, Country', 'I am a student.', 'ya29.a0Ad52N3_0O4U_D2J_2dR1nW-hxfsusnmEbpiVIcaSM3h2FgQ28zONKcXAwnFGeX088EeB94itv-2xU10RU55wfAw4uObQblKwcPqrmyyLNIkzfrxxLGSkSYef-pYnkBK2to6eyOIYYqsSnz9qnkSy09q1AT8ISWbNt10saCgYKAY8SARASFQHGX2MiwiOweDhj0WfX4gu--Y8XDg0171', 'https://lh3.googleusercontent.com/a/ACg8ocJ0iNTh1Pp8tIZ-T_6hdDb2YBrCH-YsgiCKJhq97ptSkEQeNg=s96-c', NULL, NULL, NULL, NULL, NULL),
(18, 'Agniva Kamila', 'Agniva Kamila', 'agnivakml13@gmail.com', 'securepassword', '1990-01-01', 'City, Country', 'I am a student.', 'ya29.a0Ad52N39WZeM5Dhz7aYuAn7VrgX77qcINggbOWeHDzKYw7S5Hd1JDva_oEuLCD58fZvPAdTt2AuUjqkHQYJ2ZgJqF5Jjpgteja5wnV_2TYxBtkpUBCOcPNc2BF6mOXODMNF__EmW2ICQSVtxeOOAyA49NhNiQ8saTfiRgaCgYKAQsSARASFQHGX2Mi3HiGatCJCcNqjil8bYs6BQ0171', 'https://lh3.googleusercontent.com/a/ACg8ocJXxhPcQq-EDZbtvWtipvb3BXMli65LZDJ_wpKNuEq7ouCQNqs=s96-c', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`id_dosen`),
  ADD UNIQUE KEY `dosen__idx` (`user_id_user`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id_mhs`),
  ADD UNIQUE KEY `mahasiswa__idx` (`user_id_user`);

--
-- Indexes for table `praktisi`
--
ALTER TABLE `praktisi`
  ADD PRIMARY KEY (`id_praktisi`),
  ADD UNIQUE KEY `praktisi__idx` (`user_id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dosen`
--
ALTER TABLE `dosen`
  MODIFY `id_dosen` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id_mhs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `praktisi`
--
ALTER TABLE `praktisi`
  MODIFY `id_praktisi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
