const path = require('path');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'd3.geomap.js',
        library: 'geomap'
    },
    externals: ['d3', 'd3-geo-projection', 'topojson'],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
}