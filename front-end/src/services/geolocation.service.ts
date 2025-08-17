import { Injectable } from "@angular/core";
import { LatLng } from "leaflet";

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  userLatLng: LatLng | null;

  constructor() {
    this.getUserLocation();
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          this.userLatLng = new LatLng(lat, lng);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  }
}
