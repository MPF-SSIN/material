import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAcautelamento, Acautelamento } from 'app/shared/model/acautelamento.model';
import { AcautelamentoService } from './acautelamento.service';
import { AcautelamentoComponent } from './acautelamento.component';
import { AcautelamentoDetailComponent } from './acautelamento-detail.component';
import { AcautelamentoUpdateComponent } from './acautelamento-update.component';

@Injectable({ providedIn: 'root' })
export class AcautelamentoResolve implements Resolve<IAcautelamento> {
  constructor(private service: AcautelamentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAcautelamento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((acautelamento: HttpResponse<Acautelamento>) => {
          if (acautelamento.body) {
            return of(acautelamento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Acautelamento());
  }
}

export const acautelamentoRoute: Routes = [
  {
    path: '',
    component: AcautelamentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.acautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AcautelamentoDetailComponent,
    resolve: {
      acautelamento: AcautelamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.acautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AcautelamentoUpdateComponent,
    resolve: {
      acautelamento: AcautelamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.acautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AcautelamentoUpdateComponent,
    resolve: {
      acautelamento: AcautelamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.acautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
