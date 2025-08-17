import { VehicleType } from "./vehicle-type";

export class Vehicle {
  id: number;
  chassi: string;
  tipoVeiculo: VehicleType;
  cor: string;
  placa: string;
  latitude: number;
  longitude: number;
  imageBase64?: string;
  imageUrl?: string;

  constructor(
    id: number,
    chassi: string,
    tipoVeiculo: VehicleType,
    cor: string,
    placa: string,
    latitude: number,
    longitude: number,
    imageBase64?: string,
    imageUrl?: string
  ) {
    this.id = id;
    this.chassi = chassi;
    this.tipoVeiculo = tipoVeiculo;
    this.cor = cor;
    this.placa = placa;
    this.latitude = latitude;
    this.longitude = longitude;
    this.imageBase64 = imageBase64;
    this.imageUrl = imageUrl;
  }
}