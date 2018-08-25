import { Injectable } from '@angular/core';
import { Item } from "../model/item.model";

@Injectable({
  providedIn: 'root'
})
export class RestarService {

  constructor() {
    console.log('EN RestarService');
  }

  generarRestas():Item[] {

    let items:Item[] = [];
    let images:string[] = ["TCG_All_Might_and_Izuku.png",
"TCG_All_Might_and_One_For_All.png",
"TCG_All_Might_Carolina_Smash.png",
"TCG_All_Might_Hero_Costume.png",
"TCG_All_Might_vs._Sludge_Villain.png",
"TCG_AM_Extra_HA-01-052.png",
"TCG_Backdraft.png",
"TCG_Denki_Kaminari_Hero_Costume.png",
"TCG_Denki_Kaminari_PE_Kit.png",
"TCG_Denki_Kaminari_Student_Uniform_1.png",
"TCG_Eijiro_Kirishima_Hero_Costume.png",
"TCG_Eijiro_Kirishima_PE_Kit.png",
"TCG_Eijiro_Kirishima_Student_Uniform_1.png",
"TCG_Eraserhead_Extra_HA-01-056.png",
"TCG_Eraserhead_Extra_HAD-02-010.png",
"TCG_Eraserhead_Hero_Costume_Extra.png",
"TCG_Fumikage_Tokoyami_Hero_Costume.png",
"TCG_Fumikage_Tokoyami_Student_Uniform.png",
"TCG_Hanta_Sero_PE_Kit.png",
"TCG_Izuku_Fighting.png",
"TCG_Izuku_Midoriya_Analysis.png",
"TCG_Izuku_Midoriya_Costume_Alpha.png",
"TCG_Izuku_Midoriya_Costume_Alpha_2.png",
"TCG_Izuku_Midoriya_Middle_School.png",
"TCG_Izuku_Midoriya_PE_Kit.png",
"TCG_Izuku_Midoriya_Student_Uniform.png",
"TCG_Izuku_Midoriya_Training.png",
"TCG_Kamui_Woods.png",
"TCG_Katsuki_Bakugo_Hero_Costume_1.png",
"TCG_Katsuki_Bakugo_Hero_Costume_2.png",
"TCG_Katsuki_Bakugo_PE_Kit_1.png",
"TCG_Katsuki_Bakugo_PE_Kit_2.png",
"TCG_Katsuki_Bakugo_Student_Uniform.png",
"TCG_Katsuki_Bakugo_Student_Uniform_1.png",
"TCG_Katsuki_Bakugo_Student_Uniform_2.png",
"TCG_Katsuki_Bakugo_Training.png",
"TCG_Koji_Koda_Student_Uniform.png",
"TCG_Kyoka_Jiro_Hero_Costume.png",
"TCG_Kyoka_Jiro_Student_Uniform_1.png",
"TCG_Mashirao_Ojiro_Hero_Costume.png",
"TCG_Mashirao_Ojiro_Student_Uniform_2.png",
"TCG_Mezo_Shoji_Hero_Costume.png",
"TCG_Mezo_Shoji_PE_Kit.png",
"TCG_Mina_Student_Uniform.png",
"TCG_Minoru_Mineta_Hero_Costume.png",
"TCG_Minoru_Mineta_PE_Kit.png",
"TCG_Minoru_Mineta_Student_Uniform.png",
"TCG_Momo_Hero_Costume.png",
"TCG_Momo_Student_Uniform.png",
"TCG_Momo_Yaoyorozu_PE_Kit.png",
"TCG_Mt._Lady.png",
"TCG_Ochaco_Uraraka_Civilian_Clothes.png",
"TCG_Ochaco_Uraraka_Hero_Costume.png",
"TCG_Ochaco_Uraraka_PE_Kit_1.png",
"TCG_Ochaco_Uraraka_PE_Kit_2.png",
"TCG_Ochaco_Uraraka_Student_Uniform.png",
"TCG_Ochaco_Uraraka_Student_Uniform_2.png",
"TCG_Present_Mic.png",
"TCG_Recovery_Girl_Extra_HAD-01-010.png",
"TCG_Rikido_Sato_PE_Kit.png",
"TCG_Shoto_Todoroki_1st_Hero_Costume.png",
"TCG_Shoto_Todoroki_PE_Kit.png",
"TCG_Shoto_Todoroki_Student_Uniform.png",
"TCG_Tenya_Iida_Hero_Costume.png",
"TCG_Tenya_Iida_PE_Kit.png",
"TCG_Tenya_Iida_PE_Kit_2.png",
"TCG_Tenya_Iida_Student_Uniform.png",
"TCG_Tenya_Iida_Training_Outfit.png",
"TCG_Toru_Hagakure_Hero_Costume.png",
"TCG_Tsuyu_Asui_Hero_Costume.png",
"TCG_Tsuyu_Asui_PE_Kit_1.png",
"TCG_Tsuyu_Asui_Student_Uniform.png",
"TCG_Yuga_Aoyama.png",
"TCG_Yuga_Aoyama_Hero_Costume.png",
"TCG_Yuga_Aoyama_PE_Kit_1.png"];

    const TIPO = "resta";
    const MAX = 999;
    const MIN = 100;

    for(let i = 0; i < 12 ; i++) {
      let valorA = this.generarRandom(MIN, MAX);
      let valorB = this.generarRandom(MIN, valorA);
      let imgRandomIndex = this.generarRandom(1, 75);
      let item = new Item(i+1, TIPO, valorA, valorB, images[imgRandomIndex]);
      items.push(item);
      //console.log(item.operacion, item.valorA, item.valorB);
    }

    return items;
  }

  generarRandom(min:number, max:number) {
    return Math.floor(Math.random()*(max - min) + min);
  }
}
