import { Injectable } from "@angular/core";
import * as leaflet from 'leaflet';
import { MapMarkers } from "../utils/map-markers";

@Injectable({ providedIn: 'root' })
export class MapService {
    iconRetina = 'assets/leaflet/marker-icon-2x.png';
    iconDefault = 'assets/leaflet/marker-icon.png';
    iconShadow = 'assets/leaflet/marker-shadow.png';

    initializeMap(htmlId: string): leaflet.Map {
        leaflet.Marker.prototype.options.icon = MapMarkers.defaultMarker;

        let map = leaflet.map(htmlId, { closePopupOnClick: false }).setView([-25.441105, -49.276855], 13);

        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        return map;
    }
}