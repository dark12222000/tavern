// webpack.config.js
module.exports = {
    entry: './js/core/ui.js',
    output: {
        path: 'assets/',
        filename: 'bundle.js',
        sourceMapFilename: '[file].map'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015'] } }
      ]
    },
    devtool: "#cheap-source-map"
};
