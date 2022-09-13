import { Component, Input } from '@angular/core';

import { ResultMusic } from '@music/core/type';

@Component({
  selector: 'music-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() resultMusic: ResultMusic | undefined;
}
