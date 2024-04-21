CREATE TABLE `user` (
  `id_user` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `location` varchar(32) DEFAULT NULL,
  `about` text DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `profile_url` varchar(150) DEFAULT NULL,
  `role` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;