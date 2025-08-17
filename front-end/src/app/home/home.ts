import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { VehicleType } from '../../models/vehicle-type';
import * as leaflet from 'leaflet';
import { RouterLink } from '@angular/router';
import { MapService } from '../../services/map.service';
import { MapMarkers } from '../../utils/map-markers';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-home',
  providers: [],
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  private map!: L.Map;
  vehicles: Vehicle[] = [];
  vehicleType = VehicleType;
  vehiclesCoords: leaflet.LatLngExpression[] = [];
  selectedVehicle: Vehicle | null = null;

  constructor(
    private vehicleService: VehicleService,
    private mapService: MapService,
    private geoService: GeolocationService,
  ) { }

  ngOnInit(): void {
    this.getVehiclesAndInitMap();
  }

  selectVehicle(vehicle: Vehicle) {
    if (this.selectedVehicle === vehicle) {
      this.selectedVehicle = null;
    } else {
      this.selectedVehicle = vehicle;
      console.log(this.selectedVehicle)
    }
  }

  deselectVehicle() {
    this.selectedVehicle = null;
  }

  private getVehiclesAndInitMap() {
    this.vehicleService.getAll().subscribe({
      next: data => {
        this.vehicles = data;
        this.initMap();
      },
      error: err => console.error(err)
    });
  }

  private initMap() {
    this.map = this.mapService.initializeMap('map');

    this.setVehicleMarkers();

    let bounds = leaflet.latLngBounds(this.vehiclesCoords);
    this.map.fitBounds(bounds, { maxZoom: 16 });
  }

  recenterMap() {
    let bounds = leaflet.latLngBounds(this.vehiclesCoords);
    this.map.fitBounds(bounds, { maxZoom: 16 });
  }

  centerOnSelectedVehicle() {
    if (this.selectedVehicle) {
      this.map.setView(leaflet.latLng(this.selectedVehicle?.latitude!, this.selectedVehicle?.longitude!), 16);
    }
  }

  private setVehicleMarkers() {
    this.orderByUserProximity();

    for (let v of this.vehicles) {
      let latLong = [v.latitude, v.longitude] as leaflet.LatLngExpression;

      let popup = leaflet.popup({
        content: `${this.vehicleType[v.tipoVeiculo]} #${v.id}<br>${v.placa}`,
        closeButton: true,
        closeOnClick: false,
        autoClose: false,
        offset: leaflet.point(0, -10),
      });

      let marker = leaflet.marker(latLong, { icon: MapMarkers.fromVehicleType(v.tipoVeiculo) }).addTo(this.map);

      marker.on('dblclick', (e) => {
        this.map.setView(latLong, 16);
        (e.target as L.Marker).openPopup();
      });

      marker.on('click', () => {
        popup.setLatLng(marker.getLatLng()).openOn(this.map);
      });

      this.vehiclesCoords.push([v.latitude, v.longitude]);
    }
  }

  private orderByUserProximity() {
    let userPosition = this.geoService.userLatLng;

    if (userPosition != null) {
      this.vehicles.sort((a, b) => {
        const aDistance = leaflet.latLng(a.latitude, a.longitude).distanceTo(userPosition);
        const bDistance = leaflet.latLng(b.latitude, b.longitude).distanceTo(userPosition);
        return aDistance - bDistance;
      });
    }
  }
}
