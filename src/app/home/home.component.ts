import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';
import { Cake } from '../models/cake';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cakes: Array<Cake> = [];

  constructor(private cakeService: CakeService) {}
  ngOnInit(): void {
    this.cakeService.getAllCakes().subscribe({
      next: (data) => {
        this.cakes = data;
      },
      error: (err) => {
        alert('Failed to Fetch Data Due to Server Error !!');
      },
    });
  }
}
