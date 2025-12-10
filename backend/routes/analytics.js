const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analyticsController');

// GET financial summary
router.get('/summary', AnalyticsController.getSummary);

// GET category breakdown
router.get('/category-breakdown', AnalyticsController.getCategoryBreakdown);

// GET monthly trends
router.get('/monthly-trends', AnalyticsController.getMonthlyTrends);

// GET recent transactions
router.get('/recent', AnalyticsController.getRecentTransactions);

module.exports = router;
