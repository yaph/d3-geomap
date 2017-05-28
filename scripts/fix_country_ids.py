#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Fix some iso3 IDs that are wrong in ne_10m_admin_0_countries_lakes.shp,
# ne_10m_admin_1_states_provinces_lakes.shp seems ok though.
#
# Not all the SU_A3 IDs match those used in the ISO_A3 standard. This script replaces non-matching IDs
# with corresponding ISO_A3 values. For more details seeissue #12 https://github.com/yaph/d3-geomap/issues/12.
import json
import os

file_dest = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../data/countries.json'))

replacements = {
    'KOS': 'XKX',  # Kosovo
    'PN1': 'PNG',  # Papua New Guniea
    'PR1': 'PRT',  # Portugal
    'SDS': 'SSD',  # S. Sudan
    'SAH': 'ESH',  # W. Sahara
}

with open(file_dest, 'r') as f:
    topo = json.load(f)

countries = topo['objects']['units']['geometries']
for country in countries:
    cid = country['properties']['iso3']
    country['properties']['iso3'] = replacements.get(cid, cid)

with open(file_dest, 'w') as f:
    json.dump(topo, f, separators=(',', ':'))  # save bytes to keep file small
