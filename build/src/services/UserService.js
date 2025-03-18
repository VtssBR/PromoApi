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
exports.UserService = void 0;
const database_1 = require("../database");
const UsersRequestSchema_1 = require("../controllers/validations/UsersRequestSchema");
class UserService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.user.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.user.findUnique({ where: { id } });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = UsersRequestSchema_1.UserCreateSchema.parse(data);
            const emailUser = yield database_1.prisma.user.findUnique({ where: { email: validData.email } });
            if (emailUser) {
                throw new Error("E-mail já está em uso.");
            }
            return yield database_1.prisma.user.create({ data: validData });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = UsersRequestSchema_1.UserUpdateSchema.parse(data);
            return yield database_1.prisma.user.update({ where: { id }, data: validData });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.prisma.user.delete({ where: { id } });
        });
    }
}
exports.UserService = UserService;
