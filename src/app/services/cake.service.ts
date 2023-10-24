import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cake } from '../models/cake';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CakeService {
  URL: string = 'https://bake-my-cake-backend-data.vercel.app/cakes';
  constructor(private http: HttpClient) {}

  getAllCakes(): Observable<Array<Cake>> {
    return this.http.get<Array<Cake>>(this.URL);
  }

  getCake(id?: string): Observable<Cake> {
    console.log(id);
    return this.http.get<Cake>(`${this.URL}/${id}`);
  }
}
