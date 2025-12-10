const TransactionService = require('../services/transactionService');

class TransactionController {
  static async getAll(req, res) {
    try {
      const { type, category, startDate, endDate } = req.query;
      
      let transactions;
      if (type || category || startDate || endDate) {
        transactions = TransactionService.filterTransactions({
          type,
          category,
          startDate,
          endDate
        });
      } else {
        transactions = TransactionService.getAllTransactions();
      }
      
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const transaction = TransactionService.getTransactionById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const transaction = TransactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const transaction = TransactionService.updateTransaction(
        req.params.id,
        req.body
      );
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const success = TransactionService.deleteTransaction(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TransactionController;
