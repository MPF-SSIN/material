import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICraf, Craf } from 'app/shared/model/craf.model';
import { CrafService } from './craf.service';
import { CrafComponent } from './craf.component';
import { CrafDetailComponent } from './craf-detail.component';
import { CrafUpdateComponent } from './craf-update.component';

@Injectable({ providedIn: 'root' })
export class CrafResolve implements Resolve<ICraf> {
  constructor(private service: CrafService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICraf> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((craf: HttpResponse<Craf>) => {
          if (craf.body) {
            return of(craf.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Craf());
  }
}

export const crafRoute: Routes = [
  {
    path: '',
    component: CrafComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.craf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrafDetailComponent,
    resolve: {
      craf: CrafResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.craf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrafUpdateComponent,
    resolve: {
      craf: CrafResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.craf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrafUpdateComponent,
    resolve: {
      craf: CrafResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.craf.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
