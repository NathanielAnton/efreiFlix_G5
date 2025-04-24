/**
 * Configuration Webpack pour l'application Shell (Host Application)
 * 
 * Ce fichier configure l'application principale qui va héberger et orchestrer
 * les différents micro-frontends. En tant qu'application hôte, elle est responsable
 * de l'importation et de l'intégration des composants distants.
 * 
 * Points clés :
 * - Configuration du port de développement (3000)
 * - Déclaration des micro-frontends distants (remotes)
 * - Configuration du partage des dépendances
 * - Configuration de Babel pour la transpilation React
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const getRemoteEntryUrl = (appName) => {
  if (process.env.NODE_ENV === 'production') {
    // Replace these URLs with your actual Vercel deployment URLs
    const urls = {
      header: 'https://efrei-header-five.vercel.app',
      skeleton: 'https://efrei-skeleton.vercel.app',
      catalogue: 'https://efrei-catalogue.vercel.app',
      breadcrumb: 'https://efrei-breadcrumb.vercel.app',
      ficheProduit: 'https://efrei-fiche-produit.vercel.app',
      searchbar: 'https://efrei-searchbar.vercel.app',
      watchlist: 'https://efrei-watchlist.vercel.app'
    };
    return `${urls[appName]}/remoteEntry.js`;
  }
  const ports = {
    header: 3001,
    skeleton: 3002,
    catalogue: 3003,
    breadcrumb: 3004,
    ficheProduit: 3005,
    searchbar: 3006,
    watchlist: 3007
  };
  return `http://localhost:${ports[appName]}/remoteEntry.js`;
};

module.exports = {
  entry: "./src/index.js",
  mode: process.env.NODE_ENV || "development",
  output: {
    publicPath: 'auto',
  },
  devServer: {
    port: 3000,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        header: `header@${getRemoteEntryUrl('header')}`,
        skeleton: `skeleton@${getRemoteEntryUrl('skeleton')}`,
        catalogue: `catalogue@${getRemoteEntryUrl('catalogue')}`,
        breadcrumb: `breadcrumb@${getRemoteEntryUrl('breadcrumb')}`,
        ficheProduit: `ficheProduit@${getRemoteEntryUrl('ficheProduit')}`,
        searchbar: `searchbar@${getRemoteEntryUrl('searchbar')}`,
        watchlist: `watchlist@${getRemoteEntryUrl('watchlist')}`,
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
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
}; 