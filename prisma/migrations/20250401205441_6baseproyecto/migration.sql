/*
  Warnings:

  - Added the required column `fecha_fin` to the `Titulados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_inicio` to the `Titulados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bodega` ADD COLUMN `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `titulados` ADD COLUMN `fecha_fin` DATETIME(3) NOT NULL,
    ADD COLUMN `fecha_inicio` DATETIME(3) NOT NULL;
