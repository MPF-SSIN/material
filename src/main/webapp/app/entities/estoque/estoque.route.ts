import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEstoque, Estoque } from 'app/shared/model/estoque.model';
import { EstoqueService } from './estoque.service';
import { EstoqueComponent } from './estoque.component';
import { EstoqueDetailComponent } from './estoque-detail.component';
import { EstoqueUpdateComponent } from './estoque-update.component';

@Injectable({ providedIn: 'root' })
export class EstoqueResolve implements Resolve<IEstoque> {
  constructor(private service: EstoqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstoque> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((estoque: HttpResponse<Estoque>) => {
          if (estoque.body) {
            return of(estoque.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Estoque());
  }
}

export const estoqueRoute: Routes = [
  {
    path: '',
    component: EstoqueComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.estoque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EstoqueDetailComponent,
    resolve: {
      estoque: EstoqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.estoque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EstoqueUpdateComponent,
    resolve: {
      estoque: EstoqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.estoque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EstoqueUpdateComponent,
    resolve: {
      estoque: EstoqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.estoque.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
