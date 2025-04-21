-- AlterTable
ALTER TABLE `areas` ADD COLUMN `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `areas_centros_formacion` ADD COLUMN `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `centroformacion` ADD COLUMN `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `fichasformacion` ADD COLUMN `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
