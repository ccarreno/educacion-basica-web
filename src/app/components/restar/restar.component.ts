import { Component, OnInit } from '@angular/core';
import { RestarService } from '../../services/restar.service';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-restar',
  templateUrl: './restar.component.html'
})
export class RestarComponent implements OnInit {

  items:Item[];
  promesa:Promise<Item[]>;
  service:RestarService;

  constructor(_service:RestarService) {
    this.service = _service;
    this.promesa = this.service.generarRestas("dcarreno");
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
