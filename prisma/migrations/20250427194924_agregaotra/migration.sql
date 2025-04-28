-- CreateTable
CREATE TABLE `MovimientosMateriales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_movimiento` VARCHAR(191) NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `id_usuario` INTEGER NULL,
    `fecha_movimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovimientosMateriales` ADD CONSTRAINT `MovimientosMateriales_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimientosMateriales` ADD CONSTRAINT `MovimientosMateriales_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
