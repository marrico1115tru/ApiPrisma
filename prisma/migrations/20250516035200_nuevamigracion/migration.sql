/*
  Warnings:

  - You are about to drop the column `fechaFinal` on the `accesos` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicial` on the `accesos` table. All the data in the column will be lost.
  - You are about to drop the column `fechaFinal` on the `opciones` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicial` on the `opciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accesos` DROP COLUMN `fechaFinal`,
    DROP COLUMN `fechaInicial`;

-- AlterTable
ALTER TABLE `opciones` DROP COLUMN `fechaFinal`,
    DROP COLUMN `fechaInicial`;
