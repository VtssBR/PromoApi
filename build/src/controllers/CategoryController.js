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
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
class CategoryController {
    constructor() {
        this.categoryService = new CategoryService_1.CategoryService();
        //GET: /categorys
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.getAll();
                res.status(200).json(categories);
            }
            catch (error) {
                next(error);
            }
        });
        //POST /categorys
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = yield this.categoryService.create(req.body);
                res.status(200).json(newCategory);
            }
            catch (error) {
                next(error);
            }
        });
        //GET: /categorys/:id
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const categoryId = yield this.categoryService.getById(id);
                if (!categoryId) {
                    res.status(404).json({ message: "Categoria não encontrada" });
                    return;
                }
                res.status(200).json(categoryId);
            }
            catch (error) {
                next(error);
            }
        });
        //UPDATE: /products/:id
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const categoryId = yield this.categoryService.getById(id);
                if (!categoryId) {
                    res.status(404).json({ message: "Categoria não encontrada" });
                    return;
                }
                const updatedCategory = yield this.categoryService.update(id, req.body);
                res.status(200).json(updatedCategory);
            }
            catch (error) {
                next(error);
            }
        });
        //DELETE: /products/:id
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const categoryId = yield this.categoryService.getById(id);
                if (!categoryId) {
                    res.status(404).json({ message: "Categoria não encontrada" });
                    return;
                }
                const deletedCategory = yield this.categoryService.delete(id);
                res.status(200).json(deletedCategory);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
