const AnalyticsService = require('../services/analyticsService');

class AnalyticsController {
  static async getSummary(req, res) {
    try {
      const summary = AnalyticsService.getSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCategoryBreakdown(req, res) {
    try {
      const breakdown = AnalyticsService.getCategoryBreakdown();
      res.json(breakdown);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMonthlyTrends(req, res) {
    try {
      const trends = AnalyticsService.getMonthlyTrends();
      res.json(trends);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getRecentTransactions(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const recent = AnalyticsService.getRecentTransactions(limit);
      res.json(recent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AnalyticsController;
