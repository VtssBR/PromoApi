const express = require('express');
const router = express.Router();

const productsRouter = require('./products-router.js');
const costumerRouter = require('./costumers-router.js');

router.use('/products', productsRouter);
router.use('/costumer', costumerRouter);


module.exports = router;