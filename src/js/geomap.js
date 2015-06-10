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
            zoomMax: 4
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

        if (d && this._.centered !== d) {
            let centroid = this.path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = this.properties.zoomMax;
            this._.centered = d;
        } else {
            this._.centered = null;
        }

        this.svg.units.selectAll('path')
           .classed('active', this._.centered && ((d) => d === this._.centered));

        this.svg.selectAll('g.zoom')
            .transition()
            .duration(750)
            .attr('transform', `translate(${x0}, ${y0})scale(${k})translate(-${x}, -${y})`);
    }


    // Draw base map and load geo data once. Call update to draw units.
    draw(selection, geomap) {

        geomap.svg = selection.append('svg')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height);

        geomap.svg.append('rect')
            .attr('class', 'background')
            .attr('width', geomap.properties.width)
            .attr('height', geomap.properties.height)
            .on('click', geomap.clicked.bind(geomap));

        geomap.svg.g = geomap.svg.append('g')
            .attr('class', 'units zoom');

        // Set map projection and path.
        let proj = geomap.properties.projection()
            .scale(geomap.properties.scale)
            .translate(geomap.properties.translate)
            .precision(.1);

        // Not every projection supports rotation, e. g. albersUsa does not.
        if (proj.hasOwnProperty('rotate') && geomap.properties.rotate)
            proj.rotate(geomap.properties.rotate);

        geomap.path = d3.geo.path().projection(proj);

        // Load and render geo data.
        d3.json(geomap.properties.geofile, (error, geo) => {
            geomap.geo = geo;
            geomap.svg.units = geomap.svg.append('g').attr('class', 'units zoom')
                .selectAll('path')
                .data(topojson.feature(geo, geo.objects[geomap.properties.units]).features);
            geomap.update();
        });
    }

    update() {
        this.svg.units.enter().append('path')
            .attr('class', 'unit')
            .attr('id', (d) => d.id)
            .attr('d', this.path)
            .on('click', this.clicked.bind(this))
            .append('title')
                .text(this.properties.title);

        if (this.properties.postUpdate)
            this.properties.postUpdate();
    }
}

d3.geomap = () => new Geomap();
