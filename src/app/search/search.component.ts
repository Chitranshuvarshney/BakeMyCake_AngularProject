import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchText: string = '';

  constructor() {}

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  search() {
    this.searchTextChanged.emit(this.searchText);
  }
}
