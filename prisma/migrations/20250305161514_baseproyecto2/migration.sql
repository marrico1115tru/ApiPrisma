-- CreateTable
CREATE TABLE `Titulados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FichasFormacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `id_titulado` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FichasFormacion` ADD CONSTRAINT `FichasFormacion_id_titulado_fkey` FOREIGN KEY (`id_titulado`) REFERENCES `Titulados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
