import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    
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
    await prisma.category.create({ data: categoria });
  }

  console.log('Categorias criadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
