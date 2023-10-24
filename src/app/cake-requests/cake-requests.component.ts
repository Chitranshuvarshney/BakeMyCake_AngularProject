import { Component, OnInit, ViewChild } from '@angular/core';
import { CakeRequest } from '../models/cake-request';
import { CakeRequestService } from '../services/cake-request.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cake-requests',
  templateUrl: './cake-requests.component.html',
  styleUrls: ['./cake-requests.component.css'],
})
export class CakeRequestsComponent implements OnInit {
  submitStatus: boolean = false;
  canDeactivate() {
    if (!this.submitStatus)
      this.submitStatus = confirm('Are you sure you want to leave?');
    return this.submitStatus;
  }

  dataSource!: MatTableDataSource<CakeRequest>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'id',
    'cakeName',
    'cakePrice',
    'quantity',
    'dateOfDelivery',
    'customerName',
    'customerEmail',
    'customerPhone',
    'customerAddress',
    'totalBill',
  ];

  cakeRequests: CakeRequest[] = [];

  constructor(private cakeRequestService: CakeRequestService) {}

  ngOnInit(): void {
    this.cakeRequestService.getAllCakeRequests().subscribe({
      next: (data) => {
        this.cakeRequests = data;
        this.dataSource = new MatTableDataSource(this.cakeRequests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
