d3.geomap.choropleth = ()->
    margin = {top: 20, right: 20, bottom: 20, left: 20}
    width = 960
    height = 500
    projection = d3.geo.naturalEarth
    centered = null
    colorize = null
    column = null
    columns = []
    countries = null
    data = null
    data_by_iso = {}
    format = d3.format('.02f')
    g = null
    geofile = null
    path = null
    world = null

    iso_val = (iso3)->
        if data_by_iso[iso3] then data_by_iso[iso3] else ''

    color_val = (iso3)->
        if data_by_iso[iso3] then colorize(data_by_iso[iso3]) else '#eeeeee'

    # Zoom map on mouse click. If clicked on country and not zoomed, zoom in,
    # else zoom out and center map.
    clicked = (d)->
        x = null
        y = null
        k = null

        if d and centered isnt d
            centroid = path.centroid(d)
            x = centroid[0]
            y = centroid[1]
            k = 3
            centered = d
        else
            x = width / 2
            y = height / 2
            k = 1
            centered = null

        g.selectAll('path')
           .classed('active', centered and (d)-> d is centered)

        g.transition()
            .duration(750)
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
            .style('stroke-width', 1 / k + 'px')

    # Calculate data mapping, draw and colorize countries.
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

        # Don't draw more than one path element per country.
        d3.selectAll('path.country').remove()

        countries.enter().append('path')
            .attr('class', 'country')
            .attr('d', path)
            .style('fill', (d)-> color_val(d.id))
            .on('click', clicked)
            .append('title')
                .text((d)-> d.properties.name + ': ' + format(iso_val(d.id)))

    # Draw map base and load geo data once, and call update to draw countries.
    draw = (selection)->
        svg = selection.append('svg')
            .attr('width', width)
            .attr('height', height)

        svg.append('rect')
            .attr('class', 'background')
            .attr('width', width)
            .attr('height', height)
            .on('click', clicked)

        g = svg.append('g')

        # Set map projection and path.
        proj = projection()
            .scale(width / height * 155)
            .translate([width / 2.4, height / 2])
            .precision(.1)
        path = d3.geo.path().projection(proj)

        # Load and render geo data.
        d3.json geofile, (error, world)->
            countries = g
                .attr('class', 'countries')
                .selectAll('path')
                .data(topojson.feature(world, world.objects.subunits).features)

            update()

    geomap = (selection)->
        data = selection.datum()
        draw(selection)

        # Set columns based on properties of 1st object in data array.
        columns = d3.keys(data[0]).filter(
            (d)-> if d isnt '' and d isnt 'iso3' then d else null).sort()

    # Expose update method.
    geomap.update = ()->
        update()

    # Return array of data property names, i. e. column headings in a CSV.
    geomap.columns = ()->
        columns

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