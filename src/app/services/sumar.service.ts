import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from "../model/item.model";
//import { OperacionService } from './operacion.service';

@Injectable({
  providedIn: 'root'
})
export class SumarService {

  client:HttpClient;
  items:Item[] = [];
  images:any[] = [];

  constructor( _client: HttpClient) {
    this.client = _client;
  }

  async generarSumas() {

    console.log("inside of generarSumas()");

    let date = new Date();
    let s = date.toISOString().slice(0,10);
    console.log(s);
    console.log("check_URL : " + OPERACIONES_URL + 'existen/'+ TIPO +'/' + s);
    let existen = await this.client.get<Item[]>(OPERACIONES_URL + 'existen/'+ TIPO +'/' + s).toPromise();
    if(existen != null && existen.length != 0) {
      console.log("debo ir a buscar las operaciones de " + TIPO + " de hoy");
      console.log("getOperaciones_URL : " + OPERACIONES_URL + TIPO +'/' + s);
      this.items = await this.client.get<Item[]>(OPERACIONES_URL + TIPO +'/' + s).toPromise();
      console.log(this.items);
      console.log("existían items...");
    } else {
      console.log("debo registrar las operaciones de " + TIPO + " de hoy");
      this.images = await this.client.get<any[]>(IMG_URL).toPromise();
      for(let i = 0; i < 12 ; i++) {
        let valorA = this.generarRandom(MIN, MAX);
        let valorB = this.generarRandom(MIN, MAX);
        let imgRandomIndex = this.generarRandom(0, this.images.length-1);
        let item = new Item(i+1, TIPO, valorA, valorB, this.images[imgRandomIndex].nombreArchivo);

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
