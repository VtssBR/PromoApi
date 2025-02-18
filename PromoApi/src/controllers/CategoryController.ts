import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CategoryCreateSchema, CategoryUpdateSchema} from "../validations/CategorysRequestSchema";



export class CategoryController {

    //GET: /categorys
    index: Handler = async (req, res, next) => {
        try {
            const categorys = await prisma.category.findMany()
            res.status(200).json(categorys)

        } catch (error) {
            next(error)
        }
    }

    //POST /categorys
    create: Handler = async (req, res, next) => {
        try {
            const body = CategoryCreateSchema.parse(req.body)

            const newCategory = await prisma.category.create({
                data:body
            });
            res.status(200).json(newCategory)
        } catch (error) {
            next(error)
        }
    }

    //GET: /categorys/:id
    show: Handler = async (req, res, next) => {
        try {

            const id = String(req.params.id)

            const categoryId = await prisma.category.findUnique({where:{id}})

            if(!categoryId) throw new HttpError(404,"Categoria nao encontrado")

            res.status(200).json(categoryId)

        } catch (error) {
            next(error)
        }
    }

    //UPDATE: /products/:id
    update: Handler = async (req, res, next) => {
        try {

            const id = String(req.params.id)
            const body = CategoryUpdateSchema.parse(req.body)

            const categoryId = await prisma.category.findUnique({where:{id}})

            if(!categoryId) throw new HttpError(404,"Categoria nao encontrado")

            const updatedCategory = await prisma.category.update({ data: body, where: { id } })

            res.status(200).json(updatedCategory)

        } catch (error) {
            next(error)
        }
    }

    //DELETE: /products/:id
    delete: Handler = async (req, res, next) => {
        try {

            const id = String(req.params.id)

            const categoryId = await prisma.category.findUnique({where:{id}})

            if(!categoryId) throw new HttpError(404,"Categoria nao encontrado")

            const deletedCategory = await prisma.category.delete({where: {id}})

            res.status(200).json(deletedCategory)
            
        } catch (error) {
            next(error)
        }
    }


}