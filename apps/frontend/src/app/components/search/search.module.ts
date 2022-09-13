import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    TranslateModule.forChild()
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
