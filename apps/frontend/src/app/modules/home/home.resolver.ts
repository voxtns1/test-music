import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { HomeService } from './home.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preference } from '@music/core/type';

@Injectable({
  providedIn: 'root'
})

export class HomeResolver implements Resolve<Preference[]> {
  constructor(private _homeService: HomeService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Preference[]> {
    return this._homeService.getData();
  }
}
