import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.get("/Sedes", async (req, res) => {
    const data = await prisma.sede.findMany();
    res.json(data);
  });
  
  router.post("/Sedes", async (req, res) => {
    const data = await prisma.sede.create({ data: req.body });
    res.json(data);
  });
  
  router.put("/Sedes/:id", async (req, res) => {
    const data = await prisma.sede.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  });
  
  router.delete("/Sedes/:id", async (req, res) => {
    const data = await prisma.sede.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  });
  

  export default router;