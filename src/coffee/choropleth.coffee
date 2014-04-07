d3.geomap.choropleth = ()->
    margin = {top: 20, right: 20, bottom: 20, left: 20}
    width = 960
    height = 500
    projection = d3.geo.naturalEarth
    colorize = null
    column = null
    data = null
    data_by_iso = {}
    geofile = null
    path = null
    svg_countries = null
    world = null

    iso_val = (iso3)->
        if data_by_iso[iso3] then data_by_iso[iso3] else ''

    color_val = (iso3)->
        if data_by_iso[iso3] then colorize(data_by_iso[iso3]) else '#eeeeee'

    update = ()->
        # Create mapping of iso3 to data selected value and set min and max.
        min = null
        max = null
        for d in data
            # Try to parse value as float.
            val = parseFloat(d[column])
            if val < min
                min = val
            if val > max
                max = val
            data_by_iso[d.iso3] = val

        # Set the coloring function.
        colorize = d3.scale.quantize()
            .domain([min, max])
            .range(d3.range(colors.length).map((i)-> colors[i]))

        svg_countries.enter().append('path')
            .attr('class', 'country')
            .attr('d', path)
            .style('fill', (d)-> color_val(d.id))
            .append('title')
                .text((d)-> d.properties.name + ': ' + iso_val(d.id))

    draw = (selection)->
        svg = selection.append('svg')
            .attr('width', width)
            .attr('height', height)

        # Set map projection and path.
        proj = projection()
            .scale(width / height * 155)
            .translate([width / 2.4, height / 2])
            .precision(.1)
        path = d3.geo.path().projection(proj)

        # Load and render geo data.
        d3.json geofile, (error, world)->
            svg_countries = svg.append('g')
                .attr('class', 'countries')
                .selectAll('path')
                .data(topojson.feature(world, world.objects.subunits).features)

            mesh = topojson.mesh(world, world.objects.subunits, (a, b)-> a != b)
            svg.insert('path')
                .datum(mesh)
                .attr('class', 'boundary')
                .attr('d', path)

            update()

    geomap = (selection)->
        data = selection.datum()
        draw(selection)

    geomap.update = ()->
        update()

    # Expose settings, tedious...
    geomap.margin = (_)->
        if not arguments.length
            return margin
        margin = _
        geomap

    geomap.width = (_)->
        if not arguments.length
            return width
        width = _
        geomap

    geomap.height = (_)->
        if not arguments.length
            return height
        height = _
        geomap

    geomap.projection = (_)->
        if not arguments.length
            return projection
        projection = _
        geomap

    geomap.column = (_)->
        if not arguments.length
            return column
        column = _
        geomap

    geomap.geofile = (_)->
        if not arguments.length
            return geofile
        geofile = _
        geomap

    geomap