
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.get("/CentroFormacion", async (req, res) => {
  const data = await prisma.centroFormacion.findMany();
  res.json(data);
});

router.post("/CentroFormacion", async (req, res) => {
  const data = await prisma.centroFormacion.create({ data: req.body });
  res.json(data);
});

router.put("/CentroFormacion/:id", async (req, res) => {
  const data = await prisma.centroFormacion.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });
  res.json(data);
});

router.delete("/CentroFormacion/:id", async (req, res) => {
  const data = await prisma.centroFormacion.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(data);
});

export default router;