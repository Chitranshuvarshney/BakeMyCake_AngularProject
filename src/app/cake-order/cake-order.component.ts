import { Component, OnInit } from '@angular/core';
import { Cake } from '../models/cake';
import { CakeRequest } from '../models/cake-request';
import { ActivatedRoute } from '@angular/router';
import { CakeService } from '../services/cake.service';
import { CakeRequestService } from '../services/cake-request.service';
import { RouteService } from '../services/route.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cake-order',
  templateUrl: './cake-order.component.html',
  styleUrls: ['./cake-order.component.css'],
})
export class CakeOrderComponent implements OnInit {
  cake?: Cake;
  stars: Array<number> = [];
  cakeRequest: CakeRequest = {
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pinCode: 0,
  };
  minDate: Date = new Date();

  submitStatus: boolean = false;

  canDeactivate() {
    if (!this.submitStatus)
      this.submitStatus = confirm(
        'You have not submitted any order to this cake. Any details entered will be lost. Are you sure you want to leave?'
      );
    return this.submitStatus;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private cakeService: CakeService,
    private cakeRequestService: CakeRequestService,
    private routeService: RouteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      let id = param.get('id') ?? '';
      this.cakeService.getCake(id).subscribe((data) => {
        this.cake = data;
        this.stars = new Array(this.cake.rating);
        this.submitStatus = false;
      });
    });
  }

  makeRequest(orderRequestForm: NgForm) {
    if (
      this.cakeRequest.customerName &&
      this.cakeRequest.customerEmail &&
      this.cakeRequest.customerPhone &&
      this.cakeRequest.houseNo &&
      this.cakeRequest.street &&
      this.cakeRequest.city &&
      this.cakeRequest.state &&
      this.cakeRequest.pinCode &&
      this.cakeRequest.dateOfDelivery
    ) {
      this.cakeRequest.cakeName = this.cake?.cakeName;
      this.cakeRequest.cakePrice = this.cake?.cakePrice;
      this.cakeRequest.totalBill = this.calculateTotalPrice();
      this.cakeRequestService.saveCakeRequest(this.cakeRequest).subscribe({
        next: (data) => {
          this.snackBar.open('Order Submitted', 'success', {
            duration: 5000,
          });
          this.submitStatus = true;
          this.routeService.navigateToHomeView();
        },
        error: (err) => {
          alert('Failed to submit cake request');
        },
      });
    }
  }

  calculateTotalPrice(): number {
    if (this.cake && this.cake.cakePrice && this.cakeRequest.quantity) {
      if (this.cakeRequest?.quantity > 0) {
        return this.cake.cakePrice * this.cakeRequest.quantity;
      }
    }
    return 0;
  }
}
