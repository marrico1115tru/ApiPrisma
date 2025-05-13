// routers/sitioEstadisticas.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Sitios activos/inactivos según fechaFinal
router.get("/sitios/estadisticas", async (req, res) => {
  try {
    const now = new Date();

    const activos = await prisma.sitio.count({
      where: {
        fechaFinal: {
          gte: now,
        },
      },
    });

    const inactivos = await prisma.sitio.count({
      where: {
        fechaFinal: {
          lt: now,
        },
      },
    });

    res.json({ activos, inactivos });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
