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
ALTER TABLE `movimiento_inventario` ADD CONSTRAINT `movimiento_inventario_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimiento_inventario` ADD CONSTRAINT `movimiento_inventario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
