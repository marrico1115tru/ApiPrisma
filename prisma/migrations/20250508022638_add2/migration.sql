/*
  Warnings:

  - Made the column `fechaFinal` on table `accesos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `accesos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `areas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `areas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `centro_formacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `centro_formacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `detalle_solicitud` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `detalle_solicitud` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `entrega_material` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `entrega_material` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `fichas_formacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `fichas_formacion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `municipios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `municipios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `opciones` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `opciones` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `sedes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `sedes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `sitio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `sitio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `solicitudes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `solicitudes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `tipo_sitio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `tipo_sitio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `titulados` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `titulados` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaFinal` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fechaInicial` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `accesos` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `areas` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `centro_formacion` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `detalle_solicitud` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `entrega_material` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `fichas_formacion` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `municipios` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `opciones` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `productos` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `roles` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `sedes` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `sitio` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `solicitudes` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tipo_sitio` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `titulados` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usuarios` MODIFY `fechaFinal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaInicial` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
