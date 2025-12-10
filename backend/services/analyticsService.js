const TransactionService = require('../services/transactionService');

class AnalyticsService {
  static getSummary() {
    const transactions = TransactionService.getAllTransactions();
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    return {
      totalIncome,
      totalExpenses,
      balance,
      transactionCount: transactions.length
    };
  }

  static getCategoryBreakdown() {
    const transactions = TransactionService.getAllTransactions();
    const breakdown = { income: {}, expense: {} };
    
    transactions.forEach(t => {
      if (!breakdown[t.type][t.category]) {
        breakdown[t.type][t.category] = 0;
      }
      breakdown[t.type][t.category] += t.amount;
    });
    
    return breakdown;
  }

  static getMonthlyTrends() {
    const transactions = TransactionService.getAllTransactions();
    const trends = {};
    
    transactions.forEach(t => {
      const monthKey = t.date.substring(0, 7); // YYYY-MM
      if (!trends[monthKey]) {
        trends[monthKey] = { income: 0, expense: 0 };
      }
      trends[monthKey][t.type] += t.amount;
    });
    
    // Convert to array and calculate balance
    return Object.entries(trends).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense
    })).sort((a, b) => a.month.localeCompare(b.month));
  }

  static getRecentTransactions(limit = 5) {
    const transactions = TransactionService.getAllTransactions();
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }
}

module.exports = AnalyticsService;
