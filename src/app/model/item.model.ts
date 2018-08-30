

export class Item {

  _id:any;
  index:number;
  tipo_operacion:string="suma";
  valorA:number;
  valorB:number;
  resultadoUsuario:number;
  resultadoOK:number;
  randomImageURL:string;
  resuelto:boolean = false;
  titulo:string;
  errorCalculo:boolean = false;
  fecha:Date;

  public constructor(_id:number, _operacion:string, _valorA:number, _valorB:number, _imageURL:string) {
    this.index = _id;
    this.tipo_operacion = _operacion;
    this.valorA = _valorA;
    this.valorB = _valorB;
    this.randomImageURL = _imageURL;
    this.titulo = _imageURL.replace(/_/g, ' ').replace('.png','').replace('TCG','');
    this.calcularResultado();
  }

  public calcularResultado():void {

    if(this.tipo_operacion == "suma") {
      this.resultadoOK = this.valorA + this.valorB;
    }

    if(this.tipo_operacion == "resta") {
      this.resultadoOK = this.valorA - this.valorB;
    }

    if(this.tipo_operacion == "multiplicacion") {
      this.resultadoOK = this.valorA * this.valorB;
    }

    if(this.tipo_operacion == "division") {
      this.resultadoOK = this.valorA / this.valorB;
    }
  }
}
