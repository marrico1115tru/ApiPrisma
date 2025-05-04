/*
  Warnings:

  - You are about to drop the column `id_opcion` on the `accesos` table. All the data in the column will be lost.
  - You are about to drop the column `id_rol` on the `accesos` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_registro` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the column `id_centro_formacion` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_area` on the `areas` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_registro` on the `bodega` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `bodega` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `ubicacion` on the `bodega` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `nombre` on the `opciones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `codigo_sena` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_caducidad` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `id_area` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `id_categoria` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_material` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `unidad_medida` on the `productos` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `productos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `nombre_rol` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `estado_solicitud` on the `solicitudes` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_solicitud` on the `solicitudes` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario_solicitante` on the `solicitudes` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_fin` on the `titulados` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_inicio` on the `titulados` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `titulados` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `apellidos` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_creacion` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `id_area` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `id_ficha` on the `usuarios` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `cedula` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the `alertavencimiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `areas_centros_formacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `centroformacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detallesentrega` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detallesolicitud` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `entregamaterial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fichasformacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movimientosmateriales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `registroproductos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles_usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_centros_formacion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `opcionId` to the `accesos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolId` to the `accesos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodegaId` to the `areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centroFormacionId` to the `areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sitioId` to the `areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaId` to the `productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria` to the `productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoSena` to the `productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoMateria` to the `productos` table without a default value. This is not possible if the table is not empty.
  - Made the column `unspc` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `nombreRol` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estadoSolicitud` to the `solicitudes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaSolicitud` to the `solicitudes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioSolicitanteId` to the `solicitudes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaId` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fichaId` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolId` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefono` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cargo` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `accesos` DROP FOREIGN KEY `Accesos_id_opcion_fkey`;

-- DropForeignKey
ALTER TABLE `accesos` DROP FOREIGN KEY `Accesos_id_rol_fkey`;

-- DropForeignKey
ALTER TABLE `alertavencimiento` DROP FOREIGN KEY `AlertaVencimiento_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `areas` DROP FOREIGN KEY `Areas_id_centro_formacion_fkey`;

-- DropForeignKey
ALTER TABLE `areas_centros_formacion` DROP FOREIGN KEY `areas_centros_formacion_id_area_fkey`;

-- DropForeignKey
ALTER TABLE `areas_centros_formacion` DROP FOREIGN KEY `areas_centros_formacion_id_centro_formacion_fkey`;

-- DropForeignKey
ALTER TABLE `detallesentrega` DROP FOREIGN KEY `DetallesEntrega_id_entrega_fkey`;

-- DropForeignKey
ALTER TABLE `detallesentrega` DROP FOREIGN KEY `DetallesEntrega_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `detallesolicitud` DROP FOREIGN KEY `DetalleSolicitud_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `detallesolicitud` DROP FOREIGN KEY `DetalleSolicitud_id_solicitud_fkey`;

-- DropForeignKey
ALTER TABLE `fichasformacion` DROP FOREIGN KEY `FichasFormacion_id_titulado_fkey`;

-- DropForeignKey
ALTER TABLE `movimientosmateriales` DROP FOREIGN KEY `MovimientosMateriales_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `movimientosmateriales` DROP FOREIGN KEY `MovimientosMateriales_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_id_area_fkey`;

-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_id_categoria_fkey`;

-- DropForeignKey
ALTER TABLE `registroproductos` DROP FOREIGN KEY `RegistroProductos_id_bodega_fkey`;

-- DropForeignKey
ALTER TABLE `registroproductos` DROP FOREIGN KEY `RegistroProductos_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `roles_usuarios` DROP FOREIGN KEY `roles_usuarios_id_rol_fkey`;

-- DropForeignKey
ALTER TABLE `roles_usuarios` DROP FOREIGN KEY `roles_usuarios_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_id_area_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_id_ficha_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios_centros_formacion` DROP FOREIGN KEY `usuarios_centros_formacion_id_centro_formacion_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios_centros_formacion` DROP FOREIGN KEY `usuarios_centros_formacion_id_usuario_fkey`;

-- DropIndex
DROP INDEX `Accesos_id_opcion_fkey` ON `accesos`;

-- DropIndex
DROP INDEX `Accesos_id_rol_fkey` ON `accesos`;

-- DropIndex
DROP INDEX `Areas_id_centro_formacion_fkey` ON `areas`;

-- DropIndex
DROP INDEX `Productos_id_area_fkey` ON `productos`;

-- DropIndex
DROP INDEX `Productos_id_categoria_fkey` ON `productos`;

-- DropIndex
DROP INDEX `Usuarios_cedula_key` ON `usuarios`;

-- DropIndex
DROP INDEX `Usuarios_email_key` ON `usuarios`;

-- DropIndex
DROP INDEX `Usuarios_id_area_fkey` ON `usuarios`;

-- DropIndex
DROP INDEX `Usuarios_id_ficha_fkey` ON `usuarios`;

-- AlterTable
ALTER TABLE `accesos` DROP COLUMN `id_opcion`,
    DROP COLUMN `id_rol`,
    ADD COLUMN `opcionId` INTEGER NOT NULL,
    ADD COLUMN `rolId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `areas` DROP COLUMN `fecha_registro`,
    DROP COLUMN `id_centro_formacion`,
    DROP COLUMN `nombre_area`,
    ADD COLUMN `bodegaId` INTEGER NOT NULL,
    ADD COLUMN `centroFormacionId` INTEGER NOT NULL,
    ADD COLUMN `nombre` VARCHAR(100) NOT NULL,
    ADD COLUMN `sitioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `bodega` DROP COLUMN `fecha_registro`,
    MODIFY `nombre` VARCHAR(100) NOT NULL,
    MODIFY `ubicacion` VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE `opciones` MODIFY `nombre` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `codigo_sena`,
    DROP COLUMN `fecha_caducidad`,
    DROP COLUMN `id_area`,
    DROP COLUMN `id_categoria`,
    DROP COLUMN `tipo_material`,
    DROP COLUMN `unidad_medida`,
    ADD COLUMN `areaId` INTEGER NOT NULL,
    ADD COLUMN `categoria` VARCHAR(100) NOT NULL,
    ADD COLUMN `codigoSena` VARCHAR(100) NOT NULL,
    ADD COLUMN `fechaVencimiento` DATETIME(3) NULL,
    ADD COLUMN `tipoMateria` VARCHAR(100) NOT NULL,
    MODIFY `unspc` VARCHAR(50) NOT NULL,
    MODIFY `nombre` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `nombre_rol`,
    ADD COLUMN `nombreRol` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `solicitudes` DROP COLUMN `estado_solicitud`,
    DROP COLUMN `fecha_solicitud`,
    DROP COLUMN `id_usuario_solicitante`,
    ADD COLUMN `estadoSolicitud` VARCHAR(50) NOT NULL,
    ADD COLUMN `fechaSolicitud` DATETIME(3) NOT NULL,
    ADD COLUMN `usuarioSolicitanteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `titulados` DROP COLUMN `fecha_fin`,
    DROP COLUMN `fecha_inicio`,
    MODIFY `nombre` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `apellidos`,
    DROP COLUMN `fecha_creacion`,
    DROP COLUMN `id_area`,
    DROP COLUMN `id_ficha`,
    ADD COLUMN `apellido` VARCHAR(100) NOT NULL,
    ADD COLUMN `areaId` INTEGER NOT NULL,
    ADD COLUMN `fichaId` INTEGER NOT NULL,
    ADD COLUMN `rolId` INTEGER NOT NULL,
    MODIFY `nombre` VARCHAR(100) NOT NULL,
    MODIFY `cedula` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(100) NOT NULL,
    MODIFY `telefono` VARCHAR(100) NOT NULL,
    MODIFY `cargo` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `alertavencimiento`;

-- DropTable
DROP TABLE `areas_centros_formacion`;

-- DropTable
DROP TABLE `categoria`;

-- DropTable
DROP TABLE `centroformacion`;

-- DropTable
DROP TABLE `detallesentrega`;

-- DropTable
DROP TABLE `detallesolicitud`;

-- DropTable
DROP TABLE `entregamaterial`;

-- DropTable
DROP TABLE `fichasformacion`;

-- DropTable
DROP TABLE `movimientosmateriales`;

-- DropTable
DROP TABLE `registroproductos`;

-- DropTable
DROP TABLE `roles_usuarios`;

-- DropTable
DROP TABLE `usuarios_centros_formacion`;

-- CreateTable
CREATE TABLE `tipo_sitio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sitio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `ubicacion` VARCHAR(150) NOT NULL,
    `tipoSitioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `centro_formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `ubicacion` VARCHAR(150) NOT NULL,
    `telefono` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `municipios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `departamento` VARCHAR(100) NOT NULL,
    `centroFormacionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sedes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `ubicacion` VARCHAR(150) NOT NULL,
    `areaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fichas_formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `tituloId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_solicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solicitudId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidadSolicitada` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entrega_material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solicitudId` INTEGER NOT NULL,
    `usuarioResponsableId` INTEGER NOT NULL,
    `fechaEntrega` DATETIME(3) NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sitio` ADD CONSTRAINT `sitio_tipoSitioId_fkey` FOREIGN KEY (`tipoSitioId`) REFERENCES `tipo_sitio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `municipios` ADD CONSTRAINT `municipios_centroFormacionId_fkey` FOREIGN KEY (`centroFormacionId`) REFERENCES `centro_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_centroFormacionId_fkey` FOREIGN KEY (`centroFormacionId`) REFERENCES `centro_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_bodegaId_fkey` FOREIGN KEY (`bodegaId`) REFERENCES `bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_sitioId_fkey` FOREIGN KEY (`sitioId`) REFERENCES `sitio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sedes` ADD CONSTRAINT `sedes_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fichas_formacion` ADD CONSTRAINT `fichas_formacion_tituloId_fkey` FOREIGN KEY (`tituloId`) REFERENCES `titulados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_fichaId_fkey` FOREIGN KEY (`fichaId`) REFERENCES `fichas_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `solicitudes` ADD CONSTRAINT `solicitudes_usuarioSolicitanteId_fkey` FOREIGN KEY (`usuarioSolicitanteId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_solicitud` ADD CONSTRAINT `detalle_solicitud_solicitudId_fkey` FOREIGN KEY (`solicitudId`) REFERENCES `solicitudes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_solicitud` ADD CONSTRAINT `detalle_solicitud_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entrega_material` ADD CONSTRAINT `entrega_material_solicitudId_fkey` FOREIGN KEY (`solicitudId`) REFERENCES `solicitudes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entrega_material` ADD CONSTRAINT `entrega_material_usuarioResponsableId_fkey` FOREIGN KEY (`usuarioResponsableId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accesos` ADD CONSTRAINT `accesos_opcionId_fkey` FOREIGN KEY (`opcionId`) REFERENCES `opciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accesos` ADD CONSTRAINT `accesos_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
