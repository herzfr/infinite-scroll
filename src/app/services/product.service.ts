import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'assets/product.json';
  constructor(private httpClient: HttpClient) {}

  getProduct(): Observable<any[]> {
    return this.httpClient.get<Product[]>(this.url).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
