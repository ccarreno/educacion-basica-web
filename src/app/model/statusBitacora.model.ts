

export class StatusBitacora {
  op1:TipoOperacionStatus;
  op2:TipoOperacionStatus;
  op3:TipoOperacionStatus;
  usuario: string;

  public constructor(usuario: string) {
    this.usuario = usuario;
  }
}

export class TipoOperacionStatus {
  cerrada: boolean = false;
  tipo_operacion: string;
  response: any[];

  public constructor(tipo_operacion: string) {
    this.tipo_operacion = tipo_operacion;
  }
}
