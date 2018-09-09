

export class Item {

  _id:any;
  index:number;
  usuario:string="dcarreno";
  bitacoraId:any;
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

  public constructor(_index:number, _operacion:string, _valorA:number, _valorB:number, _imageURL:string, _usuario:string, _bitacoraId:any) {
    this.index = _index;
    this.tipo_operacion = _operacion;
    this.valorA = _valorA;
    this.valorB = _valorB;
    this.randomImageURL = _imageURL;
    this.titulo = _imageURL.replace(/_/g, ' ').replace('.png','').replace('TCG','');
    this.usuario = _usuario;
    this.bitacoraId = _bitacoraId;
    this.calcularResultado();
  }

  public calcularResultado():void {

    if(this.tipo_operacion == "sumas") {
      this.resultadoOK = this.valorA + this.valorB;
    }

    if(this.tipo_operacion == "restas") {
      this.resultadoOK = this.valorA - this.valorB;
    }

    if(this.tipo_operacion == "multiplicaciones") {
      this.resultadoOK = this.valorA * this.valorB;
    }

    if(this.tipo_operacion == "divisiones") {
      this.resultadoOK = this.valorA / this.valorB;
    }
  }
}
