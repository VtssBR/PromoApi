const express = require('express');
const router = express.Router();

const productsRouter = require('./products-router.js');

router.use('/products', productsRouter);

module.exports = router;