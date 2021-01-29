import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoMaterial, TipoMaterial } from 'app/shared/model/tipo-material.model';
import { TipoMaterialService } from './tipo-material.service';
import { TipoMaterialComponent } from './tipo-material.component';
import { TipoMaterialDetailComponent } from './tipo-material-detail.component';
import { TipoMaterialUpdateComponent } from './tipo-material-update.component';

@Injectable({ providedIn: 'root' })
export class TipoMaterialResolve implements Resolve<ITipoMaterial> {
  constructor(private service: TipoMaterialService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoMaterial> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoMaterial: HttpResponse<TipoMaterial>) => {
          if (tipoMaterial.body) {
            return of(tipoMaterial.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoMaterial());
  }
}

export const tipoMaterialRoute: Routes = [
  {
    path: '',
    component: TipoMaterialComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.tipoMaterial.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoMaterialDetailComponent,
    resolve: {
      tipoMaterial: TipoMaterialResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.tipoMaterial.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoMaterialUpdateComponent,
    resolve: {
      tipoMaterial: TipoMaterialResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.tipoMaterial.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoMaterialUpdateComponent,
    resolve: {
      tipoMaterial: TipoMaterialResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.tipoMaterial.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
