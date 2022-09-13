import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    TranslateModule.forChild()
  ],
  exports: [CardComponent]
})
export class CardModule { }
