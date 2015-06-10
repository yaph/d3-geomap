class Choropleth extends Geomap {
    constructor() {
        super();

        let properties = {
            column: null,
            domain: null,
            format: d3.format(',.02f'),
            legend: false,
            colors: colorbrewer.OrRd[9]
        };

        for (let prop of d3.entries(properties)) {
            this.properties[prop.key] = prop.value;
            addAccessor(this, prop.key, prop.value);
        }
    }

    draw(selection, geomap) {
        geomap.data = selection.datum();
        super.draw(selection, geomap);
    }

    update() {
        // FIXME Avoid removal.
        //d3.selectAll('path.unit').remove();
        super.update();

        let geomap = this,
            extent = d3.extent(geomap.data, (d) => parseFloat(d[geomap.properties.column]));

        // Set the coloring function.
        let colorize = d3.scale.quantize()
            .domain(extent)
            .range(geomap.properties.colors);



        // geomap.svg.units.enter().append('path')
        //     .attr('class', 'unit')
        //     .attr('d', geomap.path)
        //     .style('fill', (d) => {
        //         colorize(d[geomap.properties.column]);
        //     })
        //     .on('click', geomap.clicked.bind(geomap));
    }
}

d3.geomap.choropleth = () => new Choropleth();
