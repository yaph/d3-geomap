class Geomap {
    constructor() {
        // Set default properties optimized for naturalEarth projection.
        this.properties = {
            geofile: null,
            height: 500,
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            },
            postUpdate: null,
            projection: d3.geo.naturalEarth,
            rotate: [0, 0, 0],
            title: (d) => d.properties.name,
            unitId: 'iso3',
            units: 'units',
            width: 960,
            zoomFactor: 4
        };

        // Dependant properties must be set after initialization.
        this.properties.scale = this.properties.width / 5.8;
        this.properties.translate = [this.properties.width / 2, this.properties.height / 2];

        // Setup methods to access properties.
        for (let prop of d3.entries(this.properties))
            addAccessor(this, prop.key, prop.value);

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
        } else {
            this._.centered = null;
        }
        this.svg.selectAll('path.unit')
           .classed('active', this._.centered && ((d) => d === this._.centered));

        this.svg.selectAll('g.zoom')
            .transition()
            .duration(750)
            .attr('transform', `translate(${x0}, ${y0})scale(${k})translate(-${x}, -${y})`);
    }


    // Draw base map and load geo data once. Call update to draw units.
    draw(selection, self) {
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
            self.svg.append('g').attr('class', 'units zoom')
                .selectAll('path')
                .data(topojson.feature(geo, geo.objects[self.properties.units]).features)
                .enter().append('path')
                    .attr('class', (d) => `unit ${d.id}`)
                    .attr('d', self.path)
                    .on('click', self.clicked.bind(self))
                    .append('title')
                        .text(self.properties.title);
            self.update();
        });
    }

    update() {
        if (this.properties.postUpdate)
            this.properties.postUpdate();
    }
}

d3.geomap = () => new Geomap();
