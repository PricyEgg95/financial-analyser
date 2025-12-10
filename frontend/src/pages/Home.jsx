import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <h1 className="home-title">Analyse de Portefeuille Financier</h1>
        <p className="home-description">
          Bienvenue sur votre outil d'analyse de portefeuille financier dédié aux investisseurs novices en France.
        </p>
        <p className="home-description">
          Cette application vous permet de gérer et analyser vos positions sur votre Compte-titres ou votre PEA.
          Obtenez une vue d'ensemble de votre portefeuille, analysez votre diversification, 
          évaluez votre exposition au risque et recevez des recommandations personnalisées.
        </p>
        <div className="home-features">
          <h2>Fonctionnalités</h2>
          <ul>
            <li>📊 Visualisation de l'allocation de votre portefeuille</li>
            <li>📈 Suivi de vos actifs (actions, ETFs)</li>
            <li>🎯 Analyse de diversification</li>
            <li>⚠️ Évaluation de l'exposition au risque</li>
            <li>💡 Recommandations d'investissement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
