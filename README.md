# d3-geomap

![npm package version](https://img.shields.io/npm/v/d3-geomap.svg)
![npm package license](https://img.shields.io/npm/l/d3-geomap.svg)

**d3-geomap** is designed to be a [reusable](https://bost.ocks.org/mike/chart/) geographic map for D3.
In its current stage it consists of a class to create plain maps `d3.geomap()` and one for choropleth maps `d3.choropleth()`.

Refer to the [documentation on how to use d3-geomap](https://d3-geomap.github.io/) and to download a bundle that
contains minified versions of d3-geomap and its dependencies as well as TopoJSON files for creating world and
individual country maps.

## Install
```sh
$ npm install d3-geomap
```

## Usage
ES6:
```js
import { select } from 'd3-selection';
import { geomap } from 'd3-geomap';

const worldMap = geomap();
worldMap.geofile('./node_modules/d3-geomap/src/world/countries.json');

worldMap.draw(select('#map'));
```

Otherwise, see examples in the `/examples` directory.

## Develop

Clone the repo & install dependencies:
```sh
$ git clone https://github.com/yaph/d3-geomap.git
$ cd d3-geomap
$ npm install
```

Start the development server:
```sh
$ npm run serve
```
A browser should open pointed to `http://localhost:8000/examples/`. Choose to view one of the example maps.

## Map Showcase

![World Cup 2014 Players' Birth Countries](https://i.imgur.com/RJbkFEH.png)

The map above, showing [birth countries of Football World Cup 2014 players](https://maps.ramiro.org/world-cup-2014-players-birth-countries/),
was created with d3-geomap. You can find more [example maps here](https://ramiro.org/maps/).
