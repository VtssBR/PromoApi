const express = require('express')
const productsController = require('../controllers/products-controller')

const router = express.Router()

router.get("/", productsController.index);
router.post("/",productsController.create);
router.get("/:id", productsController.show);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.delete);

module.exports = router