export interface ITipoArma {
  id?: number;
  nome?: string;
}

export class TipoArma implements ITipoArma {
  constructor(public id?: number, public nome?: string) {}
}
