module.exports = {
  entry: './src/client/index.js',
  output: { path: __dirname + '/src/public', filename: 'app.js' },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
