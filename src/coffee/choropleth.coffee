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