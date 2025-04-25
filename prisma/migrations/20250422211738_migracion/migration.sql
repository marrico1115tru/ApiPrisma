/*
  Warnings:

  - Made the column `ubicacion` on table `bodega` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bodega` MODIFY `ubicacion` VARCHAR(191) NOT NULL;
