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
        return parseFloat(d[this.properties.column]);
    }

    draw(selection, self) {
        self.data = selection.datum();
        super.draw(selection, self);
    }

    update() {
        let self = this;
        self.extent = d3.extent(self.data, self.columnVal.bind(self));
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
            let unit = self.svg.selectAll(`.${uid}`).style('fill', fill);

            // New title with column and value.
            let text = self.properties.title(unit.datum());
            val = self.properties.format(val);
            unit.select('title').text(`${text}\n\n${self.properties.column}: ${val}`);
        }

        // Make sure postUpdate function is run if set.
        super.update();
    }
}

d3.geomap.choropleth = () => new Choropleth();
