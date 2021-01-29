import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoArma } from 'app/shared/model/tipo-arma.model';

type EntityResponseType = HttpResponse<ITipoArma>;
type EntityArrayResponseType = HttpResponse<ITipoArma[]>;

@Injectable({ providedIn: 'root' })
export class TipoArmaService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-armas';

  constructor(protected http: HttpClient) {}

  create(tipoArma: ITipoArma): Observable<EntityResponseType> {
    return this.http.post<ITipoArma>(this.resourceUrl, tipoArma, { observe: 'response' });
  }

  update(tipoArma: ITipoArma): Observable<EntityResponseType> {
    return this.http.put<ITipoArma>(this.resourceUrl, tipoArma, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoArma>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoArma[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
