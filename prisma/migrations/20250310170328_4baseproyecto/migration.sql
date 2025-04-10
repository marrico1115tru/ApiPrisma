/*
  Warnings:

  - You are about to drop the column `email` on the `centroformacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `centroformacion` DROP COLUMN `email`;

-- CreateTable
CREATE TABLE `usuarios_centros_formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_centro_formacion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `areas_centros_formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_area` INTEGER NOT NULL,
    `id_centro_formacion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios_centros_formacion` ADD CONSTRAINT `usuarios_centros_formacion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios_centros_formacion` ADD CONSTRAINT `usuarios_centros_formacion_id_centro_formacion_fkey` FOREIGN KEY (`id_centro_formacion`) REFERENCES `CentroFormacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas_centros_formacion` ADD CONSTRAINT `areas_centros_formacion_id_area_fkey` FOREIGN KEY (`id_area`) REFERENCES `Areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas_centros_formacion` ADD CONSTRAINT `areas_centros_formacion_id_centro_formacion_fkey` FOREIGN KEY (`id_centro_formacion`) REFERENCES `CentroFormacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
