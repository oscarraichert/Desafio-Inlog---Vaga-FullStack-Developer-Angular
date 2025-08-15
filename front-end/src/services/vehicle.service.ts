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
}