import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ message: "Acesso não autorizado" });
        return 
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, SECRET) as { userId: string; role: string };
        
        (req as any).user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
        return 
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    
    if (!user || user.role !== "admin") {
        res.status(403).json({ message: "Acesso restrito a admins" });
        return 
    }
    
    next();
};
