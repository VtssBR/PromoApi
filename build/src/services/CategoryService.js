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
exports.CategoryService = void 0;
const database_1 = require("../database");
const CategorysRequestSchema_1 = require("../controllers/validations/CategorysRequestSchema");
class CategoryService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.category.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.category.findUnique({ where: { id } });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = CategorysRequestSchema_1.CategoryCreateSchema.parse(data);
            return yield database_1.prisma.category.create({ data: validData });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = CategorysRequestSchema_1.CategoryUpdateSchema.parse(data);
            return yield database_1.prisma.category.update({
                where: { id },
                data: validData,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.category.delete({ where: { id } });
        });
    }
}
exports.CategoryService = CategoryService;
