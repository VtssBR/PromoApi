"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = require("../database");
const ProductsRequestSchema_1 = require("../controllers/validations/ProductsRequestSchema");
const cloudinary_1 = require("../utils/cloudinary");
class ProductService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.product.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.product.findUnique({ where: { id } });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = ProductsRequestSchema_1.ProductCreateSchema.parse(data);
            return yield database_1.prisma.product.create({ data: validData });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = ProductsRequestSchema_1.ProductUpdateSchema.parse(data);
            return yield database_1.prisma.product.update({ where: { id }, data: validData });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.product.delete({ where: { id } });
        });
    }
    deleteProductAndImage(id, publicId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (publicId) {
                yield cloudinary_1.cloudinary.uploader.destroy(publicId);
            }
            yield this.delete(id);
        });
    }
    deleteExpiredProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const expiredProducts = yield database_1.prisma.product.findMany({
                where: {
                    expiresAt: {
                        lt: now,
                    },
                },
            });
            for (const product of expiredProducts) {
                yield this.deleteProductAndImage(product.id, product.publicId);
            }
            console.log(`[CRON] ${expiredProducts.length} produtos expirados foram deletados.`);
        });
    }
}
exports.ProductService = ProductService;
