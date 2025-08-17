import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { VehicleType } from '../../models/vehicle-type';
import * as leaflet from 'leaflet';
import { RouterLink } from '@angular/router';
import { MapService } from '../../services/map.service';
import { MapMarkers } from '../../utils/map-markers';

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
  coords: [number, number][] = [];

  constructor(
    private vehicleService: VehicleService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.getVehiclesAndMarkers();
  }

  getVehiclesAndMarkers() {
    this.vehicleService.getAll().subscribe({
      next: data => {
        this.vehicles = data;
        this.initMap();
      },
      error: err => console.error(err)
    });
  }

  initMap() {
    this.map = this.mapService.initializeMap('map');

    for (let v of this.vehicles) {
      leaflet.marker([v.latitude, v.longitude], { icon: MapMarkers.fromVehicleType(v.tipoVeiculo)})
        .addTo(this.map)
        .bindPopup(`${this.vehicleType[v.tipoVeiculo]} #${v.id}<br>${v.placa}`)
        .openPopup();

      this.coords.push([v.latitude, v.longitude]);
    }

    let bounds = leaflet.latLngBounds(this.coords);
    this.map.fitBounds(bounds, { maxZoom: 16 });
  }
}
