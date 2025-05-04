import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.get("/TipoSitio", async (req, res) => {
    const data = await prisma.tipoSitio.findMany();
    res.json(data);
  });
  
  router.post("/TipoSitio", async (req, res) => {
    const data = await prisma.tipoSitio.create({ data: req.body });
    res.json(data);
  });
  
  router.put("/TipoSitio/:id", async (req, res) => {
    const data = await prisma.tipoSitio.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  });
  
  router.delete("/TipoSitio/:id", async (req, res) => {
    const data = await prisma.tipoSitio.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  });
  

  export default router;