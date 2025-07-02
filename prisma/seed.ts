import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

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
    const exists = await prisma.category.findUnique({
      where: { name: categoria.name },
    });

    if (!exists) {
      await prisma.category.create({ data: categoria });
    }
  }

  console.log('Categorias criadas com sucesso!');


  const adminEmail = String(process.env.ADMIN_EMAIL);

  const password = String(process.env.ADMIN_PASSWORD);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe. Nenhuma ação necessária.');
  }
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
