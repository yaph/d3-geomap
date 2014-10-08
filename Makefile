help:
	@echo "topo-clean - remove GeoJSON files from shp directory"
	@echo "topo-world - create topojson file for world countries"
	@echo "topo-world-regions - create topojson file for world countries admin regions"

topo-clean:
	rm -f shp/units.json

topo-world: topo-clean
	ogr2ogr -f GeoJSON shp/units.json shp/ne_10m_admin_0_countries_lakes.shp
	node_modules/topojson/bin/topojson --simplify-proportion .08 --id-property SU_A3 -p name=NAME -o shp/countries.json shp/units.json

topo-world-regions: topo-clean
	ogr2ogr -f GeoJSON shp/units.json shp/ne_10m_admin_1_states_provinces_lakes.shp
	node_modules/topojson/bin/topojson --simplify-proportion .08 --id-property SU_A3 -p name=NAME -o shp/countries-regions.json shp/units.json

topo-all: topo-world topo-world-regions