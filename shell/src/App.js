// fichier: efreiflix-shell/src/App.js
import React, { Suspense } from 'react';
import './App.css';
import VueWrapper from './VueWrapper.jsx';

const Header = React.lazy(() => import('header/Header'));
const Catalogue = React.lazy(() => import('catalogue/Catalogue'));
const SearchBar = React.lazy(() => import('searchbar/SearchBar'));
const WatchList = React.lazy(() => import('watchlist/Watchlist'));
const Skeleton = React.lazy(() => import('skeleton/Skeleton'));

// Import direct du composant Vue Breadcrumb
import BreadcrumbVue from 'breadcrumb/Breadcrumb';

const Breadcrumb = (props) => (
  <VueWrapper component={BreadcrumbVue} componentProps={props} />
);

const App = () => {
  return (
    <div className="app-container">
      <div className="app-header">
        <Suspense
          fallback={<div className="loading">Chargement du header...</div>}
        >
          <Header />
        </Suspense>

        <Suspense
          fallback={
            <div className="loading">
              Chargement de la barre de recherche...
            </div>
          }
        >
          <SearchBar />
        </Suspense>
      </div>

      <Suspense fallback={<div className="loading">Chargement du breadcrumb...</div>}>
        <Breadcrumb />
      </Suspense>


      <main className="main-content">
				<Suspense fallback={<div className="loading">Chargement du breadcrumb...</div>}>
        	<Breadcrumb />
				</Suspense>

        <h2 className="welcome-title">Bienvenue sur Efreiflix</h2>
        <p className="main-description">Contenu principal de l'application...</p>
        <Suspense fallback={<div className="loading">Chargement de la watchlist...</div>}>
          <WatchList />
        </Suspense>
        <p className="main-description">
          Contenu principal de l'application...
        </p>

        <Suspense
          fallback={<div className="loading">Chargement du catalogue...</div>}
        >
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
