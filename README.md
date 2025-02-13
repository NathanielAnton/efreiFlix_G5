# EFREIFlix Starter Kit - Démonstration Module Federation

Ce projet démontre la mise en œuvre des micro-frontends utilisant Webpack Module Federation et React. Il fournit une base solide pour comprendre et développer des applications basées sur l'architecture micro-frontend.

## Structure du Projet

```
efreiflix/
├── efreiflix-header/          # Micro-frontend Header
│   ├── public/
│   │   └── index.html        # Template HTML pour le développement standalone
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.js     # Composant Header
│   │   ├── bootstrap.js      # Initialisation de l'application
│   │   └── index.js          # Point d'entrée
│   ├── package.json          # Dépendances
│   └── webpack.config.js      # Configuration Webpack + Module Federation
│
└── efreiflix-shell/          # Application Shell (hôte)
    ├── public/
    │   └── index.html        # Template HTML
    ├── src/
    │   ├── App.js            # Composant principal avec import du Header
    │   ├── bootstrap.js      # Initialisation de l'application
    │   └── index.js          # Point d'entrée
    ├── package.json          # Dépendances
    └── webpack.config.js      # Configuration Webpack + Module Federation
```

## Installation et Démarrage

1. **Cloner le repository :**
   ```bash
   git clone https://github.com/akiroussama/mfe_session1.git
   ```
2. **Démarrer la database(json-server) :**
   ```bash
   cd mfe_session1/efreiflix-db
   npm install
   npm start
   ```
   > [!NOTE] 
   > Acess API through http://localhost:3001/
   > 
   > Check json-server documentation for more information. 

3. **Démarrer le Micro-Frontend Header :**
   ```bash
   cd mfe_session1/efreiflix-header
   npm install
   npm start
   ```
   Le MFE Header sera accessible à : http://localhost:3001

4. **Démarrer l'Application Shell :**
   ```bash
   cd ../efreiflix-shell
   npm install
   npm start
   ```
   Le Shell sera accessible à : http://localhost:3000

## Architecture Technique

### 1. Micro-Frontend Header (`efreiflix-header`)

#### 📄 webpack.config.js
```javascript
new ModuleFederationPlugin({
  name: "header",
  filename: "remoteEntry.js",
  exposes: {
    "./Header": "./src/components/Header"
  },
  shared: {
    react: { 
      singleton: true, 
      requiredVersion: false,
      eager: false
    },
    "react-dom": { 
      singleton: true,
      requiredVersion: false,
      eager: false
    }
  }
})
```
Points clés :
- `name: "header"` : Identifiant unique du micro-frontend
- `filename: "remoteEntry.js"` : Point d'entrée pour Module Federation
- `exposes` : Déclare les composants accessibles
- `shared` : Configuration du partage des dépendances

### 2. Application Shell (`efreiflix-shell`)

#### 📄 webpack.config.js
```javascript
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    header: "header@http://localhost:3001/remoteEntry.js"
  },
  shared: {
    react: { 
      singleton: true,
      requiredVersion: false,
      eager: true
    },
    "react-dom": { 
      singleton: true,
      requiredVersion: false,
      eager: true
    }
  }
})
```

## Fonctionnement

1. **Initialisation Asynchrone**
   - Bootstrap séparé pour chaque application
   - Chargement asynchrone pour éviter les conflits de modules

2. **Gestion des Dépendances Partagées**
   - Shell : chargement eager de React
   - Header : chargement asynchrone
   - Instance unique de React (singleton)

3. **Chargement Dynamique**
   - Chargement lazy du Header dans le Shell
   - Fallback pendant le chargement

## Pour Aller Plus Loin (Atelier Pratique)

1. **Créer un nouveau Micro-Frontend**
   - Développer un composant `Footer` dans un nouveau MFE
   - L'intégrer dans le Shell

2. **Améliorations Possibles**
   - Système de routing
   - Tests automatisés
   - Pipeline de déploiement
   - Communication inter-MFE

## Documentation

- [Webpack Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [React Documentation](https://reactjs.org/)

## Points Clés à Retenir

1. **Initialisation Asynchrone** est cruciale
2. **Configuration des Modules Partagés** doit être précise
3. **Développement Indépendant** possible en mode standalone
4. **Architecture Extensible** pour ajout de nouveaux MFE
