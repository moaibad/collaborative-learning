-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Apr 23, 2024 at 01:42 PM
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
(7, 'Teknik Informatika', '2021', 'Politeknik Negeri Bandung', 3),
(60, 'D4 Teknik Informatika', '2021', 'POLBAN', 84),
(61, 'S1 Teknik Kimia', '2022', 'ITB', 85);

-- --------------------------------------------------------

--
-- Table structure for table `praktisi`
--

CREATE TABLE `praktisi` (
  `id_praktisi` int(11) NOT NULL,
  `asal_perusahaan` varchar(32) DEFAULT NULL,
  `pendidikan_terakhir` varchar(32) DEFAULT NULL,
  `posisi` varchar(50) DEFAULT NULL,
  `user_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `praktisi`
--

INSERT INTO `praktisi` (`id_praktisi`, `asal_perusahaan`, `pendidikan_terakhir`, `posisi`, `user_id_user`) VALUES
(2, 'GOJEK', 'S1 Teknik Informatika', 'Junior Programmer', 83);

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
  `password_moodle` varchar(50) DEFAULT NULL,
  `tanggal_daftar` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `username`, `email`, `password`, `tanggal_lahir`, `location`, `about`, `token`, `profile_url`, `role`, `firstname`, `lastname`, `username_moodle`, `password_moodle`, `tanggal_daftar`) VALUES
(2, 'Naufal Al Ghani', 'Ghani', 'waw@gmail.com', '123', '2003-05-26', 'Bandung', 'LOREM IPSUM DOLOR SI AMET', NULL, NULL, 'mahasiswa', NULL, NULL, NULL, NULL, NULL),
(3, 'Alya Mikayla Putri', 'Alya', 'wew@gmail.com', '1234', '2010-05-13', 'Bandung', 'LOREM IPSUM DOLOR SI AMET SISISISI', NULL, NULL, 'mahasiswa', NULL, NULL, NULL, NULL, NULL),
(5, 'Test Hapus', 'hapus', 'hapus@gmail.com', '123', '2003-05-26', 'Bandung', 'LOREM IPSUM DOLOR SI HAPUS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(83, 'PKM Beasiswa', 'Doni', 'pkmbeasiswa@gmail.com', 'securepassword', '1995-12-05', 'Bandung', 'Hai Aku Praktisi Doni dari Gojek', 'ya29.a0Ad52N3-Nt86f5xiFZ0Cje1IouR_r9DU4vnpo8oMUbd6oove0Bg58_a4-fiiRm5QRz2lppQQZFk2DX-3d6_UgbBf0NKyYf4kjwv_Y6emuOJSVDnR9ffSGmen_Wv7lRJQLGWzvL_ZpkDPCbnPhIxRqKicV5BthVmMW6JmqaCgYKAdASARISFQHGX2MiBPSI3gM0CjA9sEnjjRm-GQ0171', 'https://lh3.googleusercontent.com/a/ACg8ocLkkAkLahq2ihLm4S5V0Lvx0GHAaZABVOiiWf3k6mlVFTEzSw=s96-c', 'practitioners', 'Doni', 'Salmanan', 'pkmbeasiswa', 'Pkmbeasiswa83.', '2024-04-23'),
(84, 'Naufal AlGhani', 'Ghani', 'alghani63@gmail.com', 'securepassword', '2003-05-26', 'Bandung', 'Hai Aku Ghani', 'ya29.a0Ad52N39fHFctO4rLUFQ1UyrAD-g8pC1Xu67fZICS-oHUsEtYPP9w_3fxzZZt9ZHoOsqN19M6Pp_SAgFKeYWzm69RcI2Lr_fT2MvJfZQranFeC6mF5M9ifC-fgJMdr0AmgKMaEbOk4gb9nrDhWEp9KONTaZoEWRght1z-aCgYKAVwSARISFQHGX2MiLFo3pbWYmWtOyMPcp8uw1w0171', 'https://lh3.googleusercontent.com/a/ACg8ocJdfJ97d4YUjWca6k_ho6hehA5xRBgs2AEYpJMEkJm1omrlwNxp=s96-c', 'student', 'Naufal', 'Al.Ghani', 'alghani63', 'Alghani6384.', '2024-04-23'),
(85, 'Agniva Kamila', 'Agniva', 'agnivakml13@gmail.com', 'securepassword', '2004-05-13', 'Cimahi', 'Hai Aku Agni', 'ya29.a0Ad52N3_1t5tleP9H8gFWwaDckNKQBBbf9puPSqhepSU1J9UFGU1jG6jYE70GuArYooG--XyyJ8JJQx_iBnf4Bf7gp2iTNML6_6qI8GoPJwSOKrYPzY6ExAeCG_b8jJIZ71T3IaACaXFo_0j73ZtRX0qZIcOoLnc0RiV5aCgYKAUMSARASFQHGX2MiF5GcznXe_uGAlQlkaE0C6Q0171', 'https://lh3.googleusercontent.com/a/ACg8ocJXxhPcQq-EDZbtvWtipvb3BXMli65LZDJ_wpKNuEq7ouCQNqs=s96-c', 'student', 'Agniva', 'Kamila', 'agnivakml13', 'Agnivakml1385.', '2024-04-23');

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
  MODIFY `id_mhs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `praktisi`
--
ALTER TABLE `praktisi`
  MODIFY `id_praktisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
