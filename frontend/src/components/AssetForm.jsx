import { useState } from 'react';
import './AssetForm.css';

function AssetForm() {
  const [formData, setFormData] = useState({
    type: 'action',
    name: '',
    quantity: '',
    averagePrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: This will be connected to state management later
    console.log('Asset data:', formData);
    alert('Fonctionnalité en développement: Les données seront enregistrées prochainement');
  };

  return (
    <form className="asset-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="type">Type d'actif</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="action">Action</option>
          <option value="etf">ETF</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">Nom / Ticker</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="ex: AAPL, MSFT, CW8"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantité</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="ex: 10"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="averagePrice">Prix d'achat moyen (€)</label>
        <input
          type="number"
          id="averagePrice"
          name="averagePrice"
          value={formData.averagePrice}
          onChange={handleChange}
          placeholder="ex: 150.50"
          min="0"
          step="0.01"
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Ajouter l'actif
      </button>
    </form>
  );
}

export default AssetForm;
