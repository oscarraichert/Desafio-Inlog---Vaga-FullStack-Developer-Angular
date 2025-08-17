import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddVehicle } from './add-vehicle/add-vehicle';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home, title: 'Home' },
    { path: 'adicionar-veiculo', component: AddVehicle, title: 'Adicionar Veículo' },
];
