/*
  Warnings:

  - Added the required column `centroId` to the `sedes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sedes` ADD COLUMN `centroId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `sedes` ADD CONSTRAINT `sedes_centroId_fkey` FOREIGN KEY (`centroId`) REFERENCES `centro_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
