import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'music-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(translate: TranslateService) {}
}
