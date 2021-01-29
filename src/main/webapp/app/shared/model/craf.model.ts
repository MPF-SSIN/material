import { Moment } from 'moment';
import { IMaterial } from 'app/shared/model/material.model';

export interface ICraf {
  id?: number;
  numero?: string;
  dataEmissao?: Moment;
  dataValidade?: Moment;
  arma?: IMaterial;
}

export class Craf implements ICraf {
  constructor(
    public id?: number,
    public numero?: string,
    public dataEmissao?: Moment,
    public dataValidade?: Moment,
    public arma?: IMaterial
  ) {}
}
