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
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
class ProductController {
    constructor() {
        this.productService = new ProductService_1.ProductService;
        // GET: /products
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getAll();
                res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
        // POST: /products
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield this.productService.create(req.body);
                res.status(201).json(newProduct);
            }
            catch (error) {
                next(error);
            }
        });
        // GET: /products/:id
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const product = yield this.productService.getById(id);
                if (!product) {
                    res.status(404).json({ message: "Produto não encontrado" });
                    return;
                }
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
        // UPDATE: /products/:id
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                const updatedProduct = yield this.productService.update(id, req.body);
                res.status(200).json(updatedProduct);
            }
            catch (error) {
                next(error);
            }
        });
        // DELETE: /products/:id
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = String(req.params.id);
                yield this.productService.delete(id);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
