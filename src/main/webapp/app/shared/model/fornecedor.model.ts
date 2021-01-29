export interface IFornecedor {
  id?: number;
  nome?: string;
  cnpj?: string;
}

export class Fornecedor implements IFornecedor {
  constructor(public id?: number, public nome?: string, public cnpj?: string) {}
}
