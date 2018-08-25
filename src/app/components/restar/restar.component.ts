import { Component, OnInit } from '@angular/core';
import { RestarService } from '../../services/restar.service';
import { Item } from '../../model/item.model';

@Component({
  selector: 'app-restar',
  templateUrl: './restar.component.html'
})
export class RestarComponent implements OnInit {

  items:Item[] = [];
  restarService:RestarService;

  constructor(_restarService:RestarService) {
    this.restarService = _restarService;
    this.items = this.restarService.generarRestas();
    console.log(this.items);
  }

  validarRespuesta(respuesta:number, id:number) {
    //https://animeflv.net/ver/49836/boku-no-hero-academia-3rd-season-19
    for(let it of this.items) {
      if(it.id == id) {
        if(it.resultadoOK == respuesta) {
          console.log("respuesta=" + respuesta + "; id=" + id);
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
