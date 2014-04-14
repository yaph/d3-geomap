var colors;

colors = ['#fffff0', '#fffce9', '#fffbe5', '#fff7e0', '#fff5dd', '#fff2d8', '#fff0d4', '#ffedd1', '#ffeacc', '#ffe8c9', '#ffe5c5', '#ffe2c1', '#ffe1be', '#ffdeba', '#ffdab6', '#ffd9b3', '#ffd6af', '#ffd2ab', '#ffd1a8', '#ffcea4', '#ffcba0', '#ffc89c', '#ffc59a', '#ffc396', '#ffc092', '#ffbc8e', '#ffba8a', '#ffb788', '#ffb484', '#ffb180', '#ffae7d', '#ffac79', '#ffa875', '#ffa572', '#ffa36e', '#ff9f6b', '#ff9c67', '#ff9964', '#ff9660', '#ff935c', '#ff9058', '#ff8d55', '#ff8951', '#ff864d', '#ff8249', '#ff7f45', '#ff7b42', '#ff773d', '#ff7439', '#ff6f35', '#ff6c30', '#ff682c', '#ff6328', '#ff6023', '#ff5b1e', '#ff5619', '#ff5113', '#ff4b0a', '#ff4702', '#ff3f29', '#fd393a', '#fb3541', '#f83147', '#f62f4a', '#f32c4d', '#f0294f', '#ee2650', '#ea2451', '#e72251', '#e52050', '#e21e50', '#de1c4f', '#dc1a4e', '#d9184c', '#d6164b', '#d31549', '#d01347', '#cd1146', '#ca1043', '#c70e41', '#c40d3f', '#c20b3d', '#be0a3a', '#bc0838', '#b90735', '#b60632', '#b2052f', '#b0042c', '#ac032a', '#aa0327', '#a70223', '#a30220', '#a1011d', '#9d011a', '#9a0116', '#980013', '#95000f', '#91000b', '#8e0006', '#8b0000'];

d3.geomap = {};

d3.geomap.choropleth = function() {
  var centered, clicked, color_val, colorize, column, columns, countries, data, data_by_iso, draw, format, g, geofile, geomap, height, iso_val, margin, path, projection, update, width, world;
  margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };
  width = 960;
  height = 500;
  projection = d3.geo.naturalEarth;
  centered = null;
  colorize = null;
  column = null;
  columns = [];
  countries = null;
  data = null;
  data_by_iso = {};
  format = d3.format('.02f');
  g = null;
  geofile = null;
  path = null;
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
  clicked = function(d) {
    var centroid, k, x, y;
    x = null;
    y = null;
    k = null;
    if (d && centered !== d) {
      centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 3;
      centered = d;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
    }
    g.selectAll('path').classed('active', centered && function(d) {
      return d === centered;
    });
    return g.transition().duration(750).attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')').style('stroke-width', 1 / k + 'px');
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
    return countries.enter().append('path').attr('class', 'country').attr('d', path).style('fill', function(d) {
      return color_val(d.id);
    }).on('click', clicked).append('title').text(function(d) {
      return d.properties.name + ': ' + format(iso_val(d.id));
    });
  };
  draw = function(selection) {
    var proj, svg;
    svg = selection.append('svg').attr('width', width).attr('height', height);
    svg.append('rect').attr('class', 'background').attr('width', width).attr('height', height).on('click', clicked);
    g = svg.append('g');
    proj = projection().scale(width / height * 155).translate([width / 2.4, height / 2]).precision(.1);
    path = d3.geo.path().projection(proj);
    return d3.json(geofile, function(error, world) {
      countries = g.attr('class', 'countries').selectAll('path').data(topojson.feature(world, world.objects.subunits).features);
      return update();
    });
  };
  geomap = function(selection) {
    data = selection.datum();
    draw(selection);
    return columns = d3.keys(data[0]).filter(function(d) {
      if (d !== '' && d !== 'iso3') {
        return d;
      } else {
        return null;
      }
    }).sort();
  };
  geomap.update = function() {
    return update();
  };
  geomap.columns = function() {
    return columns;
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
