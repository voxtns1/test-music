import { BehaviorSubject, Observable, map, of, switchMap, take, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Preference } from '@music/core/type';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private _allPreferences: BehaviorSubject<Preference[]> = new BehaviorSubject<Preference[]>([]);
    private _resultsMusic: BehaviorSubject<any> = new BehaviorSubject(null);
    private _query: BehaviorSubject<string> = new BehaviorSubject("");

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
      const data = [
        {
          category: 'author',
          children: [
            {
              id: 0,
              name: 'julio'
            },
            {
              id: 1,
              name: 'pepe'
            },
            {
              id: 2,
              name: 'andres'
            },
          ],
        },
        {
          category: 'generic',
          children: [
            {
              id: 0,
              name: 'rock'
            },
            {
              id: 1,
              name: 'indigo'
            },
            {
              id: 2,
              name: 'clasic'
            },
          ],
        }
      ];
      this._allPreferences.next(data);
      return of(data);
    }

    getPreferenceByQuery(query: string | null): Observable<any[]> {
      if(query) {
        this._query.next(query);
      }
      const data: any[] = [
        {
          id: 1,
          name: 'Una espada sin igual',
          category: ['rock', 'andy'],
          author: 'Los autenticos decadentes',
          cover: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/love-song-mixtape-album-cover-template-design-250a66b33422287542e2690b437f881b_screen.jpg?ts=1635176340'
        }
      ];
      this._resultsMusic.next(data);
      return of(data);
  }
}
