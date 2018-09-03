
export class BitacoraOperaciones {

  _id:any;
  usuario:string;
  tipo_operacion:string;
  completado:boolean = false;
  fecha:Date;

  public constructor(_usuario:string, _operacion:string) {
    this.tipo_operacion = _operacion;
    this.usuario = _usuario;
  }
}
