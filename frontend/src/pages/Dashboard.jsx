import AssetForm from '../components/AssetForm';
import AssetTable from '../components/AssetTable';
import PortfolioChart from '../components/PortfolioChart';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Tableau de Bord</h1>
        
        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2>Ajouter un Actif</h2>
            <AssetForm />
          </div>
          
          <div className="dashboard-section">
            <h2>Allocation du Portefeuille</h2>
            <PortfolioChart />
          </div>
          
          <div className="dashboard-section full-width">
            <h2>Mes Actifs</h2>
            <AssetTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
