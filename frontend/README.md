# Frontend - Analyse de Portefeuille Financier

Application React pour l'analyse de portefeuilles financiers.

## 🚀 Démarrage Rapide

### Installation des dépendances

```bash
npm install
```

### Lancement en mode développement

```bash
npm run dev
```

L'application sera accessible à : `http://localhost:5173`

### Build pour la production

```bash
npm run build
```

### Prévisualisation du build de production

```bash
npm run preview
```

## 📦 Dépendances Principales

- **React** : Bibliothèque UI
- **React Router DOM** : Gestion du routage
- **Recharts** : Graphiques et visualisations
- **Vite** : Build tool et dev server

## 📁 Structure

```
src/
├── components/       # Composants réutilisables
│   ├── AssetForm.jsx        # Formulaire d'ajout d'actifs
│   ├── AssetTable.jsx       # Tableau des actifs
│   ├── Navigation.jsx       # Barre de navigation
│   └── PortfolioChart.jsx   # Graphique du portefeuille
├── pages/           # Pages de l'application
│   ├── Home.jsx            # Page d'accueil
│   └── Dashboard.jsx       # Tableau de bord
├── App.jsx          # Composant racine avec routage
└── main.jsx         # Point d'entrée
```

## 🎨 Pages

### Accueil (`/`)
Page d'introduction présentant l'application et ses fonctionnalités.

### Dashboard (`/dashboard`)
Interface principale avec :
- Formulaire d'ajout d'actifs
- Graphique de répartition du portefeuille
- Tableau récapitulatif des positions

## 🔧 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée le build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Exécute ESLint

## 📝 Notes de Développement

Les composants utilisent actuellement des données de démonstration (placeholders). 
L'intégration avec un backend et la gestion d'état globale seront ajoutées dans les prochaines versions.

