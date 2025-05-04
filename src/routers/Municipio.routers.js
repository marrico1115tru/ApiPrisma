import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.get("/Municipio", async (req, res) => {
    const data = await prisma.municipio.findMany();
    res.json(data);
  });
  
  router.post("/Municipio", async (req, res) => {
    const data = await prisma.municipio.create({ data: req.body });
    res.json(data);
  });
  
  router.put("/Municipio/:id", async (req, res) => {
    const data = await prisma.municipio.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  });
  
  router.delete("/Municipio/:id", async (req, res) => {
    const data = await prisma.municipio.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  });

  export default router;