import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'music-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor() {
    console.log("ResultsComponent --- constructor")
  }

  ngOnInit(): void {
    console.log("ResultsComponent --- ngOnInit")
  }
}
