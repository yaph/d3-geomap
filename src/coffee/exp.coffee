add_accessor = (obj, name, value)->
    obj[name] = (_)->
        if not arguments.length
            return value
        obj.properties[name] = _
        obj


class Geomap

    constructor: ->
        @properties =
            margin: {top: 20, right: 20, bottom: 20, left: 20}
            width: 960
            height: 500
            projection: d3.geo.naturalEarth
            centered: null
            geofile: null
            world: null

        # Setup methods to access properties.
        add_accessor(this, name, value) for name, value of @properties

    test: (selection, geomap)->
        console.log selection
        window.geomap = geomap


    # Draw map base and load geo data once, and call update to draw countries.
    #draw: (selection, geomap)->
        #svg = selection.append('svg')
            #.attr('width', geomap.width)
            #.attr('height', geomap.height)

        #svg.append('rect')
            #.attr('class', 'background')
            #.attr('width', geomap.width)
            #.attr('height', geomap.height)

        #g = svg.append('g')

        ## Set map projection and path.
        #proj = Geomap.projection()
            #.scale(geomap.width / geomap.height * 155)
            #.translate([geomap.width / 2.4, geomap.height / 2])
            #.precision(.1)
        #path = d3.geo.path().projection(proj)

        ## Load and render geo data.
        #d3.json '../dist/data/countries.topo.json', (error, world)->
            #countries = svg.append('g')
                #.attr('class', 'countries')
                #.selectAll('path')
                #.data(topojson.feature(world, world.objects.countries).features)

            #countries.enter().append('path')
                #.attr('class', 'country')
                #.attr('d', path)
                #.append('title')
                    #.text((d)-> d.properties.name)

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