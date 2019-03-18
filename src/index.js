import {Geomap} from "./js/geomap.js";
import {Choropleth} from "./js/choropleth.js";


export function geomap() {
    return new Geomap();
}


export function choropleth() {
    return new Choropleth();
}