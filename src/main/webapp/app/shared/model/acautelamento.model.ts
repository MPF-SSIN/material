import { Moment } from 'moment';
import { IItemAcautelamento } from 'app/shared/model/item-acautelamento.model';
import { IPessoa } from 'app/shared/model/pessoa.model';

export interface IAcautelamento {
  id?: number;
  numero?: string;
  dataHora?: Moment;
  dataHoraDevolucao?: Moment;
  obs?: string;
  itens?: IItemAcautelamento[];
  acautelante?: IPessoa;
}

export class Acautelamento implements IAcautelamento {
  constructor(
    public id?: number,
    public numero?: string,
    public dataHora?: Moment,
    public dataHoraDevolucao?: Moment,
    public obs?: string,
    public itens?: IItemAcautelamento[],
    public acautelante?: IPessoa
  ) {}
}
