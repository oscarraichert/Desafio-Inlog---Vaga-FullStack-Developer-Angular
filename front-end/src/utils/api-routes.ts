import { environment } from "../environments/environment";

export class ApiRoutes {
    static baseUrl = environment.apiUrl;

    static listVehicles = this.baseUrl + "/Veiculo/Listar";
}