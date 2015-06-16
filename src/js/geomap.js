class Geomap {
    constructor() {
        // Set default properties optimized for naturalEarth projection.
        this.properties = {
            geofile: null,
            height: null,
            postUpdate: null,
            projection: d3.geo.naturalEarth,
            rotate: [0, 0, 0],
            scale: null,
            translate: null,
            unitId: 'iso3',
            units: 'units',
            unitTitle: (d) => d.properties.name,
            width: null,
            zoomFactor: 4
        };

        // Setup methods to access properties.
        for (let key in this.properties)
            addAccessor(this, key, this.properties[key]);

        // Store internal properties.
        this._ = {};
    }

    clicked(d) {
        let k = 1,
            x0 = this.properties.width / 2,
            y0 = this.properties.height / 2,
            x = x0,
            y = y0;

        if (d && d.hasOwnProperty('geometry') && this._.centered !== d) {
            let centroid = this.path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = this.properties.zoomFactor;
            this._.centered = d;
        } else
            this._.centered = null;

        this.svg.selectAll('path.unit')
           .classed('active', this._.centered && ((_) => _ === this._.centered));

        this.svg.selectAll('g.zoom')
            .transition()
            .duration(750)
            .attr('transform', `translate(${x0}, ${y0})scale(${k})translate(-${x}, -${y})`);
    }


    /**
     * Load geo data once here and draw map. Call update at the end.
     *
     * By default map dimensions are calculated based on the width of the
     * selection container element so they are responsive. Properties set before
     * will be kept.
     */
    draw(selection, self) {
        if (!self.properties.width)
            self.properties.width = selection.node().getBoundingClientRect().width;

        if (!self.properties.height)
            self.properties.height = self.properties.width / 1.92;

        if (!self.properties.scale)
            self.properties.scale = self.properties.width / 5.8;

        if (!self.properties.translate)
            self.properties.translate = [self.properties.width / 2, self.properties.height / 2];

        self.svg = selection.append('svg')
            .attr('width', self.properties.width)
            .attr('height', self.properties.height);

        self.svg.append('rect')
            .attr('class', 'background')
            .attr('width', self.properties.width)
            .attr('height', self.properties.height)
            .on('click', self.clicked.bind(self));

        // Set map projection and path.
        let proj = self.properties.projection()
            .scale(self.properties.scale)
            .translate(self.properties.translate)
            .precision(.1);

        // Not every projection supports rotation, e. g. albersUsa does not.
        if (proj.hasOwnProperty('rotate') && self.properties.rotate)
            proj.rotate(self.properties.rotate);

        self.path = d3.geo.path().projection(proj);

        // Load and render geo data.
        d3.json(self.properties.geofile, (error, geo) => {
            self.geo = geo;
            self.svg.append('g').attr('class', 'units zoom')
                .selectAll('path')
                .data(topojson.feature(geo, geo.objects[self.properties.units]).features)
                .enter().append('path')
                    .attr('class', (d) => `unit ${self.properties.unitId}-${d.id}`)
                    .attr('d', self.path)
                    .on('click', self.clicked.bind(self))
                    .append('title')
                        .text(self.properties.unitTitle);
            self.update();
        });
    }

    update() {
        if (this.properties.postUpdate)
            this.properties.postUpdate();
    }
}

d3.geomap = () => new Geomap();
