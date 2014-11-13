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

        # Public data access by id
        this.data_by_id = {}


    columnVal: (id, col)->
        geomap = this
        if geomap.data_by_id[id]
            geomap.properties.format(geomap.data_by_id[id][col])
        else
            'No data'


    colorVal: (id, col)->
        geomap = this
        if geomap.data_by_id[id]
            geomap.colorize(geomap.data_by_id[id][col])
        else
            '#eeeeee'


    draw: (selection, geomap)->
        geomap.private.data = selection.datum()
        super(selection, geomap)


    update: ()->
        geomap = this
        unitId = geomap.properties.unitId

        d3.selectAll('path.unit').remove()

        # Create mapping of unitId to data selected value and set min and max.
        min = null
        max = null

        for d in geomap.private.data
            # Try to parse value as float.
            val = parseFloat(d[geomap.properties.column])
            if min is null or val < min
                min = val
            if max is null or val > max
                max = val
            geomap.data_by_id[d[unitId]] = d

        # Set private domain property to given domain or min, max, Must be set
        # on every update so data changes are reflected.
        geomap.private.domain = geomap.properties.domain or [min, max]

        # Use threshold scale if domain array contains more than 2 items
        # otherwise use quantize.
        if geomap.private.domain.length > 2
            scaleFunc = d3.scale.threshold
        else
            scaleFunc = d3.scale.quantize

        # Set the coloring function.
        geomap.colorize = scaleFunc()
            .domain(geomap.private.domain)
            .range(geomap.properties.colors)

        geomap.selection.units.enter().append('path')
            .attr('class', 'unit')
            .attr('d', geomap.properties.path)
            .style('fill', (d)->
                geomap.colorVal(d.id, geomap.properties.column))
            .on('click', geomap.clicked.bind(geomap))
            .append('title')
                .text((d)->
                    d.properties.name + ': ' + geomap.columnVal(d.id, geomap.properties.column))

        if geomap.properties.legend
            geomap.drawLegend(min, max)

        if geomap.postUpdate()
            geomap.properties.postUpdate()


    drawLegend: (min_val, max_val)->
        geomap = this
        box_w = 120
        box_h = 240
        rect_w = 16
        legend_h = 210
        offset_t = 4
        offset_y = geomap.properties.height - box_h

        # Reverse a copy to not alter colors array.
        colorlist = geomap.properties.colors.slice().reverse()
        rect_h = legend_h / colorlist.length

        # Determine minimum and maximum values of data domain.
        domain_min = geomap.private.domain[0]
        domain_max = geomap.private.domain[geomap.private.domain.length - 1]

        # Remove possibly existing legend, before drawing.
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

        # Add text element for maximum value.
        max_text = geomap.properties.format(domain_max)
        if domain_max < max_val
            if domain_max > domain_min
                max_text = '> ' + max_text
            else
                max_text = '< ' + max_text

        sg.append('text')
            .text(max_text)
            .attr('x', rect_w + offset_t)
            .attr('y', offset_t)

        # Determine text to display for min val by default use domain_min.
        min_text = geomap.properties.format(domain_min)
        if min_val < domain_min
            # When a threshold scale is used domain_min is the upper bound of
            # the lowest bin, thus display min_val.
            if geomap.private.domain.length > 2
                min_text = geomap.properties.format(min_val)
            else
                if domain_max > domain_min
                    min_text = '< ' + min_text
                else
                    min_text = '> ' + min_text

        # Hacky way to update already existing legend text element with min val.
        min_val_idx = colorlist.length - 1
        sg.selectAll('text.text-' + (min_val_idx)).text(min_text)


(exports? or this).d3.geomap.choropleth = ()->
    new Choropleth()