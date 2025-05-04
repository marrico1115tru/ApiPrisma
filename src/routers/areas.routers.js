import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.get("/Areas", async (req, res) => {
    const data = await prisma.area.findMany();
    res.json(data);
  });
  
  router.post("/Areas", async (req, res) => {
    const data = await prisma.area.create({ data: req.body });
    res.json(data);
  });
  
  router.put("/Areas/:id", async (req, res) => {
    const data = await prisma.area.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  });
  
  router.delete("/Areas/:id", async (req, res) => {
    const data = await prisma.area.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  });
  

  export default router;