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
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor() {
        this.authService = new AuthService_1.AuthService();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password, email, role } = req.body;
                const { newUser, token } = yield this.authService.register(email, password, name, role);
                res.status(201).json({ user: { id: newUser.id, name: newUser.name, role: newUser.role }, token });
            }
            catch (error) {
                if (error.message.includes("E-mail já está em uso")) {
                    res.status(400).json({ message: "E-mail já está em uso." });
                }
                else {
                    res.status(500).json({ message: "Erro interno do servidor" });
                }
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Corpo da requisição:", req.body);
                const { email, password } = req.body;
                const { user, token } = yield this.authService.login(email, password);
                res.status(200).json({ user: { id: user.id, name: user.name, role: user.role }, token });
            }
            catch (error) {
                if (error.message.includes("Email não encontrado")) {
                    res.status(400).json({ message: "Email não encontrado" });
                }
                else if (error.message.includes("Senha inválida")) {
                    res.status(400).json({ message: "Senha inválida" });
                }
                else {
                    res.status(500).json({ message: "Erro interno do servidor" });
                }
            }
        });
    }
}
exports.AuthController = AuthController;
