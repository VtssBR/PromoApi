import { prisma } from "../database";
import { UserCreateSchema, UserUpdateSchema } from "../controllers/validations/UsersRequestSchema";

export class UserService {
    async getAll() {
        return await prisma.user.findMany();
    }

    async getById(id: string) {
        return await prisma.user.findUnique({ where: { id } });
    }

    async create(data: any) {
        const validData = UserCreateSchema.parse(data);
        const emailUser = await prisma.user.findUnique({ where: { email: validData.email } });

        if (emailUser) {
            throw new Error("E-mail já está em uso.");
        }

        return await prisma.user.create({ data: validData });
    }

    async update(id: string, data: any) {
        const validData = UserUpdateSchema.parse(data);
        return await prisma.user.update({ where: { id }, data: validData });
    }

    async delete(id: string) {
        return await prisma.user.delete({ where: { id } });
    }
}

