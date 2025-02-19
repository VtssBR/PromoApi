import { Handler } from "express";
import { CategoryService } from "../services/CategoryService";


export class CategoryController {

    private categoryService = new CategoryService();

    //GET: /categorys
    index: Handler = async (req, res, next) => {
        try {
            const categories = await this.categoryService.getAll();
            res.status(200).json(categories)

        } catch (error) {
            next(error)
        }
    }

    //POST /categorys
    create: Handler = async (req, res, next) => {
        try {

            const newCategory = await this.categoryService.create(req.body);
            
            res.status(200).json(newCategory)
        } catch (error) {
            next(error)
        }
    }

    //GET: /categorys/:id
    show: Handler = async (req, res, next) => {
        try {

            const id = String(req.params.id)

            const categoryId = await this.categoryService.getById(id);

            if (!categoryId) {
                res.status(404).json({ message: "Categoria não encontrada" });
                return;
            }

            res.status(200).json(categoryId)

        } catch (error) {
            next(error)
        }
    }

    //UPDATE: /products/:id
    update: Handler = async (req, res, next) => {
        try {

            const id = String(req.params.id)

            const categoryId = await this.categoryService.getById(id);

            if (!categoryId) {
                res.status(404).json({ message: "Categoria não encontrada" });
                return;
            }

            const updatedCategory = await this.categoryService.update(id, req.body);

            res.status(200).json(updatedCategory)

        } catch (error) {
            next(error)
        }
    }

    //DELETE: /products/:id
    delete: Handler = async (req, res, next) => {
        try {

            const id = String(req.params.id)

            const categoryId = await this.categoryService.getById(id);

            if (!categoryId) {
                res.status(404).json({ message: "Categoria não encontrada" });
                return;
            }

            const deletedCategory = await this.categoryService.delete(id);

            res.status(200).json(deletedCategory)

        } catch (error) {
            next(error)
        }
    }


}