import { prisma } from "../database";
import { CategoryCreateSchema, CategoryUpdateSchema } from "../controllers/validations/CategorysRequestSchema";

export class CategoryService {
    async getAll() {
        return await prisma.category.findMany();
    }

    async getById(id: string) {
        return await prisma.category.findUnique({ where: { id } });
    }

    async create(data: { name: string }) {
        const validData = CategoryCreateSchema.parse(data);
        return await prisma.category.create({ data: validData });
    }

    async update(id: string, data: { name: string }) {
        const validData = CategoryUpdateSchema.parse(data);
        
        return await prisma.category.update({
            where: { id },
            data: validData,
        });
    }

    async delete(id: string) {
        return await prisma.category.delete({ where: { id } });
    }
}
