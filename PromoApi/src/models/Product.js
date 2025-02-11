const { query } = require('../config/database/db-poll');

class Product {
    constructor(productRow){
        this.id = productRow.id
        this.name = productRow.name
        this.description = productRow.description
        this.price = +productRow.price
        this.isActive = productRow.is_active
        this.createdAt = new Date(productRow.created_at)
        this.updatedAt = new Date(productRow.updated_at)
    }

    //READ ALL
    static async findAll(){
        const result = await query(`SELECT * FROM products;`)
        return result.rows.map((row) => new Product(row))
    }


    // CREATE
    static async create({name, description, price, isActive }){
        
        const result = await query(
            `INSERT INTO products (name, description, price, is_active) 
            VALUES ($1, $2, $3, $4)
            RETURNING  *`,
            [name, description, price, isActive]
            )
            return new Product(result.rows[0]) // Busca o primeiro registro retornado pelo banco de dados e cria uma instância da classe Product com esses dados.
    }
    
    
    // READ 
    static async findById(id){
        const result= await query(`SELECT * FROM products WHERE id = $1`,[id])
        if (!result.rows[0]) return null
        return new Product(result.rows[0])
    }

    
    //UPDATE
    static async update(id, attributes){
        //Realizado uma consulta posterior a atualizacao
        const {rows} = await query(`SELECT * FROM products WHERE id = $1`,[id])
        
        if (!rows[0]) return null

        const product = new Product(rows[0])

         Object.assign(product, attributes) // Copia todas as propriedades do objeto origem(attributes) para o objeto destino(product).
         product.updatedAt = new Date()

        await query(
            `UPDATE products SET
            name = $1,
            description = $2,
            price = $3,
            is_active = $4,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $5;`,
          [ product.name,
            product.description,
            product.price,
            product.isActive,
            product.id
          ]
        )
        return product
    }

    
    //DELETE 
    static async delete(id){
        await query(`DELETE FROM products WHERE id = $1`, [id])
        return { message: "Product deleted successfully." }
    }
}

module.exports = Product