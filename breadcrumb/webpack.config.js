const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { dependencies } = require('./package.json');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';
const prodUrl = 'https://efrei-breadcrumb.vercel.app/';

module.exports = {
  entry: './src/main.ts',
  mode: process.env.NODE_ENV || "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? prodUrl : 'auto',
  },
  devServer: {
    port: 3004, // Changed from 5000 to 3004 to match what the shell is expecting
    static: {
      directory: path.join(__dirname, 'public'),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-typescript', { allExtensions: true, isTSX: true }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Ajout de la règle pour les fichiers SVG
      {
        test: /\.svg$/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'breadcrumb',
      filename: 'remoteEntry.js',
      exposes: {
        './Breadcrumb': './src/Breadcrumb.vue',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: dependencies.vue,
          eager: true
        },
      },
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
  },
};