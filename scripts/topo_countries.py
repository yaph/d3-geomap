#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
from geonamescache import GeonamesCache

gc = GeonamesCache()
toposrc = 'data/states-provinces.json'

for iso2, country in gc.get_countries().items():
    iso3 = country['iso3']

    topojson = 'mapshaper -i {0} -filter \'"{1}" == adm0_a3\' -filter-fields fips,name -o format=topojson dist/topojson/countries/{1}.json'
    subprocess.call(topojson.format(toposrc, iso3), shell=True)