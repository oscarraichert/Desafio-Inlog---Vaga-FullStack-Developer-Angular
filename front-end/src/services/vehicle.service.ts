import { HttpClient } from "@angular/common/http";
import { Vehicle } from "../models/vehicle";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiRoutes } from "../utils/api-routes";

@Injectable({ providedIn: 'root' })
export class VehicleService {
    constructor(private http: HttpClient) { }

    public getAll(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(ApiRoutes.listVehicles);
    }

    public addVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(ApiRoutes.addVehicle, vehicle);
    }

    public deleteById(id: number): Observable<void> {
        return this.http.delete<void>(ApiRoutes.deleteVehicleById + id);
    }
}