/*
  Warnings:

  - You are about to drop the column `namespace_id` on the `virtual_hosts` table. All the data in the column will be lost.
  - You are about to drop the column `server_id` on the `virtual_hosts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `virtual_hosts` DROP FOREIGN KEY `virtual_hosts_namespace_id_fkey`;

-- DropForeignKey
ALTER TABLE `virtual_hosts` DROP FOREIGN KEY `virtual_hosts_server_id_fkey`;

-- AlterTable
ALTER TABLE `virtual_hosts` DROP COLUMN `namespace_id`,
    DROP COLUMN `server_id`;

-- CreateTable
CREATE TABLE `destinations` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('NAMESPACE', 'SERVER') NOT NULL,
    `namespace_id` VARCHAR(191) NOT NULL,
    `server_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DestinationToVirtualHost` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DestinationToVirtualHost_AB_unique`(`A`, `B`),
    INDEX `_DestinationToVirtualHost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `destinations` ADD CONSTRAINT `destinations_namespace_id_fkey` FOREIGN KEY (`namespace_id`) REFERENCES `namespaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destinations` ADD CONSTRAINT `destinations_server_id_fkey` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DestinationToVirtualHost` ADD CONSTRAINT `_DestinationToVirtualHost_A_fkey` FOREIGN KEY (`A`) REFERENCES `destinations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DestinationToVirtualHost` ADD CONSTRAINT `_DestinationToVirtualHost_B_fkey` FOREIGN KEY (`B`) REFERENCES `virtual_hosts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
