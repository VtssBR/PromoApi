import {z} from "zod"

export const UserCreateSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string(),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.string()
});

export const UserUpdateSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    email: z.string().optional(),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional(),
})