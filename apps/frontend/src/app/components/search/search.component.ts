import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';

interface Preference {
  category: string;
  children: PreferenceDescription[];
}

interface PreferenceDescription {
  id: number;
  name: string;
}

@Component({
  selector: 'music-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  preferenceCtrl = new FormControl('');
  filteredPreferences: Observable<Preference[]>;
  tags: string[] = [];
  allPreferences: Preference[] = [
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

  @ViewChild('preferenceInput') preferenceInput: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.filteredPreferences = this.preferenceCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | PreferenceDescription | null) => {
        return fruit ? this._filter(fruit) : this.allPreferences.slice()
      }
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput?.clear();

    this.preferenceCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.preferenceInput) return;
    this.tags.push(event.option.viewValue);
    this.preferenceInput.nativeElement.value = '';
    this.preferenceCtrl.setValue(null);
  }

  heightChipList(elem: HTMLInputElement) {
    const height = elem.parentElement?.parentElement?.parentElement?.parentElement?.offsetHeight || 0;
    return `${height}px`;
  }

  private _filter(value: string | PreferenceDescription): Preference[] {
    const filterValue = typeof value === 'string' ? value?.toLowerCase() : value.name.toUpperCase();

    return this.allPreferences.reduce<Preference[]>((preview, value) => {
      const { category, ...props } = value;
      const children = props.children.filter(({name}) => name.toLowerCase().includes(filterValue));

      if(children.length > 0) {
        preview.push({ category, children });
      }
      return preview;
    }, []);
  }
}
