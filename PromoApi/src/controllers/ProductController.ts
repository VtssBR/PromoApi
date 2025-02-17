import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { ProductCreateSchema, ProductUpdateSchema } from "../validations/ProductsRequestSchema";

export class ProductController {

    //GET: /products
    index: Handler = async (req, res, next) => {
        try {
           const products = await prisma.product.findMany()
           res.status(200).json(products)

        } catch (error) {
            next(error)
        }
    }

    //POST /products
    create: Handler = async (req, res, next) => {
        try {
            const body = ProductCreateSchema.parse(req.body);

            const newProduct = await prisma.product.create({
                data: body
            });

            res.status(200).json(newProduct)

        } catch (error) {
            next(error)
        }
    }

    //GET: /products/:id
    show: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)

            const productId = await prisma.product.findUnique({where:{id}})

            if(!productId) throw new HttpError(404,"Produto nao encontrado")

            res.status(200).json(productId)

        } catch (error) {
            next(error)
        }
    }

    //UPDATE: /products/:id
    update: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)
            const body = ProductUpdateSchema.parse(req.body)

            const productExist = await prisma.product.findUnique({where:{id}})

            if(!productExist) throw new HttpError(404,"Produto nao encontrado")
                
            const productUpdate = await prisma.product.update({ data: body, where: { id } })

            res.status(200).json(productUpdate)

        } catch (error) {
            next(error)
        }
    }

    //DELETE: /products/:id
    delete: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)

            const productExist = await prisma.product.findUnique({where:{id}})

            if(!productExist) throw new HttpError(404,"Produto nao encontrado")

            const deletedProduct = await prisma.product.delete({where:{id}})

            res.status(200).json(deletedProduct)

        } catch (error) {
            next(error)
        }
    }

}