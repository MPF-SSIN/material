export interface ILotacao {
  id?: number;
  nome?: string;
  sigla?: string;
  latitude?: number;
  longitude?: number;
  propria?: boolean;
}

export class Lotacao implements ILotacao {
  constructor(
    public id?: number,
    public nome?: string,
    public sigla?: string,
    public latitude?: number,
    public longitude?: number,
    public propria?: boolean
  ) {
    this.propria = this.propria || false;
  }
}
