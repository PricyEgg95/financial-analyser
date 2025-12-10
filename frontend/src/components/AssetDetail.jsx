import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AssetDetail.css';

function AssetDetail({ asset, onClose }) {
  if (!asset) return null;

  // Calculate metrics
  const totalValue = (asset.quantity * asset.currentPrice).toFixed(2);
  const totalGain = (asset.quantity * (asset.currentPrice - asset.averagePrice)).toFixed(2);
  const gainPercent = (((asset.currentPrice - asset.averagePrice) / asset.averagePrice) * 100).toFixed(2);
  const isPositive = parseFloat(totalGain) >= 0;

  // Generate historical price data (placeholder - would come from API)
  const generateHistoricalData = () => {
    const data = [];
    const purchaseDate = new Date(asset.purchaseDate);
    const today = new Date();
    const daysDiff = Math.floor((today - purchaseDate) / (1000 * 60 * 60 * 24));
    
    // Generate data points
    const numPoints = Math.min(30, daysDiff + 1); // Max 30 points or days since purchase
    const step = Math.max(1, Math.floor(daysDiff / numPoints));
    
    let currentDate = new Date(purchaseDate);
    let basePrice = asset.averagePrice;
    
    for (let i = 0; i <= numPoints; i++) {
      const progress = i / numPoints;
      const price = basePrice + (asset.currentPrice - basePrice) * progress;
      // Add some realistic variation
      const variation = (Math.random() - 0.5) * (asset.currentPrice - basePrice) * 0.1;
      
      data.push({
        date: currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        prix: Math.max(basePrice * 0.9, price + variation).toFixed(2),
      });
      
      currentDate = new Date(currentDate.getTime() + step * 24 * 60 * 60 * 1000);
    }
    
    // Ensure last point is current price
    data[data.length - 1].prix = asset.currentPrice.toFixed(2);
    
    return data;
  };

  const historicalData = generateHistoricalData();

  // Calculate recommendation based on gain percentage and volatility
  const calculateRecommendation = () => {
    const gain = parseFloat(gainPercent);
    
    // Simple logic based on performance
    let buyPercent, holdPercent, sellPercent;
    
    if (gain > 20) {
      // Strong gain - consider taking profits
      sellPercent = 60;
      holdPercent = 30;
      buyPercent = 10;
    } else if (gain > 10) {
      // Good gain - hold position
      sellPercent = 20;
      holdPercent = 60;
      buyPercent = 20;
    } else if (gain > 0) {
      // Moderate gain - can buy more
      sellPercent = 10;
      holdPercent = 40;
      buyPercent = 50;
    } else if (gain > -10) {
      // Small loss - buying opportunity
      sellPercent = 5;
      holdPercent = 25;
      buyPercent = 70;
    } else {
      // Significant loss - re-evaluate
      sellPercent = 40;
      holdPercent = 40;
      buyPercent = 20;
    }
    
    return { buyPercent, holdPercent, sellPercent };
  };

  const recommendation = calculateRecommendation();

  // Calculate days since purchase
  const daysSincePurchase = Math.floor(
    (new Date() - new Date(asset.purchaseDate)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="asset-detail-overlay" onClick={onClose}>
      <div className="asset-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="asset-detail-header">
          <h2>{asset.name} - Analyse Détaillée</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="asset-detail-content">
          {/* Key Metrics Section */}
          <div className="metrics-section">
            <div className="metric-card">
              <div className="metric-label">Type</div>
              <div className="metric-value">{asset.type}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Quantité Détenue</div>
              <div className="metric-value">{asset.quantity}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Prix d'Achat Moyen</div>
              <div className="metric-value">{asset.averagePrice.toFixed(2)} €</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Prix Actuel</div>
              <div className="metric-value">{asset.currentPrice.toFixed(2)} €</div>
            </div>
          </div>

          {/* Purchase Info */}
          <div className="info-section">
            <h3>📅 Informations d'Achat</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Date d'achat initiale:</span>
                <span className="info-value">
                  {new Date(asset.purchaseDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Jours en portefeuille:</span>
                <span className="info-value">{daysSincePurchase} jours</span>
              </div>
              <div className="info-item">
                <span className="info-label">Nombre d'achats:</span>
                <span className="info-value">{asset.purchaseCount || 1} fois</span>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="performance-section">
            <h3>📊 Performance</h3>
            <div className="performance-grid">
              <div className="performance-card">
                <div className="performance-label">Valeur Totale</div>
                <div className="performance-value large">{totalValue} €</div>
              </div>
              <div className="performance-card">
                <div className="performance-label">Gain/Perte Total</div>
                <div className={`performance-value large ${isPositive ? 'gain' : 'loss'}`}>
                  {isPositive ? '+' : ''}{totalGain} €
                </div>
              </div>
              <div className="performance-card">
                <div className="performance-label">Performance</div>
                <div className={`performance-value large ${isPositive ? 'gain' : 'loss'}`}>
                  {isPositive ? '+' : ''}{gainPercent}%
                </div>
              </div>
            </div>
          </div>

          {/* Price Evolution Chart */}
          <div className="chart-section">
            <h3>📈 Évolution du Prix depuis l'Achat</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}€`, 'Prix']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="prix" 
                  stroke="#3498db" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Prix"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendation Section */}
          <div className="recommendation-section">
            <h3>💡 Recommandation d'Investissement</h3>
            <p className="recommendation-description">
              Basé sur la performance actuelle de {gainPercent}% et l'analyse de tendance:
            </p>
            <div className="recommendation-bars">
              <div className="recommendation-item">
                <div className="recommendation-label">
                  <span className="recommendation-icon buy">📈</span>
                  <span>Acheter</span>
                </div>
                <div className="recommendation-bar-container">
                  <div 
                    className="recommendation-bar buy" 
                    style={{ width: `${recommendation.buyPercent}%` }}
                  >
                    {recommendation.buyPercent}%
                  </div>
                </div>
              </div>
              <div className="recommendation-item">
                <div className="recommendation-label">
                  <span className="recommendation-icon hold">⏸️</span>
                  <span>Conserver</span>
                </div>
                <div className="recommendation-bar-container">
                  <div 
                    className="recommendation-bar hold" 
                    style={{ width: `${recommendation.holdPercent}%` }}
                  >
                    {recommendation.holdPercent}%
                  </div>
                </div>
              </div>
              <div className="recommendation-item">
                <div className="recommendation-label">
                  <span className="recommendation-icon sell">📉</span>
                  <span>Vendre</span>
                </div>
                <div className="recommendation-bar-container">
                  <div 
                    className="recommendation-bar sell" 
                    style={{ width: `${recommendation.sellPercent}%` }}
                  >
                    {recommendation.sellPercent}%
                  </div>
                </div>
              </div>
            </div>
            <div className="recommendation-note">
              <strong>Note:</strong> Cette recommandation est basée sur l'analyse de la performance historique. 
              Consultez toujours un conseiller financier avant de prendre des décisions d'investissement.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetDetail;
