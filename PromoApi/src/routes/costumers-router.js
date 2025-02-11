const express = require('express')
const costumerController = require('../controllers/costumers-controller')

const router = express.Router()

router.get("/", costumerController.index());
router.post('/', costumerController.create());
router.get('/:id', costumerController.show());
router.put('/:id', costumerController.update());
router.delete('/:id', costumerController.delete());

module.exports = router