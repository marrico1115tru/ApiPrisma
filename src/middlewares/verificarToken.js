
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "hola123";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Required Token." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    
    const vendedores = await prisma.vendedor.findUnique({
      where: { venUsuario: decoded.venUsuario },
    });

    if (!vendedores) {
      return res.status(401).json({ message: "Token inválido, usuario no encontrado." });
    }

    req.vendedores = vendedores; 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
}
};


