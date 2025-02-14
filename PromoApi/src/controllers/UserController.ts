import { Handler } from "express";
import { prisma } from "../database";
import { UserCreateSchema, UserUpdateSchema } from "../validations/UsersRequestSchema.ts";
import { HttpError } from "../errors/HttpError";

export class UserController {

    //GET: /users
    index: Handler = async (req, res, next) => {
        try {
            const users = await prisma.user.findMany()
            res.status(200).json(users)
            
        } catch (error) {
            next(error)
        }
    }

    //POST /users
    create: Handler = async (req, res, next) => {
        try {
            const body = UserCreateSchema.parse(req.body);

            const newUser = await prisma.user.create({
                data: body
            });

            res.status(201).json(newUser)

        } catch (error) {
            next(error)
        }
    }

    //GET: /users/:id
    show: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)

            const user = await prisma.user.findUnique({ where: {id}})
            
            if (!user) throw new HttpError(404, "Usuario não encontrado")
            
            res.status(200).json(user)

        } catch (error) {
            next(error)
        }
    }

    //UPDATE: /users/:id
    update: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)
            const body = UserUpdateSchema.parse(req.body)

            const userExists = await prisma.user.findUnique({ where: { id } })

            if (!userExists) throw new HttpError(404, "Usuario não encontrado")

            const userUpdate = await prisma.user.update({ data: body, where: { id }})

            res.status(200).json(userUpdate)

        } catch (error) {
            next(error)
        }
    }

    //DELETE: /users/:id
    delete: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)
            
            const userExists = await prisma.user.findUnique({ where: { id } })
            if (!userExists) throw new HttpError(404, "Usuario não encontrado")

            const deletedUser = await prisma.user.delete({where:{id}})

            res.status(200).json(deletedUser)

        } catch (error) {
            next(error)
        }
    }

}