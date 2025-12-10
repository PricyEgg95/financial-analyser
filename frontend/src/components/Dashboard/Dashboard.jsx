import { useState, useEffect } from 'react';
import { analyticsAPI } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryRes, recentRes, trendsRes] = await Promise.all([
        analyticsAPI.getSummary(),
        analyticsAPI.getRecentTransactions(5),
        analyticsAPI.getMonthlyTrends()
      ]);

      setSummary(summaryRes.data);
      setRecentTransactions(recentRes.data);
      setMonthlyTrends(trendsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      
      <div className="grid grid-3">
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
      </div>

      {monthlyTrends.length > 0 && (
        <div className="card chart-card">
          <h3 className="card-title">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#2ecc71" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#e74c3c" strokeWidth={2} />
              <Line type="monotone" dataKey="balance" stroke="#3498db" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="card">
        <h3 className="card-title">Recent Transactions</h3>
        {recentTransactions.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <span className={transaction.type}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className={transaction.type}>
                    ${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
