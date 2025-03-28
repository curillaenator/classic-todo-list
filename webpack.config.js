const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[fullhash].js',
    publicPath: '/classic-todo-list/',
    clean: true,
  },

  devServer: {
    port: 3333,
    historyApiFallback: true,
  },

  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' }),

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/public'),
          to: '',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
  ],

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],

    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(m|c)?js$/i,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
