import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAcautelamento } from 'app/shared/model/acautelamento.model';

type EntityResponseType = HttpResponse<IAcautelamento>;
type EntityArrayResponseType = HttpResponse<IAcautelamento[]>;

@Injectable({ providedIn: 'root' })
export class AcautelamentoService {
  public resourceUrl = SERVER_API_URL + 'api/acautelamentos';

  constructor(protected http: HttpClient) {}

  create(acautelamento: IAcautelamento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(acautelamento);
    return this.http
      .post<IAcautelamento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(acautelamento: IAcautelamento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(acautelamento);
    return this.http
      .put<IAcautelamento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAcautelamento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAcautelamento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(acautelamento: IAcautelamento): IAcautelamento {
    const copy: IAcautelamento = Object.assign({}, acautelamento, {
      dataHora: acautelamento.dataHora && acautelamento.dataHora.isValid() ? acautelamento.dataHora.toJSON() : undefined,
      dataHoraDevolucao:
        acautelamento.dataHoraDevolucao && acautelamento.dataHoraDevolucao.isValid() ? acautelamento.dataHoraDevolucao.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataHora = res.body.dataHora ? moment(res.body.dataHora) : undefined;
      res.body.dataHoraDevolucao = res.body.dataHoraDevolucao ? moment(res.body.dataHoraDevolucao) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((acautelamento: IAcautelamento) => {
        acautelamento.dataHora = acautelamento.dataHora ? moment(acautelamento.dataHora) : undefined;
        acautelamento.dataHoraDevolucao = acautelamento.dataHoraDevolucao ? moment(acautelamento.dataHoraDevolucao) : undefined;
      });
    }
    return res;
  }
}
