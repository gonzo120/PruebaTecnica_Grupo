import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit {
  

  Paciente = {
    nombre: "",
    Consulta: "",
    correo: "",
    atendido: ""
  };
  messageOk = null;
  messageErr = null;

  constructor(private rest: RestService, private route: Router) { }

  ngOnInit(): void {
  }

  async agregar() {
    // obtener imagen
    // mostrar datos
    console.log(this.Paciente.nombre)
    console.log(this.Paciente.Consulta)
    console.log(this.Paciente.correo)
    console.log(this.Paciente.atendido)
    console.log(this.Paciente.atendido)

    try {
      // peticion
      // podemos utilizar await o no
      var res = await this.rest.PostRequest("createPatient", this.Paciente).toPromise();
      console.log(res);
      // resetear datos
      this.Paciente.nombre = "";
      this.Paciente.Consulta = "";
      this.Paciente.correo = "";
      this.Paciente.atendido="";
      this.messageOk = res.message;

    } catch(error: any) {
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
