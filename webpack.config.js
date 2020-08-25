const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dirSrc = path.resolve(__dirname, 'src');
const dirClient = path.resolve(dirSrc, 'client');
const dirPublic = path.resolve(dirClient, 'public');
const dirBuild = path.resolve(__dirname, 'build');
const dirBuildPublic = path.resolve(dirBuild, 'public');

const pathSkillSharingClient = path.resolve(
  dirClient,
  'skill-sharing-client.ts'
);

module.exports = {
  entry: pathSkillSharingClient,
  output: {
    path: dirBuildPublic,
    filename: 'skill-sharing-client.js',
  },
  devServer: {
    contentBase: dirBuildPublic,
    host: '0.0.0.0',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: ['/node_modules'],
        loader: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: dirPublic, to: dirBuildPublic }],
    }),
  ],
  stats: {
    colors: true,
  },
  mode: 'development',
  devtool: 'source-map',
};
