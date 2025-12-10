import { useState } from 'react';
import AssetDetail from './AssetDetail';
import './AssetTable.css';

function AssetTable() {
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Placeholder data - will be replaced with real data later
  const assets = [
    {
      id: 1,
      type: 'Action',
      name: 'AAPL',
      quantity: 10,
      averagePrice: 150.50,
      currentPrice: 175.25,
      purchaseDate: '2024-01-15',
      purchaseCount: 3,
    },
    {
      id: 2,
      type: 'ETF',
      name: 'CW8',
      quantity: 20,
      averagePrice: 420.00,
      currentPrice: 445.80,
      purchaseDate: '2023-11-20',
      purchaseCount: 5,
    },
    {
      id: 3,
      type: 'Action',
      name: 'MSFT',
      quantity: 5,
      averagePrice: 320.00,
      currentPrice: 350.00,
      purchaseDate: '2024-03-10',
      purchaseCount: 2,
    },
  ];

  const handleRowClick = (asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseDetail = () => {
    setSelectedAsset(null);
  };

  const calculateTotal = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const calculateGain = (quantity, averagePrice, currentPrice) => {
    const gain = quantity * (currentPrice - averagePrice);
    return gain.toFixed(2);
  };

  const calculateGainPercent = (averagePrice, currentPrice) => {
    const percent = ((currentPrice - averagePrice) / averagePrice) * 100;
    return percent.toFixed(2);
  };

  return (
    <div className="asset-table-container">
      <div className="table-placeholder-info">
        <p className="info-text">
          📋 Exemple de données - vos actifs s'afficheront ici
        </p>
        <p className="info-subtext">
          💡 Cliquez sur un actif pour voir l'analyse détaillée
        </p>
      </div>
      
      <div className="table-wrapper">
        <table className="asset-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Prix Achat Moyen</th>
              <th>Prix Actuel</th>
              <th>Valeur Totale</th>
              <th>Gain/Perte</th>
              <th>Gain/Perte %</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const gain = calculateGain(asset.quantity, asset.averagePrice, asset.currentPrice);
              const gainPercent = calculateGainPercent(asset.averagePrice, asset.currentPrice);
              const isPositive = parseFloat(gain) >= 0;

              return (
                <tr 
                  key={asset.id} 
                  className="clickable-row"
                  onClick={() => handleRowClick(asset)}
                  title="Cliquer pour voir les détails"
                >
                  <td>{asset.type}</td>
                  <td className="asset-name">{asset.name}</td>
                  <td>{asset.quantity}</td>
                  <td>{asset.averagePrice.toFixed(2)} €</td>
                  <td>{asset.currentPrice.toFixed(2)} €</td>
                  <td className="total-value">
                    {calculateTotal(asset.quantity, asset.currentPrice)} €
                  </td>
                  <td className={isPositive ? 'gain' : 'loss'}>
                    {isPositive ? '+' : ''}{gain} €
                  </td>
                  <td className={isPositive ? 'gain' : 'loss'}>
                    {isPositive ? '+' : ''}{gainPercent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedAsset && (
        <AssetDetail 
          asset={selectedAsset} 
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default AssetTable;
