import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Home } from './home';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Vehicle } from '../../models/vehicle';
import { VehicleType } from '../../models/vehicle-type';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  const mockVehicles = [
    new Vehicle(1, '1U49H29UE0FY72YF0', VehicleType.Caminhao, 'Branco', 'LAH3947', -25.427567494979744, -49.26040629805065),
    new Vehicle(2, '8DHU37ST76YR3IH8A', VehicleType.Onibus, 'Azul', 'SHI1470', -25.359012147010098, -49.24269748815036),
    new Vehicle(3, '8DUS76Y378SH0JT98', VehicleType.Caminhao, 'Verde', 'VTY3892', -25.481455911084694, -49.32587701675288),
  ];

  const mockVehicleService = {
    getAll: () => of(mockVehicles)
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Home], 
      providers: [
        provideHttpClientTesting(),
        HttpClient,
        { provide: VehicleService, useValue: mockVehicleService },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render all vehicles', () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const items = fixture.debugElement.queryAll(By.css('ul li'));
      expect(items.length).toBe(mockVehicles.length);
      expect(items[0].nativeElement.textContent).toContain('LAH3947');
      expect(items[1].nativeElement.textContent).toContain('SHI1470');
      expect(items[2].nativeElement.textContent).toContain('VTY3892');
    });
  });

  it('should render the map', () => {
    const mapElement = fixture.debugElement.query(By.css('#map'));
    expect(mapElement).toBeTruthy();
  });
});
