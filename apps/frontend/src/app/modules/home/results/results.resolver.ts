import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

import { HomeService } from '../home.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsResolver implements Resolve<boolean> {
  constructor(private _homeService: HomeService, private _router: Router) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._homeService.getPreferenceByQuery(route.paramMap.get('query')).pipe(
        catchError((error) => {
            const parentUrl = state.url.split('/').slice(0, -1).join('/');
            this._router.navigateByUrl(parentUrl);
            return throwError(error);
        })
    );
  }
}
