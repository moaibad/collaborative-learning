-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `about` VARCHAR(191) NULL,
    `token` VARCHAR(191) NULL,
    `profile_url` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `firstname` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `username_moodle` VARCHAR(191) NULL,
    `password_moodle` VARCHAR(191) NULL,
    `tanggal_daftar` DATETIME(3) NULL,

    UNIQUE INDEX `User_id_user_key`(`id_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Praktisi` (
    `id_praktisi` INTEGER NOT NULL AUTO_INCREMENT,
    `asal_perusahaan` VARCHAR(191) NULL,
    `pendidikan_terakhir` VARCHAR(191) NULL,
    `posisi` VARCHAR(191) NULL,
    `user_id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Praktisi_user_id_user_key`(`user_id_user`),
    PRIMARY KEY (`id_praktisi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dosen` (
    `id_dosen` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Dosen_user_id_user_key`(`user_id_user`),
    PRIMARY KEY (`id_dosen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id_mhs` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Mahasiswa_user_id_user_key`(`user_id_user`),
    PRIMARY KEY (`id_mhs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Praktisi` ADD CONSTRAINT `Praktisi_user_id_user_fkey` FOREIGN KEY (`user_id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dosen` ADD CONSTRAINT `Dosen_user_id_user_fkey` FOREIGN KEY (`user_id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_user_id_user_fkey` FOREIGN KEY (`user_id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
