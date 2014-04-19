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

        # Variables without accessors.
        @private =
            g: null
            centered: null
            path: null

    clicked: (d)->
        x = null
        y = null
        k = null
        geomap = this

        if d and geomap.private.centered isnt d
            centroid = this.private.path.centroid(d)
            x = centroid[0]
            y = centroid[1]
            k = 4
            this.private.centered = d
        else
            x = geomap.properties.width / 2
            y = geomap.properties.height / 2
            k = 1
            geomap.private.centered = null

        this.private.g.selectAll('path')
           .classed('active', geomap.private.centered and (d)-> d is geomap.private.centered)

        x0 = geomap.properties.width / 2
        y0 = geomap.properties.height / 2
        this.private.g.transition()
            .duration(750)
            .attr('transform', 'translate(' +  x0 + ',' + y0 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')


    # Draw map base and load geo data once, and call update to draw countries.
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
            .attr('class', 'countries')

        # Set map projection and path.
        proj = geomap.properties.projection()
            .scale(geomap.properties.scale)
            .translate(geomap.properties.translate)
            .precision(.1)
        geomap.private.path = d3.geo.path().projection(proj)

        # Load and render geo data.
        d3.json geomap.properties.geofile, (error, geo)->
            countries = geomap.private.g
                .selectAll('path')
                .data(topojson.feature(geo, geo.objects.countries).features)

            countries.enter().append('path')
                .attr('class', 'country')
                .attr('d', geomap.private.path)
                .on('click', geomap.clicked.bind(geomap))
                .append('title')
                    .text(geomap.properties.title)

d3.geomap = ()->
    new Geomap()


class Choropleth extends Geomap

    draw: (selection, geomap)->
        super(selection, geomap)

        console.log('##########')

        d3.selectAll('path.country').remove()

        #d3.select('g.countries').data(selection.data).enter().append('path')
            #.attr('class', 'country')
            #.attr('d', geomap.path)
            #.style('fill', '#ff0000')

d3.geomap.choropleth = ()->
    new Choropleth()