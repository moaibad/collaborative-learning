/*
  Warnings:

  - You are about to alter the column `asal_perusahaan` on the `praktisi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.
  - You are about to alter the column `pendidikan_terakhir` on the `praktisi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.
  - You are about to alter the column `posisi` on the `praktisi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `nama` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.
  - You are about to alter the column `location` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(32)`.
  - You are about to alter the column `firstname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `lastname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `username_moodle` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `password_moodle` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE `dosen` DROP FOREIGN KEY `Dosen_user_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `mahasiswa` DROP FOREIGN KEY `Mahasiswa_user_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `praktisi` DROP FOREIGN KEY `Praktisi_user_id_user_fkey`;

-- DropIndex
DROP INDEX `User_id_user_key` ON `user`;

-- AlterTable
ALTER TABLE `dosen` ADD COLUMN `jurusan` VARCHAR(32) NULL,
    ADD COLUMN `pendidikan_terakhir` VARCHAR(32) NULL,
    ADD COLUMN `universitas` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `mahasiswa` ADD COLUMN `angkatan` VARCHAR(10) NULL,
    ADD COLUMN `jurusan` VARCHAR(32) NULL,
    ADD COLUMN `universitas` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `praktisi` MODIFY `asal_perusahaan` VARCHAR(32) NULL,
    MODIFY `pendidikan_terakhir` VARCHAR(32) NULL,
    MODIFY `posisi` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `nama` VARCHAR(50) NULL,
    MODIFY `username` VARCHAR(50) NULL,
    MODIFY `email` VARCHAR(100) NULL,
    MODIFY `password` VARCHAR(32) NULL,
    MODIFY `tanggal_lahir` DATE NULL,
    MODIFY `location` VARCHAR(32) NULL,
    MODIFY `about` TEXT NULL,
    MODIFY `token` LONGTEXT NULL,
    MODIFY `profile_url` LONGTEXT NULL,
    MODIFY `role` VARCHAR(32) NULL,
    MODIFY `firstname` VARCHAR(50) NULL,
    MODIFY `lastname` VARCHAR(50) NULL,
    MODIFY `username_moodle` VARCHAR(50) NULL,
    MODIFY `password_moodle` VARCHAR(50) NULL,
    MODIFY `tanggal_daftar` DATE NULL;

-- RedefineIndex
CREATE UNIQUE INDEX `dosen__idx` ON `dosen`(`user_id_user`);
DROP INDEX `Dosen_user_id_user_key` ON `dosen`;

-- RedefineIndex
CREATE UNIQUE INDEX `mahasiswa__idx` ON `mahasiswa`(`user_id_user`);
DROP INDEX `Mahasiswa_user_id_user_key` ON `mahasiswa`;

-- RedefineIndex
CREATE UNIQUE INDEX `praktisi__idx` ON `praktisi`(`user_id_user`);
DROP INDEX `Praktisi_user_id_user_key` ON `praktisi`;
