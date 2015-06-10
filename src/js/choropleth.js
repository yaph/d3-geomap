class Choropleth extends Geomap {
    constructor() {
        super();

        let properties = {
            colors: colorbrewer.OrRd[9],
            column: null,
            domain: null,
            format: d3.format(',.02f'),
            legend: false
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
        self.scale = d3.scale.quantize()
            .domain(self.extent)
            .range(self.properties.colors);

        // Remove fill styles that may have been set previously.
        self.svg.selectAll('path.unit').style('fill', null);

        // Add new fill styles based on data values.
        for (let d of self.data) {
            let uid = d[self.properties.unitId],
                val = d[self.properties.column],
                fill = self.scale(val);

            let unit = self.svg.select(`#${self.properties.idPrefix}${uid}`)
                .style('fill', fill);

            // FIXME with multiple updates title gets longer and longer...
            // Add value to existing title

            let title = unit.select('title');
            title.text(`${title.text()}: ${val}`);
        }

debugger;

        // Make sure postUpdate function is run if set.
        super.update();
    }
}

d3.geomap.choropleth = () => new Choropleth();
