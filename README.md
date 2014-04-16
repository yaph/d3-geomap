# d3-geomap

`d3.geomap` is designed to become a
[reusable](http://bost.ocks.org/mike/chart/) geographic map for D3.

It is in early development, currently consisting of a choropleth map
`d3.geomap.choropleth()`.

## d3.geomap.choropleth

### Usage

    var worldmap = d3.geomap.choropleth()
        .geofile('/data/countries.topo.json')
        .width(1200)
        .height(780)
        .column('Calculated Percentage');

    d3.csv('globalslaveryindex.csv', function(error, data) {
        console.log(data);
        d3.select("#map")
            .datum(data)
            .call(worldmap);
    });

### Data format

A list of objects that have an iso3 and at least one other property. The property
to be used to colorize the choropleth map is set in the `colum()` method.

    [
        {iso3: 'ESP', column1: 'value1', column2: 'value2'},
        {iso3: 'FRA', column1: 'value1', column2: 'value2'}
    ]

# Create topojson

    wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip
    ogr2ogr -f GeoJSON -lco COORDINATE_PRECISION=2 countries.json ne_10m_admin_0_countries.shp
    topojson --simplify-proportion .1 --id-property SU_A3 -p name=NAME -o countries.topo.json countries.json

## References

* [bl.ocks.org Natural Earth](http://bl.ocks.org/mbostock/4479477)
* [bl.ocks.org click-to-zoom via transform](http://bl.ocks.org/mbostock/2206590)