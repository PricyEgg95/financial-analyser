import { useState, useEffect } from 'react';
import { analyticsAPI } from '../../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './Analytics.css';

const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];

function Analytics() {
  const [summary, setSummary] = useState(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState(null);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [summaryRes, breakdownRes, trendsRes] = await Promise.all([
        analyticsAPI.getSummary(),
        analyticsAPI.getCategoryBreakdown(),
        analyticsAPI.getMonthlyTrends()
      ]);

      setSummary(summaryRes.data);
      setCategoryBreakdown(breakdownRes.data);
      setMonthlyTrends(trendsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCategoryData = (data, type) => {
    if (!data || !data[type]) return [];
    return Object.entries(data[type]).map(([name, value]) => ({
      name,
      value
    }));
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const incomeData = formatCategoryData(categoryBreakdown, 'income');
  const expenseData = formatCategoryData(categoryBreakdown, 'expense');

  return (
    <div className="analytics">
      <h2>Financial Analytics</h2>

      <div className="grid grid-4">
        <div className="stat-card">
          <div className="stat-label">Total Income</div>
          <div className="stat-value income">${summary?.totalIncome.toFixed(2)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Total Expenses</div>
          <div className="stat-value expense">${summary?.totalExpenses.toFixed(2)}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Balance</div>
          <div className="stat-value balance">${summary?.balance.toFixed(2)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Transactions</div>
          <div className="stat-value">{summary?.transactionCount}</div>
        </div>
      </div>

      <div className="grid grid-2">
        {incomeData.length > 0 && (
          <div className="card">
            <h3 className="card-title">Income by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: $${entry.value.toFixed(2)}`}
                >
                  {incomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {expenseData.length > 0 && (
          <div className="card">
            <h3 className="card-title">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: $${entry.value.toFixed(2)}`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {monthlyTrends.length > 0 && (
        <div className="card">
          <h3 className="card-title">Monthly Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="income" fill="#2ecc71" />
              <Bar dataKey="expense" fill="#e74c3c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Analytics;
