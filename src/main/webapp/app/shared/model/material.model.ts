import { ITipoMaterial } from 'app/shared/model/tipo-material.model';
import { ITipoArma } from 'app/shared/model/tipo-arma.model';
import { ICalibre } from 'app/shared/model/calibre.model';
import { IFornecedor } from 'app/shared/model/fornecedor.model';
import { SituacaoMaterial } from 'app/shared/model/enumerations/situacao-material.model';

export interface IMaterial {
  id?: number;
  nome?: string;
  descricao?: string;
  marca?: string;
  valor?: number;
  situacao?: SituacaoMaterial;
  serie?: string;
  lote?: string;
  tamanho?: string;
  tipoMaterial?: ITipoMaterial;
  tipoArma?: ITipoArma;
  calibre?: ICalibre;
  fornecedor?: IFornecedor;
}

export class Material implements IMaterial {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public marca?: string,
    public valor?: number,
    public situacao?: SituacaoMaterial,
    public serie?: string,
    public lote?: string,
    public tamanho?: string,
    public tipoMaterial?: ITipoMaterial,
    public tipoArma?: ITipoArma,
    public calibre?: ICalibre,
    public fornecedor?: IFornecedor
  ) {}
}
