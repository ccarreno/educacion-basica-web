import { Component, OnInit } from '@angular/core';
import { SumarService } from '../../services/sumar.service';
import { OperacionService } from "../../services/operacion.service";
import { Item } from '../../model/item.model';
import { Router } from '@angular/router';
import { StatusBitacora } from '../../model/statusBitacora.model';

@Component({
  selector: 'app-sumar',
  templateUrl: './sumar.component.html'
})
export class SumarComponent implements OnInit {

  items:Item[];
  promesa:Promise<Item[]>;
  service:SumarService;
  usuario:string;
  router:Router;
  operacionService:OperacionService;

  constructor(_service:SumarService, _router:Router, _operacionService:OperacionService) {
    this.service = _service;
    this.router = _router;
    this.operacionService = _operacionService;
    this.usuario = "dcarreno";
    this.promesa = this.service.generarSumas(this.usuario);
    this.promesa.then(value => {
      this.items = value;
    });
    console.log(this.items);
  }

  async validarRespuesta(respuesta:number, index:number) {

    console.log("validarRespuesta(" + respuesta + ", " + index + "))");

    for(let it of this.items) {
      if(it.index == index) {
        if(it.resultadoOK == respuesta) {
          console.log("respuesta=" + respuesta + "; index=" + index);
          it.resuelto = true;
          it.resultadoUsuario = respuesta;
          it.errorCalculo = false;
          this.operacionService.modificarOperacion(it);
          break;
        }
        it.errorCalculo = true;
        it.resultadoUsuario = respuesta;
        this.operacionService.modificarOperacion(it);
        break;
      }
    }
    // let revisionOperaciones:any = this.operacionService.revisionOperaciones();
    let revisionOperaciones:any = {
      haTerminado:true
    };
    for(let it of this.items) {
      revisionOperaciones.bitacoraId = it.bitacoraId;
      if(!it.resuelto) {
        revisionOperaciones.haTerminado = false;
      }
    }

    console.log(revisionOperaciones);

    if(revisionOperaciones.haTerminado && this.operacionService.cerrarBitacoraOperacion(revisionOperaciones.bitacoraId)) {

      let otrasOperaciones:StatusBitacora;
      await this.operacionService.revisionOtrasOperaciones(this.usuario, ["restas", "multiplicaciones", "divisiones"]).then(result => otrasOperaciones = result);

      // this.operacionService.evaluarOtrasOperaciones(otrasOperaciones);
    }
  }

  ngOnInit() {
  }

}
