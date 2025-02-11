const Costumer = require('../models/Costumer.js')

const costumerController = {
    // GET: /costumer
    index: async(req,res) => {
        try {
        const costumers = await Costumer.findAll()
        res.status(200).json(costumers)
        } catch (error) {
                
        }
    },
    
    // POST: /costumer
    create: async(req,res) => {
        try {
            const newCostumer = await Costumer.create(req.body);
            res.status(201).json(newCostumer);
          } catch (error) {
            res.status(500).json({ message: "Erro ao criar Cliente" })
            console.error("Erro ao criar Cliente");
          }
    },
    
    // GET: /costumer/:id
    show: async(req,res) => {
        try {
            const costumer = await Costumer.findById(req.params.id);

            if (!costumer) {
                return res.status(404).json({ message: "Cliente nao encontrado!" });
            }
            res.json(costumer);
          } catch (error) {
            console.error("Erro interno ao buscar o Cliente por ID.");

            return res.status(500).json({ message: "Erro interno ao buscar o Cliente por ID."});
          }
    },
    
    //PUT: /costumer/:id
    update: async(req,res) => {
        try {
            const updateCostumer = await Costumer.update(req.params.id, req.body);

            if (!updateCostumer) {
                return res.status(404).json({ message: "Cliente nao encontrado!" });
            }
            res.json(updateCostumer);
          } catch (error) {
            console.error("Erro ao atualizar Cliente:");

            return res.status(500).json({ message: "Erro interno ao atualizar o Cliente." });
          }
    },
    
    //DELETE: /costumer/:id
    delele: async(req,res) => {
        try {
            const deleteCostumer = await Costumer.delete(req.params.id);

            if (!deleteCostumer) {
                return res.status(404).json({ message: "Cliente nao encontrado!" });
            }
            res.json(deleteCostumer);
          } catch (error) {
            console.error("Erro ao deletar Cliente:");

            return res.status(500).json({ message: "Erro interno ao deletar o Cliente." });
          }
    }
    
}

module.exports = costumerController