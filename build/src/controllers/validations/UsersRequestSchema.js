"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateSchema = exports.UserCreateSchema = void 0;
const zod_1 = require("zod");
exports.UserCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: zod_1.z.string().optional()
});
exports.UserUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    email: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional(),
});
