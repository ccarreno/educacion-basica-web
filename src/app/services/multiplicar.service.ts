import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from "../model/item.model";
import { BitacoraOperaciones } from "../model/bitacora.model";
import { OperacionService } from "./operacion.service";
import { StatusBitacora } from '../model/statusBitacora.model';

@Injectable({
  providedIn: 'root'
})
export class MultiplicarService {

  client:HttpClient;
  items:Item[] = [];
  images:any[] = [];
  bitacora:BitacoraOperaciones;
  operacionService:OperacionService;

  constructor( _client: HttpClient, _operacionService:OperacionService) {
    this.client = _client;
    this.operacionService = _operacionService;
  }

  async generarMultiplicaciones(usuario:string) {

    console.log("inside of generarMultiplicaciones(" + usuario + ")");

    let date = new Date();
    let s = date.toISOString().slice(0,10);
    console.log(s);
    console.log("check_URL : " + BITACORA_OPERACIONES_URL + 'existe/'+ TIPO +'/' + usuario + '/' + s);
    let existe = await this.client.get<BitacoraOperaciones[]>(BITACORA_OPERACIONES_URL + 'existe/'+ TIPO +'/' + usuario + '/' + s).toPromise();
    if(existe != null && existe.length != 0) {
      console.log(existe);
      console.log("debo ir a buscar las operaciones de " + TIPO + " de hoy");
      console.log("getOperaciones_URL : " + OPERACIONES_URL + TIPO +'/' + s);
      this.items = await this.client.get<Item[]>(OPERACIONES_URL + TIPO +'/' + s).toPromise();
      console.log(this.items);

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

      if(revisionOperaciones.haTerminado) {

        let otrasOperaciones:StatusBitacora;
        await this.operacionService.revisionOtrasOperaciones(usuario, ["sumas", "restas", "divisiones"]).then(resultado => { otrasOperaciones = resultado });

        // this.operacionService.evaluarOtrasOperaciones(otrasOperaciones);
      }

      console.log("existían items...");
    } else {
      console.log("debo registrar las operaciones de " + TIPO + " de hoy y crear la bitacora");
      this.images = await this.client.get<any[]>(IMG_URL).toPromise();
      let _bitacora:BitacoraOperaciones = new BitacoraOperaciones(usuario, TIPO);
      await this.client.post(BITACORA_OPERACIONES_URL, _bitacora).subscribe(
        (res:BitacoraOperaciones) => {
          console.log(res);
          this.bitacora = res;

          for(let i = 0; i < 12 ; i++) {
            let valorA = this.operacionService.generarRandom(MIN, MAX);
            let valorB = this.operacionService.generarRandom(MIN, MAX);
            let imgRandomIndex = this.operacionService.generarRandom(0, this.images.length-1);
            console.log(this.bitacora._id);
            let item = new Item(i+1, TIPO, valorA, valorB, this.images[imgRandomIndex].nombreArchivo, usuario, this.bitacora._id);

            this.client.post(OPERACIONES_URL, item)
              .subscribe(
                (res:Item) => {
                  console.log(res);
                  this.items.push(res);
                },
                err => {
                  console.log("Error occured : " + err);
                }
              );
          }
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
    }
    return this.items;
  }
}

export const MAX = 50;
export const MIN = 10;
export const TIPO = "multiplicaciones";
export const IMG_URL = "http://localhost:4201/educacion-basica-ws/api/v1/imagenes/";
export const OPERACIONES_URL = "http://localhost:4201/educacion-basica-ws/api/v1/operaciones/";
export const BITACORA_OPERACIONES_URL = "http://localhost:4201/educacion-basica-ws/api/v1/bitacora-operacion/";
