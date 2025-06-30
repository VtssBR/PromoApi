"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateSchema = exports.ProductCreateSchema = void 0;
const zod_1 = require("zod");
exports.ProductCreateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    price: zod_1.z.number(),
    description: zod_1.z.string(),
    image: zod_1.z.string().optional(),
    publicId: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    link: zod_1.z.string().url().optional(),
    userId: zod_1.z.string().uuid(),
    categoryId: zod_1.z.string().uuid(),
    expiresAt: zod_1.z.string().transform((val) => new Date(val)), // Converte string para Date
});
exports.ProductUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    link: zod_1.z.string().url().optional(),
    expiresAt: zod_1.z.string().transform((val) => new Date(val)).optional(), // Converte string para Date
});
