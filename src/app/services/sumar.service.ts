import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from "../model/item.model";
import { BitacoraOperaciones } from "../model/bitacora.model";

@Injectable({
  providedIn: 'root'
})
export class SumarService {

  client:HttpClient;
  items:Item[] = [];
  images:any[] = [];
  bitacora:BitacoraOperaciones;

  constructor( _client: HttpClient) {
    this.client = _client;
  }

  async generarSumas(usuario:string) {

    console.log("inside of generarSumas(" + usuario + ")");

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
            let valorA = this.generarRandom(MIN, MAX);
            let valorB = this.generarRandom(MIN, MAX);
            let imgRandomIndex = this.generarRandom(0, this.images.length-1);
            console.log(this.bitacora._id);
            let item = new Item(i+1, TIPO, valorA, valorB, this.images[imgRandomIndex].nombreArchivo, usuario, this.bitacora._id);

            // this.items.push(item);
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
    console.log("SALÍ CTM " + TIPO);
    return this.items;
  }

  modificarOperacion(item:Item) {
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

  generarRandom(min:number, max:number) {
    return Math.floor(Math.random()*(max - min) + min);
  }
}

export const MAX = 999;
export const MIN = 100;
export const TIPO = "suma";
export const IMG_URL = "http://localhost:4201/educacion-basica-ws/api/v1/imagenes/";
export const OPERACIONES_URL = "http://localhost:4201/educacion-basica-ws/api/v1/operaciones/";
export const BITACORA_OPERACIONES_URL = "http://localhost:4201/educacion-basica-ws/api/v1/bitacora-operacion/";
