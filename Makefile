help:
	@echo "topo-world - create topojson files for world"
	@echo "topo-countries - create topojson files for countries"

clean:
	rm -f data/*.json
	rm -f src/topojson/countries/*.json
	rm -f src/topojson/world/*.json

topo-world:
	mapshaper -i ~/data/geo/naturalearthdata.com/ne_10m_admin_0_countries_lakes/ne_10m_admin_0_countries_lakes.shp \
		id-field=SU_A3 \
		-rename-fields name=NAME,id=SU_A3 \
		-rename-layers units \
		-filter-fields id,name \
		-simplify resolution=1920x1080 \
		-o format=topojson \
		precision=0.001 \
		data/countries.json

	python scripts/fix_country_ids.py
	mv data/countries.json src/topojson/world/

# geonamescache must be installed
topo-countries:
	cd scripts && python topo_countries.py
	python scripts/fix_usa_ids.py


topo: clean topo-world topo-countries