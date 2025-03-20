import { Handler } from "express";
import { ProductService } from "../services/ProductService";
import { cloudinary } from "../utils/cloudinary";
import fs from "fs";

export class ProductController {
    private productService = new ProductService
    // GET: /products
    index: Handler = async (req, res, next) => {
        try {
            const products = await this.productService.getAll();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    };

    // POST: /products
    create: Handler = async (req, res, next) => {
        try {
            let imageUrl = "";
    
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
                fs.unlinkSync(req.file.path);
            }
    
            const newProduct = await this.productService.create({
                ...req.body,
                image: imageUrl,
                price: parseFloat(req.body.price) || 0,
            });
    
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    };

    // GET: /products/:id
    show: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id);
            const product = await this.productService.getById(id);

            if (!product) {
                res.status(404).json({ message: "Produto não encontrado" });
                return;
            }

            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    };

    // UPDATE: /products/:id
    update: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id);
            const updatedProduct = await this.productService.update(id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    };

    // DELETE: /products/:id
    delete: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id);
            await this.productService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
