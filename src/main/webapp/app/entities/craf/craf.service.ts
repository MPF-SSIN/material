import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICraf } from 'app/shared/model/craf.model';

type EntityResponseType = HttpResponse<ICraf>;
type EntityArrayResponseType = HttpResponse<ICraf[]>;

@Injectable({ providedIn: 'root' })
export class CrafService {
  public resourceUrl = SERVER_API_URL + 'api/crafs';

  constructor(protected http: HttpClient) {}

  create(craf: ICraf): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(craf);
    return this.http
      .post<ICraf>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(craf: ICraf): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(craf);
    return this.http
      .put<ICraf>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICraf>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICraf[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(craf: ICraf): ICraf {
    const copy: ICraf = Object.assign({}, craf, {
      dataEmissao: craf.dataEmissao && craf.dataEmissao.isValid() ? craf.dataEmissao.format(DATE_FORMAT) : undefined,
      dataValidade: craf.dataValidade && craf.dataValidade.isValid() ? craf.dataValidade.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataEmissao = res.body.dataEmissao ? moment(res.body.dataEmissao) : undefined;
      res.body.dataValidade = res.body.dataValidade ? moment(res.body.dataValidade) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((craf: ICraf) => {
        craf.dataEmissao = craf.dataEmissao ? moment(craf.dataEmissao) : undefined;
        craf.dataValidade = craf.dataValidade ? moment(craf.dataValidade) : undefined;
      });
    }
    return res;
  }
}
