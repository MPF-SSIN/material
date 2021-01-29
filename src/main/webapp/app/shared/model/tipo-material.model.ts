export interface ITipoMaterial {
  id?: number;
  nome?: string;
}

export class TipoMaterial implements ITipoMaterial {
  constructor(public id?: number, public nome?: string) {}
}
