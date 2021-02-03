import { IMaterial } from 'app/shared/model/material.model';

export interface IEstoque {
  id?: number;
  quantidade?: number;
  localizacao?: string;
  material?: IMaterial;
}

export class Estoque implements IEstoque {
  constructor(public id?: number, public quantidade?: number, public localizacao?: string, public material?: IMaterial) {}
}
