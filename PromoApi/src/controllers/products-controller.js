const Product = require('../models/Product.js')

const productsController = {
    //GET: /products
    index: async (req, res) => {
        try {
            const products = await Product.findAll()
            res.status(200).json(products)
          } catch (error) {
            res.status(500).json({ message: "Erro interno ao buscar produtos" })
            console.error("Erro ao buscar produtos:")
          }
    },
    
    
    //POST: /products
    create: async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json(newProduct);
          } catch (error) {
            res.status(500).json({ message: "Erro ao criar produto" })
            console.error("Erro ao criar produto:");
          }
    },
    
    
    // GET: /products/:id
    show: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: "Produto nao encontrado!" });
            }
            res.json(product);
          } catch (error) {
            console.error("Erro interno ao buscar o produto por ID.");

            return res.status(500).json({ message: "Erro interno ao buscar o produto por ID."});
          }
    },
    
    
    //PUT: /products/:id
    update: async (req, res) => {
        try {
            const updateProduct = await Product.update(req.params.id, req.body);

            if (!updateProduct) {
                return res.status(404).json({ message: "Produto nao encontrado!" });
            }
            res.json(updateProduct);
          } catch (error) {
            console.error("Erro ao atualizar produto:");

            return res.status(500).json({ message: "Erro interno ao atualizar o produto." });
          }
    },
    
    
    // DELETE: /products/:id
    delete: async (req, res) => {
        try {
            const deleteProduct = await Product.delete(req.params.id);

            if (!deleteProduct) {
                return res.status(404).json({ message: "Produto nao encontrado!" });
            }
            res.json(deleteProduct);
          } catch (error) {
            console.error("Erro ao deletar produto:");

            return res.status(500).json({ message: "Erro interno ao deletar o produto." });
          }
    }
}

module.exports = productsController