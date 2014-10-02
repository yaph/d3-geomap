class Geomap

    constructor: ->
        # Set default properties optimized for naturalEarth projection.
        @properties =
            margin: {top: 20, right: 20, bottom: 20, left: 20}
            width: 960
            height: 500

            geofile: null
            postUpdate: null # function to run when update process is completed
            projection: d3.geo.naturalEarth
            rotate: [0, 0, 0]
            svg: null
            title: (d)-> d.properties.name
            unitId: 'iso3'
            units: 'units'
            zoomMax: 4

        # Dependant properties must be set after initialization.
        @properties.scale = @properties.width / 5.8
        @properties.translate = [@properties.width / 2, @properties.height / 2]

        # Setup methods to access properties.
        addAccessor(this, name, value) for name, value of @properties

        # Variables without accessors get stored in private.
        @private = {}

        # Accessible map selection
        @selection = {}


    clicked: (d)->
        geomap = this

        x = null
        y = null
        k = null

        if d and geomap.private.centered isnt d
            centroid = geomap.properties.path.centroid(d)
            x = centroid[0]
            y = centroid[1]
            k = geomap.properties.zoomMax
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

        geomap.properties.svg.selectAll('g.zoom')
            .transition()
            .duration(750)
            .attr('transform', 'translate(' +  x0 + ',' + y0 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')


    update: ()->
        geomap = this

        geomap.selection.units.enter().append('path')
            .attr('class', 'unit')
            .attr('d', geomap.properties.path)
            .on('click', geomap.clicked.bind(geomap))
            .append('title')
                .text(geomap.properties.title)

        if geomap.postUpdate()
            geomap.properties.postUpdate()


    # Draw map base and load geo data once, and call update to draw units.
    draw: (selection, geomap)->
        geomap.properties.svg = selection.append('svg')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height)

        geomap.properties.svg.append('rect')
            .attr('class', 'background')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height)
            .on('click', geomap.clicked.bind(geomap))

        geomap.private.g = geomap.properties.svg.append('g')
            .attr('class', 'units zoom')

        # Set map projection and path.
        proj = geomap.properties.projection()
            .scale(geomap.properties.scale)
            .translate(geomap.properties.translate)
            .precision(.1)

        # Not every projection supports rotation, e. g. albersUsa does not.
        if proj.hasOwnProperty('rotate') and geomap.properties.rotate
            proj.rotate(geomap.properties.rotate)

        geomap.properties.path = d3.geo.path().projection(proj)

        # Load and render geo data.
        d3.json geomap.properties.geofile, (error, geo)->
            geomap.selection.units = geomap.private.g
                .selectAll('path')
                .data(topojson.feature(geo, geo.objects[geomap.properties.units]).features)

            geomap.update()


root = (exports? or this)
root.Geomap = Geomap
root.d3.geomap = ()->
    new Geomap()