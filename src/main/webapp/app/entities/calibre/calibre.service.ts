import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICalibre } from 'app/shared/model/calibre.model';

type EntityResponseType = HttpResponse<ICalibre>;
type EntityArrayResponseType = HttpResponse<ICalibre[]>;

@Injectable({ providedIn: 'root' })
export class CalibreService {
  public resourceUrl = SERVER_API_URL + 'api/calibres';

  constructor(protected http: HttpClient) {}

  create(calibre: ICalibre): Observable<EntityResponseType> {
    return this.http.post<ICalibre>(this.resourceUrl, calibre, { observe: 'response' });
  }

  update(calibre: ICalibre): Observable<EntityResponseType> {
    return this.http.put<ICalibre>(this.resourceUrl, calibre, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICalibre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICalibre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
