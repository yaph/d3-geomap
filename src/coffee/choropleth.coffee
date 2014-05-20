class Choropleth extends Geomap

    constructor: ->
        super()

        add_properties =
            column: null
            domain: null
            format: d3.format(',.02f')
            legend: false
            colors: colorbrewer.OrRd[9]

        for name, value of add_properties
            @properties[name] = value
            addAccessor(this, name, value)


    draw: (selection, geomap)->
        geomap.private.data = selection.datum()
        super(selection, geomap)


    update: ()->
        geomap = this
        data_by_iso = {}

        d3.selectAll('path.unit').remove()

        # Create mapping of iso3 to data selected value and set min and max.
        min = null
        max = null

        for d in geomap.private.data
            # Try to parse value as float.
            val = parseFloat(d[geomap.properties.column])
            if min is null or val < min
                min = val
            if max is null or val > max
                max = val
            data_by_iso[d.iso3] = val

        # Set domain property to min, max if not provided
        geomap.properties.domain = geomap.properties.domain or [min, max]

        # Set the coloring function.
        geomap.colorize = d3.scale.quantize()
            .domain(geomap.properties.domain)
            .range(geomap.properties.colors)

        iso_val = (iso3)->
            if data_by_iso[iso3] then geomap.properties.format(data_by_iso[iso3]) else 'No data'

        color_val = (iso3)->
            if data_by_iso[iso3] then geomap.colorize(data_by_iso[iso3]) else '#eeeeee'

        geomap.private.units.enter().append('path')
            .attr('class', 'unit')
            .attr('d', geomap.private.path)
            .style('fill', (d)-> color_val(d.id))
            .on('click', geomap.clicked.bind(geomap))
            .append('title')
                .text((d)-> d.properties.name + ': ' + iso_val(d.id))

        if geomap.properties.legend
            geomap.drawLegend(min, max)


    drawLegend: (min_val, max_val)->
        geomap = this
        box_w = 120
        box_h = 240
        rect_w = 16
        legend_h = 210
        offset_t = 4
        offset_y = geomap.properties.height - box_h
        # reverse a copy to not alter colors array
        colorlist = geomap.properties.colors.slice().reverse()
        rect_h = legend_h / colorlist.length

        geomap.properties.svg.select('g#legend').remove()

        lg = geomap.properties.svg.append('g')
            .attr('id', 'legend')
            .attr('width', box_w)
            .attr('height', box_h)
            .attr('transform', 'translate(0,' + offset_y + ')')

        lg.append('rect')
            .attr('class', 'legend-bg')
            .attr('width', box_w)
            .attr('height', box_h)
            .attr('transform', 'translate(0, 0')

        l_tr = 'translate(' + offset_t + ',' + offset_t * 3 + ')'

        lg.append('rect')
            .attr('class', 'legend-bar')
            .attr('width', rect_w)
            .attr('height', legend_h)
            .attr('transform', l_tr)

        sg = lg.append('g')
            .attr('transform', l_tr)

        # draw color scale
        sg.selectAll('rect')
            .data(colorlist)
            .enter().append('rect')
            .attr('y', (d, i)-> i * rect_h)
            .attr('fill', (d, i)-> colorlist[i])
            .attr('width', rect_w)
            .attr('height', rect_h)

        # draw color scale labels
        sg.selectAll('text')
            .data(colorlist)
            .enter().append('text')
            .text((d)-> geomap.properties.format geomap.colorize.invertExtent(d)[0])
            .attr('class', (d, i)-> 'text-' + i)
            .attr('x', rect_w + offset_t)
            .attr('y', (d, i)-> i * rect_h + rect_h + offset_t)

        domain_max = geomap.properties.domain[geomap.properties.domain.length - 1]
        max_text = geomap.properties.format(domain_max)
        if domain_max < max_val
            max_text = '> ' + max_text

        sg.append('text')
            .text(max_text)
            .attr('x', rect_w + offset_t)
            .attr('y', offset_t)

        # Hacky way to add less than sign if domain min is lower than min value.
        last_text = sg.selectAll('text.text-' + (colorlist.length - 1))
        last_text_val = last_text.text()
        if min_val < last_text_val
            last_text.text('< ' + last_text_val)


(exports? or this).d3.geomap.choropleth = ()->
    new Choropleth()