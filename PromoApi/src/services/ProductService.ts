import { prisma } from "../database";
import { ProductCreateSchema, ProductUpdateSchema } from "../controllers/validations/ProductsRequestSchema";

export class ProductService {
    async getAll() {
        return await prisma.product.findMany();
    }

    async getById(id: string) {
        return await prisma.product.findUnique({ where: { id } });
    }

    async create(data: any) {
        const validData = ProductCreateSchema.parse(data);
        return await prisma.product.create({ data: validData });
    }

    async update(id: string, data: any) {
        const validData = ProductUpdateSchema.parse(data);
        return await prisma.product.update({ where: { id }, data: validData });
    }

    async delete(id: string) {
        return await prisma.product.delete({ where: { id } });
    }
}