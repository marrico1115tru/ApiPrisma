/*
  Warnings:

  - You are about to drop the column `bodegaId` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the `bodega` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `areas` DROP FOREIGN KEY `areas_bodegaId_fkey`;

-- DropIndex
DROP INDEX `areas_bodegaId_fkey` ON `areas`;

-- AlterTable
ALTER TABLE `areas` DROP COLUMN `bodegaId`;

-- DropTable
DROP TABLE `bodega`;
