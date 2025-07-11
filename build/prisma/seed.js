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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const categorias = [
            { name: 'Eletrônicos e Computadores' },
            { name: 'Saúde e Beleza' },
            { name: 'Moda e Acessórios' },
            { name: 'Casa e Móveis' },
            { name: 'Esportes e Lazer' },
            { name: 'Alimentos e Bebidas' },
            { name: 'Viagens e Turismo' },
            { name: 'Brinquedos e Jogos' },
            { name: 'Automotivo' },
            { name: 'Produtos para Animais' },
        ];
        for (const categoria of categorias) {
            yield prisma.category.create({ data: categoria });
        }
        console.log('Categorias criadas com sucesso!');
    });
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
