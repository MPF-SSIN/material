export interface ICalibre {
  id?: number;
  nome?: string;
}

export class Calibre implements ICalibre {
  constructor(public id?: number, public nome?: string) {}
}
