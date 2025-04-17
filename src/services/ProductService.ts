import { prisma } from "../database";
import { ProductCreateSchema, ProductUpdateSchema } from "../controllers/validations/ProductsRequestSchema";
import { cloudinary } from "../utils/cloudinary";

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

    async deleteProductAndImage(id: string, publicId: string | null) {
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
        await this.delete(id);
    }

    async deleteExpiredProducts() {
        const now = new Date();
        const expiredProducts = await prisma.product.findMany({
          where: {
            expiresAt: {
              lt: now,
            },
          },
        });
    
        for (const product of expiredProducts) {
          await this.deleteProductAndImage(product.id, product.publicId);
        }
    
        console.log(`[CRON] ${expiredProducts.length} produtos expirados foram deletados.`);
      }
    }
