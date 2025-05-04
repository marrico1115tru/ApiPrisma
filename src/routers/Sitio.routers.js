import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();


router.get("/Sitios", async (req, res) => {
    const data = await prisma.sitio.findMany();
    res.json(data);
  });
  
  router.post("/Sitios", async (req, res) => {
    const data = await prisma.sitio.create({ data: req.body });
    res.json(data);
  });
  
  router.put("/Sitios/:id", async (req, res) => {
    const data = await prisma.sitio.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  });
  
  router.delete("/Sitios/:id", async (req, res) => {
    const data = await prisma.sitio.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  });

  
  export default router;