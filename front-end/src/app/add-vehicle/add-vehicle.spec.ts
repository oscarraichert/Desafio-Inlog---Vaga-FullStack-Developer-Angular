import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddVehicle } from './add-vehicle';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { MapService } from '../../services/map.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import { Vehicle } from '../../models/vehicle';

describe('AddVehicle Component', () => {
  let component: AddVehicle;
  let fixture: ComponentFixture<AddVehicle>;
  let vehicleServiceSpy: jasmine.SpyObj<VehicleService>;
  let mapServiceSpy: jasmine.SpyObj<MapService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['addVehicle']);
    vehicleServiceSpy.addVehicle.and.returnValue(of({
      id: 1,
      chassi: '123456789ABCDEFG',
      tipoVeiculo: 1,
      cor: 'Azul',
      placa: 'ABC1234',
      latitude: 10,
      longitude: 20,
      imagem: null
    } as Vehicle));

    mapServiceSpy = jasmine.createSpyObj('MapService', ['initializeMap']);
    mapServiceSpy.initializeMap.and.returnValue({
      on: jasmine.createSpy('on'),
      removeLayer: jasmine.createSpy('removeLayer'),
      addLayer: jasmine.createSpy('addLayer')
    } as unknown as L.Map);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatSnackBarModule, AddVehicle],
      declarations: [],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: MapService, useValue: mapServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVehicle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.newVehicleForm.valid).toBeFalse();
  });

  it('form should be valid with correct values', () => {
    component.newVehicleForm.setValue({
      type: 1,
      licensePlate: 'ABC1234',
      color: 'Azul',
      chassis: '123456789ABCDEFGH'
    });
    component.vehicleLocation = L.marker([0, 0]);
    expect(component.newVehicleForm.valid).toBeTrue();
  });

  it('should call addVehicle when form is valid', fakeAsync(() => {
    component.newVehicleForm.setValue({
      type: 1,
      licensePlate: 'ABC1234',
      color: 'Azul',
      chassis: '123456789ABCDEFGH'
    });
    component.vehicleLocation = L.marker([10, 20]);

    component.onSubmit();
    tick();

    expect(vehicleServiceSpy.addVehicle).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should show location error if vehicleLocation is not set', () => {
    component.newVehicleForm.setValue({
      type: 1,
      licensePlate: 'ABC1234',
      color: 'Azul',
      chassis: '123456789ABCDEFGH'
    });
    component.vehicleLocation = undefined;

    component.onSubmit();

    expect(component.showLocationError).toBeTrue();
    expect(vehicleServiceSpy.addVehicle).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched if form is invalid', () => {
    spyOn(component.newVehicleForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.newVehicleForm.markAllAsTouched).toHaveBeenCalled();
  });
});
