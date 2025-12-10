import { useState } from 'react';
import { transactionAPI } from '../../services/api';

function TransactionForm({ transaction, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    type: transaction?.type || 'expense',
    category: transaction?.category || '',
    amount: transaction?.amount || '',
    description: transaction?.description || '',
    date: transaction?.date || new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      if (transaction) {
        await transactionAPI.update(transaction.id, data);
      } else {
        await transactionAPI.create(data);
      }

      onSubmit();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save transaction');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-input"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Salary, Food, Rent"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-input"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
