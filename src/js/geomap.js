import { select as d3Select } from 'd3-selection';
import { feature as topoFeature } from 'topojson';
import { json as d3JSONFetch } from 'd3-fetch';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';

import { addAccessor } from './utils';


export class Geomap {
    constructor() {
        // Set default properties optimized for naturalEarth projection.
        this.properties = {
            /**
             * URL to TopoJSON file to load when geomap is drawn. Ignored if geoData is specified.
             *
             * @type {string|null}
             */
            geofile: null,
            /**
             * Contents of TopoJSON file. If specified, geofile is ignored.
             *
             * @type {Promise<object>|object|null}
             */
            geoData: null,
            height: null,
            postUpdate: null,
            projection: geoNaturalEarth1,
            rotate: [0, 0, 0],
            scale: null,
            translate: null,
            unitId: 'iso3',
            unitPrefix: 'unit-',
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
        const self = this;
        let k = 1,
            x0 = self.properties.width / 2,
            y0 = self.properties.height / 2,
            x = x0,
            y = y0;
        if (!d.target) return;

        const feature = d3Select(d.target).datum();
        if (self._.centered !== feature) {
            const centroid = self.path.centroid(feature);
            x = centroid[0];
            y = centroid[1];
            k = self.properties.zoomFactor;
            self._.centered = feature;
        } else {
            self._.centered = null;
        }

        self.svg.selectAll('path.unit')
            .classed('active', unit => unit === self._.centered);

        self.svg.selectAll('g.zoom')
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
    draw(selection) {
        const self = this;
        self.data = selection.datum();

        if (!self.properties.width)
            self.properties.width = selection.node().getBoundingClientRect().width;

        if (!self.properties.height)
            self.properties.height = self.properties.width / 1.92;

        self.svg = selection.append('svg')
            .attr('width', self.properties.width)
            .attr('height', self.properties.height);

        self.svg.append('rect')
            .attr('class', 'background')
            .attr('width', self.properties.width)
            .attr('height', self.properties.height)
            .on('click', self.clicked.bind(self));

        // Set map projection and path.
        const proj = self.properties.projection()
            .precision(.1);

        // Apply optional user settings to projection.
        if (self.properties.scale) proj.scale(self.properties.scale);
        if (self.properties.translate) proj.scale(self.properties.translate);

        // Not every projection supports rotation, e. g. albersUsa does not.
        if (proj.hasOwnProperty('rotate') && self.properties.rotate)
            proj.rotate(self.properties.rotate);

        self.path = geoPath().projection(proj);
        const drawGeoData = geo => {
            self.geo = geo;
            self.geoFeature = topoFeature(geo, geo.objects[self.properties.units]);

            // Auto fit size if scale and translate are not set.
            if (self.properties.scale === null && self.properties.translate === null) {
                proj.fitSize([self.properties.width, self.properties.height], self.geoFeature);
            }

            self.svg.append('g').attr('class', 'units zoom')
                .selectAll('path')
                .data(self.geoFeature.features)
                .enter().append('path')
                    .attr('class', d => 'unit ' + self.properties.unitPrefix + self.unitName(d.properties))
                    .attr('d', self.path)
                    .on('click', self.clicked.bind(self))
                    .append('title')
                        .text(self.properties.unitTitle);
            self.update();
        };

        Promise.resolve()
            .then(() => {
                if (self.properties.geoData) {
                    return self.properties.geoData;
                }
                return d3JSONFetch(self.properties.geofile);
            })
            .then(geo => drawGeoData(geo));
    }

    unitName(record) {
        const name = record[this.properties.unitId];
        if ('undefined' !== typeof name) {
            return name.toString().trim().replace(/\s/g,'_');
        }
        return '';
    }

    update() {
        if (this.properties.postUpdate)
            this.properties.postUpdate();
    }
}
