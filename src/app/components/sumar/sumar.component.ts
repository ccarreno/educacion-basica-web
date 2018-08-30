import { Component, OnInit } from '@angular/core';
import { SumarService } from '../../services/sumar.service';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-sumar',
  templateUrl: './sumar.component.html'
})
export class SumarComponent implements OnInit {

  items:Item[];
  sumarService:SumarService;

  constructor(_sumarService:SumarService) {
    this.sumarService = _sumarService;
    this.items = this.sumarService.generarSumas();
    console.log(this.items);
  }

  validarRespuesta(respuesta:number, index:number) {
    //https://animeflv.net/ver/49836/boku-no-hero-academia-3rd-season-19
    for(let it of this.items) {
      if(it.index == index) {
        if(it.resultadoOK == respuesta) {
          console.log("respuesta=" + respuesta + "; index=" + index);
          it.resuelto = true;
          break;
        }
        it.errorCalculo = true;
        break;
      }
    }
  }

  ngOnInit() {
  }

}
