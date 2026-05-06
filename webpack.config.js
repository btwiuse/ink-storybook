const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const pathName = path.resolve(__dirname, 'dist')

module.exports = {
  entry: './index.js',
  output: {
    path: pathName,
    filename: 'bundle.js',
  },
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /xterm\.js/,
      }),
    ],
  },
  externals: {
    '@xterm/xterm': 'window',
  },
  resolve: {
    fallback: {
        "fs": false,
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "assert": require.resolve("assert/"),
        "os": require.resolve("os-browserify/browser"),
        "tty": require.resolve("tty-browserify"),
        "module": false,
        "child_process": false
    },
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /node_modules\/supports-color\/browser.js/,
      path.resolve(__dirname, 'patched-supports-color.js')
    ),
    new CopyPlugin({
      patterns: [
        { from: "test.html", to: "index.html" },
        { from: "node_modules/@xterm/xterm/lib/xterm.js", to: "xterm.js" },
        { from: "node_modules/@xterm/xterm/css/xterm.css", to: "xterm.css" },
      ],
    }),
  ]
};