import * as L from 'leaflet';
import { VehicleType } from '../models/vehicle-type';

export class MapMarkers {
    static iconRetina = 'assets/leaflet/marker-icon-2x.png';
    static iconDefault = 'assets/leaflet/marker-icon.png';
    static iconShadow = 'assets/leaflet/marker-shadow.png';

    static defaultMarker = L.icon({
        iconRetinaUrl: this.iconRetina,
        iconUrl: this.iconDefault,
        shadowUrl: this.iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    static busIcon = L.icon({
        iconUrl: 'assets/icons/bus.png',
        iconSize: [41, 41],
        iconAnchor: [20, 20],
        popupAnchor: [1, -20],
    });

    static truckIcon = L.icon({
        iconUrl: 'assets/icons/box-truck.png',
        iconSize: [41, 41],
        iconAnchor: [20, 20],
        popupAnchor: [1, -20],
    });

    static fromVehicleType(type: VehicleType): L.Icon {
        switch (type) {
            case VehicleType.Caminhao:
                return this.truckIcon;

            case VehicleType.Onibus:
                return this.busIcon;

            default:
                return this.defaultMarker;
        }
    }
}

