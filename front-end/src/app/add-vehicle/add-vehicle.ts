import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleType } from '../../models/vehicle-type';
import { CommonModule } from '@angular/common';
import { MapService } from '../../services/map.service';
import * as leaflet from 'leaflet';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarContainer } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-vehicle',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-vehicle.html',
  styleUrl: './add-vehicle.scss'
})
export class AddVehicle implements OnInit {
  private map!: L.Map;
  imagePreview: string | ArrayBuffer | null = null;
  imageBase64: string;
  vehicleLocation?: L.Marker;
  showLocationError = false;

  constructor(
    private mapService: MapService,
    private vehicleService: VehicleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initMap();
  }

  vehicleTypeOptions = Object.keys(VehicleType)
    .filter(k => isNaN(Number(k)))
    .map(k => ({
      key: k,
      value: Number((VehicleType as any)[k])
    }));

  newVehicleForm = new FormGroup({
    type: new FormControl<number | null>(null, [Validators.required]),
    licensePlate: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('[A-Z0-9]+')
    ]),
    color: new FormControl('', [Validators.required,]),
    chassis: new FormControl('', [
      Validators.required,
      Validators.maxLength(17),
      Validators.minLength(17),
      Validators.pattern('[A-Z0-9]+')
    ]),
  });

  private initMap() {
    this.map = this.mapService.initializeMap('map');

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const latLng = e.latlng;

      if (this.vehicleLocation) {
        this.map.removeLayer(this.vehicleLocation);
      }

      this.vehicleLocation = leaflet.marker(latLng)
        .addTo(this.map);
    });
  }

  onSubmit() {
    this.showLocationError = !this.vehicleLocation;

    if (this.newVehicleForm.valid && this.vehicleLocation != null) {
      let vehicle = new Vehicle(
        0,
        this.newVehicleForm.value.chassis!,
        this.newVehicleForm.value.type!,
        this.newVehicleForm.value.color!,
        this.newVehicleForm.value.licensePlate!,
        this.vehicleLocation?.getLatLng().lat!,
        this.vehicleLocation?.getLatLng().lng!,
        this.imageBase64,
      );

      this.vehicleService.addVehicle(vehicle).subscribe({
        next: () => {
          this.snackBar.open('Veículo adicionado com sucesso!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err.message);
          this.snackBar.open('Falha ao salvar veículo: ' + err.message, 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['failure-snackbar']
          });
        },
      });
    } else {
      this.newVehicleForm.markAllAsTouched();
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);

        const base64String = btoa(
          Array.from(byteArray)
            .map(byte => String.fromCharCode(byte))
            .join('')
        );

        this.imageBase64 = base64String;
        this.imagePreview = `data:${file.type};base64,${base64String}`;
      };

      reader.readAsArrayBuffer(file);
    }
  }
}
