#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
from geonamescache import GeonamesCache

gc = GeonamesCache()
toposrc = '~/data/geo/naturalearthdata.com/ne_10m_admin_1_states_provinces_lakes/ne_10m_admin_1_states_provinces_lakes.shp'

#for iso2, country in gc.get_countries().items():
for i in range(1):
    iso3 = 'USA'  # country['iso3']

    topojson = 'mapshaper -i {0} -filter \'"{1}" == adm0_a3\' -rename-layers units -filter-fields fips,name -simplify resolution=1920x1080 -o format=topojson precision=0.001 {1}.json'
    subprocess.call(topojson.format(toposrc, iso3), shell=True)

subprocess.call('mv *.json ../src/topojson/countries/', shell=True)