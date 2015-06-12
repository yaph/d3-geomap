class Choropleth extends Geomap {
    constructor() {
        super();

        let properties = {
            colors: colorbrewer.OrRd[9],
            column: null,
            domain: null,
            format: d3.format(',.02f'),
            legend: false,
            valueScale: d3.scale.quantize
        };

        for (let prop of d3.entries(properties)) {
            this.properties[prop.key] = prop.value;
            addAccessor(this, prop.key, prop.value);
        }
    }

    columnVal(d) {
        return +d[this.properties.column];
    }

    draw(selection, self) {
        self.data = selection.datum();
        super.draw(selection, self);
    }

    update() {
        let self = this;
        self.extent = self.properties.domain || d3.extent(self.data, self.columnVal.bind(self));
        self.colorScale = self.properties.valueScale()
            .domain(self.extent)
            .range(self.properties.colors);

        // Remove fill styles that may have been set previously.
        self.svg.selectAll('path.unit').style('fill', null);

        // Add new fill styles based on data values.
        for (let d of self.data) {
            let uid = d[self.properties.unitId],
                val = d[self.properties.column],
                fill = self.colorScale(val);

            // selectAll must be called and not just select, otherwise the data
            // attribute of the selected path object is overwritten with self.data.
            let unit = self.svg.selectAll(`.${uid}`);

            // Data can contain values for non existing units.
            if (unit.empty())
                continue;

            unit.style('fill', fill);

            // New title with column and value.
            let text = self.properties.unitTitle(unit.datum());
            val = self.properties.format(val);
            unit.select('title').text(`${text}\n\n${self.properties.column}: ${val}`);
        }

        if (self.properties.legend)
            self.drawLegend(self.properties.legend);

        // Make sure postUpdate function is run if set.
        super.update();
    }

    /**
     * Draw legend including color scale and labels.
     *
     * If bounds is set to true, legend dimensions will be calculated based on
     * the map dimensions. Otherwise bounds must be an object with width and
     * height attributes.
     */
    drawLegend(bounds=null) {
        let self = this,
            wBox,
            hBox;

        const wFactor = 10,
            hFactor = 3,
            offsetFactor = .15;

        if (bounds === true) {
            wBox = self.properties.width / wFactor;
            hBox = self.properties.height / hFactor;
        } else {
            wBox = bounds.width;
            hBox = bounds.height;
        }

        const wRect = wBox / (wFactor * .75),
            hLegend = hBox - (hBox / (hFactor * 1.8)),
            offsetText = wRect / 2,
            offsetY = self.properties.height - hBox,
            tr = 'translate(' + offsetText + ',' + offsetText * 3 + ')';

        // Remove possibly existing legend, before drawing.
        self.svg.select('g.legend').remove();

        // Reverse a copy to not alter colors array.
        const colors = self.properties.colors.slice().reverse(),
            hRect = hLegend / colors.length;

        let legend = self.svg.append('g')
            .attr('class', 'legend')
            .attr('width', wBox)
            .attr('height', hBox)
            .attr('transform', 'translate(0,' + offsetY + ')');

        legend.append('rect')
            .style('fill', '#fff')
            .attr('class', 'legend-bg')
            .attr('width', wBox)
            .attr('height', hBox);

        legend.append('rect')
            .attr('class', 'legend-bar')
            .attr('width', wRect)
            .attr('height', hLegend)
            .attr('transform', tr);

        let sg = legend.append('g')
            .attr('transform', tr);

        // Draw color scale.
        sg.selectAll('rect')
            .data(colors)
            .enter().append('rect')
            .attr('y', (d, i) => i * hRect)
            .attr('fill', (d, i) => colors[i])
            .attr('width', wRect)
            .attr('height', hRect);

        // Draw color scale labels.
        sg.selectAll('text')
            .data(colors)
            .enter().append('text')
            .text((d) => self.properties.format(self.colorScale.invertExtent(d)[0]))
            .attr('class', (d, i) => 'text-' + i)
            .attr('x', wRect + offsetText)
            .attr('y', (d, i) => i * hRect + hRect + (wRect * offsetFactor));

        // Draw label for end of extent.
        sg.append('text')
            .text(self.properties.format(self.extent[1]))
            .attr('x', wRect + offsetText)
            .attr('y', offsetText * offsetFactor);
    }
}

d3.geomap.choropleth = () => new Choropleth();
