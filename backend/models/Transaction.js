class Transaction {
  constructor(id, type, category, amount, description, date) {
    this.id = id;
    this.type = type; // 'income' or 'expense'
    this.category = category;
    this.amount = amount;
    this.description = description;
    this.date = date;
  }

  static validate(data) {
    if (!data.type || !['income', 'expense'].includes(data.type)) {
      throw new Error('Invalid transaction type');
    }
    if (!data.category || typeof data.category !== 'string') {
      throw new Error('Category is required');
    }
    if (data.amount == null || typeof data.amount !== 'number' || data.amount <= 0) {
      throw new Error('Amount must be a positive number');
    }
    if (!data.description || typeof data.description !== 'string') {
      throw new Error('Description is required');
    }
    if (!data.date) {
      throw new Error('Date is required');
    }
    return true;
  }
}

module.exports = Transaction;
