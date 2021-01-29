import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IItemAcautelamento, ItemAcautelamento } from 'app/shared/model/item-acautelamento.model';
import { ItemAcautelamentoService } from './item-acautelamento.service';
import { ItemAcautelamentoComponent } from './item-acautelamento.component';
import { ItemAcautelamentoDetailComponent } from './item-acautelamento-detail.component';
import { ItemAcautelamentoUpdateComponent } from './item-acautelamento-update.component';

@Injectable({ providedIn: 'root' })
export class ItemAcautelamentoResolve implements Resolve<IItemAcautelamento> {
  constructor(private service: ItemAcautelamentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IItemAcautelamento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((itemAcautelamento: HttpResponse<ItemAcautelamento>) => {
          if (itemAcautelamento.body) {
            return of(itemAcautelamento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ItemAcautelamento());
  }
}

export const itemAcautelamentoRoute: Routes = [
  {
    path: '',
    component: ItemAcautelamentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.itemAcautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ItemAcautelamentoDetailComponent,
    resolve: {
      itemAcautelamento: ItemAcautelamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.itemAcautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ItemAcautelamentoUpdateComponent,
    resolve: {
      itemAcautelamento: ItemAcautelamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.itemAcautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ItemAcautelamentoUpdateComponent,
    resolve: {
      itemAcautelamento: ItemAcautelamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.itemAcautelamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
