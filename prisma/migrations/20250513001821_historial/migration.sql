-- CreateTable
CREATE TABLE `historial_productos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fechaUso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `historial_productos` ADD CONSTRAINT `historial_productos_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historial_productos` ADD CONSTRAINT `historial_productos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
