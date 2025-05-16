-- CreateTable
CREATE TABLE `tipo_sitio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sitio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `ubicacion` VARCHAR(150) NOT NULL,
    `tipoSitioId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `centro_formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `ubicacion` VARCHAR(150) NOT NULL,
    `telefono` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `municipios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `departamento` VARCHAR(100) NOT NULL,
    `centroFormacionId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `centroFormacionId` INTEGER NOT NULL,
    `sitioId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sedes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `ubicacion` VARCHAR(150) NOT NULL,
    `areaId` INTEGER NOT NULL,
    `centroId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titulados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fichas_formacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `tituloId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreRol` VARCHAR(100) NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `cedula` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `cargo` VARCHAR(100) NOT NULL,
    `areaId` INTEGER NOT NULL,
    `fichaId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoSena` VARCHAR(100) NOT NULL,
    `unspc` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `cantidad` INTEGER NOT NULL,
    `categoria` VARCHAR(100) NOT NULL,
    `tipoMateria` VARCHAR(100) NOT NULL,
    `fechaVencimiento` DATETIME(3) NULL,
    `areaId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historial_productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fechaUso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `solicitudes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioSolicitanteId` INTEGER NOT NULL,
    `fechaSolicitud` DATETIME(3) NOT NULL,
    `estadoSolicitud` VARCHAR(50) NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_solicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solicitudId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidadSolicitada` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entrega_material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `solicitudId` INTEGER NOT NULL,
    `usuarioResponsableId` INTEGER NOT NULL,
    `fechaEntrega` DATETIME(3) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accesos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opcionId` INTEGER NOT NULL,
    `rolId` INTEGER NOT NULL,
    `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimiento_inventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `tipoMovimiento` VARCHAR(10) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fechaMovimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observaciones` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sitio` ADD CONSTRAINT `sitio_tipoSitioId_fkey` FOREIGN KEY (`tipoSitioId`) REFERENCES `tipo_sitio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `municipios` ADD CONSTRAINT `municipios_centroFormacionId_fkey` FOREIGN KEY (`centroFormacionId`) REFERENCES `centro_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_centroFormacionId_fkey` FOREIGN KEY (`centroFormacionId`) REFERENCES `centro_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `areas` ADD CONSTRAINT `areas_sitioId_fkey` FOREIGN KEY (`sitioId`) REFERENCES `sitio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sedes` ADD CONSTRAINT `sedes_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `areas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sedes` ADD CONSTRAINT `sedes_centroId_fkey` FOREIGN KEY (`centroId`) REFERENCES `centro_formacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `historial_productos` ADD CONSTRAINT `historial_productos_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_productos` ADD CONSTRAINT `historial_productos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `movimiento_inventario` ADD CONSTRAINT `movimiento_inventario_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimiento_inventario` ADD CONSTRAINT `movimiento_inventario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
