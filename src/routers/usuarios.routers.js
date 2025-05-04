import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();

router.get("/Usuarios", async (req, res) => {
    const data = await prisma.usuario.findMany();
    res.json(data);
  });
  
  router.post("/Usuarios", async (req, res) => {
    const data = await prisma.usuario.create({ data: req.body });
    res.json(data);
  });
  
  router.put("/Usuarios/:id", async (req, res) => {
    const data = await prisma.usuario.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(data);
  });
  
  router.delete("/Usuarios/:id", async (req, res) => {
    const data = await prisma.usuario.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(data);
  });
  

  export default router;