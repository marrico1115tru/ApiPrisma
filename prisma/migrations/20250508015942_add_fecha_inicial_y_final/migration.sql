-- AlterTable
ALTER TABLE `accesos` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `areas` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `centro_formacion` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `detalle_solicitud` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `entrega_material` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `fichas_formacion` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `municipios` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `opciones` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `productos` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `roles` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sedes` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `sitio` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `solicitudes` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `tipo_sitio` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `titulados` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `fechaFinal` DATETIME(3) NULL,
    ADD COLUMN `fechaInicial` DATETIME(3) NULL;
