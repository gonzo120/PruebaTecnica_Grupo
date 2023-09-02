import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearPacienteComponent } from './components/crear-paciente/crear-paciente.component';
import { EditarPacienteComponent } from './components/editar-paciente/editar-paciente.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { RestService } from './services/rest.service';

@NgModule({
  declarations: [
    AppComponent,
    CrearPacienteComponent,
    EditarPacienteComponent,
    MenubarComponent,
    PacientesComponent,
    HomeComponent,
    ListaPacientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
