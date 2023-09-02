import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPacienteComponent } from './components/crear-paciente/crear-paciente.component';
import { HomeComponent } from './components/home/home.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { EditarPacienteComponent } from './components/editar-paciente/editar-paciente.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "PacienteNuevo", component: CrearPacienteComponent },
  { path: "Pacientes", component: ListaPacientesComponent },
  { path: "PacientesEditar", component: EditarPacienteComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
