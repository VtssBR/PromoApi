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
exports.AuthService = void 0;
const database_1 = require("../database");
const UsersRequestSchema_1 = require("../controllers/validations/UsersRequestSchema");
const hashUtils_1 = require("../utils/hashUtils");
const tokenUtils_1 = require("../utils/tokenUtils");
class AuthService {
    register(email, password, name, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const validData = UsersRequestSchema_1.UserCreateSchema.parse({ email, password, name, role });
            const emailUser = yield database_1.prisma.user.findUnique({ where: { email } });
            if (emailUser) {
                throw new Error("E-mail já está em uso.");
            }
            const hashedPassword = yield (0, hashUtils_1.hashPassword)(validData.password);
            const newUser = yield database_1.prisma.user.create({
                data: {
                    email: validData.email,
                    password: hashedPassword,
                    name: validData.name,
                    role: validData.role,
                },
            });
            const token = (0, tokenUtils_1.generateToken)(newUser.id, newUser.role);
            return { newUser, token };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prisma.user.findUnique({ where: { email } });
            if (!user)
                throw new Error("Email não encontrado");
            const isPasswordValid = yield (0, hashUtils_1.comparePassword)(password, user.password);
            if (!isPasswordValid)
                throw new Error("Senha inválida");
            const token = (0, tokenUtils_1.generateToken)(user.id, user.role);
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
                token
            };
        });
    }
}
exports.AuthService = AuthService;
