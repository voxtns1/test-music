import { Component, Input, OnInit } from '@angular/core';

import { ResultMusic } from '@music/core/type';

@Component({
  selector: 'music-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() resultMusic: ResultMusic | undefined;

  constructor() {
    console.log("asd")
  }

  ngOnInit(): void {
    console.log("asd")
  }
}
