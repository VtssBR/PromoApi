"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = String(process.env.JWT_SECRET);
const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ message: "Acesso não autorizado" });
        return;
    }
    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
};
exports.authenticateUser = authenticateUser;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        res.status(403).json({ message: "Acesso restrito a admins" });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
