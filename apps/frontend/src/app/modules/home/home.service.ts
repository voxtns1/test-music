import { BehaviorSubject, Observable, map, of, take, tap } from 'rxjs';
import { Preference, ResultMusic } from '@music/core/type';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/frontend/src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private _allPreferences: BehaviorSubject<Preference[]> = new BehaviorSubject<Preference[]>([]);
    private _resultsMusic: BehaviorSubject<any> = new BehaviorSubject(null);
    private _query: BehaviorSubject<string> = new BehaviorSubject("");

    constructor(private readonly http: HttpClient) {

    }

    get allPreferences$(): Observable<Preference[]> {
        return this._allPreferences.asObservable();
    }

    get resultsMusic$(): Observable<any[]> {
      return this._resultsMusic.asObservable();
    }

    get query$(): Observable<string> {
      return this._query.asObservable();
    }

    getData(): Observable<Preference[]> {
      return this.http.get<Preference[]>(`${environment.endPoint}/data`).pipe(tap(res => this._allPreferences.next(res)));
    }

    getPreferenceByQuery(query: string | null): Observable<ResultMusic[]> {
      if(!query) return of([]);

      return this.http.get<ResultMusic[]>(`${environment.endPoint}/data/results`, { params: { query }}).pipe(tap(res => {
        this._query.next(query);
        this._resultsMusic.next(res)
      }));
  }
}
