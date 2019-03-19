const path = require('path');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'd3.geomap.js',
        library: 'geomap',
        libraryTarget: 'umd'
    },
    //externals: ['d3', 'topojson', 'geoNaturalEarth'],
    //externals: {d3: 'd3', geoNaturalEarth: 'd3-geo-projection', topojson: 'topojson'},
    // externals: [
    //     /^d3.*$/,
    //     /^topojson\/.+$/,
    //     'geoNaturalEarth'
    // ],
    // externals: [
    //     'd3',
    //     'd3-array',
    //     'd3-collection',
    //     'd3-color',
    //     'd3-dispatch',
    //     'd3-dsv',
    //     'd3-force',
    //     'd3-format',
    //     'd3-geo',
    //     'd3-geo-projection',
    //     'd3-hierarchy',
    //     'd3-interpolate',
    //     'd3-path',
    //     'd3-quadtree',
    //     'd3-queue',
    //     'd3-scale',
    //     'd3-scale-chromatic',
    //     'd3-shape',
    //     'd3-time',
    //     'd3-time-format',
    //     'd3-timer',
    //     'd3-voronoi',
    //     'topojson'
    // ],
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