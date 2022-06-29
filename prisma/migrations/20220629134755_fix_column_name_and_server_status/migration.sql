/*
  Warnings:

  - You are about to drop the column `namespaceId` on the `fallbacks` table. All the data in the column will be lost.
  - You are about to drop the column `serverId` on the `fallbacks` table. All the data in the column will be lost.
  - You are about to drop the column `serverId` on the `server_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `server_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `namespaceId` on the `servers` table. All the data in the column will be lost.
  - You are about to drop the column `pingPassthrough` on the `servers` table. All the data in the column will be lost.
  - You are about to drop the column `namespaceId` on the `virtual_hosts` table. All the data in the column will be lost.
  - You are about to drop the column `serverId` on the `virtual_hosts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `virtual_hosts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[namespace_id]` on the table `fallbacks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[server_id]` on the table `fallbacks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[server_id]` on the table `server_statuses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[namespace_id,name]` on the table `servers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namespace_id` to the `fallbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `server_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `players_max` to the `server_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `players_online` to the `server_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server_id` to the `server_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version_name` to the `server_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version_protocol` to the `server_statuses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namespace_id` to the `servers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namespace_id` to the `virtual_hosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fallbacks` DROP FOREIGN KEY `fallbacks_namespaceId_fkey`;

-- DropForeignKey
ALTER TABLE `fallbacks` DROP FOREIGN KEY `fallbacks_serverId_fkey`;

-- DropForeignKey
ALTER TABLE `server_statuses` DROP FOREIGN KEY `server_statuses_serverId_fkey`;

-- DropForeignKey
ALTER TABLE `servers` DROP FOREIGN KEY `servers_namespaceId_fkey`;

-- DropForeignKey
ALTER TABLE `virtual_hosts` DROP FOREIGN KEY `virtual_hosts_namespaceId_fkey`;

-- DropForeignKey
ALTER TABLE `virtual_hosts` DROP FOREIGN KEY `virtual_hosts_serverId_fkey`;

-- DropIndex
DROP INDEX `servers_namespaceId_name_key` ON `servers`;

-- AlterTable
ALTER TABLE `fallbacks` DROP COLUMN `namespaceId`,
    DROP COLUMN `serverId`,
    ADD COLUMN `namespace_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `server_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `server_statuses` DROP COLUMN `serverId`,
    DROP COLUMN `status`,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `favicon` VARCHAR(191) NULL,
    ADD COLUMN `mod_info_type` VARCHAR(191) NULL,
    ADD COLUMN `players_max` INTEGER NOT NULL,
    ADD COLUMN `players_online` INTEGER NOT NULL,
    ADD COLUMN `server_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `version_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `version_protocol` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `servers` DROP COLUMN `namespaceId`,
    DROP COLUMN `pingPassthrough`,
    ADD COLUMN `namespace_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `ping_passthrough` ENUM('NONE', 'VERSION', 'PLAYER', 'MOTD', 'VERSION_PLAYER', 'VERSION_MOTD', 'PLAYER_MOTD', 'VERSION_PLAYER_MOTD') NOT NULL DEFAULT 'NONE';

-- AlterTable
ALTER TABLE `virtual_hosts` DROP COLUMN `namespaceId`,
    DROP COLUMN `serverId`,
    DROP COLUMN `type`,
    ADD COLUMN `namespace_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `server_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `sample_players` (
    `server_status_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`server_status_id`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sample_mods` (
    `server_status_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`server_status_id`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `fallbacks_namespace_id_key` ON `fallbacks`(`namespace_id`);

-- CreateIndex
CREATE UNIQUE INDEX `fallbacks_server_id_key` ON `fallbacks`(`server_id`);

-- CreateIndex
CREATE UNIQUE INDEX `server_statuses_server_id_key` ON `server_statuses`(`server_id`);

-- CreateIndex
CREATE UNIQUE INDEX `servers_namespace_id_name_key` ON `servers`(`namespace_id`, `name`);

-- AddForeignKey
ALTER TABLE `servers` ADD CONSTRAINT `servers_namespace_id_fkey` FOREIGN KEY (`namespace_id`) REFERENCES `namespaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fallbacks` ADD CONSTRAINT `fallbacks_namespace_id_fkey` FOREIGN KEY (`namespace_id`) REFERENCES `namespaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fallbacks` ADD CONSTRAINT `fallbacks_server_id_fkey` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `server_statuses` ADD CONSTRAINT `server_statuses_server_id_fkey` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sample_players` ADD CONSTRAINT `sample_players_server_status_id_fkey` FOREIGN KEY (`server_status_id`) REFERENCES `server_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sample_mods` ADD CONSTRAINT `sample_mods_server_status_id_fkey` FOREIGN KEY (`server_status_id`) REFERENCES `server_statuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `virtual_hosts` ADD CONSTRAINT `virtual_hosts_namespace_id_fkey` FOREIGN KEY (`namespace_id`) REFERENCES `namespaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `virtual_hosts` ADD CONSTRAINT `virtual_hosts_server_id_fkey` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
