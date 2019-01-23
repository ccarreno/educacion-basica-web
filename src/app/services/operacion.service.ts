import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from "../model/item.model";
import { BitacoraOperaciones } from "../model/bitacora.model";
import { StatusBitacora, TipoOperacionStatus } from '../model/statusBitacora.model';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {

  client:HttpClient;
  items:Item[] = [];
  images:any[] = [];
  bitacora:BitacoraOperaciones;
  router:Router;

  constructor( _client: HttpClient, _router:Router, @Inject(DOCUMENT) private document: any) {
    this.client = _client;
    this.router = _router;
  }

  modificarOperacion(item:Item) {

    console.log("modificarOperacion(" + item + ")");
    console.log(OPERACIONES_URL + item._id);
    console.log(item);
    this.client.put(OPERACIONES_URL + item._id, item)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }

  async cerrarBitacoraOperacion(bitacoraId:any) {

    console.log("cerrarBitacoraOperacion(" + bitacoraId + ")");
    let cerrado:boolean = false;
    console.log(BITACORA_OPERACIONES_URL + bitacoraId);
    // console.log(item);
    await this.client.put(BITACORA_OPERACIONES_URL + bitacoraId, {"completado":true})
      .subscribe(
        res => {
          console.log(res);
          if(res != null) {
            cerrado = true;
          }
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
    return cerrado;
  }

	public buscarBitacorasUsuarioHoy(usuario:string): Observable<any[]> {
    let date = new Date();
    let s = date.toISOString().slice(0,10);
    console.log(BITACORA_OPERACIONES_URL + "existen/" + usuario + "/" + s);
		return this.client.get<any[]>(BITACORA_OPERACIONES_URL + "existen/" + usuario + "/" + s);
	}

	public existeOtraBitacoraCerrada(tipo_operacion:string, usuario:string): Observable<any[]> {
    let date = new Date();
    let s = date.toISOString().slice(0,10);
    console.log(BITACORA_OPERACIONES_URL + "completado/" + tipo_operacion + "/" + usuario + "/" + s);
		return this.client.get<any[]>(BITACORA_OPERACIONES_URL + "completado/" + tipo_operacion + "/" + usuario + "/" + s);
	}

  existePremioHoy() {

    console.log("existePremioHoy()");
    let date = new Date();
    let s = date.toISOString().slice(0,10);
    console.log(PREMIO_URL + s);
      // console.log(item);
    return this.client.get<any[]>(PREMIO_URL + s);
  }

  asignarPremio() {

    console.log("asignarPremio()");
    let date = new Date();
    let s = date.toISOString().slice(0,10);
    console.log(PREMIO_URL);
      // console.log(item);
    return this.client.get<any[]>(PREMIO_URL);
  }

  revisionOperaciones():any {

    console.log("revisionOperaciones())");
    let revisionOperaciones:any = {
      haTerminado:true
    };
    for(let it of this.items) {
      revisionOperaciones.bitacoraId = it.bitacoraId;
      if(!it.resuelto) {
        revisionOperaciones.haTerminado = false;
        return revisionOperaciones;
      }
    }
    return revisionOperaciones;
  }

  async revisionOtrasOperaciones(usuario:string, tipo_operaciones:string[]):Promise<StatusBitacora> {

    console.log("revisionOtrasOperaciones()");
    let otrasOperaciones:StatusBitacora = {
      op1: new TipoOperacionStatus (tipo_operaciones[0]),
      op2: new TipoOperacionStatus (tipo_operaciones[1]),
      op3: new TipoOperacionStatus (tipo_operaciones[2]),
      usuario: usuario
    };
    /** 
     * TODO: consultar sólo una vez por las operaciones finalizadas 
     * y comprobar que se encuentren completadas para poder asignar un premio.
     * http://localhost:4201/educacion-basica-ws/api/v1/bitacora-operacion/existen/dcarreno/2019-01-22
     * count >= 2 de completado: true ==> premio 
    **/
    await this.buscarBitacorasUsuarioHoy(usuario).subscribe(resultado => {
      console.log(resultado);
      otrasOperaciones.op1.response = resultado;
      if(resultado && resultado.length > 0) {
        otrasOperaciones.op1.cerrada = true;
        this.buscarPremio();
      }
    });

    // await this.existeOtraBitacoraCerrada(tipo_operaciones[1], usuario).subscribe(resultado => {
    //   console.log(resultado);
    //   otrasOperaciones.op2.response = resultado;
    //   if(resultado && resultado.length > 0)  {
    //     otrasOperaciones.op2.cerrada = true;
    //     this.buscarPremio();
    //   }
    // });

    // await this.existeOtraBitacoraCerrada(tipo_operaciones[2], usuario).subscribe(resultado => {
    //   console.log(resultado);
    //   otrasOperaciones.op3.response = resultado;
    //   if(resultado && resultado.length > 0)  {
    //     otrasOperaciones.op3.cerrada = true;
    //     this.buscarPremio();
    //   }
    // });

    console.log(otrasOperaciones);

    if(!otrasOperaciones.op1.cerrada){
      console.log("this.router.navigate(['/" + otrasOperaciones.op1.tipo_operacion + "']);");
      this.router.navigate(["/" + otrasOperaciones.op1.tipo_operacion]);
    } else if(!otrasOperaciones.op2.cerrada){
      console.log("this.router.navigate(['/" + otrasOperaciones.op2.tipo_operacion + "']);");
      this.router.navigate(["/" + otrasOperaciones.op2.tipo_operacion]);
    } else if(!otrasOperaciones.op3.cerrada){
      console.log("this.router.navigate(['/" + otrasOperaciones.op3.tipo_operacion + "']);");
      this.router.navigate(["/" + otrasOperaciones.op3.tipo_operacion]);
    }

    return otrasOperaciones;
  }

  async buscarPremio() {

    console.log("buscarPremio()");
    let existePremioHoy:any[];
    await this.existePremioHoy().toPromise().then(resultado => { existePremioHoy = resultado });
    console.log(existePremioHoy);
    if(existePremioHoy && existePremioHoy.length > 0 ) {
      this.document.location.href = existePremioHoy[0].link;
    } else {
      let asignarPremio:any[];
      await this.asignarPremio().toPromise().then(resultado => { asignarPremio = resultado });
      console.log(asignarPremio);
      if(asignarPremio && asignarPremio.length > 0 ) {
        this.document.location.href = asignarPremio[0].link;
      }
    }
  }

  generarRandom(min:number, max:number) {
    return Math.floor(Math.random()*(max - min) + min);
  }
}

export const IMG_URL = "http://localhost:4201/educacion-basica-ws/api/v1/imagenes/";
export const OPERACIONES_URL = "http://localhost:4201/educacion-basica-ws/api/v1/operaciones/";
export const BITACORA_OPERACIONES_URL = "http://localhost:4201/educacion-basica-ws/api/v1/bitacora-operacion/";
export const PREMIO_URL = "http://localhost:4201/educacion-basica-ws/api/v1/premio/";
