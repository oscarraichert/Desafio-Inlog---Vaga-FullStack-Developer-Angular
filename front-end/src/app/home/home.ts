import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { VehicleType } from '../../models/vehicle-type';
import * as leaflet from 'leaflet';
import { RouterLink } from '@angular/router';
import { MapService } from '../../services/map.service';
import { MapMarkers } from '../../utils/map-markers';
import { GeolocationService } from '../../services/geolocation.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '../components/navbar/navbar';

@Component({
  selector: 'app-home',
  providers: [],
  imports: [RouterLink, ReactiveFormsModule, Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {

  private map!: L.Map;
  vehicles: Vehicle[] = [];
  vehicleType = VehicleType;
  vehiclesCoords: leaflet.LatLngExpression[] = [];
  selectedVehicle: Vehicle | null = null;
  private markers: leaflet.Marker[] = [];
  searchControl = new FormControl('');
  filteredVehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    private mapService: MapService,
    private geoService: GeolocationService,
  ) { }

  ngOnInit(): void {
    this.map = this.mapService.initializeMap('map');
    this.getVehicles();

    this.searchControl.valueChanges.subscribe(search => {
      this.filterVehicles(search);
    });
  }

  filterVehicles(search: string | null) {
    const s = (search || '').toLowerCase();
    this.filteredVehicles = this.vehicles.filter(v =>
      v.placa.toLowerCase().includes(s) ||
      v.cor.toLowerCase().includes(s) ||
      v.chassi.toLowerCase().includes(s) ||
      this.vehicleType[v.tipoVeiculo].toLowerCase().includes(s)
    );
  }

  selectVehicle(vehicle: Vehicle) {
    if (this.selectedVehicle === vehicle) {
      this.deselectVehicle();
    } else {
      this.selectedVehicle = vehicle;
      this.centerOnSelectedVehicle();
    }
  }

  deselectVehicle() {
    this.selectedVehicle = null;
    this.recenterMap();
  }

  deleteVehicle() {
    if (this.selectedVehicle) {
      this.vehicleService.deleteById(this.selectedVehicle.id).subscribe({
        next: _ => {
          this.getVehicles();
          this.deselectVehicle();
        },
        error: err => console.error(err)
      });
    }
  }

  private getVehicles() {
    this.vehicleService.getAll().subscribe({
      next: data => {
        this.vehicles = data;
        this.filterVehicles(this.searchControl.value);
        this.setMapBounds();
      },
      error: err => console.error(err)
    });
  }

  private setMapBounds() {
    this.setVehicleMarkers();

    let bounds = leaflet.latLngBounds(this.vehiclesCoords);
    this.map.fitBounds(bounds, { maxZoom: 16, padding: [2, 2] });
  }

  recenterMap() {
    let bounds = leaflet.latLngBounds(this.vehiclesCoords);
    this.map.fitBounds(bounds, { maxZoom: 16, padding: [2, 2] });
  }

  centerOnSelectedVehicle() {
    if (this.selectedVehicle) {
      this.map.setView([this.selectedVehicle?.latitude!, this.selectedVehicle?.longitude!], 16);
    }
  }

  private setVehicleMarkers() {
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];
    this.vehiclesCoords = [];

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
        this.selectedVehicle = v;
        (e.target as L.Marker).openPopup();
      });

      marker.on('click', () => {
        this.selectedVehicle = v;
        popup.setLatLng(marker.getLatLng()).openOn(this.map);
      });

      this.markers.push(marker);
      this.vehiclesCoords.push([v.latitude, v.longitude]);
    }
  }

  private orderByUserProximity() {
    let userPosition = this.geoService.userLatLng;

    if (userPosition != null) {
      this.filteredVehicles.sort((a, b) => {
        const aDistance = leaflet.latLng(a.latitude, a.longitude).distanceTo(userPosition);
        const bDistance = leaflet.latLng(b.latitude, b.longitude).distanceTo(userPosition);
        return aDistance - bDistance;
      });
    }
  }
}
