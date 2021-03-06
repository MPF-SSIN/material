import { Moment } from 'moment';
import { ILotacao } from 'app/shared/model/lotacao.model';
import { TipoVinculo } from 'app/shared/model/enumerations/tipo-vinculo.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  cpf?: string;
  dataNascimento?: Moment;
  matricula?: string;
  tipoVinculo?: TipoVinculo;
  fotoContentType?: string;
  foto?: any;
  lotacao?: ILotacao;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public dataNascimento?: Moment,
    public matricula?: string,
    public tipoVinculo?: TipoVinculo,
    public fotoContentType?: string,
    public foto?: any,
    public lotacao?: ILotacao
  ) {}
}
