const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
const filename = ext => isProd ? `bundle.${ext}` : `bundle.[hash].${ext}`
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        'presets': ['@babel/preset-env', '@babel/preset-react'],
        'plugins': ['@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-jsx'
        ]
      },
    },
  ]

  if (isDev) loaders.push('eslint-loader')

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devServer: {
    port: 3000,
    watchContentBase: true,
    historyApiFallback: true,
    hot: true
  },
  output: {
    filename: `js/${filename('js')}`,
    path: path.resolve( __dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/i,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              filename: '[name]-[hash:8].[ext]',
              outputPath: 'assets/img'
            }
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack', {
          loader: 'file-loader',
          options: {
            filename: '[name]-[hash:8].[ext]',
            outputPath: 'assets/icons'
          }
        }],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: isProd,
    }),
    new MiniCssExtractPlugin({
      filename: `css/${filename('css')}`,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/public'), to: path.resolve(__dirname, 'build') },
      ],
    }),
  ]
};
