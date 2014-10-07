#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import subprocess
from geonamescache import GeonamesCache

gc = GeonamesCache()

for iso2, country in gc.get_countries().items():
    iso3 = country['iso3']

    geojson = 'ogr2ogr -f GeoJSON -where "ADM0_A3 IN (\'{0}\')" units.json ../shp/ne_10m_admin_1_states_provinces_lakes.shp'
    subprocess.call(geojson.format(iso3), shell=True)

    topojson = '../node_modules/topojson/bin/topojson --simplify-proportion .08 --id-property fips -p name=name -o {0}.json units.json'
    subprocess.call(topojson.format(iso3), shell=True)
    os.unlink('units.json')

subprocess.call('mv *.json ../src/topojson/countries/', shell=True)
