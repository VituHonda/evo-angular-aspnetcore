import { Routes } from '@angular/router';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';

export const routes: Routes = [
    {path: "", component: DepartamentosComponent},
    {path: "funcionarios", component: FuncionariosComponent},
];
