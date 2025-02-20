import { Handler } from "express";
import { AuthService } from "../services/AuthService";



export class AuthController {

    private authService = new AuthService();

    register: Handler = async (req, res, next) => {
        try {
            const { name, password, email, role } = req.body
            const { newUser, token } = await this.authService.register(email, password, name, role);
            
            res.status(201).json({ user: { id: newUser.id, name: newUser.name, role: newUser.role }, token });

        } catch (error: any) {
            if (error.message.includes("E-mail já está em uso")) {
                res.status(400).json({ message: "E-mail já está em uso." });
            } else {
                res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }

    login: Handler = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.authService.login(email, password);

            res.status(200).json({ user: { id: user.id, name: user.name, role: user.role }, token });

        } catch (error: any) {
            if (error.message.includes("Email não encontrado")) {
                res.status(400).json({ message: "Email não encontrado" });
            } else if (error.message.includes("Senha inválida")) {
                res.status(400).json({ message: "Senha inválida" });
            } else {
                res.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }

}
