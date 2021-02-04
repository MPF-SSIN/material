import { IMaterial } from 'app/shared/model/material.model';
import { IAcautelamento } from 'app/shared/model/acautelamento.model';

export interface IItemAcautelamento {
  id?: number;
  quantidade?: number;
  valorUnitario?: number;
  material?: IMaterial;
  acautelamento?: IAcautelamento;
}

export class ItemAcautelamento implements IItemAcautelamento {
  constructor(
    public id?: number,
    public quantidade?: number,
    public valorUnitario?: number,
    public material?: IMaterial,
    public acautelamento?: IAcautelamento
  ) {}
}
