import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';
import { Cake } from '../models/cake';

@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.css'],
})
export class CakeListComponent implements OnInit {
  cakes: Array<Cake> = [];
  categoryFilter: string = '';

  constructor(private cakeService: CakeService) {}

  ngOnInit(): void {
    this.cakeService.getAllCakes().subscribe({
      next: (data) => {
        this.cakes = data;
      },
      error: (err) => {
        alert("Data didn't fetched from the json-server");
      },
    });
  }

  onSearchTextChanged(cakeName: string) {
    this.cakeService.getAllCakes().subscribe({
      next: (data) => {
        if (cakeName || cakeName !== '') {
          this.cakes = this.cakes.filter((cake) =>
            cake.cakeName?.toLowerCase().includes(cakeName.toLowerCase())
          );
        } else {
          this.cakes = data;
        }
      },
    });
  }

  onFilter(filter: string) {
    this.categoryFilter = filter;
    this.cakeService.getAllCakes().subscribe({
      next: (data) => {
        this.cakes = data.filter(
          (cake) => cake.category === this.categoryFilter
        );
        if (this.categoryFilter === 'all') {
          this.cakes = data;
        }
      },
    });
  }
}
