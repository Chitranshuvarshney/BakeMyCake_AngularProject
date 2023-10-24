import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {}

  hide = true;

  loginCode: string = '';

  validateLoginCode() {
    this.authService.login(this.loginCode);
    if (this.authService.isLoggedIn) {
      this.routeService.navigateToCakeRequestsView();
    } else {
      alert(
        'Only Administrator can Login, If you are Administrator then Enter the Correct Code!'
      );
    }
  }
}
