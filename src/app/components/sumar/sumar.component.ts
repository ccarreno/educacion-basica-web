import { Component, OnInit } from '@angular/core';
import { SumarService } from '../../services/sumar.service';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-sumar',
  templateUrl: './sumar.component.html'
})
export class SumarComponent implements OnInit {

  items:Item[];
  promesa:Promise<Item[]>;
  service:SumarService;
  usuario:string;

  constructor(_service:SumarService) {
    this.service = _service;
    this.usuario = "dcarreno";
    this.promesa = this.service.generarSumas(this.usuario);
    this.promesa.then(value => {
      this.items = value;
    });
    console.log(this.items);
  }

  async validarRespuesta(respuesta:number, index:number) {
    //https://animeflv.net/ver/49836/boku-no-hero-academia-3rd-season-19
    for(let it of this.items) {
      if(it.index == index) {
        if(it.resultadoOK == respuesta) {
          console.log("respuesta=" + respuesta + "; index=" + index);
          it.resuelto = true;
          it.resultadoUsuario = respuesta;
          it.errorCalculo = false;
          this.service.modificarOperacion(it);
          break;
        }
        it.errorCalculo = true;
        it.resultadoUsuario = respuesta;
        this.service.modificarOperacion(it);
        break;
      }
    }
    this.revisionOperaciones();
  }

  revisionOperaciones() {
    let haTerminado:boolean = true;
    let bitacoraId:any;
    for(let it of this.items) {
      if(!it.resuelto) {
        haTerminado = false;
        return haTerminado;
      }
      bitacoraId = it.bitacoraId;
    }

    if(this.service.cerrarBitacoraOperacion(bitacoraId)) {
      if(this.revisionOtrasOperaciones()) {
        this.buscarPremio();
      } else {
        //href a otra operacion con router navigation url
      }
    }

    return haTerminado;
  }

  revisionOtrasOperaciones() {
    //revisar bitacora de resta, multiplicacion & division
    let cerrada:boolean = false;
    if(this.service.existeOtraBitacoraCerrada("resta", this.usuario)) {
      cerrada = true;
    } else if(this.service.existeOtraBitacoraCerrada("multiplicacion", this.usuario)) {
      cerrada = true;
    } else if(this.service.existeOtraBitacoraCerrada("division", this.usuario)) {
      cerrada = true;
    }
    return cerrada;
  }

  buscarPremio() {
    //buscar premio por fecha de hoy(videos), si no encuentra, buscar el siguiente indice ascendente visto:false
    //http://localhost:4201/educacion-basica-ws/api/v1/premio/2018-09-09
    //http://localhost:4201/educacion-basica-ws/api/v1/premio
  }

  ngOnInit() {
  }

}
