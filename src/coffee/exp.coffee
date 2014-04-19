class Geomap

    constructor: ->
        # Set default properties optimized for naturalEarth projection.
        @properties =
            margin: {top: 20, right: 20, bottom: 20, left: 20}
            width: 960
            height: 500
            projection: d3.geo.naturalEarth
            title: (d)-> d.properties.name
            geofile: null

        # Dependant properties must be set after initialization.
        @properties.scale = @properties.width / @properties.height * 155
        @properties.translate = [@properties.width / 2.4, @properties.height / 2]

        # Setup methods to access properties.
        addAccessor(this, name, value) for name, value of @properties

        # Variables without accessors get stored in private.
        @private = {}

    clicked: (d)->
        geomap = this

        x = null
        y = null
        k = null

        if d and geomap.private.centered isnt d
            centroid = geomap.private.path.centroid(d)
            x = centroid[0]
            y = centroid[1]
            k = 4
            geomap.private.centered = d
        else
            x = geomap.properties.width / 2
            y = geomap.properties.height / 2
            k = 1
            geomap.private.centered = null

        geomap.private.g.selectAll('path')
           .classed('active', geomap.private.centered and (d)-> d is geomap.private.centered)

        x0 = geomap.properties.width / 2
        y0 = geomap.properties.height / 2
        geomap.private.g.transition()
            .duration(750)
            .attr('transform', 'translate(' +  x0 + ',' + y0 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')

    update: ()->
        geomap = this

        geomap.private.units.enter().append('path')
            .attr('class', 'unit')
            .attr('d', geomap.private.path)
            .on('click', geomap.clicked.bind(geomap))
            .append('title')
                .text(geomap.properties.title)

    # Draw map base and load geo data once, and call update to draw units.
    draw: (selection, geomap)->
        svg = selection.append('svg')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height)

        svg.append('rect')
            .attr('class', 'background')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height)
            .on('click', geomap.clicked.bind(geomap))

        geomap.private.g = svg.append('g')
            .attr('class', 'units')

        # Set map projection and path.
        proj = geomap.properties.projection()
            .scale(geomap.properties.scale)
            .translate(geomap.properties.translate)
            .precision(.1)
        geomap.private.path = d3.geo.path().projection(proj)

        # Load and render geo data.
        d3.json geomap.properties.geofile, (error, geo)->
            geomap.private.units = geomap.private.g
                .selectAll('path')
                .data(topojson.feature(geo, geo.objects.countries).features)

            geomap.update()

d3.geomap = ()->
    new Geomap()


class Choropleth extends Geomap

    constructor: ->
        super()

        add_properties =
            column: null
            format: d3.format('.02f')

        for name, value of add_properties
            @properties[name] = value
            addAccessor(this, name, value)

    draw: (selection, geomap)->
        geomap.private.data = selection.datum()
        super(selection, geomap)

    update: ()->
        geomap = this
        data_by_iso = {}

        d3.selectAll('path.country').remove()

        # Create mapping of iso3 to data selected value and set min and max.
        min = null
        max = null
        for d in this.private.data
            # Try to parse value as float.
            val = parseFloat(d[geomap.properties.column])
            if val < min
                min = val
            if val > max
                max = val
            data_by_iso[d.iso3] = val

        # Set the coloring function.
        colorize = d3.scale.quantize()
            .domain([min, max])
            .range(d3.range(colors.length).map((i)-> colors[i]))

        iso_val = (iso3)->
            if data_by_iso[iso3] then geomap.properties.format(data_by_iso[iso3]) else 'No data'

        color_val = (iso3)->
            if data_by_iso[iso3] then colorize(data_by_iso[iso3]) else '#eeeeee'

        geomap.private.units.enter().append('path')
            .attr('class', 'unit')
            .attr('d', geomap.private.path)
            .style('fill', (d)-> color_val(d.id))
            .on('click', geomap.clicked.bind(geomap))
            .append('title')
                .text((d)-> d.properties.name + ': ' + iso_val(d.id))

d3.geomap.choropleth = ()->
    new Choropleth()