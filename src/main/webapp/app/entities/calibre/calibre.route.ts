import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICalibre, Calibre } from 'app/shared/model/calibre.model';
import { CalibreService } from './calibre.service';
import { CalibreComponent } from './calibre.component';
import { CalibreDetailComponent } from './calibre-detail.component';
import { CalibreUpdateComponent } from './calibre-update.component';

@Injectable({ providedIn: 'root' })
export class CalibreResolve implements Resolve<ICalibre> {
  constructor(private service: CalibreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICalibre> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((calibre: HttpResponse<Calibre>) => {
          if (calibre.body) {
            return of(calibre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Calibre());
  }
}

export const calibreRoute: Routes = [
  {
    path: '',
    component: CalibreComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.calibre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CalibreDetailComponent,
    resolve: {
      calibre: CalibreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.calibre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CalibreUpdateComponent,
    resolve: {
      calibre: CalibreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.calibre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CalibreUpdateComponent,
    resolve: {
      calibre: CalibreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ssinApp.calibre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
