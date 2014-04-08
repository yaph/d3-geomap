var colors;

colors = ['#ffffff', '#fffdf5', '#fffbf0', '#fff8ec', '#fff5e6', '#fff3e2', '#fff1dd', '#ffeed9', '#ffecd4', '#ffe9cf', '#ffe7cc', '#ffe3c8', '#ffe1c4', '#ffdec0', '#ffdbbb', '#ffd9b9', '#ffd6b4', '#ffd4b0', '#ffd1ac', '#ffcea9', '#ffcca5', '#ffc9a0', '#ffc69e', '#ffc49a', '#ffc196', '#ffbd92', '#ffbb8e', '#ffb88a', '#ffb687', '#ffb283', '#ffaf80', '#ffac7c', '#ffa978', '#ffa774', '#ffa471', '#ffa06d', '#ff9d69', '#ff9b66', '#ff9761', '#ff945d', '#ff915a', '#ff8d56', '#ff8a52', '#ff874e', '#ff834b', '#ff8047', '#ff7c43', '#ff793f', '#ff753a', '#ff7136', '#ff6d32', '#ff692d', '#ff6529', '#ff6125', '#ff5b1f', '#ff581a', '#ff5214', '#ff4d0c', '#ff4804', '#ff4121', '#fe3938', '#fb3541', '#fa3246', '#f62f4a', '#f32c4d', '#f1294f', '#ee2650', '#eb2550', '#e92251', '#e62050', '#e21e50', '#e01c4f', '#dd1a4e', '#da184d', '#d6174b', '#d3154a', '#d11348', '#cd1246', '#ca1044', '#c70e41', '#c40d3f', '#c20b3d', '#be0a3a', '#bc0838', '#b90735', '#b60632', '#b2052f', '#b0042c', '#ac032a', '#aa0327', '#a70223', '#a30220', '#a1011d', '#9d011a', '#9a0116', '#980013', '#95000f', '#91000b', '#8e0006', '#8b0000'];

d3.geomap = {};

d3.geomap.choropleth = function() {
  var color_val, colorize, column, data, data_by_iso, draw, format, geofile, geomap, height, iso_val, margin, path, projection, svg_countries, update, width, world;
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
  format = d3.format('.02f');
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
      return d.properties.name + ': ' + format(iso_val(d.id));
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
