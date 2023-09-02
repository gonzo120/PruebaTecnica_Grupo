import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit  {
  Paciente = {
    nombre: "",
    Consulta: "",
    correo: "",
    atendido: ""
  };
  messageOk = null;
  messageErr = null;
  constructor(private rest: RestService, private route: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('EditarPacienteComponent cargado');
    this.cargarPaciente();
  }
  
  async cargarPaciente() {
    var id = sessionStorage.getItem('id');
    var res = await this.rest.GetRequest('listOfPatients/' + id).toPromise();
    
    // Verifica si res.data es un array y tiene al menos un elemento
    if (Array.isArray(res.data) && res.data.length > 0) {
        // Obtén el primer elemento del array (que debería ser el objeto del paciente)
        const paciente = res.data[0];
        console.log("paciente", paciente);

        // Asigna los valores del paciente al objeto Paciente
        this.Paciente.nombre = paciente.nombre;
        this.Paciente.Consulta = paciente.Consulta;
        this.Paciente.correo = paciente.correo;
        this.Paciente.atendido = paciente.atendido;
        
        // Marcar los cambios manualmente
        this.cdr.detectChanges();
    }
}


  async actualizar() {
    var id = sessionStorage.getItem('id');

    try {
      var res = await this.rest.PutRequest('updatePatient/' + id, this.Paciente).toPromise();
      this.messageOk = res.message;
    } catch (error: any) {
      this.messageErr = error.error.message
    }
  }

  cancelar() {
    this.route.navigate(["Pacientes"])
  }

  cerrarAlert1() {
    this.messageOk = null;
  }

  cerrarAlert2() {
    this.messageErr = null;
  }
}
