.PHONY: bundle


help:
	@echo "topo-world - create topojson files for world"
	@echo "topo-countries - create topojson files for countries"


bundle:
	npm run build
	cp LICENSE dist/
	zip -r bundle/d3-geomap.zip dist/


clean:
	rm -f bundle/d3.geomap.zip
	rm -f data/*.json
	rm -rf dist/*


changelog:
	git-changelog -o CHANGELOG.md --bump=auto


topo-world:
	mapshaper -i ~/data/geo/naturalearthdata.com/ne_10m_admin_0_countries_lakes/ne_10m_admin_0_countries_lakes.shp \
		-rename-fields name=NAME,iso3=ADM0_A3 \
		-rename-layers units \
		-filter-fields iso3,name \
		-simplify resolution=1920x1080 \
		-o format=topojson \
		precision=0.001 \
		data/countries.json

	python scripts/fix_country_ids.py
	mkdir -p dist/topojson/world
	mv data/countries.json dist/topojson/world/


# geonamescache must be installed
topo-countries:
	mapshaper -i ~/data/geo/naturalearthdata.com/ne_10m_admin_1_states_provinces_lakes/ne_10m_admin_1_states_provinces_lakes.shp \
		-rename-layers units \
		-simplify resolution=24000x16000 \
		-o format=topojson \
		precision=0.001 \
		data/states-provinces.json

	mkdir -p dist/topojson/countries
	python scripts/topo_countries.py


topo: clean topo-world topo-countries


# Call example: make release version=4.0.0
release:
	git tag -a $(version) -m 'Create version $(version)'
	git push --tags
	npm publish
