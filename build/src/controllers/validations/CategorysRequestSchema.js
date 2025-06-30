"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdateSchema = exports.CategoryCreateSchema = void 0;
const zod_1 = require("zod");
exports.CategoryCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "O nome da categoria é obrigatório")
});
exports.CategoryUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "O nome da categoria é obrigatório")
});
