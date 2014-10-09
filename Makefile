help:
	@echo "topo-world - create topojson files for world"
	@echo "topo-countries - create topojson files for countries"


topo-world:
	ogr2ogr -f GeoJSON shp/units.json shp/ne_10m_admin_0_countries_lakes.shp
	node_modules/topojson/bin/topojson --simplify-proportion .08 --id-property SU_A3 -p name=NAME -o shp/countries.json shp/units.json
	rm -f shp/units.json


# does not work without geonamescache globally installed
topo-countries:
	cd scripts && python topo_countries.py


topo: topo-world topo-countries