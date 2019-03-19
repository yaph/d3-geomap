import { Geomap } from "./js/geomap.js";
import { Choropleth } from "./js/choropleth.js";
export { colorbrewer } from "./js/colorbrewer.js";


const basemap = () => new Geomap();
const choropleth = () => new Choropleth();

export {basemap, choropleth};