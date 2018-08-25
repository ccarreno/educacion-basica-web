

export class Item {

  id:number;
  operacion:string="suma";
  valorA:number;
  valorB:number;
  resultadoUsuario:number;
  resultadoOK:number;
  randomImageURL:string;
  resuelto:boolean = false;
  titulo:string;
  errorCalculo:boolean = false;

  public constructor(_id:number, _operacion:string, _valorA:number, _valorB:number, _imageURL:string) {
    this.id = _id;
    this.operacion = _operacion;
    this.valorA = _valorA;
    this.valorB = _valorB;
    this.randomImageURL = _imageURL;
    this.titulo = _imageURL.replace(/_/g, ' ').replace('.png','').replace('TCG','');
    this.calcularResultado();
  }

  public calcularResultado():void {

    if(this.operacion == "suma") {
      this.resultadoOK = this.valorA + this.valorB;
    }

    if(this.operacion == "resta") {
      this.resultadoOK = this.valorA - this.valorB;
    }

    if(this.operacion == "multiplicacion") {
      this.resultadoOK = this.valorA * this.valorB;
    }

    if(this.operacion == "division") {
      this.resultadoOK = this.valorA / this.valorB;
    }
  }
}
