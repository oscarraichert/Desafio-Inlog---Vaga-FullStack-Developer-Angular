import { environment } from "../environments/environment";

export class ApiRoutes {
    static baseUrl = environment.apiUrl;

    static listVehicles = this.baseUrl + "/Veiculo/Listar";

    static addVehicle = this.baseUrl + "/Veiculo/Cadastrar";

    static deleteVehicleById = this.baseUrl + "/Veiculo/Delete/";
}