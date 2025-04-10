-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apellido` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NULL,
    `id_area` INTEGER NULL,
    `id_ficha` INTEGER NULL,

    UNIQUE INDEX `Usuarios_cedula_key`(`cedula`),
    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_rol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles_usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_rol` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accesos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rol` INTEGER NOT NULL,
    `id_opcion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CentroFormacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Areas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_area` VARCHAR(191) NOT NULL,
    `id_centro_formacion` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bodega` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_sena` VARCHAR(191) NULL,
    `unspc` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `cantidad` INTEGER NOT NULL,
    `unidad_medida` VARCHAR(191) NOT NULL,
    `id_area` INTEGER NULL,
    `tipo_material` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegistroProductos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `id_bodega` INTEGER NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlertaVencimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_producto` INTEGER NOT NULL,
    `fecha_alerta` DATETIME(3) NOT NULL,
    `estado_alerta` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitudes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario_solicitante` INTEGER NOT NULL,
    `fecha_solicitud` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado_solicitud` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleSolicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_solicitud` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad_solicitada` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntregaMaterial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_solicitud` INTEGER NOT NULL,
    `id_usuario_responsable` INTEGER NOT NULL,
    `fecha_entrega` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetallesEntrega` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_entrega` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `id_instructor_receptor` INTEGER NULL,
    `id_ficha_formacion` INTEGER NULL,
    `visto_bueno_aprendiz` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_area_fkey` FOREIGN KEY (`id_area`) REFERENCES `Areas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles_usuarios` ADD CONSTRAINT `roles_usuarios_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles_usuarios` ADD CONSTRAINT `roles_usuarios_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accesos` ADD CONSTRAINT `Accesos_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accesos` ADD CONSTRAINT `Accesos_id_opcion_fkey` FOREIGN KEY (`id_opcion`) REFERENCES `Opciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Areas` ADD CONSTRAINT `Areas_id_centro_formacion_fkey` FOREIGN KEY (`id_centro_formacion`) REFERENCES `CentroFormacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_id_area_fkey` FOREIGN KEY (`id_area`) REFERENCES `Areas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroProductos` ADD CONSTRAINT `RegistroProductos_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RegistroProductos` ADD CONSTRAINT `RegistroProductos_id_bodega_fkey` FOREIGN KEY (`id_bodega`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlertaVencimiento` ADD CONSTRAINT `AlertaVencimiento_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleSolicitud` ADD CONSTRAINT `DetalleSolicitud_id_solicitud_fkey` FOREIGN KEY (`id_solicitud`) REFERENCES `Solicitudes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleSolicitud` ADD CONSTRAINT `DetalleSolicitud_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallesEntrega` ADD CONSTRAINT `DetallesEntrega_id_entrega_fkey` FOREIGN KEY (`id_entrega`) REFERENCES `EntregaMaterial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallesEntrega` ADD CONSTRAINT `DetallesEntrega_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
