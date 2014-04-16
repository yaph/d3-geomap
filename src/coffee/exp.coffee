class Geomap

    @margin: {top: 20, right: 20, bottom: 20, left: 20}
    @width: 960
    @height: 500
#    @projection: d3.geo.naturalEarth
    @centered: null
    @countries: null
    @g: null
    geofile: null
    @path: null
    @world: null

    margin: (_)->
        if not arguments.length
            return @margin
        @margin = d3.functor _
        this

    width: (_)->
        if not arguments.length
            return @width
        @width = d3.functor _
        this

    height: (_)->
        if not arguments.length
            return @height
        @height = d3.functor _
        this

    #projection: (_)->
        #if not arguments.length
            #return @projection
        #@projection = d3.functor _
        #this

    column: (_)->
        if not arguments.length
            return @column
        @column = d3.functor _
        this

    geofile: (_)->
        if not arguments.length
            return @geofile
        @geofile = d3.functor _

        console.log '#####', this, _

        this

    # Draw map base and load geo data once, and call update to draw countries.
    draw: (selection)->
        console.log '#####', this is selection

        svg = selection.append('svg')
            .attr('width', Geomap.width)
            .attr('height', Geomap.height)

        svg.append('rect')
            .attr('class', 'background')
            .attr('width', Geomap.width)
            .attr('height', Geomap.height)

        @g = svg.append('g')

        # Set map projection and path.
        proj = d3.geo.naturalEarth()
            .scale(Geomap.width / Geomap.height * 155)
            .translate([Geomap.width / 2.4, Geomap.height / 2])
            .precision(.1)
        @path = d3.geo.path().projection(proj)

        ## Load and render geo data.
        #d3.json @geofile, (error, world)->
            #@countries = svg.append('g')
                #.attr('class', 'countries')
                #.selectAll('path')
                #.data(topojson.feature(world, world.objects.countries).features)

            #@countries.enter().append('path')
                #.attr('class', 'country')
                #.attr('d', Geomap.path)
                #.append('title')
                    #.text((d)-> d.properties.name)

    test: (selection)->
        console.log '#####', this

d3.geomap = ()->
    new Geomap()