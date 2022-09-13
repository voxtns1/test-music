import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HomeService } from './home.service';
import { Preference } from '@music/core/type';

@Component({
  selector: 'music-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  allPreference$: Preference[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _homeService: HomeService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.allPreference$ = [];
  }

  ngOnInit(): void {
    this._homeService.allPreferences$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((preference: Preference[]) => {
      this.allPreference$ = preference;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  resultsPreference($preference: Preference[]) {
    const query = this._queryReduce($preference);
    this._router.navigate(['./', query], { relativeTo: this._activatedRoute });
  }

  private _queryReduce(preference: Preference[]) {
    return preference.reduce((preview, value) => {
      const list = value.children.map(({id}) => id).join(",");
      preview += `&${value.category}:${list}`;
      return preview;
    }, "").slice(1);
  }
}
