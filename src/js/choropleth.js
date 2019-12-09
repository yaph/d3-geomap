import { extent as d3Extent } from 'd3-array';
import { scaleQuantize as d3ScaleQuantize } from 'd3-scale';
import { format as d3Format } from 'd3-format';

import { addAccessor } from './utils';
import { Geomap } from './geomap';

const D3_CHROMATIC_SCHEME_OrRd9 = [
  '#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000',
];

export class Choropleth extends Geomap {
    constructor() {
        super();

        let properties = {
            colors: Choropleth.DEFAULT_COLORS,
            column: null,
            domain: null,
            duration: null,
            format: d3Format(',.02f'),
            legend: false,
            valueScale: d3ScaleQuantize
        };

        for (let key in properties) {
            this.properties[key] = properties[key];
            addAccessor(this, key, properties[key]);
        }
    }

    columnVal(d) {
        return +d[this.properties.column];
    }

    defined(val) {
        return !(isNaN(val) || 'undefined' === typeof val || '' === val);
    }

    update() {
        let self = this;
        self.extent = d3Extent(self.data, self.columnVal.bind(self));
        self.colorScale = self.properties.valueScale()
            .domain(self.properties.domain || self.extent)
            .range(self.properties.colors);

        // Remove fill styles that may have been set previously.
        self.svg.selectAll('path.unit').style('fill', null);

        // Add new fill styles based on data values.
        self.data.forEach((d) => {
            let uid = self.unitName(d),
                val = d[self.properties.column].toString().trim();

            // selectAll must be called and not just select, otherwise the data
            // attribute of the selected path object is overwritten with self.data.
            let unit = self.svg.selectAll(`.${self.properties.unitPrefix}${uid}`);
            // Data can contain values for non existing units and values can be empty or NaN.
            if (!unit.empty() && self.defined(val)) {
                let fill = self.colorScale(val),
                    text = self.properties.unitTitle(unit.datum());
                if (self.properties.duration)
                    unit.transition().duration(self.properties.duration).style('fill', fill);
                else
                    unit.style('fill', fill);

                // New title with column and value.
                val = self.properties.format(val);
                unit.select('title').text(`${text}\n\n${self.properties.column}: ${val}`);
            }
        });

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
            steps = self.properties.colors.length,
            wBox,
            hBox;

        const wFactor = 10,
            hFactor = 3;

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
            hRect = hLegend / steps,
            offsetYFactor = hFactor / hRect;

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

        // Draw a rectangle around the color scale to add a border.
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

        // Determine display values for lower and upper thresholds. If the
        // minimum data value is lower than the first element in the domain
        // draw a less than sign. If the maximum data value is larger than the
        // second domain element, draw a greater than sign.
        let minDisplay = self.extent[0],
            maxDisplay = self.extent[1],
            addLower = false,
            addGreater = false;

        if (self.properties.domain) {
            if (self.properties.domain[1] < maxDisplay)
                addGreater = true;
            maxDisplay = self.properties.domain[1];

            if (self.properties.domain[0] > minDisplay)
                addLower = true;
            minDisplay = self.properties.domain[0];
        }

        // Draw color scale labels.
        sg.selectAll('text')
            .data(colors)
            .enter().append('text')
            .text((d, i) => {
                // The last element in the colors list corresponds to the lower threshold.
                if (i === steps - 1) {
                    let text = self.properties.format(minDisplay);
                    if (addLower)
                        text = `< ${text}`;
                    return text;
                }
                return self.properties.format(self.colorScale.invertExtent(d)[0]);
            })
            .attr('class', (d, i) => 'text-' + i)
            .attr('x', wRect + offsetText)
            .attr('y', (d, i) => i * hRect + (hRect + hRect * offsetYFactor));

        // Draw label for end of extent.
        sg.append('text')
            .text(() => {
                let text = self.properties.format(maxDisplay);
                if (addGreater)
                    text = `> ${text}`;
                return text;
            })
            .attr('x', wRect + offsetText)
            .attr('y', offsetText * offsetYFactor * 2);
    }
}

Choropleth.DEFAULT_COLORS = D3_CHROMATIC_SCHEME_OrRd9;
