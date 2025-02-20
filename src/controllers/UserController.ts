import { Handler } from "express";
import { UserService } from "../services/UserService";

export class UserController {

    private userService = new UserService

    //GET: /users
    index: Handler = async (req, res, next) => {
        try {
            const users = await this.userService.getAll();
            res.status(200).json(users)

        } catch (error) {
            next(error)
        }
    }

    //POST /users
    create: Handler = async (req, res, next) => {
        try {
            
            const newUser = await this.userService.create(req.body);

            res.status(201).json(newUser)

        } catch (error: any) {
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    //GET: /users/:id
    show: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)

            const user = await this.userService.getById(id);

            if (!user) {
                res.status(404).json({ message: "Usuario não encontrado" })
            }

            res.status(200).json(user)

        } catch (error) {
            next(error)
        }
    }

    //UPDATE: /users/:id
    update: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)
            const body = req.body

            const user = await this.userService.getById(id);

            if (!user) {
                res.status(404).json({ message: "Usuario não encontrado" })
            }

            const userUpdate = await this.userService.update(id, body)

            res.status(200).json(userUpdate)

        } catch (error) {
            next(error)
        }
    }

    //DELETE: /users/:id
    delete: Handler = async (req, res, next) => {
        try {
            const id = String(req.params.id)

            const user = await this.userService.getById(id);

            if (!user) {
                res.status(404).json({ message: "Usuario não encontrado" })
            }

            const deletedUser = await this.userService.delete(id)

            res.status(200).json(deletedUser)

        } catch (error) {
            next(error)
        }
    }

}