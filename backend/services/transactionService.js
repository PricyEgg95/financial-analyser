const Transaction = require('../models/Transaction');

// In-memory storage (replace with a real database in production)
let transactions = [
  {
    id: 1,
    type: 'income',
    category: 'Salary',
    amount: 5000,
    description: 'Monthly salary',
    date: '2025-12-01'
  },
  {
    id: 2,
    type: 'expense',
    category: 'Food',
    amount: 150,
    description: 'Groceries',
    date: '2025-12-02'
  },
  {
    id: 3,
    type: 'expense',
    category: 'Transportation',
    amount: 50,
    description: 'Gas',
    date: '2025-12-03'
  }
];

let nextId = 4;

class TransactionService {
  static getAllTransactions() {
    return transactions;
  }

  static getTransactionById(id) {
    return transactions.find(t => t.id === parseInt(id));
  }

  static createTransaction(data) {
    const normalizedData = {
      ...data,
      amount: typeof data.amount === 'number' ? data.amount : parseFloat(data.amount)
    };
    Transaction.validate(normalizedData);
    const transaction = {
      id: nextId++,
      type: normalizedData.type,
      category: normalizedData.category,
      amount: normalizedData.amount,
      description: normalizedData.description,
      date: normalizedData.date
    };
    transactions.push(transaction);
    return transaction;
  }

  static updateTransaction(id, data) {
    const index = transactions.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      return null;
    }
    const normalizedData = {
      ...data,
      amount: typeof data.amount === 'number' ? data.amount : parseFloat(data.amount)
    };
    Transaction.validate(normalizedData);
    transactions[index] = {
      ...transactions[index],
      type: normalizedData.type,
      category: normalizedData.category,
      amount: normalizedData.amount,
      description: normalizedData.description,
      date: normalizedData.date
    };
    return transactions[index];
  }

  static deleteTransaction(id) {
    const index = transactions.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      return false;
    }
    transactions.splice(index, 1);
    return true;
  }

  static filterTransactions(filters) {
    let result = transactions;
    
    if (filters.type) {
      result = result.filter(t => t.type === filters.type);
    }
    
    if (filters.category) {
      result = result.filter(t => t.category === filters.category);
    }
    
    if (filters.startDate) {
      result = result.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }
    
    if (filters.endDate) {
      result = result.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }
    
    return result;
  }
}

module.exports = TransactionService;
