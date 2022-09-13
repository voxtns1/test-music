import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HomeService } from '../home.service';
import { ResultMusic } from '@music/core/type';

@Component({
  selector: 'music-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})

export class ResultsComponent implements OnInit, OnDestroy {

  resultsMusic$: ResultMusic[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _homeService: HomeService) {
    this.resultsMusic$ = [];
  }

  ngOnInit(): void {
    this._homeService.resultsMusic$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((results: ResultMusic[]) => {
      this.resultsMusic$ = results;
    });
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
