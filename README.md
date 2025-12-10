# financial-analyser

Application web d'analyse de portefeuilles financiers pour investisseurs novices en France (Compte-titres et PEA).

## 📋 Description

Cette application permet aux investisseurs novices français de gérer et analyser leurs portefeuilles financiers. Elle offre des outils pour suivre vos positions, visualiser l'allocation de vos actifs, et recevoir des analyses et recommandations personnalisées.

## 🎯 Fonctionnalités

- **Gestion des actifs** : Saisie et suivi de vos positions (actions, ETFs)
- **Visualisation** : Graphiques interactifs de l'allocation du portefeuille
- **Analyse** : Évaluation de la diversification et de l'exposition au risque
- **Recommandations** : Conseils d'investissement personnalisés

## 🚀 Installation et Lancement

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/PricyEgg95/financial-analyser.git
cd financial-analyser
```

2. Installez les dépendances du frontend :
```bash
cd frontend
npm install
```

### Lancement en mode développement

```bash
cd frontend
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

### Build pour la production

```bash
cd frontend
npm run build
```

Les fichiers de production seront générés dans le dossier `frontend/dist`.

## 📁 Structure du Projet

```
financial-analyser/
├── frontend/              # Application React
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/        # Pages de l'application
│   │   ├── App.jsx       # Composant principal
│   │   └── main.jsx      # Point d'entrée
│   └── package.json
└── README.md
```

## 🛠️ Technologies Utilisées

- **React** : Framework JavaScript pour l'interface utilisateur
- **Vite** : Outil de build rapide
- **Recharts** : Bibliothèque de graphiques
- **React Router** : Gestion du routage

## 📝 Licence

Ce projet est sous licence MIT.
