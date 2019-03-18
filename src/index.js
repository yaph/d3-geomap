import {Geomap} from "./js/geomap.js";
import {Choropleth} from "./js/choropleth.js";
export {colorbrewer} from "./js/colorbrewer.js";


const geomap = () => new Geomap();
geomap.choropleth = () => new Choropleth();

export {geomap};