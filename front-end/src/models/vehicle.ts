import { VehicleType } from "./vehicle-type";

export class Vehicle {
  id: number;
  chassi: string;
  tipoVeiculo: VehicleType;
  cor: string;
  placa: string;
  latitude: number;
  longitude: number;
  imageBytes?: Uint8Array;

  constructor(
    id: number,
    chassi: string,
    tipoVeiculo: VehicleType,
    cor: string,
    placa: string,
    latitude: number,
    longitude: number,
    imageBytes?: Uint8Array
  ) {
    this.id = id;
    this.chassi = chassi;
    this.tipoVeiculo = tipoVeiculo;
    this.cor = cor;
    this.placa = placa;
    this.latitude = latitude;
    this.longitude = longitude;
    this.imageBytes = imageBytes;
  }
}