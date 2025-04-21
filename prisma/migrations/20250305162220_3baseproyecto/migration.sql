-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_ficha_fkey` FOREIGN KEY (`id_ficha`) REFERENCES `FichasFormacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
