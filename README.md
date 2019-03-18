# d3.geomap

![npm package version](http://img.shields.io/npm/v/d3-geomap.svg)
![npm package license](http://img.shields.io/npm/l/d3-geomap.svg)

**d3.geomap** is designed to be a
[reusable](http://bost.ocks.org/mike/chart/) geographic map for D3. In its current stage it consists of a class to create plain maps `d3.geomap()`
and one for choropleth maps `geomap.choropleth()`.

Refer to the [documentation on how to use d3.geomap](http://d3-geomap.github.io/) and to download a bundle that contains minified versions of d3.geomap and its dependencies as well as TopoJSON files for creating world and individual country maps.

## Installing from source

    $ git clone https://github.com/yaph/d3-geomap.git
    $ cd d3-geomap
    $ npm install

Start the development server

    $ gulp

Open `http://localhost:8000/examples/` in a browser and choose to view one of
the example maps.

## Map Showcase

![World Cup 2014 Players' Birth Countries](http://i.imgur.com/RJbkFEH.png)

The map above, showing [birth countries of Football World Cup 2014 players](http://maps.ramiro.org/world-cup-2014-players-birth-countries/), was created with d3.geomap. You can find more [example maps here](http://ramiro.org/maps/).