import { prisma } from "../database";
import { UserCreateSchema } from "../controllers/validations/UsersRequestSchema";
import { hashPassword, comparePassword } from "../utils/hashUtils";
import { generateToken } from "../utils/tokenUtils";


export class AuthService {

    async register(email: string, password: string, name: string, role: string) {
        const validData = UserCreateSchema.parse({ email, password, name, role });

        const emailUser = await prisma.user.findUnique({ where: { email } });

        if (emailUser) {
            throw new Error("E-mail já está em uso.");
        }

        const hashedPassword = await hashPassword(validData.password);

        const newUser = await prisma.user.create({
            data: {
                email: validData.email,
                password: hashedPassword,
                name: validData.name,
                role: validData.role,
            },
        });

        const token = generateToken(newUser.id);

        return { newUser, token }

    }

    async login(email: string, password: string) {

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Email não encontrado");

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new Error("Senha inválida");

        const token = generateToken(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token
        }
    }
}