import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './PortfolioChart.css';

function PortfolioChart() {
  // Placeholder data - will be replaced with real data later
  const data = [
    { name: 'Actions France', value: 30 },
    { name: 'Actions USA', value: 40 },
    { name: 'ETF Monde', value: 20 },
    { name: 'ETF Obligations', value: 10 },
  ];

  const COLORS = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c'];

  return (
    <div className="portfolio-chart">
      <div className="chart-placeholder-info">
        <p className="info-text">
          📊 Exemple de répartition du portefeuille
        </p>
        <p className="info-subtext">
          Les données réelles s'afficheront ici une fois que vous aurez ajouté vos actifs
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PortfolioChart;
