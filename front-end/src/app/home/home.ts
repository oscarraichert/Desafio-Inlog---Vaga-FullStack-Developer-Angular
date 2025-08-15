import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { VehicleType } from '../../models/vehicle-type';

@Component({
  selector: 'app-home',
  providers: [],
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  vehicles: Vehicle[] = [];

  vehicleType = VehicleType;
  
  constructor(private vehicleService: VehicleService) {}  

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe({
      next: data => this.vehicles = data,
      error: err => console.error(err)
    });
  }
}
