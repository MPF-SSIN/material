import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemAcautelamento } from 'app/shared/model/item-acautelamento.model';

type EntityResponseType = HttpResponse<IItemAcautelamento>;
type EntityArrayResponseType = HttpResponse<IItemAcautelamento[]>;

@Injectable({ providedIn: 'root' })
export class ItemAcautelamentoService {
  public resourceUrl = SERVER_API_URL + 'api/item-acautelamentos';

  constructor(protected http: HttpClient) {}

  create(itemAcautelamento: IItemAcautelamento): Observable<EntityResponseType> {
    return this.http.post<IItemAcautelamento>(this.resourceUrl, itemAcautelamento, { observe: 'response' });
  }

  update(itemAcautelamento: IItemAcautelamento): Observable<EntityResponseType> {
    return this.http.put<IItemAcautelamento>(this.resourceUrl, itemAcautelamento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemAcautelamento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemAcautelamento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
