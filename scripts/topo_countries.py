#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
from geonamescache import GeonamesCache

gc = GeonamesCache()
toposrc = '../data/states-provinces.json'

#for iso2, country in gc.get_countries().items():
for i in range(1):
    iso3 = 'USA'  # country['iso3']

    topojson = 'mapshaper -i {0} -filter \'"{1}" == adm0_a3\' -filter-fields fips,name -o format=topojson {1}.json'
    subprocess.call(topojson.format(toposrc, iso3), shell=True)

subprocess.call('mv *.json ../src/topojson/countries/', shell=True)