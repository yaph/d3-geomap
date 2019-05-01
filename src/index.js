import { Geomap } from "./js/geomap.js";
import { Choropleth } from "./js/choropleth.js";
import { colorbrewer } from "./js/colorbrewer.js";


function geomap() {
    return new Geomap();
}
function choropleth() {
    return new Choropleth();
}

export { geomap, choropleth, colorbrewer };
