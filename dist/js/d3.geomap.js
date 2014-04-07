var colors;

colors = ['#ffffe0', '#fff2cf', '#ffe4be', '#ffd5ae', '#ffc7a0', '#ffb891', '#ffa984', '#ff9979', '#ff886e', '#ff7566', '#fd615f', '#f5515a', '#ed4056', '#e23050', '#d52349', '#c81640', '#b90c35', '#aa0427', '#9b0116', '#8b0000'];

d3.geomap = {};

d3.geomap.choropleth = function() {
  var color_val, colorize, column, data, data_by_iso, draw, geofile, geomap, height, iso_val, margin, path, projection, svg_countries, update, width, world;
  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };
  width = 960;
  height = 500;
  projection = d3.geo.naturalEarth;
  colorize = null;
  column = null;
  data = null;
  data_by_iso = {};
  geofile = null;
  path = null;
  svg_countries = null;
  world = null;
  iso_val = function(iso3) {
    if (data_by_iso[iso3]) {
      return data_by_iso[iso3];
    } else {
      return '';
    }
  };
  color_val = function(iso3) {
    if (data_by_iso[iso3]) {
      return colorize(data_by_iso[iso3]);
    } else {
      return '#eeeeee';
    }
  };
  update = function() {
    var d, max, min, val, _i, _len;
    min = null;
    max = null;
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      val = parseFloat(d[column]);
      if (val < min) {
        min = val;
      }
      if (val > max) {
        max = val;
      }
      data_by_iso[d.iso3] = val;
    }
    colorize = d3.scale.quantize().domain([min, max]).range(d3.range(colors.length).map(function(i) {
      return colors[i];
    }));
    return svg_countries.enter().append('path').attr('class', 'country').attr('d', path).style('fill', function(d) {
      return color_val(d.id);
    }).append('title').text(function(d) {
      return d.properties.name + ': ' + iso_val(d.id);
    });
  };
  draw = function(selection) {
    var proj, svg;
    svg = selection.append('svg').attr('width', width).attr('height', height);
    proj = projection().scale(width / height * 155).translate([width / 2.4, height / 2]).precision(.1);
    path = d3.geo.path().projection(proj);
    return d3.json(geofile, function(error, world) {
      var mesh;
      svg_countries = svg.append('g').attr('class', 'countries').selectAll('path').data(topojson.feature(world, world.objects.subunits).features);
      mesh = topojson.mesh(world, world.objects.subunits, function(a, b) {
        return a !== b;
      });
      svg.insert('path').datum(mesh).attr('class', 'boundary').attr('d', path);
      return update();
    });
  };
  geomap = function(selection) {
    data = selection.datum();
    return draw(selection);
  };
  geomap.update = function() {
    return update();
  };
  geomap.margin = function(_) {
    if (!arguments.length) {
      return margin;
    }
    margin = _;
    return geomap;
  };
  geomap.width = function(_) {
    if (!arguments.length) {
      return width;
    }
    width = _;
    return geomap;
  };
  geomap.height = function(_) {
    if (!arguments.length) {
      return height;
    }
    height = _;
    return geomap;
  };
  geomap.projection = function(_) {
    if (!arguments.length) {
      return projection;
    }
    projection = _;
    return geomap;
  };
  geomap.column = function(_) {
    if (!arguments.length) {
      return column;
    }
    column = _;
    return geomap;
  };
  geomap.geofile = function(_) {
    if (!arguments.length) {
      return geofile;
    }
    geofile = _;
    return geomap;
  };
  return geomap;
};
