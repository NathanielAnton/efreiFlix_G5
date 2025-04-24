const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const { dependencies } = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const prodUrl = 'https://efrei-catalogue.vercel.app/';
const getRemoteEntryUrl = (appName) => {
  if (process.env.NODE_ENV === 'production') {
    // Replace these URLs with your actual Vercel deployment URLs
    const urls = {
      ficheProduit: 'https://efrei-fiche-produit.vercel.app',
    };
    return `${urls[appName]}/remoteEntry.js`;
  }
  const ports = {
    header: 3001,
    skeleton: 3002,
    ficheProduit: 3005
  };
  return `http://localhost:${ports[appName]}/remoteEntry.js`;
};
module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    publicPath: isProd ? prodUrl : 'auto',
    filename: '[name].[contenthash].js',
  },
  devServer: {
    port: 3003,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'catalogue',
      filename: 'remoteEntry.js',
      exposes: {
        './Catalogue': './src/Catalog',
      },
      remotes: {
        ficheProduit: `ficheProduit@${getRemoteEntryUrl('ficheProduit')}`,
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        'react-dom': { singleton: true, eager: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
