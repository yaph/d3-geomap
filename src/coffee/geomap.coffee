d3.geomap = ()->
    margin = {top: 20, right: 20, bottom: 20, left: 20}
    width = 960
    height = 500
    projection = d3.geo.naturalEarth
    centered = null
    countries = null
    g = null
    geofile = null
    path = null
    world = null

    # Draw map base and load geo data once, and call update to draw countries.
    draw = (selection)->
        svg = selection.append('svg')
            .attr('width', width)
            .attr('height', height)

        svg.append('rect')
            .attr('class', 'background')
            .attr('width', width)
            .attr('height', height)

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
                .data(topojson.feature(world, world.objects.countries).features)

            countries.enter().append('path')
                .attr('class', 'country')
                .attr('d', path)
                .append('title')
                    .text((d)-> d.properties.name)

    geomap = (selection)->
        draw(selection)

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