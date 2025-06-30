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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService;
        //GET: /users
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAll();
                res.status(200).json(users);
            }
            catch (error) {
                next(error);
            }
        });
        //POST /users
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userService.create(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ message: "Erro interno do servidor" });
            }
        });
        //GET: /users/:id
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const user = yield this.userService.getById(id);
                if (!user) {
                    res.status(404).json({ message: "Usuario não encontrado" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
        //UPDATE: /users/:id
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const body = req.body;
                const user = yield this.userService.getById(id);
                if (!user) {
                    res.status(404).json({ message: "Usuario não encontrado" });
                }
                const userUpdate = yield this.userService.update(id, body);
                res.status(200).json(userUpdate);
            }
            catch (error) {
                next(error);
            }
        });
        //DELETE: /users/:id
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const user = yield this.userService.getById(id);
                if (!user) {
                    res.status(404).json({ message: "Usuario não encontrado" });
                }
                const deletedUser = yield this.userService.delete(id);
                res.status(200).json(deletedUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
