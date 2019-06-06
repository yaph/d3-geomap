import { Geomap } from "./js/geomap.js";
import { Choropleth } from "./js/choropleth.js";


function geomap() {
    return new Geomap();
}
function choropleth() {
    return new Choropleth();
}

export { geomap, choropleth };
