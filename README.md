# PromoDomo API

Este repositório contém a API do projeto **PromoDomo**, uma plataforma colaborativa de promoções. O objetivo da aplicação é fornecer uma interface segura, escalável e de fácil manutenção para cadastrar, buscar e gerenciar promoções enviadas por usuários.

## Tecnologias Utilizadas

- **Node.js** com **Express** – Estrutura principal do servidor
- **PostgreSQL** – Banco de dados relacional
- **Prisma ORM** – Manipulação de dados com tipagem e segurança
- **JWT (jsonwebtoken)** – Autenticação baseada em token
- **Zod** – Validação de dados da aplicação
- **Multer + Cloudinary** – Upload e armazenamento de imagens
- **BcryptJS** – Criptografia de senhas
- **Dotenv** – Gerenciamento de variáveis de ambiente
- **Node-cron** – Agendamento de tarefas automáticas
- **SightEngine** - Moderação de imagens

### Estrutura do Projeto 

```
/src
├── controllers     # Lógica das rotas
├── middlewares     # Middlewares de autenticação, validação etc.
├── routes          # Rotas da API
├── services        # Contém as regras de negócio
├── utils           # Agendadores, helpers
├── prisma          # Esquema e client do banco de dados
```

---

## Endpoints da API

> Base URL: `/api`

### Users (`/api/users`)
| Método  | Endpoint        | Descrição                            |
|---------|------------------|----------------------------------------|
| GET     | `/`              | Lista todos os usuários                |
| POST    | `/`              | Cria um novo usuário                   |
| GET     | `/:id`           | Retorna os dados de um usuário         |
| PUT     | `/:id`           | Atualiza os dados de um usuário        |
| DELETE  | `/:id`           | Remove um usuário                      |

### Products (`/api/products`)
| Método  | Endpoint        | Descrição                                             |
|---------|------------------|---------------------------------------------------------|
| GET     | `/`              | Lista todas as promoções                              |
| POST    | `/`              | Cria uma nova promoção (autenticado, com upload)      |
| GET     | `/:id`           | Retorna os dados de uma promoção                      |
| PUT     | `/:id`           | Atualiza uma promoção                                 |
| DELETE  | `/:id`           | Remove uma promoção (autenticado e admin)            |

### Categories (`/api/categories`)
| Método  | Endpoint        | Descrição                            |
|---------|------------------|----------------------------------------|
| GET     | `/`              | Lista todas as categorias              |
| POST    | `/`              | Cria uma nova categoria                |
| GET     | `/:id`           | Retorna os dados de uma categoria      |
| PUT     | `/:id`           | Atualiza uma categoria                 |
| DELETE  | `/:id`           | Remove uma categoria                   |

### Authentication (`/api/authentication`)
| Método  | Endpoint        | Descrição                            |
|---------|------------------|----------------------------------------|
| POST    | `/login`         | Realiza login e retorna token JWT     |
| POST    | `/register`      | Realiza o cadastro de um novo usuário |
