import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {
  messageOk = null;
  messageErr = null;
  Pacientes: any[] = [];
  no_disponible = "https://dynamicmediainstitute.org/wp-content/themes/dynamic-media-institute/imagery/default-book.png";

  constructor(private rest: RestService, private route: Router) { }

  ngOnInit(): void {
    this.getPacientes();
  }
  async getPacientes() {
    var res = await this.rest.GetRequest('listOfPatients').toPromise();
    this.Pacientes = res.data;
  }
   async eliminar(i: any) {
    var Paciente: any = this.Pacientes[i];
    try {
      var res = await this.rest.DeleteRequest('deletePatient/' + Paciente._id.$oid).toPromise();
      this.messageOk = res.message;
      this.getPacientes();
    } catch (error: any) {
      this.messageErr = error.error.message;
    }
  } 

  editar(i: any) {
    var Paciente: any = this.Pacientes[i];
    sessionStorage.setItem('id', Paciente._id.$oid);
    this.route.navigate(["PacientesEditar"]);
  }

  

  cerrarAlert1() {
    this.messageOk = null;
  }

  cerrarAlert2() {
    this.messageErr = null;
  }
}
