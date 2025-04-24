import React, { Suspense } from 'react';
import './App.css';

const Header = React.lazy(() => import('header/Header'));
const Breadcrumb = React.lazy(() => import('breadcrumb/Breadcrumb'));
const Catalogue = React.lazy(() => import('catalogue/Catalogue'));
const SearchBar = React.lazy(() => import('searchbar/SearchBar'));
const WatchList = React.lazy(() => import('watchlist/Watchlist'));

const App = () => {
  return (
    <div className="app-container">
      <div className="app-header">
        <Suspense fallback={<div className="loading">Chargement du header...</div>}>
          <Header />
        </Suspense>

        <Suspense fallback={<div className="loading">Chargement de la barre de recherche...</div>}>
          <SearchBar />
        </Suspense>
      </div>

      <Suspense fallback={<div className="loading">Chargement du breadcrumb...</div>}>
        <Breadcrumb />
      </Suspense>


      <main className="main-content">
        <h2 className="welcome-title">Bienvenue sur Efreiflix</h2>
        <p className="main-description">Contenu principal de l'application...</p>
        <Suspense fallback={<div className="loading">Chargement de la watchlist...</div>}>
          <WatchList />
        </Suspense>

        <Suspense fallback={<div className="loading">Chargement du catalogue...</div>}>
          <Catalogue />
        </Suspense>
    
        <Suspense fallback={<div className="loading">Chargement du footer...</div>}>
          <footer className="app-footer">
            <p>&copy; 2025 EfreiFlix. Tous droits réservés.</p>
          </footer>
        </Suspense>
      </main>
    </div>
  );
};

export default App;