# d3-geomap

`d3.geomap` is designed to be a
[reusable](http://bost.ocks.org/mike/chart/) geographic map for D3.

In its current stage it consists of a class to create plain maps `d3.geomap()`
and one for choropleth maps `d3.geomap.choropleth()`. See the [documentation on how to use d3.geomap](http://d3-geomap.github.io/).

## Installing from source

    $ git clone https://github.com/yaph/d3-geomap.git
    $ cd d3.geomap
    $ npm install

Start the development server

    $ gulp

Open `http://localhost:8000/examples/` in a browser and choose to view one of
the example maps.

## Creating topojson files

### World Countries

First download a shapefile with administrative boundaries without boundary lakes from [naturalearthdata.com](http://www.naturalearthdata.com/).

    wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries_lakes.zip

Convert the shapefile to GeoJSON.

    ogr2ogr -f GeoJSON units.json ne_10m_admin_0_countries_lakes.shp

Convert GeoJSON to Topojson using simplification to reduce file size. The SU_A3 is used as the ID and the name as a property.

    ../node_modules/topojson/bin/topojson --simplify-proportion .08 --id-property SU_A3 -p name=NAME -o countries.json units.json

Workaround for Issue #12 run from scripts directory

     ./fixids.py

### Countries with admin regions

Note that geo properties keys are lowercase in the admin_1 data.

    wget http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_1_states_provinces_lakes.zip

To create a topojson file with US States run:

    ogr2ogr -f GeoJSON -where "ADM0_A3 IN ('USA')" units.json ne_10m_admin_1_states_provinces_lakes.shp
    ../node_modules/topojson/bin/topojson --simplify-proportion .08 --id-property fips -p name=name -o USA.json units.json

To create topojson files for all countries run topo_countries.py in scripts.

## References

* [bl.ocks.org Natural Earth](http://bl.ocks.org/mbostock/4479477)
* [bl.ocks.org click-to-zoom via transform](http://bl.ocks.org/mbostock/2206590)
* [bl.ocks.org Every ColorBrewer Scale](http://bl.ocks.org/mbostock/5577023)