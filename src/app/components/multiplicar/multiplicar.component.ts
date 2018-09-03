import { Component, OnInit } from '@angular/core';
import { MultiplicarService } from '../../services/multiplicar.service';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-multiplicar',
  templateUrl: './multiplicar.component.html'
})
export class MultiplicarComponent implements OnInit {

  items:Item[];
  promesa:Promise<Item[]>;
  service:MultiplicarService;

  constructor(_service:MultiplicarService) {
    this.service = _service;
    this.promesa = this.service.generarMultiplicaciones("dcarreno");
    this.promesa.then(value => {
      this.items = value;
    });
    console.log(this.items);
  }

  validarRespuesta(respuesta:number, index:number) {
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
  }

  ngOnInit() {
  }

}
