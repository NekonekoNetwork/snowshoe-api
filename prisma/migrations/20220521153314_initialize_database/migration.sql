-- CreateTable
CREATE TABLE `namespaces` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `namespaces_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servers` (
    `id` VARCHAR(191) NOT NULL,
    `namespaceId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `port` INTEGER NOT NULL,
    `motd` VARCHAR(191) NULL,
    `pingPassthrough` ENUM('NONE', 'VERSION', 'PLAYER', 'MOTD', 'VERSION_PLAYER', 'VERSION_MOTD', 'PLAYER_MOTD', 'VERSION_PLAYER_MOTD') NOT NULL DEFAULT 'NONE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `servers_namespaceId_name_key`(`namespaceId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fallbacks` (
    `id` VARCHAR(191) NOT NULL,
    `namespaceId` VARCHAR(191) NOT NULL,
    `serverId` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `fallbacks_namespaceId_key`(`namespaceId`),
    UNIQUE INDEX `fallbacks_serverId_key`(`serverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_statuses` (
    `id` VARCHAR(191) NOT NULL,
    `serverId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `server_statuses_serverId_key`(`serverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `virtual_hosts` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('NAMESPACE', 'SERVER') NOT NULL,
    `namespaceId` VARCHAR(191) NOT NULL,
    `serverId` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `virtual_hosts_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FALLBACKS_NAMESPACE` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FALLBACKS_NAMESPACE_AB_unique`(`A`, `B`),
    INDEX `_FALLBACKS_NAMESPACE_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FALLBACKS_SERVER` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FALLBACKS_SERVER_AB_unique`(`A`, `B`),
    INDEX `_FALLBACKS_SERVER_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `servers` ADD CONSTRAINT `servers_namespaceId_fkey` FOREIGN KEY (`namespaceId`) REFERENCES `namespaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fallbacks` ADD CONSTRAINT `fallbacks_namespaceId_fkey` FOREIGN KEY (`namespaceId`) REFERENCES `namespaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fallbacks` ADD CONSTRAINT `fallbacks_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `servers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `server_statuses` ADD CONSTRAINT `server_statuses_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `servers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `virtual_hosts` ADD CONSTRAINT `virtual_hosts_namespaceId_fkey` FOREIGN KEY (`namespaceId`) REFERENCES `namespaces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `virtual_hosts` ADD CONSTRAINT `virtual_hosts_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `servers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FALLBACKS_NAMESPACE` ADD CONSTRAINT `_FALLBACKS_NAMESPACE_A_fkey` FOREIGN KEY (`A`) REFERENCES `fallbacks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FALLBACKS_NAMESPACE` ADD CONSTRAINT `_FALLBACKS_NAMESPACE_B_fkey` FOREIGN KEY (`B`) REFERENCES `namespaces`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FALLBACKS_SERVER` ADD CONSTRAINT `_FALLBACKS_SERVER_A_fkey` FOREIGN KEY (`A`) REFERENCES `fallbacks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FALLBACKS_SERVER` ADD CONSTRAINT `_FALLBACKS_SERVER_B_fkey` FOREIGN KEY (`B`) REFERENCES `servers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
