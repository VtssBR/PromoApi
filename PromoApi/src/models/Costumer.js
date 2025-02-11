const { query } = require('../config/database/db-poll')

class Costumer {
    constructor(CostumerRow){
        this.id = CostumerRow.id,
        this.name = CostumerRow.name,
        this.email = CostumerRow.email,
        this.password = CostumerRow.password,
        this.createdAt = new Date(productRow.created_at)
        this.updatedAt = new Date(productRow.updated_at)
    }

    //READALL
    static async findAll(){
        const result = await query(`SELECT * FROM costumers;`)
        return result.rows.map((row) => new Costumer(row))
    }


    //CREATE
    static async create({name, email, password,}){
        const result = await query(
        `INSERT INTO costumers (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING*;`,
        [name, email, password])
        return new Costumer(result.rows[0]) // Busca o primeiro registro retornado pelo banco de dados e cria uma instância da classe Product com esses dados.
        
    }

    //READ
    static async findById(id){
        const result = await query(`SELECT * FROM costumers WHERE id = $1;`,[id])
        if (!result.rows[0]) return null
        return new Costumer(result.rows[0])

    }


    //UPDATE
    static async update(id, attributes){
        const {rows} = await query(`SELECT * FROM costumers WHERE id = $1`,[id])
        
        if (!rows[0]) return null

        const costumer = new Costumer(rows[0])

        Object.assign(costumer, attributes) // Copia todas as propriedades do objeto origem(attributes) para o objeto destino(costumer).
        costumer.updatedAt = new Date()


        await query(`UPDATE costumers SET
            name = $1,
            email = $2,
            password =$3,
            update-at = CURRENT_TIMESTAMP
            WHERE id = $5;
            `,
            [
            costumer.name,
            costumer.email,
            costumer.password,
            costumer.id
            ]
        )
        return costumer
        
    }

    //DELETE
    static async delete(id){
        await query(`DELETE FROM costumers WHERE id =$1;`,[id])
        return { message: "Product deleted successfully." }
    }

}

module.exports = Costumer