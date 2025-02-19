import {z} from "zod"

export const CategoryCreateSchema = z.object({
    name: z.string().min(1, "O nome da categoria é obrigatório")
})

export const CategoryUpdateSchema = z.object({
    name: z.string().min(1, "O nome da categoria é obrigatório")
})