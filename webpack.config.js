const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'd3.geomap.js'
    },
    externals: {
        d3: 'd3',
        'd3-geo-projection': 'd3-geo-projection',
        topojson: 'topojson'
    }
}