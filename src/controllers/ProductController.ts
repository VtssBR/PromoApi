import { Handler } from "express";
import { ProductService } from "../services/ProductService";
import { ImageUploadService } from '../services/ImageUploadService';

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
            let imageUrl = '';
            let publicId = '';
            console.log("req.body:", req.body);
            console.log("req.file:", req.file);

            if (req.file) {
                try {
                    const result = await ImageUploadService.processImage(req.file.path);
                    imageUrl = result.imageUrl;
                    publicId = result.publicId;
                } catch (error) {
                    res.status(400).json({
                        error: error instanceof Error ? error.message : 'Erro ao processar imagem.',
                    });
                    return;
                }
            }

            const newProduct = await this.productService.create({
                ...req.body,
                image: imageUrl,
                publicId: publicId,
                price: parseFloat(req.body.price) || 0,
                latitude: parseFloat(req.body.latitude),
                longitude: parseFloat(req.body.longitude),
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
          const { publicId } = req.query;
          const id = String(req.params.id);
      
          await this.productService.deleteProductAndImage(id, String(publicId));
          res.status(204).send();
        } catch (error) {
          next(error);
        }
    };
}
