import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Preference, PreferenceDescription } from '@music/core/type';
import { map, startWith } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';

@Component({
  selector: 'music-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit{
  @ViewChild('preferenceInput') preferenceInput: ElementRef<HTMLInputElement> | undefined;
  @Input() allPreferences: Preference[] | undefined;
  @Output() resultsPreference = new EventEmitter<Preference[]>();

  separatorKeysCodes: number[];
  preferenceCtrl = new FormControl('');
  filteredPreferences: Observable<Preference[]>;
  tags: string[];
  afterViewInit: boolean;
  preferencesUser: Record<string, Preference>;


  constructor() {
    this.afterViewInit = false;
    this.preferencesUser = {};
    this.tags = [];
    this.separatorKeysCodes = [ENTER, COMMA];
    this.filteredPreferences = this._refreshFilteredPreferences();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.afterViewInit = true;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const [preferenceElement] = this._filter(value);
    if (preferenceElement) {
      const { children: [list],  category } = preferenceElement;
      this.selected(list, category);
    }
  }

  remove(preference: string): void {
    const index = this.tags.indexOf(preference);
    if (index >= 0) {
      this.tags.splice(index, 1);
      const preferencesUser = Object.values(this.preferencesUser);
      preferencesUser.forEach(({category, children}) => {
        const index = children.findIndex((list) => list.name === preference );
        if(index >= 0) {
          children.splice(index,1);
          if(children.length === 0) {
            delete this.preferencesUser[category];
            return;
          }
          this.preferencesUser[category].children = children;
        }
      });
      this.filteredPreferences = this._refreshFilteredPreferences();
    }
  }

  selected(list: PreferenceDescription, category: string): void {
    if (!this.preferenceInput) return;

    if(!this.preferencesUser[category]) {
      this.preferencesUser[category] = { category, children: [] };
    }

    const indexList = this.preferencesUser[category].children.findIndex(({id}) => list.id === id);
    if(indexList >= 0) return;

    this.preferenceInput.nativeElement.value = '';
    this.preferenceCtrl.setValue(null);
    this.tags.push(list.name);
    this.preferencesUser[category].children.push(list);
    this.filteredPreferences = this._refreshFilteredPreferences();
  }

  submit() {
    this.resultsPreference.emit(Object.values(this.preferencesUser));
  }

  heightChipList(elem: HTMLInputElement) {
    const height = elem.parentElement?.parentElement?.parentElement?.parentElement?.offsetHeight || 0;
    return `${height}px`;
  }

  private _excludeResults() {
    if(!this.allPreferences) return [];

    const request = this.allPreferences.reduce<Preference[]>((preview, value) => {
      const { category, ...props } = value;
      const children = props.children;

      if(!this.preferencesUser[category]) {
        preview.push({ category, children });
        return preview;
      }

      const lists = children.map(list => {
        const index =  this.preferencesUser[category].children.findIndex(({id}) => list.id === id);
        if(index === -1) {
          return list;
        }
        return;
      }).filter((e) => Boolean(e)) as unknown as PreferenceDescription[];

      if(lists) {
        preview.push({ category, children: lists });
      }

      return preview;
    }, []);

    return request;
  }

  private _filter(value: string | PreferenceDescription): Preference[] {
    const filterValue = typeof value === 'string' ? value?.toLowerCase() : value.name.toUpperCase();
    return this._excludeResults().reduce<Preference[]>((preview, value) => {
      const { category, ...props } = value;
      const children = props.children.filter(({name}) => name.toLowerCase().includes(filterValue));

      if(children.length > 0) {
        preview.push({ category, children });
      }
      return preview;
    }, []);
  }

  private _refreshFilteredPreferences(): Observable<Preference[]> {
    const filter = (preference: string | PreferenceDescription | null) => preference ? this._filter(preference) : this._excludeResults();
    return this.preferenceCtrl.valueChanges.pipe(startWith(null), map(filter));
  }
}
