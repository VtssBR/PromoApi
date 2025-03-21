import {z} from "zod"; 


export const ProductCreateSchema =  z.object({
    title: z.string(),
    price: z.number(),
    description: z.string(),
    image: z.string().optional(),
    publicId: z.string().optional(),
    address: z.string().optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    link: z.string().url().optional(),
    userId: z.string().uuid(),
    categoryId: z.string().uuid(),
    expiresAt: z.string().transform((val) => new Date(val)), // Converte string para Date
})

export const ProductUpdateSchema =  z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    address: z.string().optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    link: z.string().url().optional(),
    expiresAt: z.string().transform((val) => new Date(val)).optional(), // Converte string para Date
})
