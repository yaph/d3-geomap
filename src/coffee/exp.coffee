class Geomap

    constructor: ->
        # Set default properties optimized for naturalEarth projection.
        @properties =
            margin: {top: 20, right: 20, bottom: 20, left: 20}
            width: 960
            height: 500
            projection: d3.geo.naturalEarth
            title: (d)-> d.properties.name
            centered: null
            geofile: null

        # Dependant properties must be set after initialization.
        @properties.scale = @properties.width / @properties.height * 155
        @properties.translate = [@properties.width / 2.4, @properties.height / 2]

        # Setup methods to access properties.
        addAccessor(this, name, value) for name, value of @properties

    # Draw map base and load geo data once, and call update to draw countries.
    draw: (selection, geomap)->
        svg = selection.append('svg')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height)

        svg.append('rect')
            .attr('class', 'background')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height)

        g = svg.append('g')

        # Set map projection and path.
        proj = geomap.properties.projection()
            .scale(geomap.properties.scale)
            .translate(geomap.properties.translate)
            .precision(.1)
        path = d3.geo.path().projection(proj)

        # Load and render geo data.
        d3.json geomap.properties.geofile, (error, geo)->
            countries = svg.append('g')
                .attr('class', 'countries')
                .selectAll('path')
                .data(topojson.feature(geo, geo.objects.countries).features)

            countries.enter().append('path')
                .attr('class', 'country')
                .attr('d', path)
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