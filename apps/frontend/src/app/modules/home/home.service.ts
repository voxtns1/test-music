import { BehaviorSubject, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Preference } from '@music/core/type';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private _allPreferences: BehaviorSubject<Preference[]> = new BehaviorSubject<Preference[]>([]);
    //private _results: BehaviorSubject<User | null> = new BehaviorSubject(null);


    get allPreferences$(): Observable<Preference[]> {
        return this._allPreferences.asObservable();
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
}
