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

    d3.csv("globalslaveryindex.csv", function(error, data) {
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

## TODOs

* better docs
* not reusable with any topojson file, as long as world.objects.subunits is hard coded
* make value parsing (parseFloat right now) a setting
* columns function that returns a sorted list of culumn headings except iso3

## References

* [bl.ocks.org Natural Earth](http://bl.ocks.org/mbostock/4479477)