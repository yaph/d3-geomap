const path = require('path');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'd3.geomap.js',
        libraryTarget: 'umd'
    },
    externals: ['d3', 'topojson', 'geoNaturalEarth'],
    //externals: {d3: 'd3', geoNaturalEarth: 'd3-geo-projection', topojson: 'topojson'},
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