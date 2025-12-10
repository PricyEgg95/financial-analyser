const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

// GET all transactions (with optional filters)
router.get('/', TransactionController.getAll);

// GET a specific transaction
router.get('/:id', TransactionController.getById);

// POST create a new transaction
router.post('/', TransactionController.create);

// PUT update a transaction
router.put('/:id', TransactionController.update);

// DELETE a transaction
router.delete('/:id', TransactionController.delete);

module.exports = router;
