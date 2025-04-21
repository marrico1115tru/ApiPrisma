/*
  Warnings:

  - You are about to drop the column `apellido` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `apellidos` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `apellido`,
    ADD COLUMN `apellidos` VARCHAR(191) NOT NULL;
